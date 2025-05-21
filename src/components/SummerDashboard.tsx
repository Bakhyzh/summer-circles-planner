
import { useState, useEffect } from "react";
import DayCircle from "@/components/DayCircle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DayData {
  day: number;
  content: string;
}

const SummerDashboard = () => {
  const [summerDays, setSummerDays] = useState<DayData[]>([]);
  
  useEffect(() => {
    // Load saved data from localStorage
    const savedDays = localStorage.getItem("summer-days");
    if (savedDays) {
      setSummerDays(JSON.parse(savedDays));
    } else {
      // Initialize with empty data for 90 days
      const initialDays = Array.from({ length: 90 }, (_, i) => ({
        day: i + 1,
        content: ""
      }));
      setSummerDays(initialDays);
    }
  }, []);

  const saveContent = (day: number, content: string) => {
    const updatedDays = summerDays.map(dayData => 
      dayData.day === day ? { ...dayData, content } : dayData
    );
    
    setSummerDays(updatedDays);
    localStorage.setItem("summer-days", JSON.stringify(updatedDays));
  };

  const completedDays = summerDays.filter(day => day.content.trim() !== "").length;
  const progressPercentage = (completedDays / 90) * 100;

  return (
    <div className="summer-container py-8">
      <Card className="summer-card mb-8 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-xl text-summer-text">Your Summer Journey</CardTitle>
          <CardDescription>
            Track your plans and memories for the 90 days of summer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="h-2 w-full bg-summer-secondary/30 rounded-full">
                <div 
                  className="h-2 bg-summer-gradient rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="text-sm font-medium text-summer-text">
              {completedDays} / 90 Days
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 xl:grid-cols-10 gap-4 animate-fade-in">
        {summerDays.map((dayData) => (
          <div key={dayData.day} className="flex justify-center">
            <DayCircle 
              day={dayData.day} 
              hasContent={dayData.content.trim() !== ""} 
              content={dayData.content}
              onContentSave={saveContent}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummerDashboard;
