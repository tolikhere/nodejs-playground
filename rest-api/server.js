import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSON } from "./utils/sendJSON.js";
import { filterByUrlSlug } from "./utils/filterByUrlSlug.js";
import { filterByQueryParams } from "./utils/filterByQueryParams.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith("/api")) {
    return sendJSON(res, 404, {
      error: "not found",
      message: "The requested route does not exist",
    });
  }

  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = urlObj;
  const queryObj = Object.fromEntries(urlObj.searchParams);

  if (req.method === "GET" && pathname === "/api") {
    const destinations = await getDataFromDB();
    return sendJSON(res, 200, filterByQueryParams(destinations, queryObj));
  } else if (req.method === "GET" && pathname.startsWith("/api/continent/")) {
    const destinations = await getDataFromDB();
    return sendJSON(res, 200, filterByUrlSlug(destinations, "continent", pathname));
  } else if (req.method === "GET" && pathname.startsWith("/api/country/")) {
    const destinations = await getDataFromDB();
    return sendJSON(res, 200, filterByUrlSlug(destinations, "country", pathname));
  }

  return sendJSON(res, 404, {
    error: "not found",
    message: "The requested route does not exist",
  });
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
