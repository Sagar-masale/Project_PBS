import UserProfileCard from "../Profile/UserProfileCard";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
  return (
    <aside className="w-80 border-r-1 border-r-gray-200 z-10 h-full fixed bg-white p-4 pt-10  shadow-md">
      <div className="mb-8 ">
        <h1 className="text-2xl font-bold text-[#0160BF]">LogoDemo</h1>
      </div>
      <UserProfileCard />
      <SidebarNav />
    </aside>
  );
}