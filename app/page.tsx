import CustomCalender from "@/components/Calender";
import Image from "next/image";

export default function Home() {
  return (
    <>
      Starter

      <div className="flex justify-center items-center mt-20 bg-gray-100">
        <CustomCalender />
      </div>
      
    </>
  );
}
