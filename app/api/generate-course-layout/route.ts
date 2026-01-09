import { db } from "@/config/db";
import { openai } from "@/config/openai";
import { coursesTable } from "@/config/schema";
import { COURSE_CONFIG_PROMPT } from "@/data/prompt";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){
    const {userInput,courseId,type} = await req.json();
    const user =await currentUser();

    const response =await  openai.chat.completions.create({
        model: "gemini-2.5-flash",
        messages:[
                {role:'system', content:COURSE_CONFIG_PROMPT},
                {role:'user', content:'Course Topic is'+userInput}
        ]

    });

    const rawResult=response.choices[0].message?.content||'';
    
    // Remove markdown code block formatting if present
    let cleanResult = rawResult;
    if(cleanResult.includes('```')) {
        cleanResult = cleanResult.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    }
    
    const JSONResult=JSON.parse(cleanResult);

    // save to DB
    const courseResult=await db.insert(coursesTable).values({
        courseId:courseId,
        courseName:JSONResult.courseName,
        userInput:userInput,
        type:type,
        courseLayout:JSONResult,
        userId:user?.primaryEmailAddress?.emailAddress||'',
    }).returning();


    return NextResponse.json(courseResult[0]);
}