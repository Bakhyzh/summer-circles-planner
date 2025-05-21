
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeHero from "@/components/WelcomeHero";
import AuthForm from "@/components/AuthForm";

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("summer-user");
    if (savedUser) {
      navigate("/dashboard");
    }
  }, [navigate]);
  
  const handleGetStarted = () => {
    setShowAuth(true);
    
    // Scroll to auth form
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
      });
    }, 100);
  };
  
  const handleAuthSuccess = (userData: { email: string; name: string }) => {
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen">
      <WelcomeHero onGetStarted={handleGetStarted} />
      
      {showAuth && (
        <div className="py-16 px-4 bg-summer-gradient">
          <AuthForm onAuthSuccess={handleAuthSuccess} />
        </div>
      )}
    </div>
  );
};

export default Index;
