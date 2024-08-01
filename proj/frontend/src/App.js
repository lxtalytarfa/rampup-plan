import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/Login";
import Main from "./features/Main";
import RequireAuth from "./features/requireAuth";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />

        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="main" element={<Main />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
