import { Menu } from "lucide-react"
import * as React from "react"
import { Link } from "react-router-dom"

export function Navbar() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 h-full w-64 bg-white p-8 hidden md:block">
        <h1 className="text-2xl font-bold mb-8">Hellenic.</h1>
        <ul className="space-y-4">
          {["Forecast", "Islands", "History", "Culture", "Shop"].map((item) => (
            <li key={item}>
              <Link href="#" className="hover:text-blue-600 transition-colors">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <button className="fixed top-4 left-4 md:hidden z-50">
        <Menu className="h-6 w-6" />
      </button>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-square relative mb-8 overflow-hidden rounded-full">
            <img
              src="/placeholder.svg?height=800&width=800"
              alt=""
              className="grayscale"
            />
          </div>
          <h2 className="text-4xl font-bold mb-4">Experience the Elements of Greece</h2>
          <p className="text-xl mb-8">
            Discover the perfect balance of sun, sea, and ancient wisdom with our precise weather forecasts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Today's Outlook</h3>
              <p className="text-lg">Athens: 28°C, Clear skies</p>
              <p className="text-lg">Santorini: 25°C, Gentle breeze</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Weekly Forecast</h3>
              <p className="text-lg">Explore the weather patterns of the Aegean</p>
              <Link href="#" className="text-blue-600 hover:underline">
                View 7-day forecast
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Social Links */}
      <div className="fixed bottom-8 right-8 space-y-2">
        {["F", "In", "Tw", "Yt"].map((social) => (
          <div key={social} className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">{social}</span>
          </div>
        ))}
      </div>
    </div>
  )
}