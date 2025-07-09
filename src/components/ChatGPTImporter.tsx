import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Bot, Copy, Check } from 'lucide-react';

interface ChatGPTImporterProps {
  onImport: (content: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ChatGPTImporter: React.FC<ChatGPTImporterProps> = ({
  onImport,
  isOpen,
  onClose
}) => {
  const [chatGPTContent, setChatGPTContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const processChatGPTContent = (content: string): string => {
    // Converter markdown para HTML
    let processedContent = content
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      
      // Bold e Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      
      // Listas
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      
      // Quebras de linha
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    // Envolver em parágrafos se não estiver
    if (!processedContent.startsWith('<')) {
      processedContent = `<p>${processedContent}</p>`;
    }

    // Limpar tags vazias
    processedContent = processedContent
      .replace(/<p><\/p>/g, '')
      .replace(/<p><br><\/p>/g, '')
      .replace(/<p><\/p>/g, '');

    return processedContent;
  };

  const handleImport = () => {
    if (!chatGPTContent.trim()) {
      toast({
        title: 'Conteúdo vazio',
        description: 'Cole o conteúdo do ChatGPT primeiro',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const processedContent = processChatGPTContent(chatGPTContent);
      onImport(processedContent);
      
      toast({
        title: 'Conteúdo importado!',
        description: 'O conteúdo do ChatGPT foi processado e importado com sucesso.'
      });
      
      setChatGPTContent('');
      onClose();
    } catch (error) {
      toast({
        title: 'Erro ao processar',
        description: 'Ocorreu um erro ao processar o conteúdo',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData('text');
    setChatGPTContent(pastedText);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Importar do ChatGPT
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="chatgpt-content">
              Cole o conteúdo do ChatGPT aqui:
            </Label>
            <Textarea
              id="chatgpt-content"
              value={chatGPTContent}
              onChange={(e) => setChatGPTContent(e.target.value)}
              onPaste={handlePaste}
              placeholder="Cole aqui o conteúdo gerado pelo ChatGPT..."
              rows={15}
              className="font-mono text-sm"
            />
          </div>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Formatos suportados:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Emojis e caracteres especiais</li>
              <li>Markdown básico (# ## ### para títulos)</li>
              <li>**Negrito** e *itálico*</li>
              <li>Links [texto](url)</li>
              <li>Listas com * ou -</li>
              <li>Código com `code` ou ```blocos```</li>
                             <li>Citações com &gt;</li>
            </ul>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleImport}
              disabled={isProcessing || !chatGPTContent.trim()}
              className="bg-gradient-primary hover:shadow-glow"
            >
              {isProcessing ? 'Processando...' : 'Importar Conteúdo'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatGPTImporter; 
