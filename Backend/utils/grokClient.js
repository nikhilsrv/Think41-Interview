// grokClient.js
import Groq from "groq-sdk";
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function queryGrok({ systemPrompt, userMessage, history = [] }) {
  const chatHistory = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: userMessage },
  ];

  const completion = await groq.chat.completions.create({
    messages: chatHistory,
    model: "llama3-70b-8192", // correct model name (alias of llama-3-70b)
  });

  return completion.choices[0]?.message?.content || "";
}
