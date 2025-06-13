/**
 * MessageFormatter - Utilitaire pour formater les messages du chat
 * Convertit le texte brut en HTML formaté selon le type d'analyse
 */

import { marked } from 'marked';

export class MessageFormatter {
  /**
   * Formate le contenu des messages selon leur type d'analyse
   */
  static formatByType(content: string, analysisType?: string): string {
    // Convertir le markdown en HTML
    let formattedContent = this.markdownToHtml(content);
    
    // Appliquer un formatage spécifique selon le type d'analyse
    switch (analysisType) {
      case 'contract_analysis':
        formattedContent = this.highlightContractAnalysis(formattedContent);
        break;
      case 'risk_alert':
        formattedContent = this.highlightRiskAlert(formattedContent);
        break;
      case 'contract_question':
        formattedContent = this.highlightContractQuestion(formattedContent);
        break;
      default:
        // Formatage général pour les conversations
        formattedContent = this.enhanceGeneralChat(formattedContent);
        break;
    }

    return formattedContent;
  }

  /**
   * Convertit le texte Markdown en HTML
   */
  private static markdownToHtml(text: string): string {
    try {
      return marked.parse(text) as string;
    } catch (error) {
      console.error("Erreur de conversion Markdown:", error);
      return text;
    }
  }

  /**
   * Ajoute des styles spécifiques pour les analyses de contrat
   */
  private static highlightContractAnalysis(html: string): string {
    // Mettre en évidence les sections et les titres
    html = html.replace(/<h2>(.*?)<\/h2>/g, '<h2 class="text-cyan-600 dark:text-cyan-400 text-lg font-bold my-3 pb-1 border-b border-cyan-200 dark:border-cyan-800/50">$1</h2>');
    html = html.replace(/<h3>(.*?)<\/h3>/g, '<h3 class="text-cyan-500 dark:text-cyan-300 text-base font-semibold my-2">$1</h3>');
    
    // Mettre en évidence les listes
    html = html.replace(/<ul>/g, '<ul class="list-disc pl-5 my-3 space-y-1.5">');
    html = html.replace(/<li>/g, '<li class="text-slate-700 dark:text-slate-300">');
    
    // Mettre en évidence les termes importants
    html = html.replace(/\b(important|essentiel|clé|attention|vigilance)\b/gi, 
      '<span class="text-amber-600 dark:text-amber-400 font-medium">$1</span>');
    
    // Ajouter des styles pour les paragraphes
    html = html.replace(/<p>/g, '<p class="my-2.5 text-slate-700 dark:text-slate-300">');
    
    // Ajouter une boîte de résumé
    html = html.replace(/<p>résumé\s*:/i, '<div class="bg-cyan-50 dark:bg-cyan-900/30 p-3 rounded-lg border border-cyan-200 dark:border-cyan-800/50 mb-4"><p class="text-cyan-800 dark:text-cyan-300">');
    html = html.replace(/<p>synthèse\s*:/i, '<div class="bg-cyan-50 dark:bg-cyan-900/30 p-3 rounded-lg border border-cyan-200 dark:border-cyan-800/50 mb-4"><p class="text-cyan-800 dark:text-cyan-300">');
    
    // Fermer la boîte de résumé avant le prochain paragraphe
    const resumeClosingRegex = /(<\/p>)(?=\s*<(h[1-6]|p|ul|ol|div))/i;
    if (html.match(/<div class="bg-cyan-50/) && resumeClosingRegex.test(html)) {
      html = html.replace(resumeClosingRegex, '$1</div>');
    }
    
    return html;
  }

  /**
   * Ajoute des styles spécifiques pour les alertes de risque
   */
  private static highlightRiskAlert(html: string): string {
    // Mettre en évidence les alertes et les risques
    html = html.replace(/<h2>(.*?)risque(.*?)<\/h2>/gi, '<h2 class="text-red-600 dark:text-red-400 text-lg font-bold my-3 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>$1risque$2</h2>');
    
    html = html.replace(/<h3>(.*?)risque(.*?)<\/h3>/gi, '<h3 class="text-red-500 dark:text-red-300 text-base font-semibold my-2 border-b border-red-100 dark:border-red-800/30 pb-1">$1risque$2</h3>');
    
    html = html.replace(/<h2>(.*?)alerte(.*?)<\/h2>/gi, '<h2 class="text-amber-600 dark:text-amber-400 text-lg font-bold my-3 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>$1alerte$2</h2>');
    
    html = html.replace(/<h3>(.*?)alerte(.*?)<\/h3>/gi, '<h3 class="text-amber-500 dark:text-amber-300 text-base font-semibold my-2 border-b border-amber-100 dark:border-amber-800/30 pb-1">$1alerte$2</h3>');
    
    // Mettre en évidence les listes
    html = html.replace(/<ul>/g, '<ul class="list-disc pl-5 my-3 space-y-1.5">');
    html = html.replace(/<li>/g, '<li class="text-slate-700 dark:text-slate-300">');
    
    // Mettre en évidence les termes relatifs aux risques
    html = html.replace(/\b(attention|dangereux|risqué|préoccupant|problématique|vigilance)\b/gi, 
      '<span class="text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">$1</span>');
    
    // Encadrer les alertes de sécurité
    html = html.replace(/\b(données personnelles|sécurité|surveillance|confidentialité|collecte de données)\b/gi, 
      '<span class="text-purple-600 dark:text-purple-400 underline decoration-wavy decoration-purple-300 dark:decoration-purple-700 underline-offset-2">$1</span>');
    
    // Ajouter des styles pour les paragraphes
    html = html.replace(/<p>/g, '<p class="my-2.5 text-slate-700 dark:text-slate-300">');
    
    // Créer des boîtes d'alerte pour risque élevé/moyen/faible
    html = html.replace(/risque\s*élevé\s*:/gi, '<div class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800/30 my-3"><p class="text-red-700 dark:text-red-300 font-medium">⚠️ Risque Élevé : ');
    html = html.replace(/risque\s*moyen\s*:/gi, '<div class="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/30 my-3"><p class="text-amber-700 dark:text-amber-300 font-medium">⚠️ Risque Moyen : ');
    html = html.replace(/risque\s*faible\s*:/gi, '<div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800/30 my-3"><p class="text-blue-700 dark:text-blue-300 font-medium">ℹ️ Risque Faible : ');
    
    // Fermer les boîtes d'alerte
    const riskBoxClosingRegex = /(<\/p>)(?=\s*<(h[1-6]|p|ul|ol|div))/i;
    if ((html.match(/<div class="bg-red-50/) || html.match(/<div class="bg-amber-50/) || html.match(/<div class="bg-blue-50/)) && riskBoxClosingRegex.test(html)) {
      html = html.replace(riskBoxClosingRegex, '$1</div>');
    }
    
    return html;
  }

  /**
   * Ajoute des styles spécifiques pour les questions sur le contrat
   */
  private static highlightContractQuestion(html: string): string {
    // Mettre en évidence les réponses aux questions
    html = html.replace(/<h2>(.*?)<\/h2>/g, '<h2 class="text-blue-600 dark:text-blue-400 text-lg font-bold my-3 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>$1</h2>');
    
    html = html.replace(/<h3>(.*?)<\/h3>/g, '<h3 class="text-blue-500 dark:text-blue-300 text-base font-semibold my-2 border-b border-blue-100 dark:border-blue-800/30 pb-1">$1</h3>');
    
    // Mettre en évidence les listes
    html = html.replace(/<ul>/g, '<ul class="list-disc pl-5 my-3 space-y-1.5">');
    html = html.replace(/<li>/g, '<li class="text-slate-700 dark:text-slate-300">');
    
    // Ajouter des styles pour les paragraphes
    html = html.replace(/<p>/g, '<p class="my-2.5 text-slate-700 dark:text-slate-300">');
    
    // Mettre en évidence les termes juridiques
    html = html.replace(/\b(clause|article|section|paragraphe|contrat|condition|résiliation|remboursement)\b/gi, 
      '<span class="text-purple-600 dark:text-purple-400 font-medium">$1</span>');
    
    // Mise en évidence des citations
    html = html.replace(/"([^"]+)"/g, '<span class="italic text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-1.5 py-0.5 rounded">"$1"</span>');
    
    // Mise en évidence des explications importantes
    html = html.replace(/\b(important de noter|à retenir|notez que|important|clé|essentiel)\b/gi, 
      '<span class="text-emerald-600 dark:text-emerald-400 font-medium">$1</span>');
    
    // Boîte de réponse directe
    html = html.replace(/réponse\s*directe\s*:/gi, '<div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800/30 my-3"><p class="text-blue-700 dark:text-blue-300 font-medium">💡 Réponse directe : ');
    
    // Fermer la boîte de réponse directe
    const answerBoxClosingRegex = /(<\/p>)(?=\s*<(h[1-6]|p|ul|ol|div))/i;
    if (html.match(/<div class="bg-blue-50/) && answerBoxClosingRegex.test(html)) {
      html = html.replace(answerBoxClosingRegex, '$1</div>');
    }
    
    return html;
  }

  /**
   * Ajoute des styles généraux pour améliorer les messages de conversation
   */
  private static enhanceGeneralChat(html: string): string {
    // Mettre en évidence les titres
    html = html.replace(/<h2>(.*?)<\/h2>/g, '<h2 class="text-brand-600 dark:text-brand-400 text-lg font-bold my-3 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>$1</h2>');
    
    html = html.replace(/<h3>(.*?)<\/h3>/g, '<h3 class="text-brand-500 dark:text-brand-300 text-base font-semibold my-2">$1</h3>');
    
    // Mettre en évidence les listes
    html = html.replace(/<ul>/g, '<ul class="list-disc pl-5 my-3 space-y-1.5">');
    html = html.replace(/<li>/g, '<li class="text-slate-700 dark:text-slate-300">');
    
    // Ajouter des styles pour les paragraphes
    html = html.replace(/<p>/g, '<p class="my-2.5 text-slate-700 dark:text-slate-300">');
    
    // Mettre en évidence les emoji
    html = html.replace(/(\p{Emoji}+)/gu, '<span class="text-xl">$1</span>');
    
    // Mettre en valeur les étapes numérotées
    html = html.replace(/(\d+\.\s+)([^<]+)/g, '$1<span class="font-medium text-brand-700 dark:text-brand-300">$2</span>');
    
    // Mettre en valeur les conseils
    html = html.replace(/\b(conseil|astuce|tip|recommandation)\b\s*:/gi, 
      '<span class="font-medium text-emerald-600 dark:text-emerald-400">$&</span>');
    
    return html;
  }
}
