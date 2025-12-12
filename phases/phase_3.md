# Phase 3: Avatar Integration (Anam.ai)

## Goal
Bring the news to life by connecting the generated script to the Anam.ai avatar platform. This phase involves sending the script to the avatar API and rendering the interactive/streaming video response in the frontend.

## Context
**Previous Phases Completed:**
- **Phase 1**: UI is built.
- **Phase 2**: The Agent can successfully search news and write a script. We currently display this script as text.

## Instructions

### 1. Anam.ai Setup
- **Documentation**: **Critical**. Use `search_web` to search for "Anam.ai API documentation" or "Anam.ai SDK React". Since this is a niche/new platform, you must verify the exact integration method (e.g., is it a REST API, a WebSocket, or a client-side SDK?).
- **Latency Verification**: Explicitly check if Anam.ai supports **Real-time Streaming** (LLM-to-Audio/Video). If it requires full video pre-rendering, flag this as a potential risk for the "30-second" latency goal.
- Add `ANAM_API_KEY` (or equivalent credentials) to `.env.local`.
- Install the Anam.ai SDK (if available) or set up the API client types.
- Check Anam.ai documentation for the correct "Persona" or "Avatar ID" to use (choose a professional news anchor persona).

### 2. Video Component
- Create `components/AvatarPlayer.tsx`.
- This component should handle the connection to the Anam.ai streaming interface.
- **Logic**:
    - Initialize the Anam session.
    - When the `script` prop changes (or via a specific `play(script)` method), send the text to the avatar.
    - Handle the video stream rendering (WebRTC or video URL).
    - Handle states: `Connecting`, `Initializing` (Visual cue like "Avatar warming up..."), `Speaking`, `Idle`, `Disconnected`.

### 3. Integration with Main Flow
- Modify `app/page.tsx` or the `NewsContainer`.
- Pass the **script** generated in Phase 2 to the `AvatarPlayer` component.
- **Workflow**:
    1. User clicks Category.
    2. Text Script is generated (Phase 2).
    3. *Auto-start* the Avatar, OR show a "Play Video" button (Ask user preference, default to Auto-start for seamlessness).
    4. Avatar reads the script.

### 4. Refinement of Presentation
- Hide the raw text script by default (maybe put it in a concise "Transcript" accordion below).
- Ensure the video player takes center stage.
- Add "Stop/Pause" controls if the SDK supports it.

## User Intervention
- Ask the user which specific Avatar persona/voice they prefer from the Anam.ai library.
- Ask if they want the text transcript visible while the avatar speaks (Subtitle style) or hidden.

## Verification
- Test the full flow: Click "Sports" -> Wait for Script -> Avatar starts speaking.
- **Critical Check**:
    - Latency: structure the calls so the avatar starts as soon as possible.
    - Lip-sync: Ensure the audio matches the video (handled by platform, but verify).
    - Session cleanup: Ensure the video session closes properly when the user leaves or switches categories.

## Final Step: Update Tracker
- Open `phases/phase_tracker.md`.
- Mark **Phase 3** as "Completed" `[x]`.
- Add a brief implementation summary (e.g., "Integrated Anam.ai, created AvatarPlayer component").
