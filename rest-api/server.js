import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSON } from "./utils/sendJSON.js";
import { filterByUrlSlug } from "./utils/filterByUrlSlug.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = urlObj;

  if (req.method === "GET" && pathname === "/api") {
    sendJSON(res, 200, destinations);
  } else if (req.method === "GET" && pathname.startsWith("/api/continent/")) {
    sendJSON(res, 200, filterByUrlSlug(destinations, "continent", pathname));
  } else if (req.method === "GET" && pathname.startsWith("/api/country/")) {
    sendJSON(res, 200, filterByUrlSlug(destinations, "country", pathname));
  } else {
    sendJSON(res, 404, {
      error: "not found",
      message: "The requested route does not exist",
    });
  }
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
