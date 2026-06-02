#!/usr/bin/env node
// 1518 起名网 MCP server — stdio entry (for Claude Desktop / Claude Code / local agents).
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer, TOOL_COUNT } from "./build-server.js";

const server = createServer();
await server.connect(new StdioServerTransport());
// stdout is reserved for the JSON-RPC stream; logs go to stderr.
console.error(`[1518-mcp] ready — ${TOOL_COUNT} tools over stdio`);
