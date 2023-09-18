"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useSpeechRecognition } from "react-speech-recognition";
import { IcOutlineMic, IcOutlineMicOff } from "../icons";

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

const SpeechButton = (props: { isSpeeching: boolean; onClick: () => void }) => {
  const { isSpeeching, onClick } = props;
  if (!isSpeeching) {
    return (
      <button
        className="px-4 py-2 bg-primary-400 hover:scale-105 text-white rounded-full flex flex-row items-center"
        onClick={onClick}
      >
        <p className="px-1">停止中</p>
        <IcOutlineMicOff />
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-primary-400 hover:scale-105 text-white rounded-full flex flex-row items-center"
    >
      <p className="px-1">録音中</p>
      <IcOutlineMic />
    </button>
  );
};

export const SpeechSection = () => {
  const [isMicActive, setIsMicActive] = useState(false);
  const recognition = useSpeechRecognition();

  useEffect(() => {
    recognition.listening = isMicActive;
  }, [isMicActive]);

  return (
    <div>
      <SpeechButton
        isSpeeching={isMicActive}
        onClick={() => {
          setIsMicActive(!isMicActive);
        }}
      ></SpeechButton>
    </div>
  );
};

export const CreateViary = () => {
  return (
    <div className="w-4/5 m-auto p-2">
      <p className="font-medium">日付</p>
      <div className="p-2">
        <DateSection></DateSection>
      </div>
      <p className="font-medium">入力</p>
      <div className="p-2">
        <SpeechSection></SpeechSection>
      </div>
    </div>
  );
};
