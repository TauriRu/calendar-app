import React, { useState } from 'react';

type EventFormProps = {
  onEventAdd: (newEvent: { title: string; date: string }) => void;
};

const EventForm: React.FC<EventFormProps> = ({ onEventAdd }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && date) {
      onEventAdd({ title, date });
      setTitle('');
      setDate('');
    }
  };

  return (
    <div className="event-form">
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default EventForm;
