import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { List, Users, LogOut } from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // useEffect(() => {
  //   // Fetch events with real-time attendee counts
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await fetch("/api/events");
  //       const data = await response.json();
  //       setEvents(data);
  //     } catch (error) {
  //       console.error("Failed to fetch events:", error);
  //     }
  //   };
  //   fetchEvents();

  //   const interval = setInterval(fetchEvents, 5000); // Refresh every 5 seconds
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl border-r border-gray-300 p-6 flex flex-col justify-between transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out w-64 z-50`}
      >
        <div>
          <h2 className="text-3xl font-extrabold text-purple-700 mb-8 text-center">Dashboard</h2>
          <ul className="space-y-6">
            <li>
              <button
                onClick={() => navigate("/create-event")}
                className="flex items-center text-lg text-gray-700 hover:text-purple-600 transition duration-300"
              >
                <List className="w-5 h-5 mr-2" /> Create Event
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/my-events")}
                className="flex items-center text-lg text-gray-700 hover:text-blue-600 transition duration-300"
              >
                <List className="w-5 h-5 mr-2" /> View Your Events
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/registered-events")}
                className="flex items-center text-lg text-gray-700 hover:text-green-600 transition duration-300"
              >
                <Users className="w-5 h-5 mr-2" /> Registered Events
              </button>
            </li>
          </ul>
        </div>
        <button
          onClick={() => navigate("/logout")}
          className="flex items-center text-lg text-red-600 hover:text-red-700 transition duration-300"
        >
          <LogOut className="w-5 h-5 mr-2" /> Logout
        </button>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 bg-purple-600 text-white p-2 rounded-lg shadow-lg z-50 hover:bg-purple-700 transition"
      >
        <List className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="flex-1 p-10 ml-0 md:ml-64 transition-all duration-300">
        <div className="max-w-5xl mx-auto bg-white p-12 rounded-3xl shadow-2xl border border-gray-300">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4 animate-bounce">
              Welcome to Your Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Manage your events, explore new opportunities, and stay organized effortlessly.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event.id} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-5 px-4 rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-600 transition transform hover:scale-110 duration-300">
                <h2 className="text-2xl font-bold">{event.name}</h2>
                <p className="mt-2">Attendees: {event.attendeeCount}</p>
                <button
                  onClick={() => navigate(`/events/${event.id}`)}
                  className="mt-4 bg-white text-blue-600 py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition"
                >
                  View Event
                </button>
              </div>
            ))}
            <button
              onClick={() => navigate("/create-event")}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-5 rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-600 transition transform hover:scale-110 duration-300"
            >
              Create New Event
            </button>
            <button
              onClick={() => navigate("/settings")}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-5 rounded-xl shadow-lg hover:from-yellow-600 hover:to-orange-600 transition transform hover:scale-110 duration-300"
            >
              Account Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
