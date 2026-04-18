// components/LinkCard.jsx
import { Link } from "react-router-dom";

export const LinkCard = ({ title, description, path, Icon }) => {
  return (
    <div className="w-full max-w-sm border border-black rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition">
      
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full border border-black">
        <Icon className="text-xl text-black" />
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <h3 className="text-sm font-semibold text-black">{title}</h3>
        <p className="text-xs text-gray-600">{description}</p>

        <Link
          to={path}
          className="text-red-500 text-xs mt-1 flex items-center gap-1 hover:underline"
        >
          Go to page →
        </Link>
      </div>
    </div>
  );
};