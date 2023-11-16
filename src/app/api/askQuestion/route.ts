import { NextResponse, NextRequest } from "next/server";
import query from "./../../../../lib/queryApi"
import admin from "firebase-admin"
import { adminDb } from "@/firebaseAdmin";



interface Data {
    answer:string,

}

export async function POST (
    req: NextRequest,
    res: NextResponse<Data>
) {

    const {prompt , chatId , model , session } = await req.json()

    if(!prompt) {
        return
    }
    if(!chatId){
        return
    }

    // GPT Query

    const response = await query(prompt, model)

    const message:Message = { 
        text: response as string  || "MyGPT was unable to find an answer for that"  ,
        createdAt : admin.firestore.Timestamp.now(),
        user: {
            _id : "MyGPT",
            name: "MyGPT",
            avatar: "/gpt-logo.png"
        }
    }



    // add to db

    await adminDb.collection("users").doc(session.user.email).collection("chats").doc(chatId).collection("messages").add(message)

    return NextResponse.json({answer:message})
}