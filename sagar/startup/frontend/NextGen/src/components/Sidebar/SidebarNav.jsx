import { Home, Video, MessageCircle, Bell, Settings, User } from "lucide-react";

const navItems = [
  { name: "Home", icon: <Home /> },
  { name: "Reels", icon: <Video /> },
  { name: "Messages", icon: <MessageCircle /> },
  { name: "Notifications", icon: <Bell /> },
  { name: "Settings", icon: <Settings /> },
  { name: "Profile", icon: (
      <img
        src="https://english.cdn.zeenews.com/sites/default/files/2024/10/05/1535993-untitled-design-32.jpg"
        alt="Virat Kohli"
        className="w-6 h-6 rounded-full object-cover"
      />
    ),},
];

function SidebarNav() {
  return (
    <nav className="space-y-3 mt-10">
      {navItems.map((item) => (
        <button
          key={item.name}
          className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 text-left"
        >
          <span className="text-gray-700">{item.icon}</span>
          <span className="text-gray-700">{item.name}</span>
        </button>
      ))}
    </nav>
  );
}
export default SidebarNav;