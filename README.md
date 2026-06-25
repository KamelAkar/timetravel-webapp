# TimeTravel Agency - Webapp Interactive

Webapp d'une agence de voyage temporel fictive de luxe, mettant en scene trois destinations historiques et des fonctionnalites alimentees par l'IA. Projet Ynov (M2) - "TimeTravel Agency : Webapp Interactive".

## Auteur
- Kamel AKAR (projet individuel)

## Demo
- Repository : https://github.com/KamelAkar/-timetravel-webapp
- Site en ligne : (URL GitHub Pages a completer)

## Destinations
- Alexandrie, 48 av. J.-C. (Phare, Grande Bibliotheque, Egypte de Cleopatre)
- Kyoto, 1700, ere Edo (Pavillon d'Or, cerisiers en fleurs)
- Tikal, vers 750 ap. J.-C. (pyramides mayas dans la jungle)

## Stack technique
- HTML5 / CSS3 / JavaScript (vanilla, sans framework)
- Tailwind CSS (CDN)
- Polices Google Fonts (Cormorant Garamond + Inter)
- Animations au scroll : IntersectionObserver (natif)
- Chatbot IA : API Groq (LLM Llama 3.3) via un proxy Cloudflare Worker

## Fonctionnalites
- Page d'accueil avec hero video et appels a l'action
- Presentation de l'agence
- Galerie des 3 destinations : cards interactives + fiche detaillee (modale)
- Chatbot "Chronos" : conseiller IA (vraie IA Groq) avec repli local hors-ligne,
  indicateur de saisie et memoire de conversation
- Quiz de recommandation (4 questions)
- Formulaire de reservation avec validation
- Design responsive (mobile-first), thème sombre et accents dores

## Structure
```
timetravel-webapp/
├─ index.html
├─ css/styles.css
├─ js/
│  ├─ config.js     # URL du proxy chatbot (a renseigner pour activer la vraie IA)
│  ├─ data.js       # destinations, quiz, base de connaissances du repli local
│  └─ app.js        # logique (galerie, modale, quiz, formulaire, chatbot, animations)
├─ worker/worker.js # proxy Cloudflare (garde la cle API cote serveur)
├─ assets/          # images + video de fond
├─ README.md
├─ LICENSE
└─ .gitignore
```

## Chatbot IA (Groq) - activation
Le chatbot fonctionne par defaut en mode local (hors-ligne, base de connaissances).
Pour activer la vraie IA generative, sans jamais exposer de cle dans le site :

1. Cree une cle API gratuite sur https://console.groq.com/keys
2. Cree un compte gratuit Cloudflare, puis Workers & Pages -> Create -> Worker.
3. Colle le contenu de `worker/worker.js`, deploie le Worker.
4. Dans le Worker : Settings -> Variables and Secrets -> ajoute le secret
   `GROQ_API_KEY` = ta cle Groq.
5. Copie l'URL du Worker (xxxxx.workers.dev) dans `js/config.js` :
   `chatApiUrl: "https://xxxxx.workers.dev"`

Si l'URL est vide ou le proxy indisponible, le chatbot bascule automatiquement
sur le conseiller local : la webapp reste pleinement fonctionnelle en toutes circonstances.

## Lancer en local
Ouvrir `index.html` dans un navigateur, ou servir le dossier :
```
python -m http.server 8000
```

## Deploiement
Site statique : GitHub Pages, Netlify Drop ou Vercel. Le proxy chatbot se deploie
separement sur Cloudflare Workers (gratuit).

## Outils IA utilises (transparence)
- Code : genere et assemble avec une IA generative (assistant de code)
- Visuels (images + video) : Google Flow (Nano Banana 2 + image-to-video), projet 1
- Voix-off et musique du teaser : ElevenLabs et Suno
- Chatbot : API Groq (Llama 3.3) via proxy Cloudflare ; repli local sans cle

## Licence
Projet pedagogique a usage educatif (voir LICENSE). Agence et contenus fictifs.
