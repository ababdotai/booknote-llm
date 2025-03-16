import OpenAI from "openai";
import { NextResponse } from "next/server";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { content, source = "other" } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // System prompt from the template
    const systemPrompt = `You are a helpful assistant that can help me organize my underlines and notes, either from books, blog articles or web pages.

You will be given a text, and you will need to organize and classify them into a structured markdown format.

You should put the original content in citation format. You can reorder the original content according to the relevenace, but don't change the original content and don't miss any of them.

The content is from source: ${source}. ${getSourceSpecificInstructions(source)}`;

    // User prompt from the template
    const userPrompt = `Here is the content:

${content}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return NextResponse.json({
      result: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

function getSourceSpecificInstructions(source: string): string {
  switch (source) {
    case "kindle":
      return "For Kindle highlights, pay attention to the location information and organize by chapters if possible.";
    case "weread":
      return "For WeRead (微信读书) highlights, organize by chapters and include any reader comments.";
    case "wechat":
      return "For WeChat (微信公众号) articles, focus on extracting key points and organizing by themes.";
    case "web":
      return "For web content, organize by sections and highlight important information.";
    default:
      return "Organize the content in a logical structure with headings and subheadings.";
  }
} 