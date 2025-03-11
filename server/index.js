const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");

const PROTO_PATH = "./auth.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const authProto = grpc.loadPackageDefinition(packageDefinition).AuthService;

const mongoUrl = "mongodb://localhost:27017";
const dbName = "mern_auth";
let db;

MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error(err));

const server = new grpc.Server();

server.addService(authProto.service, {
  Login: async (call, callback) => {
    const { email, password } = call.request;
    const user = await db.collection("users").findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return callback(null, { message: "Invalid credentials", token: "" });
    }

    const token = jwt.sign({ userId: user._id }, "secretkey", {
      expiresIn: "1h",
    });
    callback(null, { message: "Login successful", token });
  },

  Register: async (call, callback) => {
    const { name, email, password } = call.request;
    const hashedPassword = bcrypt.hashSync(password, 10);

    await db
      .collection("users")
      .insertOne({ name, email, password: hashedPassword });
    callback(null, { message: "User registered successfully" });
  },
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("gRPC server running on port 50051");
    server.start();
  }
);
