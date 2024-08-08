import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/Login";
import Logout from "./features/Logout";
import Main from "./features/Main";
import RequireAuth from "./features/requireAuth";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route index element={<Main />} />
          <Route path="main" element={<Main />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
