# Phase 2: Intelligent News Gathering (Backend Logic)

## Goal
Implement the core intelligence of the application: the Agent. This phase focuses on the backend logic to search for news using Tavily, synthesize the information using Groq, and generate a natural language script suitable for an avatar.

## Context
**Previous Phases Completed:**
- **Phase 1**: The UI skeleton is ready. Users can select categories, and the visual structure is in place. We have a visual container ready to receive content.

## Instructions

### 1. Environment Setup
- Create a `.env.local` file (if not exists) and add placeholders for:
    - `TAVILY_API_KEY`
    - `GROQ_API_KEY`
- **Important**: Instruct the user to provide these keys if they are missing.

### 2. Utility Functions / Services
Create a `lib/` or `services/` directory to house the business logic.

- **`lib/tavily.ts`**:
    - **Documentation**: Use `search_web` to find the "Tavily API Node.js SDK documentation" or generic REST API docs to ensure you are using the correct endpoints and request format.
    - Implement a function `searchNews(query: string)` that calls the Tavily API.
    - It should return a list of valid articles/summaries.
    - Handle empty results or API errors gracefully.

- **`lib/groq.ts`**:
    - **Documentation**: Use `search_web` to search for "Groq Cloud API documentation" to verify the client initialization and chat completion syntax.
    - Implement a client for Groq.
    - Create a function `generateScript(articles: any[], topic: string)` that sends the search results to the LLM.
    - **Prompt Engineering**: Write a detailed system prompt for the Groq model. It must:
        - Act as a professional news editor.
        - Synthesize multiple sources into a coherent narrative.
        - **Critical**: Ensure smooth transitions between distinct news items. Do not just list them; weave them into a broadcast flow ("In other news...", "Moving on to...").
        - **Crucially**: The output must be “spoken word” style (conversational, no complex headers, clear pauses).
        - Limit the length (e.g., 150-200 words) to keep the video concise.

- **`lib/agent.ts`**:
    - Create a main orchestration function `getNewsPresentation(category: string)`.
    - Logic:
        1. Formulate a search query based on the category.
        2. Call `searchNews`.
        3. **Sufficiency Check (Mandatory)**: Call the LLM briefly to check if the gathered articles provide "comprehensive coverage" of the topic.
        4. **Retry Loop**: If the check fails (e.g., "missing context"), generate a refined search query and search again (up to 1 retry).
        5. Call `generateScript` with the combined results.
        6. Return the final script and sources.

### 3. API Integration
- Create a Next.js API route (e.g., `app/api/generate-news/route.ts`).
- It should accept a POST request with `{ category: string }`.
- It should call the `getNewsPresentation` orchestration function.
- Return JSON: `{ script: string, sources: string[] }`.

### 4. Frontend Integration
- Update the `Fetch News` flow in `models/UI`.
- Replace the mock delay with a real `fetch` call to your new API.
- Display the **Generated Script** as text in the `NewsContainer` (for debugging/verification before we add video).
- Display the **Sources** below the script for credibility.

## User Intervention
- If the generic search queries ("latest [category] news") yield poor results, ask the user if they want to define specific sub-topics or search terms for each category.

## Verification
- Use `curl` or Postman (or the frontend) to hit the API with "Technology".
- specific check:
    - Does Tavily return results?
    - Does Groq return a script?
    - Is the script conversational? (Read it out loud).
    - **Coverage**: Does the script cover multiple relevant stories? (Verify "Comprehensive Coverage" metric).
- Verify that the frontend displays the text result correctly after the loading state.

## Final Step: Update Tracker
- Open `phases/phase_tracker.md`.
- Mark **Phase 2** as "Completed" `[x]`.
- Add a brief implementation summary (e.g., "Implemented Tavily & Groq API, created generate-news endpoint").
