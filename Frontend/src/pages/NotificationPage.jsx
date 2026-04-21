import React from 'react'
import NotificationCard from "../components/NotificationCard";
import { notifications } from '@/config/notification';

export const NotificationPage = () => {
  return (
    <>
    <h1 class="text-center text-5xl mt-10 leading-[68px]  md:text-6xl md:leading-[70px] font-semibold max-w-2xl">
        Important Notifications
      </h1>
      <p class="text-center text-base max-w-lg mt-2">
        Our platform helps you build, test, and deliver faster — so you can
        focus on what matters.
      </p>
      <div className="w-full min-h-screen mt-6 mb-16 bg-white justify-self-center px-4 md:px-10 py-6">
      
      {/* Page Title */}
      <h1 className="text-xl md:text-3xl font-bold text-black mb-6">
        College Notifications
      </h1>

      {/* Cards */}
      <div className="flex flex-col gap-6 items-center">
        {notifications.map((item) => (
          <NotificationCard key={item.id} {...item} />
        ))}
      </div>
    </div>
     </>
  )
}
