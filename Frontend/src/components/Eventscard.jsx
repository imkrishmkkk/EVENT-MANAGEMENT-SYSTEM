import React from 'react';
import birthdayImage from '../assets/images/birthday.jpg';

export default function Eventscard() {
  // Example event data
  const event = {
    imageUrl: birthdayImage,
    title: "Amazing Event",
    description:
      "Join us for an amazing event full of excitement and networking opportunities!",
    date: "January 1, 2025",
    location: "Downtown Convention Center",
    registrationText: "Register Now",
  };

  return (
    <div className="max-w-sm mx-auto my-8">
      {/* Gradient border with hover scaling */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-xl shadow-lg transform hover:scale-105 transition duration-300">
        {/* Inner card */}
        <div className="bg-white rounded-xl overflow-hidden">
          {/* Event image */}
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          {/* Card content */}
          <div className="p-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {event.title}
            </h3>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-800 font-semibold">{event.date}</p>
                <p className="text-gray-500 text-sm">{event.location}</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                {event.registrationText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
