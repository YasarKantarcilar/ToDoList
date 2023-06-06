import { Route, Routes } from "react-router-dom";

import Login from "./Components/Login";
import Main from "./Components/Main";
import Register from "./Components/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
