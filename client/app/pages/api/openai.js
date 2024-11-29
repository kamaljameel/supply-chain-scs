// import { OpenAIApi, Configuration } from "openai";
// import { NextResponse } from "next/server";

// // POST method handler
// export async function POST(req) {
//   const { question } = await req.json();

//   if (!question) {
//     return NextResponse.json(
//       { error: "Question is required" },
//       { status: 400 }
//     );
//   }

//   const configuration = new Configuration({
//     apiKey:
//       "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", // Fixed typo from 'apikey' to 'apiKey'
//   });
//   const openai = new OpenAIApi(configuration);

//   try {
//     const result = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: question,
//       max_tokens: 500, // Corrected to 'max_tokens'
//     });

//     return NextResponse.json({ answer: result.data.choices[0].text });
//   } catch (error) {
//     console.error("OpenAI API error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
