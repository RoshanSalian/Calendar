"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DayData, CalendarData } from "@/types/day";
import { saveDayData, getDayData } from "@/lib/storage";
import { FaArrowsAlt, FaCheck, FaEdit, FaTrash } from "react-icons/fa"

const CustomCalender = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const [dayData, setDayData] = React.useState<DayData | undefined>(undefined);
    const [goalInput, setGoalInput] = React.useState("");
    const [logInput, setLogInput] = React.useState("");

    const today = format(new Date(), "yyyy-MM-dd");

    const handleSelect = (selectedDate: Date | undefined) => {
        
        if (selectedDate) {
            const formattedDate = format(selectedDate, "yyyy-MM-dd")
            setDate(selectedDate)
            setDayData(getDayData(formattedDate))
            setIsDialogOpen(true)
        }
    };

    const addGoal = () => {
        if (!date || !goalInput) return;
        const formattedDate = format(date, "yyyy-MM-dd")
        const newGoals = [...(dayData?.goals || []), goalInput]
        const updatedData: DayData = {date: formattedDate, goals: newGoals, log: dayData?.log}
        setDayData(updatedData);
        saveDayData(updatedData);
        setGoalInput("");
    }

    const addLog = () => {
        if(!date || !logInput) return;
        const formattedDate = format(date, "yyyy-MM-dd")
        const newLogs = [...(dayData?.log || []), logInput]
        const updatedData: DayData = {date: formattedDate, goals: dayData?.goals, log: newLogs}
        setDayData(updatedData);
        saveDayData(updatedData);
        setLogInput("");
    }

    const handleDeleteGoal = (index: number) => {
        if (!date) return;
        const newGoals = dayData?.goals.filter((_, i) => i !== index) || [];
        const updatedData: DayData = { ...dayData, goals: newGoals };
        setDayData(updatedData);
        saveDayData(updatedData);
    }

    const handleMoveGoal = (index: number ) => {
      // To implement
    }
 
    const isPast = date && format(date, "yyyy-MM-dd") < today;
    const isPresent = date && format(date, "yyyy-MM-dd") === today;
    const isFuture = date && format(date, "yyyy-MM-dd") > today;

  return (
    <>
        <Calendar 
            mode='single' 
            selected={date} 
            onSelect={handleSelect} 
            className='rounded-md border shadow' 
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{date ? format(date, "PPPP") : "No Date"}</DialogTitle>
                </DialogHeader>
                <div className='py-4'>
                  {dayData?.goals && dayData.goals.length > 0 ? (
                    <ul className="list-disc ml-4">
                      {dayData.goals.map((goal, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <span>{goal}</span>
                          <div className="flex space-x-2">
                            <FaCheck className="cursor-pointer text-black-100" title="Done" />
                            <FaTrash className="cursor-pointer text-black-500" title="Delete" onClick={() => handleDeleteGoal(index)} />
                            <FaArrowsAlt className="cursor-pointer text-black-500" title="Move" onClick={() => handleMoveGoal(index)} />
                          </div> 
                        </li>
                      ))}
                    </ul>
                    ) : isFuture ? (
                      <p>No goals set yet.</p>
                    ) : (
                      <p>No goals recorded.</p>
                    )}

            {isFuture && (
              <div className="mt-4">
                <Input
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  placeholder="Add a goal"
                  className="mb-2"
                />
                <Button onClick={addGoal}>Add Goal</Button>
              </div>
            )}

            {/* Present: Log What I Did */}
            {isPresent && (
              <div className="mt-4">
                <Input
                  value={logInput}
                  onChange={(e) => setLogInput(e.target.value)}
                  placeholder="What did you do today?"
                  className="mb-2"
                />
                <Button onClick={addLog}>Log Today</Button>
              </div>
            )}

            {/* Show Log if Exists */}
            {dayData?.log && (
              // <p className="mt-4">Today’s Log: {dayData.log}</p>
              <div className="mt-4">
                <p className="font-bold"> Today's log: </p>
                {
                  dayData.log.map((log, index) => (
                    <p key={index} className="mt-0 flex justify-between items-center">
                      {log}
                      <FaEdit className="cursor-pointer text-black-500" title="Edit" />
                    </p>
                  ))
                }
              </div>
            )}
                </div>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default CustomCalender