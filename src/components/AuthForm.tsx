
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { User, LogIn } from "lucide-react";

type AuthMode = "login" | "register";

interface AuthProps {
  onAuthSuccess: (userData: { email: string; name: string }) => void;
}

const AuthForm = ({ onAuthSuccess }: AuthProps) => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // This is a mock authentication
    // In a real app, we would connect to Supabase here
    setTimeout(() => {
      setIsLoading(false);
      
      if (authMode === "register") {
        toast({
          title: "Account created!",
          description: "Welcome to 90 Days of Summer!",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
      }
      
      // Mock authentication success
      onAuthSuccess({ email, name: name || email.split('@')[0] });
      
      // In localStorage we'd save a token in a real app
      localStorage.setItem("summer-user", JSON.stringify({ 
        email, 
        name: name || email.split('@')[0] 
      }));
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-bold text-summer-text">
          {authMode === "login" ? "Welcome Back" : "Join the Summer Adventure"}
        </CardTitle>
        <CardDescription className="text-center">
          {authMode === "login" 
            ? "Sign in to access your summer plans" 
            : "Create an account to track your 90 days of summer"}
        </CardDescription>
      </CardHeader>
      <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as AuthMode)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleAuth}>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="summer-input"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="summer-input"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="summer-button summer-button-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form onSubmit={handleAuth}>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Input
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="summer-input"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="summer-input"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="summer-input"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="summer-button summer-button-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
                <User className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
