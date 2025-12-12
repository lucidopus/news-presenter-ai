# briefly.ai - Project Plan

## What I Want to Build

I want to create **briefly.ai**, a web application where users can select a news category and have the latest news from that category presented to them by an AI avatar. The avatar should speak the news in a natural, engaging way, as if it's a real news presenter delivering a broadcast.

## The Core Problem

Staying informed about current events requires time and effort. People often want to catch up on news in specific areas (like technology, business, or sports) but don't have the time to read through multiple articles or watch lengthy news segments. They want a quick, engaging way to consume news that feels personal and conversational.

## How It Will Work

### The User Journey

1. **Category Selection**: Users arrive at the app and see a selection of news categories (like Technology, Business, Sports, Entertainment, etc.)

2. **Fetch News**: When a user clicks "Fetch News" for their chosen category, the app begins gathering the latest information about that topic

3. **Intelligent News Gathering**: Behind the scenes, an AI agent works to collect comprehensive information. It searches for news, evaluates what it finds, and may search multiple times to ensure it has all the crucial information about the topic. The agent decides when it has gathered enough context to create a complete news report.

4. **Script Generation**: Once satisfied with the information gathered, the AI agent creates a well-structured news script that covers all the important points in a natural, conversational format suitable for spoken delivery.

5. **Avatar Presentation**: The generated script is then delivered by an AI avatar that appears on screen. The avatar speaks the news with natural expressions, lip-sync, and a human-like voice, creating an engaging news presentation experience.

### The Experience I Want

- **Quick and Responsive**: Users should see results within a reasonable time (ideally under 30 seconds from click to avatar starting to speak)

- **Comprehensive Coverage**: The news script should cover all crucial information about the selected category, not just a single article or headline

- **Natural Delivery**: The avatar should speak in a natural, conversational tone that feels like watching a real news broadcast

- **Visual Engagement**: The avatar should be visually appealing with natural expressions and movements that match the speech

- **Reliable Information**: The news should be current, accurate, and from reputable sources

- **Simple Interface**: The user experience should be straightforward - select a category, click a button, and watch the news

## Essential Requirements

### Technology Stack (Specific Requirements)

- **Frontend Framework**: Next.js with TypeScript
- **News Data Source**: Tavily API (for real-time news search and aggregation)
- **AI Agent Platform**: Groq API (for fast AI inference with function calling capabilities)
- **Avatar Platform**: Anam.ai (for AI avatar text-to-speech and visual presentation)

### Core Functionality Requirements

1. **Category-Based News Selection**: Users must be able to select from predefined news categories

2. **Intelligent News Gathering**: The AI agent must be able to:
   - Search for news using the selected category
   - Evaluate the completeness of information gathered
   - Make multiple searches if needed to ensure comprehensive coverage
   - Decide autonomously when it has enough information

3. **Script Generation**: The agent must create a well-formatted news script that:
   - Covers all crucial information about the topic
   - Is written in a natural, conversational style
   - Is suitable for spoken delivery
   - Flows logically from one topic to another

4. **Avatar Narration**: The avatar must be able to:
   - Receive the generated script
   - Speak it naturally with proper intonation
   - Display appropriate facial expressions and movements
   - Provide a visually engaging presentation

### Success Criteria

The agent's work is successful when:
- All crucial information about the selected category/topic is covered
- The script is comprehensive and well-structured
- The information is current and relevant
- The script is ready for natural spoken delivery

## Success Metrics

- **Completeness**: The news script covers all major topics and breaking news in the selected category
- **Relevance**: The information is current and directly related to the selected category
- **Quality**: The script is coherent, engaging, and suitable for spoken presentation
- **User Satisfaction**: Users feel informed and engaged after watching the presentation
- **Performance**: The entire process (from click to avatar speaking) completes in a reasonable timeframe

## The Bigger Picture

**briefly.ai** represents a new way of consuming news - personalized, on-demand, and delivered in an engaging format. It combines the power of AI to gather and synthesize information with the human-like presentation of an avatar to create an experience that feels both efficient and personal.

The goal is to make staying informed easier and more enjoyable, allowing users to quickly catch up on news in areas they care about without the friction of reading multiple articles or watching long news segments. The name "briefly.ai" reflects this mission - delivering news briefly, efficiently, and intelligently.

## Key Considerations

- The AI agent should be smart enough to know when it has gathered sufficient information, avoiding both incomplete reports and excessive searching
- The news should be current and from reliable sources
- The avatar presentation should feel natural and engaging, not robotic
- The entire experience should feel seamless and responsive
- The application should handle errors gracefully (e.g., if no news is found, if the avatar fails to load, etc.)