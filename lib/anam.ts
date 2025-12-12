export async function getAnamSessionToken(): Promise<string | null> {
  const apiKey = process.env.ANAM_API_KEY;
  // Default Config for a News Anchor
  // In a real app, you might fetch these or allow DB configuration
  const defaultPersonaConfig = {
    avatarId: '6cc28442-cccd-42a8-b6e4-24b7210a09c5', // Gabriel (Table variant)
    voiceId: '6af524f7-68e3-4ecd-933d-c06e3d8ef9b8', // James (Confident & Deep)
    llmId: 'CUSTOMER_CLIENT_V1', // Disable Anam Brain to allow direct script reading
    systemPrompt: 'You are a professional news anchor. Speak clearly, concisely, and with authority.',
  };

  if (!apiKey) {
    console.error("Missing ANAM_API_KEY");
    return null;
  }

  try {
    const response = await fetch("https://api.anam.ai/v1/auth/session-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        personaConfig: defaultPersonaConfig
      }),
    });

    if (!response.ok) {
        const errText = await response.text();
        console.error(`Anam API error: ${response.status} ${response.statusText}`, errText);
        throw new Error(`Anam API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.sessionToken;

  } catch (error) {
    console.error("Error fetching Anam session token:", error);
    return null;
  }
}
