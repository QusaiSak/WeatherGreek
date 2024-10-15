import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CloudRainIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Component() {
  const form = useForm()
  const [submissionTime, setSubmissionTime] = useState('')

  useEffect(() => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    form.setValue("time", currentTime)
  }, [form])

  const onSubmit = (data) => {
    const currentSubmissionTime = new Date().toLocaleString()
    setSubmissionTime(currentSubmissionTime)
    console.log(data)
    toast.success(`Report submitted at ${currentSubmissionTime}`)
    form.reset()
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    form.setValue("time", currentTime)
  }

  const handleDateChange = (e) => {
    const selectedDate = e.target.value
    form.setValue("date", selectedDate)
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    form.setValue("time", currentTime)
  }

  return (
    <div className="bg-[#2e3440] text-[#eceff4] p-8 min-h-screen font-sans">
      <ToastContainer />
      <div className="max-w-md mx-auto">
        <Card className="bg-[#3b4252] border-[#4c566a]">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-[#eceff4]">Rainfall Report</CardTitle>
              <CloudRainIcon className="h-6 w-6 text-[#4c566a]" />
            </div>
            <p className="text-sm text-[#eceff4]">Enter your weather observations</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#eceff4]">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} className="bg-[#434c5e] border-[#4c566a] text-[#eceff4] placeholder-[#4c566a]" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#eceff4]">Gmail</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter your Gmail" {...field} className="bg-[#434c5e] border-[#4c566a] text-[#eceff4] placeholder-[#4c566a]" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#eceff4]">City</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#434c5e] border-[#4c566a] text-[#eceff4]">
                            <SelectValue placeholder="Select your city" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#3b4252] border-[#4c566a]">
                          <SelectItem value="athens">Athens</SelectItem>
                          <SelectItem value="sparta">Sparta</SelectItem>
                          <SelectItem value="delphi">Delphi</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rainfall"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#eceff4]">Rainfall (in mm)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-[#434c5e] border-[#4c566a] text-[#eceff4]">
                            <SelectValue placeholder="Select rainfall" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#3b4252] border-[#4c566a]">
                          <SelectItem value="0-10">0-10 mm</SelectItem>
                          <SelectItem value="10-20">10-20 mm</SelectItem>
                          <SelectItem value="20-30">20-30 mm</SelectItem>
                          <SelectItem value="30+">30+ mm</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="humidity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#eceff4]">Humidity (%)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Humidity" {...field} className="bg-[#434c5e] border-[#4c566a] text-[#eceff4] placeholder-[#4c566a]" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#eceff4]">Temp (°C)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Temp" {...field} className="bg-[#434c5e] border-[#4c566a] text-[#eceff4] placeholder-[#4c566a]" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="windSpeed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#eceff4]">Wind (km/h)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Wind" {...field} className="bg-[#434c5e] border-[#4c566a] text-[#eceff4] placeholder-[#4c566a]" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#eceff4]">Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(e)
                              const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                              form.setValue("time", currentTime)
                            }}
                            className="bg-[#434c5e] border-[#4c566a] text-[#eceff4]" 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#eceff4]">Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} className="bg-[#434c5e] border-[#4c566a] text-[#eceff4]" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full bg-[#4c566a] hover:bg-[#434c5e] text-[#eceff4]">
                  Submit Report
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}