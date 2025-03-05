import { Bell, Plus } from "lucide-react";
const Header = () => {
  return (
    <header className="fixed top-0 z-10 w-full max-w-full flex items-center justify-between p-4 lg:px-10 bg-[#121212] border-b-[1px] border-b-slate-300 text-white">
      <h1 className="text-xl md:text-3xl font-extrabold">Inbox</h1>
      <div className="flex items-center justify-end gap-6 w-max flex-shrink-0">
        <span className="relative">
          <Bell className="w-6 h-6 md:w-8 md:h-8 text-white" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 md:h-5 md:w-5 items-center justify-center rounded-full bg-red-500 p-1 text-sm md:text-base text-white">
            4
          </span>
        </span>
        <div className="h-11 w-11 rounded-full border-2 border-white">
          <img
            src="https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-bench-city-man-people.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="avatar"
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
        <button className="hidden md:inline-flex w-max items-center justify-center p-3 border-[1px] border-white text-center font-bold text-white">
          <Plus className="w-5 h-5 mr-2" /> Create a chat
        </button>
      </div>
    </header>
  );
};

export default Header;
