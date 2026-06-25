# TimeTravel Agency - Webapp Interactive

Webapp d'une agence de voyage temporel fictive de luxe, mettant en scene trois destinations historiques et des fonctionnalites interactives alimentees par l'IA. Projet realise dans le cadre du cours Ynov (M2) "TimeTravel Agency : Webapp Interactive".

## Auteur
- Kamel AKAR (projet individuel)

## Demo
- URL en ligne : (a completer apres deploiement Netlify / Vercel)

## Destinations
- Alexandrie, 48 av. J.-C. (Phare, Grande Bibliotheque, Egypte de Cleopatre)
- Kyoto, 1700, ere Edo (Pavillon d'Or, cerisiers en fleurs)
- Tikal, vers 750 ap. J.-C. (pyramides mayas dans la jungle)

## Stack technique
- HTML5 / CSS3
- Tailwind CSS (via CDN)
- JavaScript (vanilla, sans framework)
- Polices : Cormorant Garamond + Inter (Google Fonts)
- Animations au scroll : IntersectionObserver (API native)

## Fonctionnalites
- Page d'accueil avec hero video en arriere-plan et appels a l'action
- Presentation de l'agence
- Galerie des 3 destinations : cards interactives + fenetre detaillee (modale)
- Chatbot "Chronos" : assistant conversationnel (destinations, prix, securite, reservation, FAQ) avec suggestions rapides
- Quiz de recommandation : 4 questions qui orientent vers la destination ideale
- Formulaire de reservation avec validation
- Animations subtiles, design responsive (mobile-first), thème sombre et accents dores

## Structure du projet
```
timetravel-webapp/
├─ index.html          # structure de la page
├─ css/
│  └─ styles.css       # styles personnalises
├─ js/
│  ├─ data.js          # donnees (destinations, quiz, base du chatbot)
│  └─ app.js           # logique (galerie, modale, quiz, formulaire, chatbot, animations)
├─ assets/             # images et videos (issues du projet 1)
├─ README.md
├─ LICENSE
└─ .gitignore
```

## Lancer en local
Aucune installation requise. Ouvrir `index.html` dans un navigateur moderne (double-clic), ou servir le dossier avec un petit serveur statique :
```
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Deploiement
Projet statique : deployable gratuitement par glisser-deposer du dossier sur Netlify Drop (https://app.netlify.com/drop), ou via Vercel / GitHub Pages.

## Outils IA utilises (transparence)
- Code de la webapp : genere et assemble avec une IA generative (assistant de code)
- Visuels (images et videos) : Google Flow (modele d'image Nano Banana 2 + image-to-video), projet 1 TimeTravel Agency
- Voix-off et musique du teaser : ElevenLabs et Suno
- Chatbot "Chronos" : base de connaissances locale (sans cle API exposee). Peut etre branche a une API LLM (Groq, Mistral) via une fonction serverless pour des reponses entierement generatives.

## Credits
- Assets visuels et audio : production originale (projet 1)
- Tailwind CSS, Google Fonts : sous leurs licences respectives

## Licence
Projet pedagogique a usage educatif (voir fichier LICENSE). Agence et contenus fictifs.
