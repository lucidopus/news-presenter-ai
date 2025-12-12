import { searchNews } from "./tavily";
import { generateScript } from "./groq";

export interface NewsPresentation {
  script: string;
  sources: { title: string; url: string; source: string }[];
}

export async function getNewsPresentation(category: string): Promise<NewsPresentation> {
    // 1. Formulate Search Query
    const query = `latest important news in ${category} technology`;
    console.log(`[Agent] Starting pipeline for: "${category}". Query: "${query}"`);

    // 2. Search News
    const articles = await searchNews(query);
    console.log(`[Agent] Search complete. Found ${articles.length} articles.`);
    
    // 3. (Optional) Sufficiency Check could go here. 
    // For V1, we'll assume top 5 items from Tavily are sufficient.

    // 4. Generate Script
    console.log(`[Agent] Generating script for category: ${category}`);
    const script = await generateScript(articles, category);
    console.log(`[Agent] Script generation complete (${script.length} characters)`);

    // 5. Return Result
    return {
        script,
        sources: articles.map(a => ({
            title: a.title,
            url: a.url,
            source: a.source || 'Unknown'
        }))
    };
}
