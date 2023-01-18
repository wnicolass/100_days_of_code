const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.listen(3000, () => console.log("App listening on port 3000"));

// const server = http.createServer((req, res) => {
//   if (req.url === "/currentime") {
//     res
//       .writeHead(200, { "Content-Type": "text/html" })
//       .end(`<h1>${new Date().toISOString()}</h1>`);
//   } else if (req.url === "/") {
//     res
//       .writeHead(200, { "Content-Type": "text/html" })
//       .end("<h1>Hello World!</h1>");
//   }

//   //   res.statusCode = 200;
//   //   res.end("<h1>Hello World!</h1>");
// });

// server.listen(3000);
