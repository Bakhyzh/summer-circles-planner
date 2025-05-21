
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SummerHeaderProps {
  userName: string;
  userEmail: string;
  onLogout: () => void;
}

const SummerHeader = ({ userName, userEmail, onLogout }: SummerHeaderProps) => {
  const [daysLeft, setDaysLeft] = useState(90);
  const { toast } = useToast();

  useEffect(() => {
    // This would be custom logic to calculate days left in summer
    // For demo purposes, we'll just set a random number between 40-90
    const randomDaysLeft = Math.floor(Math.random() * 50) + 40;
    setDaysLeft(randomDaysLeft);
  }, []);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    onLogout();
    localStorage.removeItem("summer-user");
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-summer-secondary/20 py-4">
      <div className="summer-container flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-summer-gradient flex items-center justify-center text-white font-bold mr-3">
            90
          </div>
          <h1 className="text-xl font-bold text-summer-text">
            90 Days of Summer
            <span className="ml-2 text-sm font-normal text-summer-primary">
              {daysLeft} days left
            </span>
          </h1>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative rounded-full h-10 w-10">
              <Avatar>
                <AvatarFallback className="bg-summer-primary text-white">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <div className="flex flex-col">
                <span>{userName}</span>
                <span className="text-xs text-muted-foreground">{userEmail}</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
              <LogOut className="h-4 w-4 mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default SummerHeader;
