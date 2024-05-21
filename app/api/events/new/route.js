//POST ska vara här, skicka med user ID

import { db } from "@/firebase.config";
import { addDoc, collection, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";


const addNewEvent = async (user, formData, initialFormData, setFormData) => {
    
    try {
        const docRef = await addDoc(collection(db, 'events'), {
            name: formData.name,
            location: formData.location,
            date: formData.date,
            numberOfSpots: formData.numberOfSpots,
            description: formData.description,
            image: formData.image,
            createdByUser: user.uid
        })

        await setDoc(docRef, {
            events: docRef.id,
            
        }, { merge: true });

        setFormData(initialFormData);
        
        
    } catch (error) {
        toast.error('Failed to create event, please try again.');
    } 
}

export default addNewEvent;
