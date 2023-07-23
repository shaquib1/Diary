import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { Blogs, Login, Register } from "./pages";

function App() {
  return (
    <Routes>
      <Header />
      <Route path="/" element={<Blogs />} />
      <Route path="/" element={<Login />} />
      <Route path="/" element={<Register />} />
    </Routes>
  );
}

export default App;
