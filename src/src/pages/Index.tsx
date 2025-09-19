import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Music from "@/components/Music";
import LivePerformances from "@/components/LivePerformances";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Music />
      <LivePerformances />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
