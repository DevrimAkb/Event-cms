'use client';

import { EventsList } from './_components/EventsList';
import { UsersList } from './_components/UsersList';
import Link from 'next/link';
import { FaPlus } from "react-icons/fa";
import { useAuth } from './_components/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminPage = () => {

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/sign-in');     
        } 
            
    }, [user, router]);
    
    return (
        <>
            <header>
                <div className='max-w-7xl mt-10 px-6 md:px-16 lg:px-36 flex justify-between'>
                        <h1 className='mb-2 text-3xl font-bold tracking-tight text-primary underline underline-offset-8 decoration-2 decoration-[var(--tertiary)]'>
                            Dashboard
                        </h1>
                </div>
            </header>
            <main className='my-10 flex flex-col justify-center mx-4 md:mx-14 lg:mx-32 gap-y-10'>
                <div className='grid grid-cols-2 gap-10'>
                    <div className='p-6 rounded-3xl border-dashed border-slate-600 border-2'>
                        <div>
                            <h3 className='mb-6'>Manage content</h3>
                            <div className='flex gap-3'>
                                <Link href='/admin/new'>
                                    <button className='flex items-center gap-2'>
                                        <span>Add new event</span>
                                    </button>
                                </Link>
                                <Link href='/admin/users'>
                                    <button className='flex items-center gap-2'>
                                        <span>Manage users</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='p-6 rounded-3xl border-dashed border-slate-600 border-2'>
                        <div className='flex justify-between items-center mb-6'>
                            <h3>All users</h3>
                            <Link href='/admin/new'>
                            </Link>
                        </div>
                        <UsersList />
                    </div>
                </div>

                <div className='grid grid-cols-1'>
                    <div className='p-6 rounded-3xl border-dashed border-slate-600 border-2'>
                        <div className='flex justify-between items-center mb-6'>
                            <h3>All events</h3>
                            <Link href='/admin/new'>
                                <button className='secondary flex items-center gap-2'>
                                    <span>Add new</span>
                                    <FaPlus />
                                </button>
                            </Link>
                        </div>
                        <EventsList />
                    </div>
                </div>
            </main>
        </>
    );
};
export default AdminPage;
