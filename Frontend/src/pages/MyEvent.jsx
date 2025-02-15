import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Removed "data" from here
import { Calendar } from "lucide-react";
import PropTypes from "prop-types";
import { da } from "@faker-js/faker";

// Set API_URL from environment or default to backend URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// Fetch events created by the current user
const fetchMyEvents = async () => {
  try {
    // Log the URL to confirm correctness
    const url = `${API_URL}/backend/event/myEvents`;
    console.log("Requesting:", url);

    const response = await axios.get(url, {
      withCredentials: true,
    });

    // Log the full response
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    // Log detailed error (status code, message, etc.)
    console.error("Error:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    throw error; // Propagate the error to the caller
  }
};


const MyEvents = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myEvents"],
    queryFn: fetchMyEvents,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (isError) {
    console.error("Error loading my events:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  const events = data?.events || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-50 p-8">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-4">
          My Events
        </h1>
        <p className="text-lg text-gray-700">
          These are the events you have created.
        </p>
      </header>
      
      {events.length === 0 ? (
        <div className="text-center mt-12">
          <p className="text-gray-700 text-lg mb-4">
            You haven't created any events yet.
          </p>
          <button
            onClick={() => navigate("/create-event")}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Create New Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300">
      <img
        src={event.imageUrl || "/default-event.jpg"}
        alt={event.title}
        className="w-full h-48 object-cover rounded-t-xl"
        loading="lazy"
      />
      <div className="flex-grow p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {event.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-gray-800 font-semibold flex items-center">
                <Calendar className="w-4 h-4 mr-1" /> {eventDate}
              </p>
              <p className="text-gray-500 text-sm">{event.location}</p>
            </div>
          </div>
          <button
            onClick={() => navigate(`/event/${event._id}`)}
            className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default MyEvents;
