"use client"
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import TextareaAutosize from "react-textarea-autosize"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Loader2, Send } from 'lucide-react'
import { QUICK_VIDEO_SUGGESTIONS } from '@/data/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { SignInButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'

const Hero = () => {

  const [userInput,SetUserInput]=useState('');
  const [type,SetType]=useState('full-course');
  const[loading,setLoading]=useState(false);
  const{user}=useUser();
  const router=useRouter();

  const GenerateCourseLayout= async()=>{
  const toastId=toast.loading('Generating Course Layout...');
  const courseId=await crypto.randomUUID();

    try{
    setLoading(true);
    const result=await axios.post('/api/generate-course-layout',{
      userInput,
      type,
      courseId:courseId
    });
    console.log(result.data);
    setLoading(false);
    toast.success('Course Layout Generated Successfully!',
      {id:toastId});
      // navigate to course editor page
      router.push('/course/'+courseId);
    }catch(err){
      setLoading(false);
      toast.error('Failed to Generate Course Layout. Please try again.',{id:toastId});
    }
  }

  return (
    <div className='flex items-center flex-col mt-20'>
        <div>
            <h2 className='text-4xl font-bold'>Learn Smarter with <span className='text-primary'>AI Video Courses</span></h2>
            <p className='text-center text-xl text-gray-500 mt-3'>Turn Any Topic into a Complete Course</p>
        </div>
         <div className="grid w-full max-w-xl mt-5 gap-6 bg-white z-10">
      <InputGroup>
        <InputGroupTextarea
          data-slot="input-group-control"
          className="flex field-sizing-content min-h-24 w-full resize-none rounded-xl bg-white px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
          placeholder="Enter your course topic..."
          value={userInput}
          onChange={(e) => SetUserInput(e.target.value)}
        />
        <InputGroupAddon align="block-end">
{/* select */}
        <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Full Course" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="full-course">Full Course</SelectItem>
                    <SelectItem value="quick-explain-video">Quick Explain Video</SelectItem>
                </SelectContent>
        </Select>

        {user?
          <InputGroupButton className="ml-auto" size="icon-sm" variant="default"
          onClick={GenerateCourseLayout}
           disabled={loading}>
           
           {loading?<Loader2 className='animate-spin'/>: <Send />} 
          </InputGroupButton>
          :<SignInButton mode='modal'>
          <InputGroupButton className="ml-auto" size="icon-sm" variant="default"
          onClick={GenerateCourseLayout}
           disabled={loading}>
           
           {loading?<Loader2 className='animate-spin'/>: <Send />} 
          </InputGroupButton>
          </SignInButton>}
        </InputGroupAddon>
      </InputGroup>
    </div>
    <div className='flex gap-5 mt-5 max-w-3xl flex-wrap justify-center z-10'>
        {QUICK_VIDEO_SUGGESTIONS.map((suggestion,index) =>(
            <h2 key={index} onClick={()=>SetUserInput(suggestion?.prompt)} className='border cursor-pointer rounded-2xl px-2 text-sm bg-white'>{suggestion.title}</h2>
        ))}
    </div>
    </div>
  )
}

export default Hero
