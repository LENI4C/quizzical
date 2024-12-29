import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import Home from "./Home.jsx";
import Quiz from "./pages/Quiz.jsx";
import NotFound from "./pages/NotFound.jsx";


createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);
