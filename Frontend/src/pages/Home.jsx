import React from 'react';
import { useSelector } from 'react-redux';
import { Link,Navigate } from 'react-router-dom';
import Bgvideo from '../assets/videos/bg.mp4';
import Eventscard from '../components/Eventscard';
import Footer from '../components/Footer';
import { CalendarCheck, MapPin, Mail } from 'lucide-react'; // For icons in footer


const HomePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  
  // Redirect logged-in users to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          aria-label="Background video showcasing events"
        >
          <source src={Bgvideo} type="video/mp4" />
          
        </video>

        {/* Overlay for better text contrast */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-transparent"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
            Plan Your Events Effortlessly
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Create, manage, and discover events seamlessly with our intuitive platform.
          </p>
          <Link 
            to="/signup" 
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg 
                        text-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300"
          >
            Get Started
          </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Eventscard />
          <Eventscard />
          <Eventscard />
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-purple-500 to-blue-500 py-16 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Host Your Own Event!</h2>
        <p className="text-lg mb-6">
          Ready to make your event a reality? Start planning today with our powerful tools.
        </p>
        <Link 
          to="/create-event" 
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition"
        >
          Create Event
        </Link>
      </section>

      {/* Footer */}
      
      
    </div>
  );
};

export default HomePage;
