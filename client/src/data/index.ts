import { Chat, Message } from "../types/constants";

// Mock data for chat contacts
export const contacts: Chat[] = [
  {
    id: 1,
    name: "Jane Smith",
    avatar:
      "https://images.pexels.com/photos/18096595/pexels-photo-18096595/free-photo-of-music-on-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    lastMessage:
      "Hi there! How have you been? It's been a while since we last caught up. Let's plan to meet up soon.",
    time: "2 hours ago",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar:
      "https://images.pexels.com/photos/18094275/pexels-photo-18094275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    lastMessage:
      "How's it going on your end? I heard you had an exciting trip last week. Tell me all about it!",
    time: "4 hours ago",
  },
  {
    id: 3,
    name: "Bob Johnson",
    avatar:
      "https://images.pexels.com/photos/13847652/pexels-photo-13847652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    lastMessage:
      "What's for dinner tonight? I'm craving some Italian food. Any recommendations?",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar:
      "https://images.pexels.com/photos/13847596/pexels-photo-13847596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    lastMessage:
      "Can you help me with this coding problem? I'm stuck on it for hours now.",
    time: "2 days ago",
  },
  {
    id: 5,
    name: "Michael Wilson",
    avatar:
      "https://images.pexels.com/photos/7775636/pexels-photo-7775636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    lastMessage:
      "See you tomorrow at the park. Don't forget to bring your running shoes!",
    time: "2 weeks ago",
  },
  {
    id: 6,
    name: "Sophia Anderson",
    avatar:
      "https://images.pexels.com/photos/18107025/pexels-photo-18107025/free-photo-of-man-reading-newspaper.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    lastMessage:
      "I miss you so much! It's been ages since we hung out. Let's plan something soon.",
    time: "2 weeks ago",
  },
  {
    id: 7,
    name: "Liam Brown",
    avatar:
      "https://images.pexels.com/photos/7775640/pexels-photo-7775640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    lastMessage:
      "Let's meet up for coffee. I have some exciting news to share with you!",
    time: "3 weeks ago",
  },
];

// Mock data for messages
export const initialMessages: Message[] = [
  {
    id: 1,
    sender: "Jane Smith",
    avatar:
      "https://images.pexels.com/photos/18107024/pexels-photo-18107024/free-photo-of-an-old-city-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "That sounds lovely! What book are you currently reading?",
    time: "10 minutes ago",
    isUser: false,
  },
  {
    id: 2,
    sender: "Dan Abramov",
    avatar:
      "https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-bench-city-man-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content:
      "I'm reading 'The Great Gatsby' by F. Scott Fitzgerald. It's a classic!",
    time: "15 minutes ago",
    isUser: true,
  },
  {
    id: 3,
    sender: "Jane Smith",
    avatar:
      "https://images.pexels.com/photos/18107024/pexels-photo-18107024/free-photo-of-an-old-city-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "Oh, I've heard great things about that book. Enjoy your reading!",
    time: "20 minutes ago",
    isUser: false,
  },
  {
    id: 4,
    sender: "Dan Abramov",
    avatar:
      "https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-bench-city-man-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content: "Thanks! It's such a beautifully written novel.",
    time: "25 minutes ago",
    isUser: true,
  },
  {
    id: 5,
    sender: "Dan Abramov",
    avatar:
      "https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-bench-city-man-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content:
      "I can't wait to see what happens next in the series. It's been so captivating!",
    time: "45 minutes ago",
    isUser: true,
  },
  {
    id: 6,
    sender: "Jane Smith",
    avatar:
      "https://images.pexels.com/photos/18107024/pexels-photo-18107024/free-photo-of-an-old-city-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content:
      "I completely understand. It's always exciting when a series keeps you hooked.",
    time: "50 minutes ago",
    isUser: false,
  },
  {
    id: 7,
    sender: "Dan Abramov",
    avatar:
      "https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-bench-city-man-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    content:
      "Absolutely! Well, I should get back to work now. Catch up with you later!",
    time: "55 minutes ago",
    isUser: true,
  },
];

// Image gallery for a message
export const imageGallery = [
  "https://images.pexels.com/photos/18094275/pexels-photo-18094275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-bench-city-man-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/18107024/pexels-photo-18107024/free-photo-of-an-old-city-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];
