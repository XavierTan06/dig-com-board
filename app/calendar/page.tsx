'use client';

import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, SlotInfo, Event as BigCalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { getEvents, makeEvent } from '@/app/actions'; // Import server-side functions

const localizer = momentLocalizer(moment);

export interface Event {
  title: string;
  description: string;
  start: Date;
  end: Date;
  participant_count: number;
}

const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const result = await getEvents();
      const fetchedEvents = result.map((event: any) => ({
        title: event.title,
        description: event.description,
        start: new Date(`${event.event_date}T${event.start_time}`), // Convert to full Date object
        end: new Date(`${event.event_date}T${event.end_time}`),
        participant_count: event.pax,
      }));
  
      setEvents(fetchedEvents);
    };
  
    fetchEvents();
  }, []);
  

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedDate(slotInfo.start);
    setIsModalOpen(true);
  };

  const handleAddEvent = async () => {
    if (eventTitle.trim() && selectedDate) {
      const newEvent: Event = {
        title: eventTitle,
        description: eventDescription,
        start: selectedDate,
        end: moment(selectedDate).add(1, 'hour').toDate(),
        participant_count: 1,
      };
      await makeEvent(newEvent);
      setEvents([...events, newEvent]);
      setIsModalOpen(false);
      setEventTitle('');
      setEventDescription('');
    }
  };

  const eventPropGetter = (event: BigCalendarEvent) => {
    return {
      style: {
        backgroundColor: '#3174ad',
        color: 'white',
        borderRadius: '0px',
        border: 'none',
      },
    };
  };

  const eventAgenda = ({ event }: { event: Event }) => (
    <span>
      <strong>{event.title}</strong>
      <div>{event.description}</div>
      <div>Participants: {event.participant_count}</div>
    </span>
  );

  return (
    <div className="w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          style={{ height: 500, zIndex: 50 }}
          eventPropGetter={eventPropGetter}
          components={{
            agenda: {
              event: eventAgenda,
            },
          }}
        />
      </div>

      {/* Modal for adding event */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Event title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Event description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={handleAddEvent}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default function CalendarApp() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-5">
      <MyCalendar />
    </div>
  );
}
