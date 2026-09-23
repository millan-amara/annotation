import { Bell } from "lucide-react";

const Topbar = ({ title = "Dashboard", user }) => {
  // Placeholder until real auth lands; no invented person's name.
  const displayName = user?.name || "Signed in";
  const avatarUrl =
    user?.avatarUrl ||
    "https://ui-avatars.com/api/?name=" + encodeURIComponent(displayName);

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 flex justify-between items-center px-6">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2">
          <img src={avatarUrl} alt="" className="h-8 w-8 rounded-full" />
          <span className="text-sm font-medium">{displayName}</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
