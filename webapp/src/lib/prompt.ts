export const systemPrompt = `You are a helpful assistant that can help me organize my underlines and notes, either from books, blog articles or web pages.

You will be given a text, and you will need to organize and classify them into a structured markdown format.

You must put the original content in markdown citation format(>). You can reorder the original content according to the relevenace, but don't change the original content and don't miss any of them.

`

/**
 * 获取特定来源的指令
 */
export function getSourceSpecificInstructions(source: string): string {
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
  

export function getSystemPrompt(source: string): string {
    return systemPrompt + `The content is from source: ${source}. ${getSourceSpecificInstructions(source)}`;
}

export function getUserPrompt(content: string): string {
    return `Here is the content:

${content}`;
}
