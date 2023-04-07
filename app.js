const express = require("express");

const app = express();

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Hello from nft-marketplace backend API",
//   });
// });

// app.post("/", (req, res) => {
//   res.status(201).json({
//     message: "Your data",
//   });
// });

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
