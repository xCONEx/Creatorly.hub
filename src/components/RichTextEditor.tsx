import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link, 
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import './RichTextEditor.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Escreva o conteúdo do post aqui...",
  className = ""
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateContent();
  };

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');
    let content = html || text;
    // Sanitização básica: permite apenas tags seguras
    const allowedTags = [
      'p', 'br', 'b', 'strong', 'i', 'em', 'u', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'blockquote', 'pre', 'code', 'a', 'img'
    ];
    const div = document.createElement('div');
    div.innerHTML = content;
    const clean = (el: Element) => {
      Array.from(el.children).forEach(child => {
        if (!allowedTags.includes(child.tagName.toLowerCase())) {
          child.replaceWith(...Array.from(child.childNodes));
        } else {
          clean(child);
        }
      });
    };
    clean(div);
    document.execCommand('insertHTML', false, div.innerHTML);
    updateContent();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      execCommand('insertParagraph');
    }
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      const link = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      document.execCommand('insertHTML', false, link);
      updateContent();
      setIsLinkDialogOpen(false);
      setLinkUrl('');
      setLinkText('');
    } else {
      toast({
        title: 'Erro',
        description: 'Preencha a URL e o texto do link',
        variant: 'destructive'
      });
    }
  };

  const insertImage = () => {
    const imageUrl = prompt('Digite a URL da imagem:');
    if (imageUrl) {
      const img = `<img src="${imageUrl}" alt="Imagem" style="max-width: 100%; height: auto;" />`;
      document.execCommand('insertHTML', false, img);
      updateContent();
    }
  };

  const formatHeading = (level: number) => {
    const tag = `h${level}`;
    if (document.queryCommandState('formatBlock')) {
      execCommand('formatBlock', tag);
    } else {
      execCommand('formatBlock', tag);
    }
  };

  const toolbarButtons = [
    { icon: Bold, command: 'bold', title: 'Negrito (Ctrl+B)' },
    { icon: Italic, command: 'italic', title: 'Itálico (Ctrl+I)' },
    { icon: Underline, command: 'underline', title: 'Sublinhado (Ctrl+U)' },
    { separator: true },
    { icon: Heading1, command: () => formatHeading(1), title: 'Título 1' },
    { icon: Heading2, command: () => formatHeading(2), title: 'Título 2' },
    { icon: Heading3, command: () => formatHeading(3), title: 'Título 3' },
    { separator: true },
    { icon: AlignLeft, command: 'justifyLeft', title: 'Alinhar à esquerda' },
    { icon: AlignCenter, command: 'justifyCenter', title: 'Centralizar' },
    { icon: AlignRight, command: 'justifyRight', title: 'Alinhar à direita' },
    { separator: true },
    { icon: List, command: 'insertUnorderedList', title: 'Lista não ordenada' },
    { icon: ListOrdered, command: 'insertOrderedList', title: 'Lista ordenada' },
    { icon: Quote, command: 'formatBlock', commandValue: 'blockquote', title: 'Citação' },
    { icon: Code, command: 'formatBlock', commandValue: 'pre', title: 'Código' },
    { separator: true },
    { icon: Link, command: () => setIsLinkDialogOpen(true), title: 'Inserir link' },
    { icon: Image, command: insertImage, title: 'Inserir imagem' },
  ];

  return (
    <div className={`rich-text-editor ${className}`}>
      {/* Toolbar */}
      <div className="toolbar">
        {toolbarButtons.map((button, index) => {
          if (button.separator) {
            return <div key={index} className="w-px h-6 bg-border mx-1" />;
          }
          
          const Icon = button.icon;
          const handleClick = () => {
            if (typeof button.command === 'function') {
              button.command();
            } else if (button.commandValue) {
              execCommand(button.command, button.commandValue);
            } else {
              execCommand(button.command);
            }
          };

          return (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={handleClick}
              title={button.title}
              className="h-8 w-8 p-0"
            >
              <Icon className="h-4 w-4" />
            </Button>
          );
        })}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="editor"
        onInput={updateContent}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
      />

      {/* Link Dialog */}
      {isLinkDialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Inserir Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Texto do link:</label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Texto do link"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">URL:</label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="https://exemplo.com"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsLinkDialogOpen(false);
                    setLinkUrl('');
                    setLinkText('');
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={insertLink}>
                  Inserir
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor; 
