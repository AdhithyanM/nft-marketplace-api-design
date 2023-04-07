const fs = require("fs");
const express = require("express");
const { log } = require("console");

const app = express();
app.use(express.json());

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

// GET REQUEST
const nfts = JSON.parse(
  fs.readFileSync(`${__dirname}/nft-data/data/nft-simple.json`)
);

app.get("/api/v1/nfts", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      entities: nfts,
      total: nfts.length,
    },
  });
});

// POST METHOD
app.post("/api/v1/nfts", (req, res) => {
  // console.log(req.body);

  const newId = nfts[nfts.length - 1].id + 1;
  const newNFT = Object.assign({ id: newId }, req.body);

  nfts.push(newNFT);

  return fs.writeFile(
    `${__dirname}/nft-data/data/nft-simple.json`,
    JSON.stringify(nfts),
    (err) => {
      res.status(201).json({
        status: "success",
        message: "NFT created successfully",
        data: newNFT,
      });
    }
  );
});

// GET SINGLE NFT
app.get("/api/v1/nfts/:id", (req, res) => {
  const id = req.params.id * 1;
  const nft = nfts.find((el) => el.id === id);

  if (!nft) {
    return res.status(404).json({
      status: "failed",
      message: "NFT not found",
    });
  }

  console.log(nft);

  res.status(200).json({
    status: "success",
    data: {
      nft: nft,
    },
  });
});

// PATCH METHOD
app.patch("/api/v1/nfts/:id", (req, res) => {
  const id = req.params.id * 1;
  const nft = nfts.find((el) => el.id === id);

  if (!nft) {
    return res.status(404).json({
      status: "failed",
      message: "NFT not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "NFT updated successfully",
    data: {
      nft: nft,
    },
  });
});

// DELETE METHOD
app.delete("/api/v1/nfts/:id", (req, res) => {
  const id = req.params.id * 1;
  const nft = nfts.find((el) => el.id === id);

  if (!nft) {
    return res.status(404).json({
      status: "failed",
      message: "NFT not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "NFT deleted successfully",
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
