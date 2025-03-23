import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="mb-4 max-sm:w-xl">
      <ul className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        {/* Home link */}
        <li>
          <Link
            to="/"
            className="text-blue-600 hover:underline text-lg font-medium flex items-center gap-2"
          >
            <FaHome />
            DashBoard
          </Link>
        </li>
        {pathParts.map((part, index) => {
          const to = `/${pathParts.slice(0, index + 1).join("/")}`;
          const isLast = index === pathParts.length - 1;

          return (
            <li key={to} className="flex items-center">
              {/* Separator */}
              <span className="mx-1 text-gray-400">/</span>
              {isLast ? (
                <span className="text-gray-800 font-semibold capitalize">
                  {part}
                </span>
              ) : (
                <Link
                  to={to}
                  className="text-blue-600 hover:underline capitalize"
                >
                  {part}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {/* Page Title (for the last breadcrumb) */}
      <h1 className="mt-2 text-2xl font-bold text-gray-800 capitalize">
        {pathParts.length === 0 ? "Dashboard" : pathParts[pathParts.length - 1]}
      </h1>
    </nav>
  );
}

export default Breadcrumbs;
