
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PrivacyModalProps {
  children: React.ReactNode;
}

export function PrivacyModal({ children }: PrivacyModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Política de Privacidade</DialogTitle>
          <DialogDescription>
            Como coletamos, usamos e protegemos suas informações pessoais.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">1. Informações que Coletamos</h3>
            <p className="text-muted-foreground">
              Coletamos informações que você nos fornece diretamente, como nome, email, e dados de uso da plataforma para melhorar nossos serviços.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">2. Como Usamos suas Informações</h3>
            <p className="text-muted-foreground">
              Utilizamos suas informações para fornecer e melhorar nossos serviços, comunicar atualizações importantes e personalizar sua experiência na plataforma.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. Compartilhamento de Informações</h3>
            <p className="text-muted-foreground">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto quando necessário para fornecer nossos serviços ou quando exigido por lei.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">4. Segurança dos Dados</h3>
            <p className="text-muted-foreground">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">5. Seus Direitos</h3>
            <p className="text-muted-foreground">
              Você tem o direito de acessar, corrigir, excluir ou transferir suas informações pessoais. Entre em contato conosco para exercer esses direitos.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">6. Cookies</h3>
            <p className="text-muted-foreground">
              Utilizamos cookies para melhorar sua experiência de navegação e analisar o uso da plataforma. Você pode gerenciar suas preferências de cookies nas configurações do seu navegador.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">7. Alterações na Política</h3>
            <p className="text-muted-foreground">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre mudanças significativas através da plataforma ou por email.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">8. Contato</h3>
            <p className="text-muted-foreground">
              Para questões sobre privacidade ou esta política, entre em contato através dos canais disponíveis em nossa plataforma.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
