
import { useState, useEffect } from "react";
import SummerHeader from "@/components/SummerHeader";
import SummerDashboard from "@/components/SummerDashboard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem("summer-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);
  
  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };
  
  if (!user) {
    return null; // or a loading spinner
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <SummerHeader 
        userName={user.name} 
        userEmail={user.email} 
        onLogout={handleLogout} 
      />
      <main className="flex-1 bg-summer-light summer-bg-pattern">
        <SummerDashboard />
      </main>
    </div>
  );
};

export default Dashboard;
