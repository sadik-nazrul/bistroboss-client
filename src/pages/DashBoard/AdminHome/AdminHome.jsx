import { FaClipboardList, FaTruck, FaUsers, FaWallet } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: adminStats } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  console.log(adminStats);

  return (
    <div>
      <div className="text-2xl font-semibold">
        <span>Hi Welcome </span>
        {user?.displayName ? user?.displayName : "Back"}
      </div>
      <div className="stats shadow w-full">
        {/* Revenue */}
        <div className="stat">
          <FaWallet className="text-xl" />

          <div className="stat-value">${adminStats.revenue}</div>
          <div className="stat-title">Revenue</div>
        </div>
        {/* Customers */}
        <div className="stat">
          <FaUsers className="text-xl" />

          <div className="stat-value">{adminStats.users}</div>
          <div className="stat-title">Customers</div>
        </div>
        <div className="stat">
          <FaClipboardList className="text-xl" />

          <div className="stat-value">{adminStats.menuItems}</div>
          <div className="stat-title">Menus</div>
        </div>
        <div className="stat">
          <FaTruck className="text-xl" />

          <div className="stat-value">{adminStats.orders}</div>
          <div className="stat-title">Orders</div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
