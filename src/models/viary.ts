class Viary {
  messages: Message[];

  constructor(args: { messages: Message[] }) {
    const { messages } = args;
    this.messages = messages;
  }
}

interface Message {
  content: string;
}

export { Viary, type Message };
