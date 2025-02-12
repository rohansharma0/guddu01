import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Sentiment from "./pages/Sentiment";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sentiment/:stockCode" element={<Sentiment />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
