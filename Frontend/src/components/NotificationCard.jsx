// components/NotificationCard.jsx
import { Link } from "react-router-dom";

const NotificationCard = ({
  title,
  description,
  image,
  publishDate,
  lastDate,
  link,
}) => {
  return (
    <div className="w-[75%] border border-black rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition">

      {/* Image */}
      <div className="w-full md:w-1/4 h-48 md:h-auto">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl border border-black"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        
        {/* Title */}
        <h2 className="text-lg md:text-xl font-semibold text-black">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
          {description}
        </p>

        {/* Dates */}
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="text-xs border border-black px-3 py-1 rounded-lg">
            📅 Publish: {publishDate}
          </span>
          <span className="text-xs border border-black px-3 py-1 rounded-lg">
            ⏳ Last Date: {lastDate}
          </span>
        </div>

        {/* Link */}
        <div className="mt-4">
          <Link
            to={link}
            className="text-red-500 text-sm font-medium hover:underline"
          >
            View Notification →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;