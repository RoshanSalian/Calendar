import { DayData } from "@/lib/storage";
export function saveDayData(data: DayData){
    const store = JSON.parse(localStorage.getItem('calendarData') || '{}')
    store[data.date] = data;
    localStorage.setItem("calendarData", JSON.stringify(store));
}

export function getDayData(date: string): DayData | undefined{
    const store = JSON.parse(localStorage.getItem('calendarData') || '{}')
    return store[date];
}