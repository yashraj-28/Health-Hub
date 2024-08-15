import PatientForm from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default function Home({ searchParams}: SearchParamProps) {

  const isAdmin = searchParams.admin === 'true';
  return (
    <div className="flex h-screen max-h-screen">

      {isAdmin && (
        <PassKeyModal />
      )}

      <section className="remove-scrollbar container my-auto">
        <div className="flex sub-container max-w-[496px]">
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
          
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">

            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Health Hub
            </p>

            <Link href='/?admin=true' className="text-green-500">
              Admin
            </Link>

          </div>

        </div>
      </section>
      
      <Image 
        src='/assets/images/onboarding-img.png'
        alt="doctors"
        width={1000}
        height={1000}
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
