"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import {  registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"


 

 
const RegisterForm = ({ user }: { user: User }) => {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {

    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // saving the uploaded file
    let formData;
    if(values.identificationDocument && values.identificationDocument.length > 0)
    {
        const blobFile = new Blob([values.identificationDocument[0]], {
            type: values.identificationDocument[0].type,
        })

        formData = new FormData();
        formData.append('blobFile', blobFile);
        formData.append('fileName', values.identificationDocument[0].name);
    }

    try 
    {
      const patientData = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocument: values.identificationDocument
          ? formData
          : undefined,
        privacyConsent: values.privacyConsent,
      }

      // @ts-ignore
      const newPatient = await registerPatient(patientData);

      if(newPatient) 
      {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } 
    catch (error) 
    {
      console.log(error);
    }

    setIsLoading(false);
    
  }

   return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">

        <section className="space-y-4">
            <h2 className="header">Welcome 👋</h2>
            <p className="text-dark-700">Let us know more about yourself.</p>
        </section>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className=" sub-header">Personal Information</h2>
            </div>
        </section>
        
        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='name'
            label='Username'
            placeholder='enter your name'
            iconSrc='/assets/icons/user.svg'
            iconAlt='user'
        />

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='email'
                label='Email'
                placeholder='enter your email'
                iconSrc='/assets/icons/email.svg'
                iconAlt='email'
            />

            <CustomFormField 
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name='phone'
                label='Phone'
                placeholder='enter your number'
                
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name='birthDate'
                label='Date of Birth'
                placeholder='enter your birth date'
                iconSrc='/assets/icons/email.svg'
                iconAlt='email'
            />

            <CustomFormField 
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name='gender'
                label='Gender'
                renderSkeleton={(field) => (
                    <FormControl>
                        <RadioGroup 
                            className="flex h-11 gap-6 xl:justify-between" 
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                                
                              {GenderOptions.map((option) => (
                                <div className="radio-group" key={option}>
                                    <RadioGroupItem 
                                        value={option}
                                        id={option}
                                    />
                                    <Label htmlFor={option} className="cursor-pointer">
                                        {option}
                                    </Label>
                                </div>
                              ))}  
                                
                        </RadioGroup>
                    </FormControl>
                )}
                
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='address'
                label='Address'
                placeholder='enter your address'
                
            />

            <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='occupation'
                label='Occupation'
                placeholder='enter your occupation'
                
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='emergencyContactName'
                label='Emergency Contact Name'
                placeholder='guardians name'
                
            />

            <CustomFormField 
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name='emergencyContactNumber'
                label='Emergency Contact Number'
                placeholder='emergency contact number'
                
            />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className=" sub-header">Medical Information</h2>
            </div>
        </section>

        <CustomFormField 
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name='primaryPhysician'
            label='Primary Physician'
            placeholder='Select a physician'
                
        >
            {Doctors.map((doctor) => (
                <SelectItem key={doctor.name}
                value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                        <Image
                           src={doctor.image}
                           width={32}
                           height={32}
                           alt={doctor.name}
                           className='rounded-full border border-dark-500'
                        />
                        <p>{doctor.name}</p>
                    </div>
                </SelectItem>
            ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='insuranceProvider'
                label='Insurance Provider'
                placeholder='Your insurance provider'
                
            />

            <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='insurancePolicyNumber'
                label='Insurance Policy Number'
                placeholder='ABC12345678'
                
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='allergies'
                label='Allergies (any)'
                placeholder='Gluten, pollen, etc'
                
            />

            <CustomFormField 
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='currentMedication'
                label='Current Medication'
                placeholder='Paracetamol, Ibuprofen'
                
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='familyMedicalHistory'
                label='Family Medical HIstory'
                placeholder='Heart Disease, Diabetes, etc'
                
            />

            <CustomFormField 
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name='pastMedicalHistory'
                label='Past Medical History'
                placeholder='Any surgeries done?'
                
            />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className=" sub-header">Identification & Verification</h2>
            </div>
        </section>

        <CustomFormField 
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name='identificationType'
            label='Identification Type'
            placeholder='Select ID Type'
                
        >
            {IdentificationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                    {type}
                </SelectItem>
            ))}
        </CustomFormField>

        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='identificationNumber'
            label='Identification Number'
            placeholder='1234567890'
                
        />

        <CustomFormField 
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name='identificationDocument'
            label='Upload Documents'
            renderSkeleton={(field) => (
                <FormControl>
                    <FileUploader files={field.value} onChange={field.onChange}/>
                </FormControl>
            )}
            
        />

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className=" sub-header">Consent & Privacy</h2>
            </div>
        </section>

        <CustomFormField 
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to treatment"
        />
        <CustomFormField 
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to disclosure of information"
        />
        <CustomFormField 
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I consent to privacy policy"
        />

        

        <SubmitButton isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
