"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Mail, MessageSquare, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 animate-fade-in opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Review Submitted Successfully!
              </h1>
              <p className="text-gray-600 mb-6">
                Thank you for sharing your experience. We appreciate your feedback and will get back to you shortly.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="btn-modern bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white z-10 border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative overflow-hidden rounded-full p-1 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 group-hover:shadow-md">
              <Image src="/logo1.png" alt="Dropout Tales" width={40} height={40} className="h-8 w-auto" />
            </div>
            <span className="text-lg font-semibold text-green-800 group-hover:text-green-600 transition-colors duration-300">
              Dropout Tales
            </span>
          </Link>
          <Link
            href="/share-story"
            className="btn-modern bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Share Story
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-green-600 text-sm font-medium hover:text-green-700 transition-colors duration-300 mb-6"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Home
          </Link>

          <div
            className="bg-white rounded-xl shadow-md p-6 md:p-8 animate-fade-in opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Contact Us</h1>
            <p className="text-gray-600 mb-6">Have questions or feedback? We'd love to hear from you.</p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="What is this regarding?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MessageSquare size={18} className="text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Type your message here..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-modern bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
