import Groq from "groq-sdk";
import { NewsArticle } from "./tavily";

// Initialize Groq client - expects GROQ_API_KEY in process.env
// The SDK automatically picks up GROQ_API_KEY from environment
const groq = new Groq();

const SYSTEM_PROMPT = `
You are an expert broadcast news editor and scriptwriter for a succinct, high-energy technology news show called "Briefly".
Your goal is to synthesize multiple news articles into a cohesive, engaging, spoken-word script for an AI news anchor.

**Guidelines:**
1. **Tone**: Professional, conversational, enthusiastic, and authoritative. Like a top-tier tech YouTuber or news anchor.
2. **Structure**:
   - **Hook**: Start with a quick, punchy greeting and the biggest headline.
   - **Body**: Weave the stories together logically. Use transition phrases ("In other developments...", "Meanwhile...").
   - **Conclusion**: A brief wrap-up sentence.
3. **Format**: PURE SPOKEN TEXT. No markdown headers (##), no bullet points, no [Source] citations in the text.
4. **Length**: Keep it tightly edited. Between 150-200 words total.
5. **Clarity**: Avoid jargon where possible, or explain it briefly. Write for the ear, not the eye.
`;

export async function generateScript(articles: NewsArticle[], topic: string): Promise<string> {
  if (!articles || articles.length === 0) {
    return `I'm sorry, but I couldn't find any significant recent news about ${topic} at this moment. Please try again later or choose a different category.`;
  }

  // Prepare the context from articles
  const context = articles.map((a, i) => 
    `[Story ${i+1}] ${a.title} (Source: ${a.source}): ${a.content}`
  ).join("\n\n");

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { 
          role: "user", 
          content: `Topic: ${topic}\n\nHere are the latest news summaries:\n${context}\n\nWrite the broadcast script now.` 
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_completion_tokens: 300,
    });

    return completion.choices[0]?.message?.content || "Failed to generate script.";
  } catch (error) {
    console.error("Error generating script with Groq:", error);
    return "I encountered an issue while writing the news script. Please try again shortly.";
  }
}
