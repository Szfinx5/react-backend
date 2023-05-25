import express from "express";
const app = express();
const PORT = process.env.port || 3000;

import explorerRouter from "./explorer.js";

app.use(express.json());

app.use("/explorer", explorerRouter);

app.get("/", function (req, res) {
  res.json({
    success: true,
    message: "Test route up and running!",
  });
});

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});
