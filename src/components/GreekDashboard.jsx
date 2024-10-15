'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CloudRainIcon, DropletIcon, ThermometerIcon, WindIcon } from 'lucide-react'
import { Bar, BarChart, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const locations = ["Athens", "Idrousa", "Serifos"]

const weatherData = {
  current: {
    Athens: { rainfall: "65 mm", temperature: "28°C", windSpeed: "12 km/h", humidity: "60%" },
    Idrousa: { rainfall: "55 mm", temperature: "30°C", windSpeed: "10 km/h", humidity: "55%" },
    Serifos: { rainfall: "75 mm", temperature: "25°C", windSpeed: "15 km/h", humidity: "70%" },
  },
  rainfallData: [
    { month: 'Jan', Athens: Math.floor(Math.random() * (60 - 30 + 1)) + 30, Idrousa: Math.floor(Math.random() * (50 - 20 + 1)) + 20, Serifos: Math.floor(Math.random() * (70 - 40 + 1)) + 40 },
    { month: 'Feb', Athens: Math.floor(Math.random() * (55 - 25 + 1)) + 25, Idrousa: Math.floor(Math.random() * (45 - 15 + 1)) + 15, Serifos: Math.floor(Math.random() * (65 - 35 + 1)) + 35 },
    { month: 'Mar', Athens: Math.floor(Math.random() * (70 - 40 + 1)) + 40, Idrousa: Math.floor(Math.random() * (60 - 30 + 1)) + 30, Serifos: Math.floor(Math.random() * (80 - 50 + 1)) + 50 },
    { month: 'Apr', Athens: 0, Idrousa: Math.floor(Math.random() * (80 - 40 + 1)) + 40, Serifos: Math.floor(Math.random() * (100 - 60 + 1)) + 60 },
    { month: 'May', Athens: 0, Idrousa: Math.floor(Math.random() * (75 - 40 + 1)) + 40, Serifos: Math.floor(Math.random() * (90 - 50 + 1)) + 50 },
    { month: 'Jun', Athens: Math.floor(Math.random() * (100 - 60 + 1)) + 60, Idrousa: Math.floor(Math.random() * (95 - 55 + 1)) + 55, Serifos: Math.floor(Math.random() * (110 - 70 + 1)) + 70 },
    { month: 'Jul', Athens: Math.floor(Math.random() * (100 - 70 + 1)) + 70, Idrousa: Math.floor(Math.random() * (95 - 60 + 1)) + 60, Serifos: Math.floor(Math.random() * (120 - 80 + 1)) + 80 },
    { month: 'Aug', Athens: 0, Idrousa: Math.floor(Math.random() * (85 - 55 + 1)) + 55, Serifos: Math.floor(Math.random() * (100 - 70 + 1)) + 70 },
    { month: 'Sep', Athens: Math.floor(Math.random() * (80 - 50 + 1)) + 50, Idrousa: Math.floor(Math.random() * (75 - 45 + 1)) + 45, Serifos: Math.floor(Math.random() * (85 - 55 + 1)) + 55 },
    { month: 'Oct', Athens: Math.floor(Math.random() * (75 - 40 + 1)) + 40, Idrousa: Math.floor(Math.random() * (70 - 35 + 1)) + 35, Serifos: Math.floor(Math.random() * (80 - 50 + 1)) + 50 },
    { month: 'Nov', Athens: Math.floor(Math.random() * (60 - 30 + 1)) + 30, Idrousa: Math.floor(Math.random() * (55 - 25 + 1)) + 25, Serifos: Math.floor(Math.random() * (70 - 40 + 1)) + 40 },
    { month: 'Dec', Athens: Math.floor(Math.random() * (55 - 25 + 1)) + 25, Idrousa: Math.floor(Math.random() * (50 - 20 + 1)) + 20, Serifos: Math.floor(Math.random() * (65 - 35 + 1)) + 35 },
  ],
  temperatureData: [
    { month: 'Jan', Athens: 10, Idrousa: 12, Serifos: 8 },
    { month: 'Feb', Athens: 11, Idrousa: 13, Serifos: 9 },
    { month: 'Mar', Athens: 16, Idrousa: 18, Serifos: 14 },
    { month: 'Apr', Athens: 20, Idrousa: 22, Serifos: 18 },
    { month: 'May', Athens: 24, Idrousa: 26, Serifos: 23 },
    { month: 'Jun', Athens: 29, Idrousa: 31, Serifos: 27 },
    { month: 'Jul', Athens: 33, Idrousa: 35, Serifos: 30 },
    { month: 'Aug', Athens: 31, Idrousa: 33, Serifos: 29 },
    { month: 'Sep', Athens: 26, Idrousa: 28, Serifos: 24 },
    { month: 'Oct', Athens: 21, Idrousa: 23, Serifos: 19 },
    { month: 'Nov', Athens: 16, Idrousa: 17, Serifos: 14 },
    { month: 'Dec', Athens: 12, Idrousa: 13, Serifos: 10 },
  ],
}

const COLORS = ["#88C0D0", "#8FBCBB", "#81A1C1"]

const mapUrls = {
  Athens: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50310.55761009113!2d23.69194678683037!3d37.990832008341005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd1f067043f1%3A0x2736354576668ddd!2sAthens%2C%20Greece!5e0!3m2!1sen!2sus!4v1650123456789!5m2!1sen!2sus",
  Idrousa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25344.483891191386!2d22.41144368012209!3d37.07474217731512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1361d1e9e5e1e7c1%3A0x400bd2ce2b9c680!2sIdrousa%2C%20Greece!5e0!3m2!1sen!2sus!4v1650123456789!5m2!1sen!2sus",
  Serifos: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12450.698141041275!2d22.48726273022461!3d38.48022700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135f7f3e1d5d5555%3A0x400bd2ce2b9c6c0!2sSerifos%2C%20Greece!5e0!3m2!1sen!2sus!4v1650123456789!5m2!1sen!2sus"
}

const WeatherCard = ({ title, value, icon: Icon }) => (
  <Card className="bg-[#3b4252] border-[#4c566a] h-full p-4">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-[#e5e9f0] font-rocket">{title}</CardTitle>
      <Icon className="h-4 w-4 text-[#d8dee9]" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-[#eceff4]">{value}</div>
    </CardContent>
  </Card>
)

const getRainfallIntensity = (rainfall) => {
  if (rainfall >= 70) return "Heavy"
  if (rainfall >= 40) return "Moderate"
  return "Light"
}

const calculateRainfallDistribution = (cityData) => {
  const total = cityData.length
  const heavy = cityData.filter(rainfall => rainfall >= 70).length
  const moderate = cityData.filter(rainfall => rainfall >= 40 && rainfall < 70).length
  const light = total - heavy - moderate

  return [
    { name: "Heavy", value: (heavy / total) * 100 },
    { name: "Moderate", value: (moderate / total) * 100 },
    { name: "Light", value: (light / total) * 100 }
  ]
}

const ModerateRain = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <style jsx>{`
      @keyframes fall {
        to {
          transform: translateY(100vh);
        }
      }
      .raindrop {
        position: absolute;
        width: 2px;
        height: 40px;
        background: linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0));
        animation: fall 1.2s linear infinite;
      }
    `}</style>
    {[...Array(100)].map((_, i) => (
      <div
        key={i}
        className="raindrop"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 1.2}s`,
        }}
      />
    ))}
  </div>
)

const HeavyRainThunderstorm = () => {
  const [lightning, setLightning] = useState(false)

  useEffect(() => {
    const lightningInterval = setInterval(() => {
      setLightning(true)
      setTimeout(() => setLightning(false), 100)
    }, Math.random() * 3000 + 2000)

    return () => clearInterval(lightningInterval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
        .raindrop {
          position: absolute;
          width: 3px;
          height: 60px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0));
          animation: fall 0.7s linear infinite;
        }
      `}</style>
      {[...Array(200)].map((_, i) => (
        <div
          key={i}
          className="raindrop"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.7}s`,
          }}
        />
      ))}
      {lightning && (
        <div className="absolute inset-0 bg-white opacity-30 transition-opacity duration-100" />
      )}
    </div>
  )
}

export default function PoseidonDashboard() {
  const [selectedCity, setSelectedCity] = useState("Athens")
  const [rainfallIntensity, setRainfallIntensity] = useState("moderate")

  const cityData = useMemo(() => {
    return weatherData.rainfallData.map(data => data[selectedCity])
  }, [selectedCity])

  const rainfallDistribution = useMemo(() => {
    return calculateRainfallDistribution(cityData)
  }, [cityData])

  const topThreeMetrics = useMemo(() => {
    const metrics = [
      { title: "Rainfall", value: weatherData.current[selectedCity].rainfall, icon: CloudRainIcon },
      { title: "Temperature", value: weatherData.current[selectedCity].temperature, icon: ThermometerIcon },
      { title: "Humidity", value: weatherData.current[selectedCity].humidity, icon: DropletIcon },
      { title: "Wind Speed", value: weatherData.current[selectedCity].windSpeed, icon: WindIcon },
    ]
    return metrics.slice(0, 3)
  }, [selectedCity])

  useEffect(() => {
    const currentRainfall = parseInt(weatherData.current[selectedCity].rainfall)
    const intensity = getRainfallIntensity(currentRainfall)
    setRainfallIntensity(intensity.toLowerCase())

    let toastMessage = `${selectedCity} is experiencing ${intensity.toLowerCase()} rainfall.`
    toast(toastMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      type: intensity === "Heavy" ? "error" : intensity === "Moderate" ? "warning" : "success"
    })
  }, [selectedCity])

  return (
    <div className="relative w-full h-full min-h-screen">
      {rainfallIntensity  === 'moderate' ? <ModerateRain /> : <HeavyRainThunderstorm />}
      <div className="z-10 bg-gradient-to-b from-[#2e3440] to-[#3b4252] bg-opacity-90 text-[#eceff4] p-8 min-h-screen font-sans">
        <ToastContainer />
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-[#eceff4] font-rocket">Poseidon's Weather Realm</h1>
            <div className="text-6xl font-rocket">🔱</div>
          </div>
          
          <div className="flex justify-center space-x-4 mb-6">
            {locations.map((city) => (
              <Button
                key={city}
                onClick={() => setSelectedCity(city)}
                variant={selectedCity === city ? "default" : "outline"}
                className={`${selectedCity === city ? 'bg-[#5e81ac]' : 'bg-[#4c566a]'} hover:bg-[#81a1c1] text-[#eceff4] transition-colors duration-200`}
              >
                {city}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topThreeMetrics.map((metric, index) => (
              <WeatherCard key={index} title={metric.title} value={metric.value} icon={metric.icon} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#3b4252] border-[#4c566a] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#eceff4] font-rocket">Monthly Rainfall</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    [selectedCity]: { label: selectedCity, color: "#88c0d0" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weatherData.rainfallData}>
                      <XAxis dataKey="month" stroke="#d8dee9" />
                      <YAxis stroke="#d8dee9" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey={selectedCity} stroke="#88c0d0" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-[#3b4252] border-[#4c566a] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#eceff4] font-rocket">{selectedCity}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[300px] overflow-hidden rounded-md">
                  <iframe
                    src={mapUrls[selectedCity]}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${selectedCity} Map`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#3b4252] border-[#4c566a] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#eceff4] font-rocket">Temperature Bar Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    [selectedCity]: { label: selectedCity, color: "#8fbcbb" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weatherData.temperatureData}>
                      <XAxis dataKey="month" stroke="#d8dee9" />
                      <YAxis stroke="#d8dee9" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey={selectedCity} fill="#8fbcbb" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-[#3b4252] border-[#4c566a] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#eceff4] font-rocket">Rainfall Intensity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={rainfallDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                    >
                      {rainfallDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 