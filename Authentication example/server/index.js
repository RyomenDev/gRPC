const express = require("express");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const cors = require("cors");
const bodyParser = require("body-parser");

// Load gRPC proto file
const packageDefinition = protoLoader.loadSync("auth.proto");
const authProto = grpc.loadPackageDefinition(packageDefinition).AuthService;

// gRPC Client
const client = new authProto(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// REST API Endpoint for Login
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   //   console.log({ email, password });

//   client.Login({ email, password }, (err, response) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.json(response);
//     }
//   });
// });

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("🔹 Sending request to gRPC server:", { email, password });

  client.Login({ email, password }, (err, response) => {
    if (err) {
      console.error("❌ gRPC Login Error:", err);
      res.status(500).json({ error: err.message });
    } else {
      console.log("✅ gRPC Response:", response);
      res.json(response);
    }
  });
});


// Start REST API Server
app.listen(3000, () => {
  console.log("✅ REST API running on port 3000");
});
