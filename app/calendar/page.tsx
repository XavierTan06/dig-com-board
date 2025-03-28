'use client';

import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, SlotInfo, Event as BigCalendarEvent } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { getEvents, makeEvent, rsvpEvent } from '@/app/actions'; // Import server-side functions

const localizer = momentLocalizer(moment);

export interface Event {
  title: string;
  description: string;
  start: Date;
  end: Date;
  participant_count: number;
  event_id?: string; // Add event_id to the Event interface
}

const MyCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const result = await getEvents();
      const fetchedEvents = result.map((event: any) => ({
        title: event.title,
        description: event.description,
        start: new Date(`${event.event_date}T${event.start_time}`), // Convert to full Date object
        end: new Date(`${event.event_date}T${event.end_time}`),
        participant_count: event.pax,
        event_id: event.event_id, // Add event_id to the fetched event
      }));
  
      setEvents(fetchedEvents);
      console.log(fetchedEvents);
    };
  
    fetchEvents();
  }, []);
  
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedEvent(null); // Reset selectedEvent when selecting a new slot
    setSelectedDate(slotInfo.start);
    setIsModalOpen(true);
  };

  const handleSelectEvent = (event: BigCalendarEvent) => {
    setSelectedEvent(event as Event);
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

  const handleRSVP = async () => {
    if (selectedEvent) {
      console.log(selectedEvent);
      await rsvpEvent(selectedEvent); // event id undefined
      setSelectedEvent({ ...selectedEvent, participant_count: selectedEvent.participant_count + 1 });
      setEvents(events.map(event => event.event_id === selectedEvent.event_id ? selectedEvent : event));
      setIsModalOpen(false);
    }
  };

  const eventPropGetter = (event: BigCalendarEvent) => {
    return {
      style: { //for agenda, event cells are overwritten by rbc-event in globals.css
        backgroundColor: '#f0f0f0',
        color: 'black',
        borderRadius: 'px',
        border: '1px black solid',
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
    <div className="flex flex-col items-center p-8 gap-5 relative z-0">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          style={{ height: 500, zIndex: 50 }}
          eventPropGetter={eventPropGetter}
          components={{
            agenda: {
              event: eventAgenda,
            },
          }}
        />

      {/* Modal for adding event */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent ? 'RSVP to Event' : 'Add Event'}</DialogTitle>
          </DialogHeader>
          {selectedEvent ? (
            <>
              <div>
                <strong>{selectedEvent.title}</strong>
                <p>{selectedEvent.description}</p>
                <p>Participants: {selectedEvent.participant_count}</p>
              </div>
              <DialogFooter>
                <Button onClick={handleRSVP}>RSVP</Button>
              </DialogFooter>
            </>
          ) : (
            <>
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
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default function CalendarApp() {
  return (
      <MyCalendar />
  );
}
