import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">NexusEvents</h3>
          <p className="text-gray-400">
            Simplifying event management for everyone, everywhere.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Quick Links</h4>
          <ul>
            <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
            <li><Link to="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
            <li><Link to="/contactus" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-xl font-semibold mb-3">Contact Us</h4>
          <p className="flex items-center justify-center md:justify-start text-gray-400">
            <MapPin className="w-5 h-5 mr-2" /> Downtown Convention Center
          </p>
          <p className="flex items-center justify-center md:justify-start text-gray-400 mt-2">
            <Mail className="w-5 h-5 mr-2" /> support@nexusevents.com
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} NexusEvents. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
