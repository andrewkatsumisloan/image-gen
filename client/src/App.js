import Header from "./components/Header";
import TextCompleteEntry from "./components/TextCompleteEntry";
import ImageGen from "./components/ImageGen";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="h-screen text-center">
      <Header />
      <Routes>
        <Route path="/" element={<ImageGen />} />
        <Route path="/textgen" element={<TextCompleteEntry />} />
      </Routes>
    </div>
  );
}

export default App;
