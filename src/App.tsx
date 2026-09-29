import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Learn from "./pages/learn";
import ChessTactics from "./pages/tecnics";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/aprenda" element={<Learn />} />
        <Route path="/taticas" element={<ChessTactics />} />
      </Routes>
    </BrowserRouter>
  )
}