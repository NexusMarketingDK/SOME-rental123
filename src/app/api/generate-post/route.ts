import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

const PLATFORM_INSTRUCTIONS: Record<string, string> = {
  facebook: `
Du skriver til Facebook. Brug en varm, engagerende tone. Start med en fængende indledning.
Inkluder relevante emojis (5-8 stk.). Skriv 3-4 afsnit. Slut med en opfordring til handling (f.eks. "Kontakt os for en fremvisning" eller "Link i bio").
Max 1500 tegn. Skriv på dansk.`,
  instagram: `
Du skriver til Instagram. Teksten skal være visuelt inspirerende og kort. Max 2-3 korte afsnit + hashtags.
Brug 8-12 emojis. Slut med 15-20 relevante hashtags på en ny linje (f.eks. #ferielejlighed #spansk #drømmebolig #somsale).
Max 800 tegn (ekskl. hashtags). Skriv på dansk.`,
  linkedin: `
Du skriver til LinkedIn. Brug en professionel og investeringsorienteret tone. Fremhæv ejendomsværdi, beliggenhed og afkastpotentiale.
Ingen emojis. 3-4 afsnit. Slut med en call-to-action til interesserede investorer eller boligkøbere.
Max 1200 tegn. Skriv på dansk.`,
};

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json() as {
    platform: string;
    title?: string;
    description?: string;
    location?: string;
    price?: string;
    size?: string;
    listingUrl?: string;
  };

  const { platform, title, description, location, price, size, listingUrl } = body;
  const platformInstructions = PLATFORM_INSTRUCTIONS[platform] ?? PLATFORM_INSTRUCTIONS.facebook;

  const propertyInfo = [
    title ? `Titel: ${title}` : null,
    location ? `Beliggenhed: ${location}` : null,
    price ? `Pris: ${price}` : null,
    size ? `Størrelse: ${size}` : null,
    description ? `Beskrivelse: ${description.slice(0, 800)}` : null,
    listingUrl ? `Link til annonce: ${listingUrl}` : null,
  ].filter(Boolean).join("\n");

  const prompt = `
Du er en ekspert i ejendomsmarkedsføring og sociale medier. Skriv et sælgende opslag til en ferielejlighed/bolig.

Ejendomsoplysninger:
${propertyInfo || "Ingen yderligere oplysninger tilgængelige."}

Platform-specifikke instruktioner:
${platformInstructions}

Returner KUN den færdige tekst — ingen forklaringer, ingen overskrifter, ingen citationstegn omkring teksten.
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    return NextResponse.json({ text });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
