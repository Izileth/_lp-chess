import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCursor from "./components/ui/CustomCursor";
import Index from "./pages/index";
import Learn from "./pages/learn";
import ChessTactics from "./pages/tecnics";

export default function App() {
  return (
    <BrowserRouter>
      {/* Global cursor overlay — rendered once above all pages */}
      <CustomCursor />

      {/* Full-screen page transition overlay — must be above page content */}
      <div
        id="page-transition-overlay"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9990] hidden"
        style={{ backgroundColor: "#17171a" }}
      />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/aprenda" element={<Learn />} />
        <Route path="/taticas" element={<ChessTactics />} />
      </Routes>
    </BrowserRouter>
  );
}