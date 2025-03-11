const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load gRPC proto file
const packageDefinition = protoLoader.loadSync("auth.proto");
const authProto = grpc.loadPackageDefinition(packageDefinition).AuthService;

// Hardcoded users for demonstration (use a database in production)
const users = [
  { email: "test@example.com", password: "password123" },
  { email: "user@demo.com", password: "demoPass" },
];

// gRPC Authentication Logic
const login = (call, callback) => {
  const { email, password } = call.request;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    callback(null, { success: true, message: "Login successful!" });
  } else {
    callback(null, { success: false, message: "Invalid credentials." });
  }
};

// Start gRPC Server
const server = new grpc.Server();
server.addService(authProto.service, { Login: login });

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("✅ gRPC Server running on port 50051");
    server.start();
  }
);
