import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async ({ params: { userId } }: SearchParamProps) => {

    const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">

      {/* TODO: OTP Verification */}

      <section className="remove-scrollbar container">
        <div className="flex-1 flex-col sub-container max-w-[860px] py-10">
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
          
          <RegisterForm user={user}/>

          <p className="justify-items-end text-dark-600 xl:text-left pt-6">
            © 2024 Health Hub
          </p>
          

        </div>
      </section>
      
      <Image 
        src='/assets/images/register-img.png'
        alt="patient"
        width={1000}
        height={1000}
        className="side-img max-w-[400px]"
      />
    </div>
  )
}

export default Register