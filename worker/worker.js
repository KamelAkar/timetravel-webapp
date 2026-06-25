/*
 * TimeTravel Agency - Proxy chatbot (Cloudflare Worker)
 * Garde la cle API Groq cote serveur (jamais exposee dans le site).
 *
 * Deploiement :
 *  1. Cree un compte gratuit sur https://dash.cloudflare.com
 *  2. Workers & Pages -> Create -> Worker -> colle ce fichier -> Deploy
 *  3. Settings -> Variables and Secrets -> ajoute un secret :
 *        nom  : GROQ_API_KEY
 *        valeur : ta cle Groq (https://console.groq.com/keys, gratuit)
 *  4. Copie l'URL du worker (xxxxx.workers.dev) dans js/config.js (chatApiUrl)
 */

const SYSTEM_PROMPT = `Tu es Chronos, l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe (fictive).
Ton role : conseiller chaleureusement les clients sur trois destinations temporelles.
Ton ton : professionnel mais chaleureux, passionne d'histoire, enthousiaste sans etre familier, credible.

Destinations et tarifs (tout compris, transfert temporel + hebergement d'epoque + guide-historien prive) :
- Alexandrie, 48 av. J.-C. : Phare de Pharos, Grande Bibliotheque, Egypte de Cleopatre. A partir de 14 900 euros.
- Kyoto, 1700 (ere Edo) : Pavillon d'Or, cerisiers en fleurs, ceremonie du the. A partir de 16 500 euros.
- Tikal, vers 750 ap. J.-C. : pyramides mayas dans la jungle, astronomie maya. A partir de 18 200 euros.

Le voyage est 100% securise (capsule privee, guide permanent). Duree : 5 a 7 jours sur place, retour a la seconde du depart.
Pour reserver : section Reserver du site. Reponds toujours en francais, de facon concise (2 a 4 phrases), elegante et premium.`;

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return json({ error: "POST uniquement" }, 405, cors);

    let body;
    try { body = await request.json(); } catch (e) { return json({ error: "JSON invalide" }, 400, cors); }
    const history = Array.isArray(body.messages) ? body.messages.slice(-12) : [];

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": "Bearer " + env.GROQ_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
        temperature: 0.7,
        max_tokens: 320
      })
    });
    if (!r.ok) { const t = await r.text(); return json({ error: "groq", detail: t }, 502, cors); }
    const data = await r.json();
    const reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content)
      || "Desole, je n'ai pas pu repondre pour le moment.";
    return json({ reply }, 200, cors);
  }
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });
}
