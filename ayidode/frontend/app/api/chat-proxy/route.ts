import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && anonKey) {
      const response = await fetch(`${supabaseUrl}/functions/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${anonKey}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
    }

    // Moteur local de secours si Supabase distant n'est pas configuré
    const lastMsg = body.messages?.[body.messages.length - 1]?.content || '';
    const lower = lastMsg.toLowerCase();

    if (
      lower.includes('boule') ||
      lower.includes('masse') ||
      lower.includes('saignement') ||
      lower.includes('sang') ||
      lower.includes('douleur') ||
      lower.includes('plaie') ||
      lower.includes('gonflement')
    ) {
      return NextResponse.json({
        reply: "Ces signes nécessitent un contrôle simple par un agent de santé. Ne vous inquiétez pas. Vous pouvez demander un appel infirmier gratuit ci-dessous ou vous rendre dans le centre public le plus proche (ex: CNHU-HKM, Hôpital de Ménontin, CHUD Ouémé). Dépister tôt protège ceux qu'on aime.",
        categorie: 'signe_suspect',
        audio_url: '/audio/capsules/signe_suspect_fon.mp3',
        proposer_infirmier: true
      });
    }

    if (lower.includes('diagnostic') || lower.includes('ai-je') || lower.includes('est-ce un cancer')) {
      return NextResponse.json({
        reply: "Je ne pose aucun diagnostic médical. Seul un médecin ou une sage-femme peut évaluer votre santé. Rendez-vous au centre de santé le plus proche ou contactez la ligne verte 136.",
        categorie: 'refus'
      });
    }

    if (lower.includes('aflatoxine') || lower.includes('foie') || lower.includes('arachide') || lower.includes('maïs')) {
      return NextResponse.json({
        reply: "Pour protéger votre foie, triez rigoureusement vos arachides et le maïs au marché en jetant tout grain noirci. La cuisson à l'eau ne détruit pas les aflatoxines. Préférez le gboma frais, le niébé propre et l'afitin traditionnel.",
        categorie: 'prevention',
        audio_url: '/audio/aliments/aflatoxines_fon.mp3'
      });
    }

    if (lower.includes('vph') || lower.includes('vaccin') || lower.includes('fille')) {
      return NextResponse.json({
        reply: "Au Bénin, la vaccination contre le VPH est 100% gratuite dans tous les centres publics pour les jeunes filles de 9 à 14 ans. Deux doses suffisent pour les protéger à vie contre le cancer du col de l'utérus.",
        categorie: 'prevention',
        audio_url: '/audio/cancers/col_uterus_fon.mp3'
      });
    }

    return NextResponse.json({
      reply: "Le dépistage précoce du col de l'utérus et l'adoption d'aliments locaux sains sont nos meilleurs boucliers. Vous n'êtes pas seuls. N'hésitez pas à demander un appel infirmier gratuit ou à consulter nos fiches.",
      categorie: 'prevention',
      audio_url: '/audio/capsules/prevention_fon.mp3'
    });
  } catch (error) {
    return NextResponse.json(
      {
        reply: "Va au centre de dépistage le plus proche ou appelle le 136 pour une prise en charge rapide.",
        categorie: 'orientation'
      },
      { status: 200 }
    );
  }
}
