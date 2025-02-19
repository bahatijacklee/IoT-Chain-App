import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
    </div>
  );
};

export default LandingPage;
