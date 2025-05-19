
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

const Appointments = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<'day' | 'week'>('day');
  
  // Mock appointment data
  const appointments = [
    {
      id: 1,
      title: "Haircut & Styling",
      customer: "John Smith",
      customerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      shop: "Elegant Cuts",
      time: "09:00 AM - 09:45 AM",
      status: "confirmed",
      notes: "Regular client, prefers styling product"
    },
    {
      id: 2,
      title: "Beard Trim",
      customer: "Michael Johnson",
      customerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      shop: "Gentleman's Barber",
      time: "10:00 AM - 10:30 AM",
      status: "confirmed",
      notes: "First time visit"
    },
    {
      id: 3,
      title: "Hair Coloring",
      customer: "Emma Wilson",
      customerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      shop: "Color Studio",
      time: "11:15 AM - 12:45 PM",
      status: "pending",
      notes: "Wants to discuss options first"
    },
    {
      id: 4,
      title: "Full Makeover",
      customer: "Sophia Garcia",
      customerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia",
      shop: "Beauty Box",
      time: "02:00 PM - 03:30 PM",
      status: "confirmed",
      notes: "Wedding preparation"
    },
    {
      id: 5,
      title: "Manicure",
      customer: "Olivia Brown",
      customerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=olivia",
      shop: "Nail Experts",
      time: "04:00 PM - 05:00 PM",
      status: "canceled",
      notes: "Regular monthly appointment"
    },
  ];

  const handleAppointmentAction = (action: string, appointment: any) => {
    toast({
      title: `${action} appointment`,
      description: `${action} appointment for ${appointment.customer} successfully.`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'canceled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return '';
    }
  };

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <motion.div variants={itemVariants} className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
          <p className="text-muted-foreground">
            View and manage all scheduled appointments across shops.
          </p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-4 xl:col-span-3 space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {appointments.slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="flex items-start space-x-3">
                  <div className="mt-1">
                    <Badge variant="outline" className={getStatusColor(appointment.status)}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium">{appointment.title}</p>
                    <p className="text-sm text-muted-foreground">{appointment.time}</p>
                    <p className="text-sm">
                      {appointment.customer} • {appointment.shop}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-8 xl:col-span-9"
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
                <div>
                  <CardTitle>
                    {date ? format(date, 'EEEE, MMMM d, yyyy') : 'Schedule'}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Tabs defaultValue="day" value={view} onValueChange={(v) => setView(v as 'day' | 'week')}>
                    <TabsList>
                      <TabsTrigger value="day">Day</TabsTrigger>
                      <TabsTrigger value="week">Week</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                {view === 'day' ? (
                  <div className="min-w-full">
                    <div className="space-y-1">
                      {timeSlots.map((timeSlot, index) => {
                        const appointmentsAtTime = appointments.filter(
                          appt => appt.time.startsWith(timeSlot)
                        );
                        
                        return (
                          <div key={index} className="grid grid-cols-12 group">
                            <div className="col-span-2 md:col-span-1 py-4 px-2 text-sm text-muted-foreground border-r">
                              {timeSlot}
                            </div>
                            <div className="col-span-10 md:col-span-11 py-2 px-2 min-h-16 border-b group-last:border-b-0">
                              {appointmentsAtTime.length > 0 ? (
                                appointmentsAtTime.map(appointment => (
                                  <div 
                                    key={appointment.id}
                                    className={`p-2 mb-2 rounded-md border-l-4 ${
                                      appointment.status === 'confirmed' ? 'border-l-green-500 bg-green-50 dark:bg-green-950/30' : 
                                      appointment.status === 'pending' ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/30' : 
                                      'border-l-red-500 bg-red-50 dark:bg-red-950/30'
                                    }`}
                                    onClick={() => handleAppointmentAction('View', appointment)}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={appointment.customerAvatar} />
                                        <AvatarFallback>{appointment.customer.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{appointment.title}</p>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                          <span>{appointment.customer}</span>
                                          <span className="mx-1">•</span>
                                          <span>{appointment.shop}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground">
                                  <span className="group-hover:opacity-100 opacity-0 transition-opacity">
                                    Available
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                      <div className="grid grid-cols-8">
                        <div className="col-span-1"></div>
                        {Array.from({ length: 7 }, (_, i) => {
                          const day = new Date();
                          day.setDate(day.getDate() - day.getDay() + i);
                          return (
                            <div key={i} className="col-span-1 py-2 px-2 text-center font-medium border-b">
                              <div>{format(day, 'EEE')}</div>
                              <div className="text-xl">{format(day, 'd')}</div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {timeSlots.map((timeSlot, timeIndex) => (
                        <div key={timeIndex} className="grid grid-cols-8">
                          <div className="col-span-1 py-4 px-2 text-sm text-muted-foreground border-r">
                            {timeSlot}
                          </div>
                          
                          {Array.from({ length: 7 }, (_, dayIndex) => {
                            const hasAppointment = appointments.some(
                              (a, i) => timeIndex === i % timeSlots.length && 
                                       dayIndex === Math.floor(i / timeSlots.length) % 7
                            );
                            
                            const appointmentForSlot = hasAppointment 
                              ? appointments[timeIndex % appointments.length] : null;
                              
                            return (
                              <div key={dayIndex} className="col-span-1 p-1 min-h-16 border-b border-r">
                                {appointmentForSlot && (
                                  <div 
                                    className={`p-1 text-xs rounded-md border-l-4 h-full cursor-pointer ${
                                      appointmentForSlot.status === 'confirmed' ? 'border-l-green-500 bg-green-50 dark:bg-green-950/30' : 
                                      appointmentForSlot.status === 'pending' ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/30' : 
                                      'border-l-red-500 bg-red-50 dark:bg-red-950/30'
                                    }`}
                                    onClick={() => handleAppointmentAction('View', appointmentForSlot)}
                                  >
                                    <div className="font-medium truncate">{appointmentForSlot.title}</div>
                                    <div className="truncate">{appointmentForSlot.customer}</div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Appointments;
