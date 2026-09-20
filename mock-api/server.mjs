import { randomUUID } from "node:crypto";
import { createServer } from "node:http";

import { seedTasks } from "./seed.mjs";

const port = Number(process.env.MOCK_API_PORT ?? 4000);
const delayMs = Number(process.env.MOCK_API_DELAY ?? 600);
const allowedStatuses = new Set(["planned", "in-progress", "done"]);
const allowedPriorities = new Set(["low", "medium", "high"]);

let tasks = structuredClone(seedTasks);
let failNextTaskCreation = false;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload));
}

function sendEmpty(response, statusCode) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  });
  response.end();
}

async function readJson(request) {
  const chunks = [];
  let receivedBytes = 0;

  for await (const chunk of request) {
    receivedBytes += chunk.length;

    if (receivedBytes > 1_000_000) {
      throw new Error("Request body is too large");
    }

    chunks.push(chunk);
  }

  const body = Buffer.concat(chunks).toString("utf8");
  return JSON.parse(body);
}

function validateCreateTask(payload) {
  const errors = {};

  if (typeof payload?.title !== "string" || payload.title.trim() === "") {
    errors.title = "Title is required";
  }

  if (
    typeof payload?.description !== "string" ||
    payload.description.trim() === ""
  ) {
    errors.description = "Description is required";
  }

  if (!allowedStatuses.has(payload?.status)) {
    errors.status = "Status must be planned, in-progress or done";
  }

  if (!allowedPriorities.has(payload?.priority)) {
    errors.priority = "Priority must be low, medium or high";
  }

  return errors;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host}`);

  if (request.method === "OPTIONS") {
    sendEmpty(response, 204);
    return;
  }

  await wait(delayMs);

  if (request.method === "GET" && url.pathname === "/tasks") {
    sendJson(response, 200, tasks);
    return;
  }

  const taskMatch = url.pathname.match(/^\/tasks\/([^/]+)$/);

  if (request.method === "GET" && taskMatch) {
    const id = decodeURIComponent(taskMatch[1]);
    const task = tasks.find((item) => item.id === id);

    if (!task) {
      sendJson(response, 404, { message: "Task not found" });
      return;
    }

    sendJson(response, 200, task);
    return;
  }

  if (request.method === "POST" && url.pathname === "/tasks") {
    let payload;

    try {
      payload = await readJson(request);
    } catch {
      sendJson(response, 400, { message: "Request body must be valid JSON" });
      return;
    }

    const errors = validateCreateTask(payload);

    if (Object.keys(errors).length > 0) {
      sendJson(response, 400, {
        message: "Task validation failed",
        errors,
      });
      return;
    }

    if (failNextTaskCreation) {
      failNextTaskCreation = false;
      sendJson(response, 500, { message: "Simulated task creation failure" });
      return;
    }

    const task = {
      id: randomUUID(),
      title: payload.title.trim(),
      description: payload.description.trim(),
      status: payload.status,
      priority: payload.priority,
      createdAt: new Date().toISOString(),
    };

    tasks = [...tasks, task];
    sendJson(response, 201, task);
    return;
  }

  if (request.method === "POST" && url.pathname === "/__test/reset") {
    tasks = structuredClone(seedTasks);
    failNextTaskCreation = false;
    sendJson(response, 200, tasks);
    return;
  }

  if (request.method === "POST" && url.pathname === "/__test/fail-next") {
    failNextTaskCreation = true;
    sendJson(response, 200, { failNextTaskCreation });
    return;
  }

  sendJson(response, 404, { message: "Route not found" });
});

server.on("error", (error) => {
  console.error(`Mock API failed: ${error.message}`);
  process.exitCode = 1;
});

server.listen(port, () => {
  console.log(`Mock API is running at http://localhost:${port}`);
  console.log(`Response delay: ${delayMs} ms`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
