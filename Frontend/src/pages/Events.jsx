import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Loader } from "lucide-react";
import axios from "axios";
import PropTypes from "prop-types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/backend";

const fetchEvents = async (filters) => {
  const { data } = await axios.get(`${API_URL}/event`, {
    params: {
      category: filters.category !== "All" ? filters.category : undefined,
      status: filters.status !== "All" ? filters.status : undefined,
      page: filters.page,
      limit: 9,
    },
  });
  return data;
};

export default function EventDashboard() {
  const [filters, setFilters] = useState({
    category: "All",
    status: "Upcoming",
    page: 1,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", filters],
    queryFn: () => fetchEvents(filters),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    retry: 2,
  });

  const handleFilterChange = useCallback((type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value, page: 1 }));
  }, []);

  const setPage = useCallback((page) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error loading events: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-50 p-8">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-4">
          Event Dashboard
        </h1>
        <p className="text-lg text-gray-700">
          Browse through our list of exciting upcoming and past events.
        </p>
      </header>

      {/* Filters */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <FilterSection
          label="Category"
          options={[
            "All",
            "Comedy",
            "Theater",
            "Music",
            "Technology",
            "Art",
            "Health",
            "Business",
          ]}
          value={filters.category}
          onChange={(value) => handleFilterChange("category", value)}
        />

        <FilterSection
          label="Status"
          options={["All", "Upcoming", "Past"]}
          value={filters.status}
          onChange={(value) => handleFilterChange("status", value)}
        />
      </div>

      {/* Events List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))
        ) : data?.events?.length > 0 ? (
          data.events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p className="text-center text-gray-700 col-span-full">
            No events found for the selected filters.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {data?.totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: data.totalPages }).map((_, i) => (
            <button
              key={i + 1}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filters.page === i + 1
                  ? "bg-purple-500 text-white"
                  : "bg-white text-gray-700 hover:bg-purple-100"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Optimized Event Card Component
const EventCard = React.memo(({ event }) => {
  const eventDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
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
                <Calendar className="w-4 h-4 mr-1" />
                {eventDate}
              </p>
              <p className="text-gray-500 text-sm">{event.location}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                event.status === "Upcoming"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {event.status}
            </span>
          </div>
          <button className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
});

// Skeleton Loading State
const EventCardSkeleton = () => (
  <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    <div className="bg-gray-200 h-48 w-full" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-10 bg-gray-200 rounded-lg mt-4" />
    </div>
  </div>
);

// Filter Section Component
const FilterSection = React.memo(({ label, options, value, onChange }) => (
  <div className="flex flex-col gap-2 min-w-[200px]">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      className="p-3 rounded-lg shadow bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
));

// Prop Types
EventDashboard.propTypes = {
  initialEvents: PropTypes.array,
  totalEvents: PropTypes.number,
  currentPage: PropTypes.number,
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["Upcoming", "Past"]).isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

FilterSection.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};