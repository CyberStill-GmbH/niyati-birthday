import { useRef } from "react";
import { HeroSection } from "./components/HeroSection";
import { Timeline } from "./components/Timeline";
import { PhotoGallery } from "./components/PhotoGallery";
import { GameSection } from "./components/GameSection";
import { Footer } from "./components/Footer";

export default function App() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <HeroSection onStartAdventure={scrollToTimeline} />
      <div ref={timelineRef}>
        <Timeline />
      </div>
      <PhotoGallery />
      <GameSection />
      <Footer />
    </div>
  );
}
