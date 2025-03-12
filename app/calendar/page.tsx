'use client';

import { useState } from 'react';
import { Calendar, momentLocalizer, SlotInfo, Event as BigCalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
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

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedDate(slotInfo.start);
    setIsModalOpen(true);
  };

  const handleAddEvent = () => {
    if (eventTitle.trim() && selectedDate) {
      const newEvent: Event = {
        id: events.length + 1,
        title: eventTitle,
        description: eventDescription,
        start: selectedDate,
        end: moment(selectedDate).add(1, 'hour').toDate(),
        participant_count: 1,
      };
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
