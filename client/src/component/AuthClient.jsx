import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const PROTO_PATH = "./auth.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const authProto = grpc.loadPackageDefinition(packageDefinition).AuthService;

const client = new authProto(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

export const loginUser = (email, password, callback) => {
  client.Login({ email, password }, (error, response) => {
    if (error) {
      console.error("Login Error:", error);
      callback(error, null);
    } else {
      callback(null, response);
    }
  });
};

export const registerUser = (name, email, password, callback) => {
  client.Register({ name, email, password }, (error, response) => {
    if (error) {
      console.error("Register Error:", error);
      callback(error, null);
    } else {
      callback(null, response);
    }
  });
};
