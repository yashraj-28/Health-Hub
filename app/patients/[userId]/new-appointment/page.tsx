import AppointmentForm from "@/components/forms/AppointmentForm";

import { Button } from "@/components/ui/button";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";



export default async function NewAppointment({ params: { userId}}: SearchParamProps) {

    const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">

      {/* TODO: OTP Verification */}

      <section className="remove-scrollbar container my-auto">
        <div className="flex-1 sub-container max-w-[860px] justify-between">
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
          
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          

            <p className="justify-items-end text-dark-600 xl:text-left copyright mt-10">
                © 2024 Health Hub
            </p>

            

          

        </div>
      </section>
      
      <Image 
        src='/assets/images/appointment-img.png'
        alt="appointment"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
