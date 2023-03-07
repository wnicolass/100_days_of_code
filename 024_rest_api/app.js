const express = require("express");
const app = express();

const routes = require("./routes");

app.use(express.json());
app.use(routes);

const port = 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
