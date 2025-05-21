
import { Button } from "@/components/ui/button";

interface WelcomeHeroProps {
  onGetStarted: () => void;
}

const WelcomeHero = ({ onGetStarted }: WelcomeHeroProps) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center">
      <div className="absolute inset-0 bg-summer-light summer-bg-pattern -z-10"></div>
      
      <div className="summer-container text-center space-y-8 py-20 animate-fade-in">
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-summer-text leading-tight">
            Create Your Perfect <span className="text-summer-accent">Summer</span>
          </h1>
          <p className="text-xl text-summer-text/80 max-w-2xl mx-auto">
            Plan and track every moment of your 90 days of summer adventure. Create memories, accomplish goals, and make this summer unforgettable.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button 
            className="summer-button summer-button-primary text-lg px-8 py-6"
            onClick={onGetStarted}
          >
            Get Started
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          <div className="summer-card">
            <h3 className="text-lg font-semibold text-summer-text mb-2">Track 90 Days</h3>
            <p className="text-summer-text/70">Plan and organize each day of your summer with custom notes and plans.</p>
          </div>
          
          <div className="summer-card">
            <h3 className="text-lg font-semibold text-summer-text mb-2">Save Your Memories</h3>
            <p className="text-summer-text/70">All your summer plans are safely stored and easily accessible anytime.</p>
          </div>
          
          <div className="summer-card">
            <h3 className="text-lg font-semibold text-summer-text mb-2">Beautiful Experience</h3>
            <p className="text-summer-text/70">Enjoy a visually stunning and intuitive interface that makes planning fun.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;
