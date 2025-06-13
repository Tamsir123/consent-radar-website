import React from 'react';

interface MessageRendererProps {
  content: string;
  messageType?: string;
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ content, messageType }) => {

  // Fonction pour nettoyer et convertir le contenu avec espacement minimal
  const processContent = (rawContent: string): string => {
    let processedContent = rawContent;

    // Supprimer les espaces excessifs
    processedContent = processedContent.replace(/\n\s*\n\s*\n/g, '\n\n');
    processedContent = processedContent.trim();

    // Traiter les bullet points
    processedContent = processedContent
      .replace(/^\* /gm, '• ')
      .replace(/^\- /gm, '• ');

    // Convertir les ** en balises strong
    processedContent = processedContent.replace(/\*\*(.*?)\*\*/g, '<strong class="highlight">$1</strong>');

    // Gérer les titres
    processedContent = processedContent.replace(/^### (.*?)$/gm, '<h3 class="section-title">$1</h3>');
    processedContent = processedContent.replace(/^## (.*?)$/gm, '<h2 class="main-title">$1</h2>');

    // Traiter les lignes avec bullet points
    const lines = processedContent.split('\n');
    const processedLines = lines.map(line => {
      if (line.startsWith('• ')) {
        return `<li class="bullet-item">${line}</li>`;
      }
      return line;
    });

    // Regrouper les li consécutifs dans des ul
    let result = '';
    let inList = false;
    
    for (let i = 0; i < processedLines.length; i++) {
      const line = processedLines[i];
      
      if (line.startsWith('<li class="bullet-item">')) {
        if (!inList) {
          result += '<ul class="bullet-list">\n';
          inList = true;
        }
        result += line + '\n';
      } else {
        if (inList) {
          result += '</ul>\n';
          inList = false;
        }
        result += line + '\n';
      }
    }
    
    if (inList) {
      result += '</ul>';
    }

    // Nettoyer les sauts de ligne excessifs
    result = result.replace(/\n\n\n+/g, '\n\n');
    result = result.replace(/\n/g, '<br>');
    result = result.replace(/<br><br>/g, '<br>');

    return result;
  };

  // Traitement du contenu
  const processedContent = processContent(content);

  return (
    <div className="message-content-wrapper">
      <div 
        className="message-content"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
    </div>
  );
};

export default MessageRenderer;