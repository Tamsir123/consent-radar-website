document.addEventListener('DOMContentLoaded', async () => {
    // Elements DOM
    const statusCard = document.getElementById('statusCard');
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');
    const statusDescription = document.getElementById('statusDescription');
    const termsPreview = document.getElementById('termsPreview');
    const termsContent = document.getElementById('termsContent');
    const actionButtons = document.getElementById('actionButtons');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const copyBtn = document.getElementById('copyBtn');
    const successMessage = document.getElementById('successMessage');
    
    let detectedContract = null;
    let currentTab = null;

    // Configuration du site local
    const LOCAL_SITE_URL = 'https://claircontrat-website.vercel.app/';
    
    try {
        // Obtenir l'onglet actuel
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        currentTab = tab;
        
        // Attendre un peu pour l'animation
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Injecter et exécuter le script de détection
        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: detectContractsAndTerms
        });
        
        const contractData = results[0].result;
        
        if (contractData && contractData.found) {
            detectedContract = contractData;
            showContractFound(contractData);
        } else {
            showContractNotFound();
        }
        
    } catch (error) {
        console.error('Erreur lors de la détection:', error);
        showError();
    }
    
    // Gestionnaire pour analyser avec ClairContrat
    analyzeBtn.addEventListener('click', async () => {
        if (detectedContract && detectedContract.content) {
            try {
                // Stocker le contenu dans le storage local de l'extension
                await chrome.storage.local.set({
                    'contractContent': detectedContract.content,
                    'contractTitle': detectedContract.title || 'Contrat détecté',
                    'contractUrl': currentTab.url,
                    'timestamp': Date.now()
                });
                
                // Afficher le message de succès
                showSuccess();
                
                // Construire l'URL avec le contenu (si pas trop long)
                const baseUrl = `${LOCAL_SITE_URL}/chat`;
                const params = new URLSearchParams({
                    source: 'extension',
                    title: detectedContract.title || 'Contrat détecté',
                    url: currentTab.url
                });
                
                // Si le contenu n'est pas trop long, l'ajouter à l'URL
                if (detectedContract.content.length < 1500) {
                    params.append('content', detectedContract.content.substring(0, 1500));
                }
                
                const finalUrl = `${baseUrl}?${params.toString()}`;
                
                // Rediriger vers le site local
                setTimeout(() => {
                    chrome.tabs.create({ url: finalUrl });
                    window.close();
                }, 1500);
                
            } catch (error) {
                console.error('Erreur lors de la redirection:', error);
                // Fallback: redirection simple
                chrome.tabs.create({ url: `${LOCAL_SITE_URL}/chat` });
                window.close();
            }
        }
    });
    
    // Gestionnaire pour copier le texte
    copyBtn.addEventListener('click', async () => {
        if (detectedContract && detectedContract.content) {
            try {
                // Surligner l'élément sur la page
                if (detectedContract.elementId && currentTab) {
                    await chrome.scripting.executeScript({
                        target: { tabId: currentTab.id },
                        function: highlightElement,
                        args: [detectedContract.elementId]
                    });
                }
                
                // Copier le contenu
                await navigator.clipboard.writeText(detectedContract.content);
                
                // Mettre à jour le bouton
                copyBtn.innerHTML = '<span class="icon">✅</span>Copié !';
                copyBtn.style.background = 'linear-gradient(135deg, #00b894, #00a085)';
                
                setTimeout(() => {
                    copyBtn.innerHTML = '<span class="icon">📋</span>Copier le texte';
                    copyBtn.style.background = 'linear-gradient(135deg, #74b9ff, #0984e3)';
                }, 2000);
                
            } catch (error) {
                console.error('Erreur lors de la copie:', error);
                copyBtn.innerHTML = '<span class="icon">❌</span>Erreur';
                copyBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a52)';
            }
        }
    });
    
    // Fonctions d'affichage
    function showContractFound(data) {
        statusCard.className = 'status-card found';
        statusIcon.textContent = '✅';
        statusText.textContent = 'Contrat détecté !';
        statusDescription.textContent = 'Prêt pour l\'analyse avec ClairContrat';
        
        // Afficher l'aperçu
        termsPreview.classList.remove('hidden');
        termsContent.textContent = data.content.substring(0, 200) + '...';
        
        // Afficher les boutons
        actionButtons.classList.remove('hidden');
        copyBtn.style.display = 'flex'; // S'assurer que le bouton de copie est visible
    }
    
    function showContractNotFound() {
        statusCard.className = 'status-card not-found';
        statusIcon.textContent = '❌';
        statusText.textContent = 'Aucun contrat détecté';
        statusDescription.textContent = 'Cette page ne semble pas contenir de CGU ou conditions d\'utilisation';
        
        // Masquer l'aperçu des termes
        termsPreview.classList.add('hidden');
        
        // Afficher quand même le bouton pour aller sur le site
        actionButtons.classList.remove('hidden');
        analyzeBtn.innerHTML = '<span class="icon">🌐</span>Ouvrir Consent Radar';
        
        // Masquer le bouton de copie puisqu'il n'y a rien à copier
        copyBtn.style.display = 'none';
    }
    
    function showError() {
        statusCard.className = 'status-card not-found';
        statusIcon.textContent = '⚠️';
        statusText.textContent = 'Erreur de détection';
        statusDescription.textContent = 'Impossible d\'analyser cette page';
    }
    
    function showSuccess() {
        successMessage.classList.remove('hidden');
        analyzeBtn.disabled = true;
        analyzeBtn.innerHTML = '<span class="icon">🚀</span>Redirection...';
    }
});

// Fonction pour surligner l'élément détecté
function highlightElement(elementId) {
    // Supprimer les anciens surlignages
    const existingHighlights = document.querySelectorAll('.claircontrat-highlight');
    existingHighlights.forEach(el => {
        el.classList.remove('claircontrat-highlight');
        el.style.removeProperty('background');
        el.style.removeProperty('outline');
        el.style.removeProperty('border-radius');
        el.style.removeProperty('box-shadow');
    });
    
    // Trouver et surligner l'élément
    const element = document.querySelector(`[data-contract-id="${elementId}"]`);
    if (element) {
        element.classList.add('claircontrat-highlight');
        element.style.background = 'linear-gradient(45deg, #00d4aa22, #00b89422)';
        element.style.outline = '3px solid #00d4aa';
        element.style.borderRadius = '8px';
        element.style.boxShadow = '0 0 20px rgba(0, 212, 170, 0.3)';
        element.style.transition = 'all 0.5s ease';
        
        // Faire défiler vers l'élément
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Animation de pulsation
        let pulses = 0;
        const pulseInterval = setInterval(() => {
            element.style.boxShadow = pulses % 2 === 0 
                ? '0 0 30px rgba(0, 212, 170, 0.6)' 
                : '0 0 20px rgba(0, 212, 170, 0.3)';
            pulses++;
            if (pulses >= 6) {
                clearInterval(pulseInterval);
            }
        }, 500);
        
        // Supprimer le surlignage après 10 secondes
        setTimeout(() => {
            element.classList.remove('claircontrat-highlight');
            element.style.removeProperty('background');
            element.style.removeProperty('outline');
            element.style.removeProperty('border-radius');
            element.style.removeProperty('box-shadow');
        }, 10000);
    }
}

// Fonction de détection améliorée (injectée dans la page)
function detectContractsAndTerms() {
    // Mots-clés pour détecter les contrats et CGU
    const contractKeywords = [
        // Français
        'conditions générales d\'utilisation', 'conditions générales de vente',
        'conditions générales', 'conditions d\'utilisation', 'conditions d\'usage',
        'termes et conditions', 'mentions légales', 'politique d\'utilisation',
        'règles d\'utilisation', 'conditions de service', 'contrat d\'utilisation',
        'politique de confidentialité', 'charte d\'utilisation',
        
        // Anglais
        'terms and conditions', 'terms of service', 'terms of use',
        'user agreement', 'service agreement', 'legal terms', 'usage terms',
        'privacy policy', 'end user license agreement', 'eula',
        'service terms', 'user terms'
    ];
    
    const shortKeywords = ['cgu', 'cgv', 'tos', 'terms', 'legal'];
    
    // Zones à exclure
    const excludeSelectors = [
        'header', 'nav', 'footer', '.header', '.nav', '.footer',
        '.navigation', '.menu', '.sidebar', '.breadcrumb', '.banner',
        '.navbar', '.topbar', '.menubar', '.advertisement', '.ads'
    ];
    
    let bestMatch = null;
    let maxScore = 0;
    
    // Fonction de scoring
    function calculateScore(element, text) {
        let score = 0;
        const lowerText = text.toLowerCase();
        
        // Vérifier les exclusions
        for (const selector of excludeSelectors) {
            if (element.closest(selector)) {
                return 0;
            }
        }
        
        // Score pour les mots-clés principaux (plus strict)
        let hasMainKeyword = false;
        contractKeywords.forEach(keyword => {
            if (lowerText.includes(keyword.toLowerCase())) {
                score += keyword.length * 6; // Plus de poids aux mots-clés principaux
                hasMainKeyword = true;
            }
        });
        
        // Score pour les mots-clés courts (seulement si pas de mot-clé principal et contexte approprié)
        if (!hasMainKeyword) {
            shortKeywords.forEach(keyword => {
                if (lowerText.includes(keyword.toLowerCase())) {
                    // Vérifier le contexte autour du mot-clé
                    const keywordIndex = lowerText.indexOf(keyword.toLowerCase());
                    const context = lowerText.substring(Math.max(0, keywordIndex - 50), keywordIndex + 50);
                    
                    // N'ajouter du score que si le contexte semble juridique
                    if (context.includes('condition') || context.includes('legal') || 
                        context.includes('utilisation') || context.includes('service') ||
                        context.includes('agreement') || context.includes('terms')) {
                        score += keyword.length * 3;
                    }
                }
            });
        }
        
        // Retourner 0 si aucun vrai mot-clé n'est trouvé
        if (score === 0) return 0;
        
        // Bonus pour les éléments structurels
        const tagName = element.tagName || '';
        if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(tagName)) {
            score += 40;
        }
        
        // Bonus pour les attributs pertinents
        const attributes = (element.id + ' ' + element.className).toLowerCase();
        if (attributes.includes('terms') || attributes.includes('conditions') || 
            attributes.includes('legal') || attributes.includes('cgu') ||
            attributes.includes('privacy') || attributes.includes('policy')) {
            score += 30;
        }
        
        // Bonus pour la longueur du contenu (plus strict)
        if (text.length > 3000) {
            score += 40;
        } else if (text.length > 1500) {
            score += 25;
        } else if (text.length > 800) {
            score += 15;
        } else if (text.length < 300) {
            score = Math.max(0, score - 20); // Pénalité pour contenu trop court
        }
        
        // Bonus pour les mots juridiques
        const legalTerms = [
            'utilisateur', 'service', 'responsabilité', 'données', 'propriété intellectuelle',
            'user', 'liability', 'responsibility', 'intellectual property',
            'privacy', 'agreement', 'violation', 'termination', 'license',
            'droits', 'obligations', 'engagement', 'garantie', 'limitation'
        ];
        
        let legalCount = 0;
        legalTerms.forEach(term => {
            if (lowerText.includes(term.toLowerCase())) {
                legalCount++;
            }
        });
        
        if (legalCount >= 5) {
            score += legalCount * 3;
        }
        
        return score;
    }
    
    // Générer un ID unique
    function generateElementId() {
        return 'contract-' + Math.random().toString(36).substr(2, 9);
    }
    
    // Rechercher dans les liens (plus strict)
    document.querySelectorAll('a').forEach(link => {
        const linkText = link.textContent.trim();
        const href = link.href || '';
        
        // Vérifier que le lien pointe vers une page de CGU/conditions
        const isLegalUrl = /\/(terms|conditions|legal|cgu|cgv|privacy|policy|mentions)/i.test(href);
        
        if (isLegalUrl || linkText.length > 10) { // Soit URL légale, soit texte substantiel
            const score = calculateScore(link, linkText);
            
            if (score > maxScore && score > 30) { // Score minimum plus élevé pour les liens
                const elementId = generateElementId();
                link.setAttribute('data-contract-id', elementId);
                
                maxScore = score;
                bestMatch = {
                    element: link,
                    text: linkText,
                    isLink: true,
                    href: link.href,
                    elementId: elementId,
                    score: score
                };
            }
        }
    });
    
    // Rechercher dans les titres (plus strict)
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
        const headingText = heading.textContent.trim();
        const score = calculateScore(heading, headingText);
        
        if (score > maxScore && score > 40) { // Score minimum plus élevé
            // Collecter le contenu suivant
            let content = headingText;
            let nextElement = heading.nextElementSibling;
            let contentElements = [heading];
            let totalTextLength = headingText.length;
            
            while (nextElement && !nextElement.matches('h1, h2, h3, h4, h5, h6') && contentElements.length < 10) {
                if (nextElement.textContent.trim() && totalTextLength < 8000) {
                    const elementText = nextElement.textContent.trim();
                    content += '\n\n' + elementText;
                    contentElements.push(nextElement);
                    totalTextLength += elementText.length;
                }
                nextElement = nextElement.nextElementSibling;
                
                if (totalTextLength > 8000) break;
            }
            
            // Vérifier que le contenu collecté est substantiel
            if (content.length > 800) { // Au moins 800 caractères
                const elementId = generateElementId();
                contentElements.forEach(el => {
                    el.setAttribute('data-contract-id', elementId);
                });
                
                maxScore = score;
                bestMatch = {
                    element: heading,
                    text: content,
                    isLink: false,
                    title: headingText,
                    elementId: elementId,
                    score: score
                };
            }
        }
    });
    
    // Rechercher dans les sections (beaucoup plus strict)
    document.querySelectorAll('div, section, article, main').forEach(section => {
        const sectionText = section.textContent.trim();
        if (sectionText.length < 800) return; // Minimum plus élevé
        
        const score = calculateScore(section, sectionText);
        
        if (score > maxScore && score > 60) { // Score minimum beaucoup plus élevé
            // Vérifier que ce n'est pas juste du texte générique
            const lowerText = sectionText.toLowerCase();
            const hasMultipleKeywords = contractKeywords.filter(keyword => 
                lowerText.includes(keyword.toLowerCase())
            ).length >= 2; // Au moins 2 mots-clés différents
            
            if (hasMultipleKeywords) {
                const elementId = generateElementId();
                section.setAttribute('data-contract-id', elementId);
                
                maxScore = score;
                bestMatch = {
                    element: section,
                    text: sectionText.length > 10000 ? sectionText.substring(0, 10000) + '...' : sectionText,
                    isLink: false,
                    title: 'Contrat ou conditions générales détectés',
                    elementId: elementId,
                    score: score
                };
            }
        }
    });
    
    // Validation stricte avant de retourner le résultat
    if (bestMatch && maxScore > 50) { // Seuil plus élevé
        // Validation supplémentaire : vérifier la longueur du contenu
        const contentLength = bestMatch.text.length;
        const hasSubstantialContent = contentLength > 500; // Au moins 500 caractères
        
        // Vérifier qu'il y a au moins 2 mots-clés juridiques différents
        const lowerText = bestMatch.text.toLowerCase();
        let keywordMatches = 0;
        
        contractKeywords.forEach(keyword => {
            if (lowerText.includes(keyword.toLowerCase())) {
                keywordMatches++;
            }
        });
        
        // Si c'est un lien, vérifier qu'il pointe vers une vraie page de CGU
        if (bestMatch.isLink && bestMatch.href) {
            const urlPattern = /\/(terms|conditions|legal|cgu|cgv|privacy|policy)/i;
            if (!urlPattern.test(bestMatch.href)) {
                keywordMatches = 0; // Invalider si l'URL ne semble pas être une page de CGU
            }
        }
        
        // Validation finale
        if (hasSubstantialContent && keywordMatches >= 1) {
            console.log('Contrat détecté avec score:', maxScore, 'Keywords:', keywordMatches, 'Longueur:', contentLength);
            return {
                found: true,
                title: bestMatch.title || bestMatch.text.substring(0, 100) + '...',
                content: bestMatch.text,
                isLink: bestMatch.isLink,
                href: bestMatch.href || null,
                score: maxScore,
                elementId: bestMatch.elementId,
                url: window.location.href
            };
        }
    }
    
    console.log('Aucun contrat détecté. Score maximum:', maxScore);
    return {
        found: false,
        message: 'Aucun contrat ou conditions générales détectés sur cette page'
    };
}
