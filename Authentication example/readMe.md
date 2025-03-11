# Authentication Example

Example of how to use **gRPC in the backend (server-side only)** while exposing a **REST API for the React frontend to call**. This setup is ideal for authentication, avoiding direct gRPC usage in React.

## 🛠 Tech Stack

- **gRPC Server** (Handles authentication logic)
- **Express REST API** (Calls gRPC service and exposes endpoints to React)
- **React Frontend** (Calls REST API, no gRPC dependency)

#### 📌 Step 1: Define the gRPC Service (auth.proto)

#### 📌 Step 2: Create the gRPC Server (grpcServer.js)

`gRPC server implements the authentication logic.`

#### 📌 Step 3: Create the Express API (restServer.js)

`This REST API acts as a bridge between React and gRPC.`

#### 📌 Step 4: Call the REST API from React

#### 📌 Step 5: Run the Servers

Start the gRPC Server

```sh
node grpcServer.js
```

Start the Express API

```sh
node restServer.js
```

Run React App

```sh
npm run dev
```

### 📌 How This Works

***✔ React (Frontend) →*** Calls REST API (`/login`)
***✔ Express API (Backend) →*** Calls gRPC Server (`Login`)
***✔ gRPC Server →*** Returns authentication result

### 🚀 Why This is the Best Approach?
✅ **No gRPC in React →** Avoids browser compatibility issues
✅ **REST API for Frontend →** Works with any client (React, mobile, etc.)
✅ **gRPC for Backend →** Enables efficient microservices communication

# 🚀