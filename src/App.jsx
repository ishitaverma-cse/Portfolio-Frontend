import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;