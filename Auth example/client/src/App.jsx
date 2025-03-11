import Login from "./Login.jsx";

//  height: "100%" on the <div> will only work if its parent (html, body, #root) has a defined height.

function App() {
  return (
    <div
      style={{
        backgroundColor: "grey",
        color: "white",
        padding: "10px",
        height: "100vh",
        width: "100vw", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Login />
    </div>
  );
}

export default App;
