import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSON } from "./utils/sendJSON.js";
import { filterByUrlSlug } from "./utils/filterByUrlSlug.js";
import { filterByQueryParams } from "./utils/filterByQueryParams.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  try {
    // Guard for non-API routes
    if (!req.url.startsWith("/api")) {
      return sendJSON(res, 404, {
        error: "not found",
        message: "The requested route does not exist",
      });
    }

    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const { pathname } = urlObj;
    const queryObj = Object.fromEntries(urlObj.searchParams);
    
    // Routing logic
    if (req.method === "GET" && pathname === "/api") {
      const destinations = await getDataFromDB();
      return sendJSON(res, 200, filterByQueryParams(destinations, queryObj));
    }

    if (req.method === "GET" && pathname.startsWith("/api/continent/")) {
      const destinations = await getDataFromDB();
      return sendJSON(
        res,
        200,
        filterByUrlSlug(destinations, "continent", pathname),
      );
    }

    if (req.method === "GET" && pathname.startsWith("/api/country/")) {
      const destinations = await getDataFromDB();
      return sendJSON(
        res,
        200,
        filterByUrlSlug(destinations, "country", pathname),
      );
    }

    // Fallback 404
    return sendJSON(res, 404, {
      error: "not found",
      message: "The requested route does not exist",
    });
  } catch (error) {
    console.error("Server Error:", error);
    return sendJSON(res, 500, {
      error: "internal server error",
      message: "Something went wrong on our end",
    });
  }
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
