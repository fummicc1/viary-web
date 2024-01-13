"use client";

import React, { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { IcOutlineMic, IcOutlineMicOff } from "../icons";
import { Message, ViaryContent } from "@/models/viary";
import { useForm } from "react-hook-form";
import "./style.css";

const getSpecialDays = () => {
  const now = new Date();
  let lastWeek = new Date(now);
  lastWeek.setDate(now.getDate() - 7);
  let tmr = new Date(now);
  tmr.setDate(now.getDate() + 1);
  return {
    now,
    lastWeek,
    tmr,
  };
};

const DateSection = () => {
  const { now, lastWeek } = getSpecialDays();
  const [selectedDate, setSelectedDate] = useState<Date>(now);

  return (
    <div className="max-w-[60vw] m-auto">
      <FullCalendar
        validRange={(_) => {
          return {
            end: now,
          };
        }}
        height={"40vh"}
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
            <div className="w-full h-full bg-primary-400 text-white text-center p-2 rounded-sm">
              <p className="text-md m-auto">選択中</p>
            </div>
          );
        }}
        locale="ja"
        initialView="dayGridTwoWeek"
        initialDate={lastWeek}
        dateClick={({ date }) => {
          if (date > now) {
            alert("未来の日付は指定できません");
            return;
          }
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

const SpeechButton = (props: { inSpeech: boolean; onClick: () => void }) => {
  const { inSpeech, onClick } = props;
  if (!inSpeech) {
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
  const [availableAudioDevices, setAvailableAudioDevices] = useState<
    MediaDeviceInfo[]
  >([]);
  const speechRecognition = useMemo(() => {
    const grammar =
      "#JSGF V1.0; grammar colors; public <color> = aqua | azure | beige | bisque | black | blue | brown | chocolate | coral | crimson | cyan | fuchsia | ghostwhite | gold | goldenrod | gray | green | indigo | ivory | khaki | lavender | lime | linen | magenta | maroon | moccasin | navy | olive | orange | orchid | peru | pink | plum | purple | red | salmon | sienna | silver | snow | tan | teal | thistle | tomato | turquoise | violet | white | yellow ;";
    const speechRecognition = new webkitSpeechRecognition();
    speechRecognition.grammars.addFromString(grammar, 1);
    speechRecognition.continuous = true;
    speechRecognition.lang = "en-US";
    speechRecognition.interimResults = false;
    speechRecognition.maxAlternatives = 1;
    return speechRecognition;
  }, []);
  const [isMicActive, setIsMicActive] = useState(false);
  const [message, setMessage] = useState<Message>({ content: "" });
  const [messages, setMessages] = useState<Message[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isMicActive) {
      speechRecognition.start();
      speechRecognition.onresult = (e) => {
        const { transcript } = e.results[0][0];
        console.log("transcript", transcript);
      };
    } else {
      speechRecognition.stop();
    }
  }, [isMicActive, speechRecognition]);

  useEffect(() => {
    const handler = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      devices.forEach((_device) => {
        const device: MediaDeviceInfo = {
          deviceId: _device.deviceId === "" ? "deviceId" : _device.deviceId,
          label: _device.label === "" ? "microphone" : _device.label,
          groupId: _device.groupId === "" ? "groupId" : _device.groupId,
          kind: _device.kind,
          toJSON: () => {},
        };
        if (device.kind == "audioinput") {
          let newAvailableAudioDevices = availableAudioDevices;
          if (
            availableAudioDevices
              .map((d) => d.deviceId)
              .includes(device.deviceId)
          ) {
            newAvailableAudioDevices = availableAudioDevices.filter(
              (d) => d.deviceId != device.deviceId
            );
          } else {
            newAvailableAudioDevices.push(device);
          }
          console.log("newAvailableAudioDevices", newAvailableAudioDevices);
          setAvailableAudioDevices(newAvailableAudioDevices);
        }
      });
    };
    setTimeout(handler, 1000);
    navigator.mediaDevices.addEventListener("devicechange", async () => {
      await handler();
    });
  }, [availableAudioDevices]);
  return (
    <div>
      <div className="flex flex-row p-4">
        <select className="m-2" id="audio-device-select" title="audio-devices">
          <option value="">利用するオーディオデバイス</option>
          {availableAudioDevices.map((device) => {
            return (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            );
          })}
        </select>
        <SpeechButton
          inSpeech={isMicActive}
          onClick={() => {
            setIsMicActive(!isMicActive);
          }}
        ></SpeechButton>
      </div>
      <div className="container h-70 shadow m-2 p-4 rounded-lg bg-gray-50">
        <form
          onSubmit={handleSubmit(({ content }) => {
            setMessage(message + content);
          })}
        >
          <textarea
            className="border-2 w-full h-40"
            placeholder="ここに日記を書きましょう"
            {...register("content", { required: true })}
          />
          <div className="h-2"></div>
          <p className="text-red-600">{errors.content && "空欄にできません"}</p>
          <div className="h-2"></div>
          <input
            type="submit"
            value={"保存"}
            className="bg-primary-400 px-4 py-2 rounded-md text-white"
          />
        </form>
      </div>
    </div>
  );
};

const StackedMessageSection = () => {
  return <div></div>;
};

export const CreateViary = (props: {
  onCommit: (content: ViaryContent) => void;
}) => {
  return (
    <div className="w-4/5 m-auto p-2">
      <div className="p-2">
        <p className="font-medium border-l-2 pl-1 border-primary-600">日付</p>
      </div>
      <div className="p-2">
        <DateSection></DateSection>
      </div>
      <div className="p-2">
        <p className="font-medium border-l-2 pl-1 border-primary-600">入力</p>
      </div>
      <div className="p-2">
        <SpeechSection></SpeechSection>
      </div>
      <div className="p-2">
        <StackedMessageSection></StackedMessageSection>
      </div>
    </div>
  );
};
