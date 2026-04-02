import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VerseOfDay from "@/components/VerseOfDay";
import ThemeSuggestions from "@/components/ThemeSuggestions";
import ReadingPlans from "@/components/ReadingPlans";
import DailyProgress from "@/components/DailyProgress";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <VerseOfDay />
        <ThemeSuggestions />
        <ReadingPlans />
        <DailyProgress />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
