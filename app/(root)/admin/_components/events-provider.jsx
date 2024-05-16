'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getAllEvents } from '@/app/api/events/route';

export const EventsContext = createContext();

const EventsContextProvider = ({ children }) => {

    const [events, setEvents] = useState([]);

    // FETCH EVENTS
    const fetchEvents = async () => {
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
    };

    // DISPLAY EVENTS
    useEffect(() => {
        fetchEvents();
    }, []);

    const value = {
        events
    };

    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    );
};

export default EventsContextProvider;

export const useEvents = () => {
    const context = useContext(EventsContext);
    if (!context)
        throw new Error('useEvents must be used within an EventsContextProvider');
    return context;
};
