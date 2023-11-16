import {NextRequest,NextResponse} from "next/server"
import openai from "../../../../lib/chatgpt"

export async function GET(req:NextRequest,res:NextResponse) {
    const models = await openai.listModels().then((res)=>res.data.data)
    console.log(models)

    const modelOptions = models.map((model) => ({
        value : model.id,
        label : model.id
    }))
    console.log(modelOptions)
    return NextResponse.json({modelOptions})
}