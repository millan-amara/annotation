import { Home, Briefcase, Wallet, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");

  const navItems = [
    { id: "dashboard", to: "/user/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "jobs", to: "/workerjobs", label: "Jobs", icon: <Briefcase size={20} /> },
    { id: "payments", to: "/user/payments", label: "Payments", icon: <Wallet size={20} /> },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
      <div>
        <div className="p-6 text-xl font-semibold">SpherePulse</div>

        <nav className="mt-4">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              onClick={() => setActive(item.id)}
              className={`flex items-center w-full px-6 py-3 text-sm font-medium transition-all ${
                active === item.id
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-gray-100">
        <button className="flex items-center text-gray-500 hover:text-red-600 transition">
          <LogOut size={20} className="mr-2" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
