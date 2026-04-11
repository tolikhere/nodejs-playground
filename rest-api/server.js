import http from "node:http";
import { getDataFromDB } from "./database/db.js";
import { sendJSON } from "./utils/sendJSON.js";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB();
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
  const segments = pathname.split("/").filter(Boolean);

  if (req.method === "GET" && req.url === "/api") {
    sendJSON(res, 200, destinations);
  } else if (req.method === "GET" && req.url.startsWith("/api/continent")) {
    const continent = segments.pop().toLowerCase();
    sendJSON(
      res,
      200,
      destinations.filter(
        (destination) => destination.continent.toLowerCase() === continent,
      ),
    );
  } else if (req.method === "GET" && req.url.startsWith("/api/country")) {
    const country = segments.pop().toLowerCase();
    sendJSON(
      res,
      200,
      destinations.filter(
        (destination) => destination.country.toLowerCase() === country,
      ),
    );
  } else {
    sendJSON(res, 404, {
      error: "not found",
      message: "The requested route does not exist",
    });
  }
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
