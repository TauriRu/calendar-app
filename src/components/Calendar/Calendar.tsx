import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import EventForm from '../EventForm/EventForm';


// Define the event type
type EventType = {
    id: number;
    title: string;
    date: string;
};

const Calendar = () => {
    const [events, setEvents] = useState<EventType[]>([]);

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/calendar-data');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Response is not in JSON format');
            }

            const data = await response.json();
            setEvents(data);
        } catch (error: any) {
            console.error('Error:', error.message);
            // You can add code here to display an error message to the user
        }
    };

    const handleEventAdd = async (newEvent: { title: any; date: any; }) => {
        try {
            const response = await fetch('http://localhost:3001/api/calendar-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            if (!response.ok) {
                throw new Error('Error adding event');
            }

            // After adding successfully, re-fetch events to update the calendar
            await fetchEvents();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEventUpdate = async (eventInfo: { event: { id: any; title: any; startStr: any; }; }) => {
        const updatedEvent = {
            id: eventInfo.event.id,
            title: eventInfo.event.title,
            date: eventInfo.event.startStr,
        };

        try {
            const response = await fetch(`http://localhost:3001/api/calendar-data/${updatedEvent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEvent),
            });

            if (!response.ok) {
                throw new Error('Error updating event');
            }

            // After updating successfully, re-fetch events to update the calendar
            await fetchEvents();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEventDelete = async (eventInfo: { event: { id: any; }; }) => {
        try {
            const response = await fetch(`http://localhost:3001/api/calendar-data/${eventInfo.event.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting event');
            }

            // After deleting successfully, re-fetch events to update the calendar
            await fetchEvents();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []); // Fetch events when the component mounts

    return (
        <div className="calendar-container">
            <EventForm onEventAdd={handleEventAdd} />

            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={Array.isArray(events)
                    ? events.map((event) => ({
                        id: event.id.toString(),
                        title: event.title,
                        date: event.date,
                    }))
                    : []}
                editable={true}
                eventChange={handleEventUpdate}
                eventRemove={handleEventDelete}
            />

        </div>
    );
};

export default Calendar;
