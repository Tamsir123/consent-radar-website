// Script de contenu ClairContrat (content.js)
// Extension pour l'analyse intelligente de contrats

console.log('🚀 Extension ClairContrat chargée sur:', window.location.href);

// Styles pour le surlignage amélioré
const style = document.createElement('style');
style.textContent = `
    .claircontrat-highlight {
        position: relative;
        z-index: 9999;
        transition: all 0.5s ease !important;
    }
    
    .claircontrat-highlight::before {
        content: "📋 Contrat détecté par ClairContrat";
        position: absolute;
        top: -30px;
        left: 0;
        background: linear-gradient(135deg, #00d4aa, #00b894);
        color: white;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 11px;
        font-weight: 600;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        z-index: 10000;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .claircontrat-highlight::after {
        content: "";
        position: absolute;
        top: -6px;
        left: 15px;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid #00d4aa;
        z-index: 10001;
    }

    /* Animation de pulsation pour les éléments détectés */
    @keyframes claircontract-pulse {
        0% { box-shadow: 0 0 20px rgba(0, 212, 170, 0.3); }
        50% { box-shadow: 0 0 30px rgba(0, 212, 170, 0.6); }
        100% { box-shadow: 0 0 20px rgba(0, 212, 170, 0.3); }
    }
    
    .claircontract-pulse {
        animation: claircontract-pulse 2s infinite;
    }

    /* Styles pour les badges de détection */
    .claircontract-badge {
        display: inline-block;
        background: linear-gradient(135deg, #00d4aa, #00b894);
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: bold;
        margin-left: 5px;
        vertical-align: super;
    }
`;
document.head.appendChild(style);

// Message d'accueil dans la console pour les développeurs
console.log(`
🤖 ClairContrat Extension v2.0
📋 Détection intelligente de contrats activée
🚀 Prêt à analyser les conditions générales !
`);

// Fonction utilitaire pour marquer automatiquement les contrats visibles
function autoDetectContracts() {
    const contractIndicators = [
        'conditions générales', 'terms and conditions', 'termes et conditions',
        'politique de confidentialité', 'privacy policy', 'mentions légales',
        'cgu', 'cgv', 'tos', 'eula'
    ];
    
    // Rechercher dans les liens visibles
    document.querySelectorAll('a').forEach(link => {
        const text = link.textContent.toLowerCase();
        const hasContract = contractIndicators.some(indicator => 
            text.includes(indicator.toLowerCase())
        );
        
        if (hasContract && !link.classList.contains('claircontract-detected')) {
            link.classList.add('claircontract-detected');
            link.title = "Contrat détecté - Cliquez sur l'extension ClairContrat pour analyser";
            
            // Ajouter un badge discret
            if (!link.querySelector('.claircontract-badge')) {
                const badge = document.createElement('span');
                badge.className = 'claircontract-badge';
                badge.textContent = '📋';
                link.appendChild(badge);
            }
        }
    });
}

// Détecter automatiquement les contrats lors du chargement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoDetectContracts);
} else {
    autoDetectContracts();
}

// Observer les changements dans le DOM pour les sites dynamiques
const observer = new MutationObserver(() => {
    autoDetectContracts();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Communication avec l'extension popup
chrome.runtime.onMessage?.addListener((request, sender, sendResponse) => {
    if (request.action === 'getContractData') {
        // Retourner les données de contrat détectées
        const contractElements = document.querySelectorAll('.claircontract-detected');
        const contracts = Array.from(contractElements).map((el, index) => ({
            id: `contract-${index}`,
            text: el.textContent,
            href: el.href || null,
            type: 'link'
        }));
        
        sendResponse({ contracts });
    }
    
    if (request.action === 'highlightContract') {
        // Surligner un contrat spécifique
        const element = document.querySelector(`[data-contract-id="${request.contractId}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('claircontract-highlight', 'claircontract-pulse');
            
            setTimeout(() => {
                element.classList.remove('claircontract-pulse');
            }, 5000);
        }
        sendResponse({ success: true });
    }
});

// Ajouter un raccourci clavier pour ouvrir l'extension
document.addEventListener('keydown', (event) => {
    // Ctrl/Cmd + Shift + C pour ouvrir l'extension
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'C') {
        event.preventDefault();
        
        // Envoyer un message au background script pour ouvrir le popup
        chrome.runtime.sendMessage?.({ action: 'openPopup' });
        
        // Afficher une notification visuelle
        showNotification('Extension ClairContrat activée ! 🚀');
    }
});

// Fonction pour afficher des notifications visuelles
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00d4aa, #00b894);
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 25px rgba(0, 212, 170, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
    `;
    
    // Ajouter les animations CSS
    if (!document.querySelector('#claircontract-animations')) {
        const animations = document.createElement('style');
        animations.id = 'claircontract-animations';
        animations.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(animations);
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}