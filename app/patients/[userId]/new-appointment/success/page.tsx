import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = async ({ params: {userId}, searchParams}: SearchParamProps) => {

    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointment(appointmentId);

    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);

  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
        <div className="success-img">
            <Link href='/'>
                <div className="flex space-x-4 ">

                    <Image 
                    src='/assets/images/healthcare.png' 
                    alt="healthcare logo"
                    width={1000}
                    height={1000}
                    className="mb-12 h-10 w-fit"
                    /> 

                    <h1 className="text-3xl font-bold ml-4 ">
                    Health Hub
                    </h1>

                </div>
            </Link>

            <section className='flex flex-col items-center'>
                <Image
                    src='/assets/gifs/success.gif'
                    alt='success-gif'
                    width={300}
                    height={300}
                />
                <h2 className='header mb-6 max-w-[600px] text-center'>
                    Your <span className='text-green-500'>appointment request</span> has been successfully submitted!
                </h2>
                <p>We&apos;ll be in touch shortly to confirm.</p>
            </section>

            <section className='request-details'>
                <p className='text-gray-300'>Requested appointment details:</p>
                <div className="flex items-center gap-3">
                    <Image
                        src={doctor?.image!}
                        alt='doctor image'
                        height={100}
                        width={100}
                        className='size-16'
                    />
                    <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
                </div>

                <div className="flex gap-2">
                    <Image 
                        src='/assets/icons/calendar.svg'
                        height={24}
                        width={24}
                        alt='calendar'
                    />
                    <p>{formatDateTime(appointment.schedule).dateTime}</p>
                </div>
            </section>

            <Button variant='outline' className='shad-primary-btn' asChild>
                <Link href={`/patients/${userId}/new-appointment`}>
                    New Appointment
                </Link>
            </Button>

            <p className="justify-items-end text-dark-600 xl:text-left copyright mt-10">
                © 2024 Health Hub
            </p>
            
        </div>
    </div>
  )
}

export default Success