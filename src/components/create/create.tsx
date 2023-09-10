"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";

const DateSection = () => {
  let now: Date = new Date();
  let tmr: Date = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    now = new Date();
    setSelectedDate(now);
    tmr = now;
    tmr.setDate(now.getDate() + 1);
  }, []);

  return (
    <div className="">
      <FullCalendar
        height={"30vh"}
        headerToolbar={{
          left: "",
          center: "title",
          right: "today prev,next",
        }}
        plugins={[dayGridPlugin, interactionPlugin]}
        events={[
          { title: "作成日時", start: new Date(selectedDate.toDateString()) },
        ]}
        eventContent={() => {
          return (
            <div>
              <p className="text-md m-auto">選択中</p>
            </div>
          );
        }}
        eventBackgroundColor="bg-slate-300"
        locale="ja"
        initialView="dayGridTwoWeek"
        initialDate={now}
        dateClick={({ date }) => {
          setSelectedDate(date);
        }}
        views={{
          dayGridTwoWeek: {
            type: "dayGrid",
            duration: { weeks: 2 },
          },
        }}
      />
    </div>
  );
};

export const CreateViary = () => {
  return (
    <div className="w-4/5 m-auto p-2">
      <p className="font-medium">日付</p>
      <DateSection></DateSection>
    </div>
  );
};
