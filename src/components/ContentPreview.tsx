import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

interface ContentPreviewProps {
  content: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const ContentPreview: React.FC<ContentPreviewProps> = ({
  content,
  isOpen,
  onClose,
  title = "Visualizar Conteúdo"
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentPreview; 
