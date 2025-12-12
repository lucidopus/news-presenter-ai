export interface NewsArticle {
  title: string;
  url: string;
  content: string;
  publishedDate?: string;
  source?: string;
}

export async function searchNews(query: string): Promise<NewsArticle[]> {
  const apiKey = process.env.TAVILY_API_KEY;
  
  if (!apiKey) {
    console.error("Missing TAVILY_API_KEY");
    return [];
  }

  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: "basic",
        include_answer: false,
        include_images: false,
        include_raw_content: false,
        max_results: 5,
        topic: "news"
      }),
    });

    if (!response.ok) {
        throw new Error(`Tavily API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return (data.results || []).map((result: { title: string; url: string; content: string; published_date?: string }) => ({
      title: result.title,
      url: result.url,
      content: result.content,
      publishedDate: result.published_date,
      source: new URL(result.url).hostname.replace("www.", "")
    }));

  } catch (error) {
    console.error("Error searching news:", error);
    return [];
  }
}
