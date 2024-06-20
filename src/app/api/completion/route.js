import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages) => ({
  contents: messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant"
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});

export async function POST(req) {
  // Extract the `prompt` from the body of the request
  const { prompt, messages } = await req.json();

  console.log(messages);
  console.log(prompt);

  // Ask Google Generative AI for a streaming completion given the prompt
  const response = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream(
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      },
      {
        onStart: async () => {
          // This callback is called when the stream starts
          // You can use this to save the prompt to your database
          console.log("msgs", messages);
          // await savePromptToDatabase(messages);
        },
        onToken: async (token) => {
          // This callback is called for each token in the stream
          // You can use this to debug the stream or save the tokens to your database
          console.log("token");
          console.log(token);
        },
        onCompletion: async (completion) => {
          // This callback is called when the completion is ready
          // You can use this to save the final completion to your database

          console.log("completion");
          console.log(completion);
          // await saveCompletionToDatabase(completion);
        },
      }
    );

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
