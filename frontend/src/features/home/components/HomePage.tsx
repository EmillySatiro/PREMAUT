import Navbar from "./Navbar";
import HeroCarousel from "./HeroCarousel";
import SomosSection from "./SomosSection";
import FazermosSection from "./FazermosSection";
import MateriaisSection from "./MateriaisSection";
import Footer from "./Footer";
import "./HomePage.css";

interface HomePageProps {
  onViewMaterials?: () => void;
  onViewPublicacoes?: () => void;
}

export default function HomePage({ onViewMaterials, onViewPublicacoes }: HomePageProps) {
  return (
    <div className="home-page">
      <Navbar />
      <HeroCarousel />
      <SomosSection />
      <FazermosSection />
      <MateriaisSection onViewMaterials={onViewMaterials} onViewPublicacoes={onViewPublicacoes} />
      <Footer />
    </div>
  );
}
