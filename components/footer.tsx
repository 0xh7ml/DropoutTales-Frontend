import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              
              <span className="text-3xl font-semibold text-blue-800 group-hover:text-blue-600 transition-colors duration-300">
                Dropout Tales
                {/* <span className="text-sm text-gray-500 align-baseline relative top-[-13px]">
                  v2
                </span> */}
              </span>
            </Link>
            <p className="text-gray-600 mb-4">
              Because failing quietly isn’t fun anymore - a 4-year degree in chaos, approved by no one, but relatable to all.
            </p>
            <div className="flex items-center gap-3 mt-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-blue-600 hover:bg-blue-100 hover:text-blue-800 transition-all duration-300"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/share-story", label: "Share Your Story" },
                { href: "/contact-us", label: "Contact Us" },
                { href: "/who-we-are", label: "Who We Are" }
              ].map(({ href, label }, index) => (
                <li key={index}>
                  <Link
                    href={href}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 px-2 py-1 rounded transition-colors duration-300 block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                { href: "/terms", label: "Terms & Conditions" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/disclaimer", label: "Disclaimer" },
                { href: "/cookie-policy", label: "Cookie Policy" }
              ].map(({ href, label }, index) => (
                <li key={index}>
                  <Link
                    href={href}
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 px-2 py-1 rounded transition-colors duration-300 block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest workplace insights.</p>
            <form className="space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Deshi Mula. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> in Bangladesh
            <span className="mx-2">•</span>
            <Link
              href="https://github.com"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center"
            >
              <Github size={14} className="mr-1" />
              GitHub
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
