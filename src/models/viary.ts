interface ViaryContent {
  date: Date;
  messages: Message[];
}

interface Viary extends ViaryContent {
  id: string;
}

interface Message {
  content: string;
}

export { type Viary, type ViaryContent, type Message };
