# Phase 4: Polish, Optimization & Deployment Prep

## Goal
Finalize the application for a "Production-Ready" feel. Focus on error handling, edge cases, performance optimization, and visual polish.

## Context
**Previous Phases Completed:**
- **Phase 1**: UI structure complete.
- **Phase 2**: News gathering and script generation working.
- **Phase 3**: Avatar succesfully reading the news.
**Current State**: We have a working MVP, but it might be fragile or lack "wow" factor.

## Instructions

### 1. Error Handling & Resilience
- **API Failures**: What if Tavily fails? What if Groq times out?
    - Implement a robust `try/catch` in the API route.
    - Return specific error codes to the frontend.
    - Show a user-friendly "Newsroom technical difficulty" message instead of a generic crash.
- **Avatar Issues**:
    - Handle cases where the Avatar stream disconnects.
    - Provide a "Retry" button.

### 2. UX Improvements
- **Loading Skeletons**: Replace simple "Loading..." text with a shimmering skeleton UI or a "Producer is writing the script..." progress indicator.
- **Transitions**: Add smooth fade-ins for the video player when it appears.
- **Category Icons**: Ensure all categories have high-quality, relevant icons.

### 3. "Wow" Factor Enhancements
- **Dynamic Backgrounds**: Change the background subtle color based on the category (e.g., Red tint for Breaking News/Sports, Blue for Tech).
- **History/Recent**: (Optional) briefly show "Recently generated" clips if state persistence is easy to add, otherwise skip.

### 4. SEO & Metadata
- **Documentation**: Use `search_web` to check Next.js Metadata API docs if needed for proper implementation of open graph tags.
- Update `layout.tsx` with proper `<title>` and `<meta>` tags.
- Ensure the app is responsive and accessible (aria-labels on buttons).

### 5. Code Cleanup
- Remove any console.logs used for debugging.
- Type-check: Run `tsc --noEmit` to ensure no TypeScript errors.
- Lint: Run `npm run lint`.

## User Intervention
- Ask the user if they want to deploy this to Vercel now.
- Ask if there are final cosmetic tweaks before declaring "Subject Complete".

## Verification
- **Stress Test**: Try rapidly switching categories. Ensure the app doesn't crash or get confused state.
- **Mobile Check**: Open on a mobile simulator. Ensure the video player size is appropriate.
- **Final Walkthrough**: Perform the "Golden Path" (Start -> Select -> Watch) one last time.

## Final Step: Update Tracker
- Open `phases/phase_tracker.md`.
- Mark **Phases 4** as "Completed" `[x]`.
- Note down any final major changes.
