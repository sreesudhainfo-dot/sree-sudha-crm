import {
  FaChartPie,
  FaUsers,
  FaBullhorn,
  FaPhoneAlt,
  FaUserTie,
  FaUserFriends,
  FaBuilding,
  FaClipboardCheck,
  FaDatabase,
  FaAddressBook,
  FaMapMarkedAlt,
  FaImages,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

export const navigation = [
  {
    title: "Dashboard",
    icon: FaChartPie,
    path: "/",
  },
  {
    title: "Employees",
    icon: FaUsers,
    children: [
      { title: "Digital Marketers", icon: FaBullhorn, path: "/digital-marketers" },
      { title: "Telecallers", icon: FaPhoneAlt, path: "/telecallers" },
      { title: "Marketers", icon: FaUserTie, path: "/marketers" },
      { title: "Receptionist", icon: FaUserFriends, path: "/receptionist" },
{ title: "Office Boy", icon: FaBuilding, path: "/office-boy" },
{ title: "Accounts", icon: FaBuilding, path: "/accounts" },
    ],
  },
  {
    title: "Lead Management",
    icon: FaDatabase,
    children: [
      { title: "Leads", icon: FaUsers  ,path: "/leads" },
      { title: "Customers", icon: FaAddressBook, path: "/customers" },
      { title: "Site Visits", icon: FaMapMarkedAlt, path: "/site-visits" },
    ],
  },
  {
    title: "Attendance",
    icon: FaClipboardCheck,
    path: "/attendance",
  },
//   {
//     title: "Site Visits",
//     path: "/site-visits",
//     icon: Calendar,
// },
  {
    title: "Media Library",
    icon: FaImages,
    path: "/media-library",
  },
  {
    title: "Reports",
    icon: FaChartBar,
    path: "/reports",
  },
  {
    title: "Settings",
    icon: FaCog,
    path: "/settings",
  },
];