#!/usr/bin/env node
// 1518 起名网 MCP server — HTTP entry (Streamable HTTP, stateless).
// This is the deployable implementation of /.well-known/mcp.json's
// recommendedEndpoint "https://www.1518.com/mcp". Run behind any host/CDN.
//
//   PORT=8787 node src/http.js   ->   POST http://localhost:8787/mcp
import http from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer, TOOL_COUNT } from "./build-server.js";

const PORT = Number(process.env.PORT || 8787);
const ENDPOINT = process.env.MCP_PATH || "/mcp";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Mcp-Session-Id, Last-Event-ID");
  res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve(undefined);
      try { resolve(JSON.parse(raw)); } catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

const httpServer = http.createServer(async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") { res.writeHead(204).end(); return; }

  const path = (req.url || "/").split("?")[0];
  if (path === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", tools: TOOL_COUNT }));
    return;
  }
  if (path !== ENDPOINT) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: `not found; MCP endpoint is ${ENDPOINT}` }));
    return;
  }

  // Stateless: a fresh server+transport per request (no cross-request session state).
  try {
    const body = req.method === "POST" ? await readBody(req) : undefined;
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    const server = createServer();
    res.on("close", () => { transport.close(); server.close(); });
    await server.connect(transport);
    await transport.handleRequest(req, res, body);
  } catch (err) {
    if (!res.headersSent) res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ jsonrpc: "2.0", error: { code: -32700, message: String(err.message || err) }, id: null }));
  }
});

httpServer.listen(PORT, () => {
  console.error(`[1518-mcp] HTTP ready — ${TOOL_COUNT} tools at http://localhost:${PORT}${ENDPOINT}`);
});
