import React, { useState } from 'react';
import { Plus, Clock, Users, MapPin, Video, PhoneCall, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

interface Appointment {
  id: number;
  title: string;
  client: string;
  date: Date;
  time: string;
  duration: number;
  type: 'meeting' | 'call' | 'video';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  description: string;
  location?: string;
}

const CalendarPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);

  const appointments: Appointment[] = [
    {
      id: 1,
      title: 'Project Review Meeting',
      client: 'Tech Corp Inc.',
      date: new Date(2024, 0, 15),
      time: '09:00',
      duration: 60,
      type: 'meeting',
      status: 'confirmed',
      description: 'Review the Q1 project progress and discuss next steps.',
      location: 'Conference Room A',
    },
    {
      id: 2,
      title: 'Client Consultation',
      client: 'StartupXYZ',
      date: new Date(2024, 0, 15),
      time: '14:30',
      duration: 45,
      type: 'video',
      status: 'scheduled',
      description: 'Initial consultation for new web application project.',
    },
    {
      id: 3,
      title: 'Team Stand-up',
      client: 'Internal',
      date: new Date(2024, 0, 16),
      time: '10:00',
      duration: 30,
      type: 'call',
      status: 'confirmed',
      description: 'Daily team synchronization meeting.',
    },
    {
      id: 4,
      title: 'Product Demo',
      client: 'Enterprise Solutions',
      date: new Date(2024, 0, 16),
      time: '15:00',
      duration: 90,
      type: 'meeting',
      status: 'scheduled',
      description: 'Demonstrate new features to potential enterprise client.',
      location: 'Demo Room',
    },
    {
      id: 5,
      title: 'Design Review',
      client: 'Creative Agency',
      date: new Date(2024, 0, 17),
      time: '11:00',
      duration: 120,
      type: 'video',
      status: 'confirmed',
      description: 'Review UI/UX designs for mobile application.',
    },
  ];

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(apt => 
      apt.date.toDateString() === date.toDateString()
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-admin-success/20 text-admin-success">Confirmed</Badge>;
      case 'scheduled':
        return <Badge className="bg-admin-primary/20 text-admin-primary">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-gray-500/20 text-gray-600">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-admin-danger/20 text-admin-danger">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'call':
        return <PhoneCall className="w-4 h-4" />;
      case 'meeting':
        return <Users className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const selectedDateAppointments = getAppointmentsForDate(selectedDate);

  // Get dates that have appointments for calendar highlighting
  const appointmentDates = appointments.map(apt => apt.date);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Calendar & Appointments</h1>
          <p className="text-text-secondary mt-2">
            Manage your appointments and schedule
          </p>
        </div>
        <Dialog open={isAddingAppointment} onOpenChange={setIsAddingAppointment}>
          <DialogTrigger asChild>
            <Button className="bg-admin-primary hover:bg-admin-primary-dark">
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Client
                </Label>
                <Input id="client" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="video">Video Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddingAppointment(false)}>
                Cancel
              </Button>
              <Button className="bg-admin-primary hover:bg-admin-primary-dark">
                Schedule
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Today's Appointments</p>
                <p className="text-2xl font-bold text-text-primary">
                  {getAppointmentsForDate(new Date()).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-admin-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">This Week</p>
                <p className="text-2xl font-bold text-text-primary">12</p>
              </div>
              <Users className="h-8 w-8 text-admin-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Confirmed</p>
                <p className="text-2xl font-bold text-text-primary">8</p>
              </div>
              <div className="h-8 w-8 bg-admin-success rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-card-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-secondary">Pending</p>
                <p className="text-2xl font-bold text-text-primary">4</p>
              </div>
              <div className="h-8 w-8 bg-admin-warning rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="border-card-border lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-text-primary">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border-0 p-3 pointer-events-auto"
              modifiers={{
                hasAppointment: appointmentDates,
              }}
              modifiersStyles={{
                hasAppointment: {
                  backgroundColor: 'hsl(var(--admin-primary) / 0.2)',
                  color: 'hsl(var(--admin-primary))',
                  fontWeight: 'bold',
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Selected Date Appointments */}
        <Card className="border-card-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-text-primary">
              Appointments for {format(selectedDate, 'MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateAppointments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-text-secondary">No appointments scheduled for this date.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDateAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-card-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getTypeIcon(appointment.type)}
                          <h3 className="font-semibold text-text-primary">
                            {appointment.title}
                          </h3>
                          {getStatusBadge(appointment.status)}
                        </div>
                        <p className="text-sm text-text-secondary mb-1">
                          <strong>Client:</strong> {appointment.client}
                        </p>
                        <p className="text-sm text-text-secondary mb-1">
                          <strong>Time:</strong> {appointment.time} ({appointment.duration} min)
                        </p>
                        {appointment.location && (
                          <p className="text-sm text-text-secondary mb-1 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {appointment.location}
                          </p>
                        )}
                        <p className="text-sm text-text-muted">
                          {appointment.description}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-admin-danger hover:text-admin-danger"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;