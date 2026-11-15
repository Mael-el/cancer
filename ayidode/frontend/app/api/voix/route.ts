import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { texte, langue, code_audio } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && anonKey) {
      const response = await fetch(`${supabaseUrl}/functions/v1/voix`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`
        },
        body: JSON.stringify({ texte, langue, code_audio })
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
    }

    // Gestion locale du registre Fon
    if (langue === 'fon') {
      const fonMap: Record<string, string> = {
        col_uterus: '/audio/cancers/col_uterus_fon.mp3',
        sein: '/audio/cancers/sein_fon.mp3',
        foie: '/audio/cancers/foie_fon.mp3',
        colorectal: '/audio/cancers/colorectal_fon.mp3',
        prostate: '/audio/cancers/prostate_fon.mp3',
        aflatoxines: '/audio/aliments/aflatoxines_fon.mp3',
        marche_budget: '/audio/aliments/marche_budget_fon.mp3',
        niebe: '/audio/aliments/niebe_fon.mp3',
        signe_suspect: '/audio/capsules/signe_suspect_fon.mp3',
        prevention_generale: '/audio/capsules/prevention_fon.mp3'
      };

      const key = code_audio || 'prevention_generale';
      return NextResponse.json({
        type: 'audio_file',
        audio_url: fonMap[key] || '/audio/capsules/prevention_fon.mp3',
        langue: 'fon'
      });
    }

    return NextResponse.json({
      type: 'tts_browser_fallback',
      texte: texte || '',
      langue: 'fr'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la génération audio' },
      { status: 500 }
    );
  }
}
