//GET funktion ska vara här, hämta alla event

import { db } from '@/firebase.config';
import {
    collection,
    getDocs,
} from 'firebase/firestore';

export const getAllEvents = async () => {
    let events = [];
    
    try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        
        querySnapshot.forEach((doc) => {
            events.push(doc.data());
        });
        
        return events;
    } catch (error) {
        console.log('Could not fetch collection:', error.message);
    }
};