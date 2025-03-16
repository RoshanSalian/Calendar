export interface DayData{
    date: string, 
    goals?: string[],
    log?: string[],
}

export interface CalendarData{
    [data: string]: DayData
}
