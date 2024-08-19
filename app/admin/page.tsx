import {DataTable} from '@/components/table/DataTable'
import StatCard from '@/components/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {columns} from '@/components/table/columns'




const Admin = async () => {

    const appointments = await getRecentAppointmentList();
    

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className='admin-header'>
            <Link href='/' className='cursor-pointer'>
            <div className="flex space-x-4 items-center">

                <Image 
                src='/assets/images/healthcare.png' 
                alt="healthcare logo"
                width={1000}
                height={1000}
                className=" h-8 w-fit"
                /> 

                <h1 className="text-3xl font-bold ml-4 ">
                Health Hub
                </h1>

            </div>
            </Link>
            <p className='text-16-semibold'>Admin Dashboard</p>
        </header>

        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'>Welcome</h1>
                <p className='text-dark-700'>Manage new appointments.</p>
            </section>

            <section className='admin-stat'>
                <StatCard 
                    type="appointments"
                    count={appointments.scheduledCount}
                    label="Scheduled Appointments"
                    icon="/assets/icons/appointments.svg"   
                />

                <StatCard 
                    type="pending"
                    count={appointments.pendingCount}
                    label="Pending Appointments"
                    icon="/assets/icons/pending.svg"   
                />

                <StatCard 
                    type="cancelled"
                    count={appointments.cancelledCount}
                    label="Cancelled Appointments"
                    icon="/assets/icons/cancelled.svg"   
                />
            </section>

            <DataTable columns={columns} data={appointments.documents}/> 
            
        </main>
    </div>
  )
}

export default Admin