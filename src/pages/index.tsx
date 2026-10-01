import kingChessImg from "../assets/king.chess.png";
import NavBar from "../components/layout/NavBar";
import HeroSection from "../components/ui/HeroSection";
import Footer from "../components/layout/Footer";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d0f]">
      <NavBar />
      <main className="flex-1">
        <HeroSection kingImageSrc={kingChessImg} />
      </main>
      <Footer />
    </div>
  );
}