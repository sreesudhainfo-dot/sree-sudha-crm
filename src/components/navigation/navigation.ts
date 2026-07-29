import {
  FaChartPie,
  FaUsers,
  FaBullhorn,
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
   path: "/employees" ,
  },
   // Marketing
  {
    title: "Marketing",
    icon: FaBullhorn,
    children: [
      {
        title: "Dashboard",
        icon: FaChartPie,
        path: "/marketing/dashboard",
      },
      
      {
        title: "Hierarchy",
        icon: FaBuilding,
        path: "/marketing/hierarchy",
      },
      {
        title: "Reports",
        icon: FaChartBar,
        path: "/marketing/reports",
      },
    ],
  },

  // CRM
  {
    title: "Lead Management",
    icon: FaDatabase,
    children: [
      {
        title: "Leads",
        icon: FaUsers,
        path: "/leads",
      },
      {
        title: "Customers",
        icon: FaAddressBook,
        path: "/customers",
      },
      {
        title: "Site Visits",
        icon: FaMapMarkedAlt,
        path: "/site-visits",
      },
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
  // {
  //   title: "Settings",
  //   icon: FaCog,
  //   path: "/settings",
  // },
];