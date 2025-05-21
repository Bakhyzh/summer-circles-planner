
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface DayCircleProps {
  day: number;
  hasContent: boolean;
  content: string;
  onContentSave: (day: number, content: string) => void;
}

const DayCircle = ({ day, hasContent, content, onContentSave }: DayCircleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dayContent, setDayContent] = useState(content);
  const { toast } = useToast();

  const handleSave = () => {
    onContentSave(day, dayContent);
    setIsOpen(false);
    toast({
      title: "Day updated!",
      description: `Your plans for day ${day} have been saved.`,
    });
  };

  return (
    <>
      <div
        className={`summer-day-circle ${hasContent ? "summer-day-circle-filled" : "summer-day-circle-empty"}`}
        onClick={() => setIsOpen(true)}
        title={`Day ${day}`}
      >
        {day}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-summer-text">Day {day} of Summer</DialogTitle>
            <DialogDescription>
              What are your plans for this day? Add notes, activities, or memories.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Textarea
              value={dayContent}
              onChange={(e) => setDayContent(e.target.value)}
              placeholder="E.g., Beach day with friends, visit the botanical garden, try the new ice cream shop..."
              className="min-h-[150px]"
            />
          </div>
          <DialogFooter>
            <Button className="summer-button summer-button-secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button className="summer-button summer-button-primary" onClick={handleSave}>
              Save Plans
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DayCircle;
