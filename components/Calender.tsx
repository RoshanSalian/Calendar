"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const CustomCalender = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)

    const handleSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate)
        if (selectedDate) {
            setIsDialogOpen(true)
        }
    }
  return (
    <>
        <Calendar mode='single' selected={date} onSelect={handleSelect} className='rounded-md border shadow' />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select Date</DialogTitle>
                </DialogHeader>
                <div className='py-4'>
                    <p>Selected date is {date ? date.toDateString() : 'None'}</p>
                </div>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default CustomCalender