// Shared McpServer factory used by both the stdio (src/server.js) and
// HTTP (src/http.js) entry points.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ALL_TOOLS } from "./tools.js";

export function createServer() {
  const server = new McpServer(
    { name: "1518-naming", version: "0.1.0" },
    { capabilities: { tools: {} } }
  );
  for (const tool of ALL_TOOLS) {
    server.registerTool(
      tool.name,
      { title: tool.title, description: tool.description, inputSchema: tool.inputSchema },
      async (args) => {
        try {
          const result = await tool.handler(args ?? {});
          return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
        } catch (err) {
          return { content: [{ type: "text", text: `错误：${err.message}` }], isError: true };
        }
      }
    );
  }
  return server;
}

export const TOOL_COUNT = ALL_TOOLS.length;
