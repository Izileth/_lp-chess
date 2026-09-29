import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Learn from "./pages/learn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/aprenda" element={<Learn />} />
      </Routes>
    </BrowserRouter>
  )
}