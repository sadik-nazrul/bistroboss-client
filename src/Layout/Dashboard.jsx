import {
  FaBook,
  FaCalendar,
  FaCartShopping,
  FaEnvelope,
  FaList,
  FaUsers,
  FaUtensils,
} from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import {
  MdOutlineRateReview,
  MdOutlineEditCalendar,
  MdMenuBook,
} from "react-icons/md";
import { CiShop } from "react-icons/ci";
import logo from "../assets/logo1.png";
import useAdmin from "../hooks/useAdmin";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  // TODO: get isAdmin Value from the database
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  return (
    <div className="flex">
      {/* left drawer */}
      <div className="w-64 min-h-screen bg-orange-400 p-5">
        <Link to="/">
          <img src={logo} alt="bistro boss" className="pb-5" />
        </Link>
        <ul className="space-y-2">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/adminHome"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white flex items-center gap-1"
                      : "text-black flex items-center gap-1"
                  }
                >
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/additems"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white flex items-center gap-1"
                      : "text-black flex items-center gap-1"
                  }
                >
                  <FaUtensils />
                  Add Items
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manageitems"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white flex items-center gap-1"
                      : "flex items-center gap-1"
                  }
                >
                  <FaList />
                  Manage Items
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/managebookings"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white flex items-center gap-1"
                      : "text-black flex items-center gap-1"
                  }
                >
                  <FaBook />
                  Manage Bookings
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/allusers"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white flex items-center gap-1"
                      : "text-black flex items-center gap-1"
                  }
                >
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white flex items-center gap-1"
                      : "flex items-center gap-1"
                  }
                >
                  <FaCartShopping />
                  My Cart({cart.length})
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/userHome"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white flex items-center gap-1"
                      : "text-black flex items-center gap-1"
                  }
                >
                  <FaHome />
                  User Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/reservation"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white flex items-center gap-1"
                      : "text-black flex items-center gap-1"
                  }
                >
                  <FaCalendar />
                  My Resevation
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/review"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white flex items-center gap-1"
                      : "text-black flex items-center gap-1"
                  }
                >
                  <MdOutlineRateReview />
                  Add Review
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/mybooking"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white flex items-center gap-1"
                      : "text-black flex items-center gap-1"
                  }
                >
                  <MdOutlineEditCalendar />
                  My Booking
                </NavLink>
              </li>
            </>
          )}

          {/* Shared NavLink */}
          <div className="divider"></div>

          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white flex items-center gap-1"
                  : "text-black flex items-center gap-1"
              }
            >
              <FaHome />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/menu"
              className={({ isActive }) =>
                isActive
                  ? "text-white flex items-center gap-1"
                  : "text-black flex items-center gap-1"
              }
            >
              <MdMenuBook />
              Menu
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/order/salad"
              className={({ isActive }) =>
                isActive
                  ? "text-white flex items-center gap-1"
                  : "text-black flex items-center gap-1"
              }
            >
              <CiShop />
              Order Food
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-white flex items-center gap-1"
                  : "text-black flex items-center gap-1"
              }
            >
              <FaEnvelope />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Content */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
