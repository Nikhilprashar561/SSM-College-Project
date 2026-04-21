import React from 'react'
import EventCard from "../components/EventCard";
import { eventsData } from '@/config/events';

export const Events = () => {
  return (
    <>
    <h1 class="text-center text-5xl mt-10 leading-[68px] md:text-6xl md:leading-[70px] font-semibold max-w-2xl">
        Let's build AI agents together
      </h1>
      <p class="text-center text-base max-w-lg mt-2">
        Our platform helps you build, test, and deliver faster — so you can
        focus on what matters.
      </p>
    <div className="w-full min-h-screen bg-white px-4 md:px-8 py-6">
      
      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold text-black mb-6">
        College Events Gallery
      </h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {eventsData.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
    </>
  )
}
