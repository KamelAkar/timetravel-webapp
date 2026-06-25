/* Configuration de la webapp.
   chatApiUrl : URL du Cloudflare Worker qui relaie le chatbot vers l'API Groq
   (la cle API reste cote serveur, jamais dans le site).
   Laisser vide ("") pour utiliser le conseiller local hors-ligne. */
window.TIMETRAVEL_CONFIG = {
  chatApiUrl: "https://timetravel-webapp.ravnow.workers.dev"
};
