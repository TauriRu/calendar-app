import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import EventForm from '../EventForm/EventForm';
import { JsonDB, Config } from 'node-json-db';

var db = new JsonDB(new Config("calendar-data", true, false, '/'));


// Define the event type
type EventType = {
    id: number;
    title: string;
    date: string;
};

const Calendar = () => {
    const [events, setEvents] = useState<EventType[]>([]); // Specify the type as EventType[]

    const handleEventAdd = (newEvent: { title: any; date: any; }) => {
        const event = {
            id: events.length + 1,
            title: newEvent.title,
            date: newEvent.date,
        };
        setEvents([...events, event]);
    };

    const handleEventUpdate = (eventInfo: { event: { id: any; title: any; startStr: any; }; }) => {
        const updatedEvents = events.map((event) => {
            if (event.id === eventInfo.event.id) {
                return {
                    ...event,
                    title: eventInfo.event.title,
                    date: eventInfo.event.startStr,
                };
            }
            return event;
        });

        setEvents(updatedEvents);
    };

    const handleEventDelete = (eventInfo: { event: { id: any; }; }) => {
        const updatedEvents = events.filter((event) => event.id !== eventInfo.event.id);

        setEvents(updatedEvents);
    };

    return (
        <div className="calendar-container">
            <EventForm onEventAdd={handleEventAdd} />
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events.map((event) => ({
                    id: event.id.toString(),
                    title: event.title,
                    date: event.date,
                }))}
                editable={true}
                eventChange={handleEventUpdate}
                eventRemove={handleEventDelete}
            />
        </div>
    );
};

export default Calendar;
