// components/EventCard.jsx

const EventCard = ({ title, description, date, image }) => {
  return (
    <div className="border border-black rounded-2xl p-3 bg-white hover:shadow-md transition">
      
      {/* Image */}
      <div className="w-full h-44 overflow-hidden rounded-xl border border-black">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="mt-3 space-y-2">
        
        {/* Title */}
        <h3 className="text-sm font-semibold text-black">
          {title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Date */}
        <span className="inline-block text-xs text-red-500 font-medium border border-red-500 px-2 py-1 rounded-md">
          {date}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
