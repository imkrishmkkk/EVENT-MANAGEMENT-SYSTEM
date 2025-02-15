import React from 'react';

export default function Contactus() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-50 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-purple-700 mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
      </p>

      {/* Contact Form */}
      <form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg border border-purple-200">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full mb-4 p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full mb-4 p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:outline-none"
        />
        <textarea
          rows="5"
          placeholder="Your Message"
          className="w-full mb-4 p-4 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:outline-none"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition duration-300"
        >
          Send Message
        </button>
      </form>

      {/* Contact Information */}
      <div className="mt-10 text-center space-y-2">
        <p className="text-md text-purple-700 font-medium">Email: <span className="text-gray-700">support@nexusevents.com</span></p>
        <p className="text-md text-purple-700 font-medium">Phone: <span className="text-gray-700">+1 234 567 890</span></p>
        <p className="text-md text-purple-700 font-medium">Address: <span className="text-gray-700">Downtown Convention Center</span></p>
      </div>
    </div>
  );
}
