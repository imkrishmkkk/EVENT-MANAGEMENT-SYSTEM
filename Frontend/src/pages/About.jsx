import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Hero Section */}
      <section className="relative w-full h-80 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl font-extrabold mb-4">About NexusEvents</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Empowering you to create, manage, and discover events effortlessly.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Who We Are</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          NexusEvents is a leading event management platform designed to simplify the way individuals and organizations plan, organize, and discover events. Whether you're hosting a small gathering or a large-scale conference, NexusEvents provides intuitive tools to make the process seamless and enjoyable.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">What We Do</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 shadow-lg rounded-xl bg-gray-100 hover:shadow-xl transition">
              <Calendar className="w-12 h-12 mx-auto text-blue-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Seamless Event Planning</h3>
              <p className="text-gray-600">
                Easily create and customize events with powerful, user-friendly tools that fit any occasion.
              </p>
            </div>

            <div className="p-6 shadow-lg rounded-xl bg-gray-100 hover:shadow-xl transition">
              <Users className="w-12 h-12 mx-auto text-purple-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Connect & Engage</h3>
              <p className="text-gray-600">
                Foster connections with attendees, manage RSVPs, and communicate effectively with built-in engagement tools.
              </p>
            </div>

            <div className="p-6 shadow-lg rounded-xl bg-gray-100 hover:shadow-xl transition">
              <Globe className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Discover Events Worldwide</h3>
              <p className="text-gray-600">
                Explore a wide range of events happening around the globe and never miss out on exciting opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-500 py-16 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-6">
          Join NexusEvents today and transform the way you plan and experience events.
        </p>
        <Link 
          to="/sign-up" 
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition"
        >
          Sign Up Now
        </Link>
      </section>

    </div>
  );
};

export default AboutPage;
