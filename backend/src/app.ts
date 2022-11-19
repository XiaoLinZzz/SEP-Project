import Express from "express";

import configureExpress from "./config/express";
import config from "./config/environment";

const express = Express();
const app = configureExpress(express);

const port = config.PORT;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
