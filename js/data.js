/* TimeTravel Agency - donnees (destinations, quiz, base de connaissances du chatbot) */

const DESTINATIONS = [
  { id:'alexandrie', name:'Alexandrie', year:'48 av. J.-C.', img:'assets/alexandrie.jpeg', price:'14 900',
    tag:'Antiquite mediterraneenne',
    short:"La capitale de Cleopatre, son Phare legendaire et sa Grande Bibliotheque, baignes d'une lumiere doree.",
    long:"Plongez dans la plus grande ville du monde antique au temps de Cleopatre VII. Admirez le Phare d'Alexandrie, l'une des Sept Merveilles, flanez sous les colonnades de marbre du port royal et visitez la Grande Bibliotheque ou se croisent les plus grands savants. Une Mediterranee de marbre, d'or et de lapis-lazuli.",
    highlights:['Le Phare de Pharos au crepuscule','La Grande Bibliotheque et le Mouseion','Diner dans un palais ptolemaique','Croisiere sur le port royal'] },
  { id:'kyoto', name:'Kyoto', year:'1700 (ere Edo)', img:'assets/kyoto.jpeg', price:'16 500',
    tag:'Elegance japonaise',
    short:"L'ancienne capitale imperiale a la saison des cerisiers : Pavillon d'Or, lanternes et raffinement absolu.",
    long:"Vivez le Japon de l'ere Edo a la saison des sakura. Contemplez le Pavillon d'Or se refletant dans son etang, traversez les portails vermillon, assistez a une ceremonie du the et laissez-vous guider dans les ruelles de bois eclairees de lanternes. Une lecon d'elegance et de serenite.",
    highlights:["Le Pavillon d'Or sous les cerisiers",'Ceremonie du the privee','Promenade dans la foret de bambous','Quartier des geishas au crepuscule'] },
  { id:'tikal', name:'Tikal', year:'vers 750 ap. J.-C.', img:'assets/tikal.jpeg', price:'18 200',
    tag:'Civilisation maya',
    short:"La grande cite maya a son apogee : pyramides emergeant de la jungle, jade et quetzals.",
    long:"Explorez Tikal au sommet de sa puissance, en pleine periode classique maya. Gravissez le Temple du Grand Jaguar au lever du soleil, surplombez une canopee infinie noyee de brume, decouvrez l'astronomie et l'ecriture maya et croisez les nobles pares de jade et de plumes de quetzal. Une aventure mysterieuse et grandiose.",
    highlights:['Lever de soleil au sommet du temple','La Grande Place ceremonielle','Rencontre avec les astronomes mayas','Faune de la jungle tropicale'] }
];

const QUIZ = [
  {q:"Quel type d'experience recherchez-vous ?", a:[["Culture et art","kyoto"],["Aventure et nature","tikal"],["Elegance et raffinement","alexandrie"]]},
  {q:"Votre ambiance ideale ?", a:[["L'effervescence d'une grande cite","alexandrie"],["La nature sauvage et le mystere","tikal"],["Le calme et la poesie","kyoto"]]},
  {q:"Ce qui vous attire le plus ?", a:[["Les monuments et le savoir","alexandrie"],["Les temples et jardins","kyoto"],["Les pyramides et la jungle","tikal"]]},
  {q:"Votre palette de couleurs ?", a:[["Or et bleu mediterraneen","alexandrie"],["Rose, or et indigo","kyoto"],["Vert jungle et ocre","tikal"]]}
];

const CHAT_KB = [
  {k:['alexandrie','egypte','phare','cleopatre','pharos'], r:"Alexandrie en 48 av. J.-C. : le Phare legendaire, la Grande Bibliotheque et le port de marbre de Cleopatre. Sejour des 14 900 euros. Parfait si vous aimez l'histoire et la Mediterranee."},
  {k:['kyoto','japon','cerisier','sakura','pavillon'], r:"Kyoto en 1700 : le Pavillon d'Or, les cerisiers en fleurs et la ceremonie du the. Sejour des 16 500 euros. Ideal pour le raffinement et la serenite."},
  {k:['tikal','maya','pyramide','jungle','quetzal'], r:"Tikal vers 750 ap. J.-C. : les pyramides mayas surgissant de la jungle au lever du soleil. Sejour des 18 200 euros. Pour les amateurs d'aventure et de mystere."},
  {k:['prix','tarif','cout','combien','budget','euro'], r:"Nos sejours tout compris : Alexandrie des 14 900 euros, Kyoto des 16 500 euros, Tikal des 18 200 euros. Le tarif comprend le transfert temporel, l'hebergement d'epoque et un guide-historien prive."},
  {k:['conseil','recommand','choisir','idee','quelle','hesit'], r:"Avec plaisir ! Dites-moi ce que vous aimez : l'art et la culture (Kyoto), l'histoire et les grandes cites (Alexandrie), ou l'aventure et la nature (Tikal) ? Vous pouvez aussi faire notre quiz dans la section Trouver mon epoque."},
  {k:['marche','fonctionne','comment','securite','danger','risque'], r:"Le voyage est 100 pourcent securise : capsule temporelle privee, combinaison d'epoque fournie, et un guide qui ne vous quitte jamais. Aucune interaction risquee avec le passe, tout est encadre."},
  {k:['reserv','devis','date','partir'], r:"Pour reserver, rendez-vous dans la section Reserver : choisissez la destination, la date et le nombre de voyageurs. Un conseiller vous recontacte sous 24h avec un devis sur mesure."},
  {k:['duree','jours','sejour','temps'], r:"Chaque sejour dure l'equivalent de 5 a 7 jours sur place, pour un retour a la seconde exacte de votre depart. Vous ne perdez aucun temps dans le present !"},
  {k:['bonjour','salut','hello','coucou','bonsoir'], r:"Bonjour ! Ravi de vous accueillir. Souhaitez-vous decouvrir nos destinations ou recevoir un conseil personnalise ?"},
  {k:['merci','super','genial','parfait'], r:"Avec grand plaisir ! Je reste a votre disposition pour preparer votre voyage dans le temps."}
];
