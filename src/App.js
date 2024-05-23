import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Blog from "./pages/Blog";
import SinglePost from "./pages/SinglePost";
import Error from "./pages/Error";
import Allblogs from "./pages/Allblogs";

function App() {
  return (
    <div className="h-screen">
      <div className="max-w-screen-xl w-[90%] mx-auto">
        <Routes>
          <Route path="/blog/:slug" element={<SinglePost />} />
          <Route path="/" element={<Blog />} />
          <Route path="/allblogs" element={<Allblogs />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
