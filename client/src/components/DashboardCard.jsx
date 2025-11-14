const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <div className="flex items-center justify-between p-5 bg-white shadow-sm rounded-2xl border border-gray-100">
      <div>
        <h2>SpherePulse</h2>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  );
};

export default DashboardCard;
