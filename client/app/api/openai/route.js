import { OpenAIApi, Configuration } from "openai";
import { NextResponse } from "next/server";

// POST method handler
export async function POST(req) {
  const { question } = await req.json();

  if (!question) {
    return NextResponse.json(
      { error: "Question is required" },
      { status: 400 }
    );
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Fixed typo from 'apikey' to 'apiKey'
  });
  const openai = new OpenAIApi(configuration);

  try {
    const result = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      max_tokens: 500, // Corrected to 'max_tokens'
    });

    return NextResponse.json({ answer: result.data.choices[0].text });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
