import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  const navigate = useNavigate();

  // Define routes for breadcrumb labels
  const routes = {
    Home: "/",
    Dashboard: "/dashboard",
    Students: "/students",
    Teachers: "/teachers",
    "Class Management": "/class-management",
    "All Sections": "/all-sections",
    // Add more if needed
  };

  return (
    <nav className="text-sm text-muted-foreground flex items-center gap-1 overflow-x-auto whitespace-nowrap px-2 sm:px-4">
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1">
          <span
            onClick={() => {
              if (idx !== items.length - 1 && routes[item]) {
                navigate(routes[item]);
              }
            }}
            className={`${
              idx === items.length - 1
                ? "text-foreground font-semibold"
                : "hover:underline cursor-pointer"
            }`}
          >
            {item}
          </span>
          {idx !== items.length - 1 && (
            <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
