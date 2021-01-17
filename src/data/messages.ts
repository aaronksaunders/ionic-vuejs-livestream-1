import { ref } from "vue";

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
}

const messages = ref<any>([
  {
    fromName: "Matt Chorsey",
    subject: "New event: Trip to Vegas",
    date: "9:32 AM",
    id: 0,
  },

  {
    fromName: "Moe Chamont",
    subject: "Family Calendar - Version 1",
    date: "Last Week",
    id: 6,
  },
  {
    fromName: "Kelly Richardson",
    subject: "Placeholder Headhots",
    date: "Last Week",
    id: 7,
  },
]);

export const getMessages = () => messages;

export const addMessage = (messageInfo: any) => {
  messages.value = [
    ...messages.value,
    { ...messageInfo, id: new Date().getTime() },
  ];
};
/**
 *
 * @param id
 */
export const getMessage = (id: number) =>
  messages.value.find((m: any) => m.id === id);

/**
 *
 * @param id
 */
export const deleteMessage = (id: number) => {
  const idx = messages.value.findIndex((m: any) => m.id === id);
  messages.value.splice(idx, 1);
};
