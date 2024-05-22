'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { UpdateEventDialog } from '../_components/UpdateEventDialog';
import { deleteEventById, getEventById } from '@/app/lib/event.db';
import { useEvents } from '../_components/events-provider';

const ManageEventDetailPage = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { id } = useParams();
    const { event, setEvent } = useEvents();

    useEffect(() => {
        const fetchEvent = async () => {
            const event = await getEventById(id);
            setEvent(event);
        };

        fetchEvent();

    }, [id]);

    // Mockup user data

    const attendingUsers = [
        {
            firstName: 'Emma',
            userID: 123
        },
        {
            firstName: 'Jennie Kim',
            userID: 456
        }
    ]

    return (
        <div className='mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-12 px-4 sm:px-6 py-12 md:py-26 lg:max-w-7xl lg:grid-cols-2 lg:px-8'>
            {event && (
                <>
                    <div>
                        <div className='flex justify-between'>
                            <div>
                                <h2 className='text-3xl font-bold tracking-tight text-primary sm:text-4xl'>
                                    {event.name}
                                </h2>
                                <p className='my-6 text-primary-muted leading-6'>
                                    {event.description}
                                </p>
                            </div>
                        </div>
                        <dl className='bg-primary-muted divide-y divide-gray-800/10 rounded-md border-2 border-gray-200 shadow-md text-gray-800'>
                            <div className='py-4 flex justify-center items-center flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 grid-flow-col'>
                                <dt className='mx-7 leading-4 text-sm font-semibold border-b-[3px] border-b-tertiary w-fit'>
                                    Location
                                </dt>
                                <dd className='mt-2 text-sm leading-6 sm:mt-0'>
                                    {event.location}
                                </dd>
                            </div>
                            <div className='py-4 flex justify-center items-center flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 grid-flow-col'>
                                <dt className='mx-7 leading-4 text-sm font-semibold border-b-[3px] border-b-tertiary w-fit'>
                                    Date and time
                                </dt>
                                <dd className='mt-2 text-sm leading-6 sm:mt-0'>
                                    {event.date}
                                </dd>
                            </div>
                            <div className='py-4 flex justify-center items-center flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 grid-flow-col'>
                                <dt className='mx-7 leading-4 text-sm font-semibold border-b-[3px] border-b-tertiary w-fit'>
                                    Places for this event
                                </dt>
                                <dd className='mt-2 text-sm leading-6 sm:mt-0'>
                                    {event.numberOfSpots}
                                </dd>
                            </div>
                            <div className='py-4 flex justify-center items-center sm:items-start flex-col sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0 grid-flow-col'>
                                <dt className='mx-7 leading-4 text-sm font-semibold border-b-[3px] border-b-tertiary w-fit'>
                                    Attending users
                                </dt>
                                <dd className='mt-2 flex flex-col text-sm gap-y-2 leading-6 sm:mt-0'>
                                    {event && event.bookedUsers.map(user => (
                                        <div key={user} className='items-center sm:items-start min-w-0 flex-auto flex flex-col'>
                                            <span className='text-sm font-medium leading-6 text-gray-900'>{user}</span>
                                            <span className='truncate text-xs leading-5 text-gray-500'>ID: {user}</span>
                                        </div>
                                    ))}
                                </dd>
                            </div>
                        </dl>
                        <div className='flex gap-4 mt-6'>
                            <button
                                className='secondary flex whitespace-nowrap items-center gap-2'
                                onClick={() => setIsDialogOpen(true)}>
                                <span>Update</span>
                            </button>
                            {isDialogOpen && (
                                <UpdateEventDialog
                                    isOpen={isDialogOpen}
                                    event={event}
                                    onClose={() => setIsDialogOpen(false)}
                                />
                            )}
                            <button
                                onClick={() => {
                                    deleteEventById('events', id);
                                }}
                                className='error flex whitespace-nowrap items-center gap-2'>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <Image
                            src={event.image || '/assets/placeholder.jpg'}
                            width={400}
                            height={400}
                            alt='event'
                            className='rounded-lg mx-auto'
                        />
                    </div>
                </>
            )}
        </div>
    );
};
export default ManageEventDetailPage;
