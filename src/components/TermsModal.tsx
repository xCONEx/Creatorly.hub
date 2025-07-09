
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TermsModalProps {
  children: React.ReactNode;
}

export function TermsModal({ children }: TermsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Termos de Uso</DialogTitle>
          <DialogDescription>
            Leia atentamente nossos termos de uso antes de utilizar a plataforma.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">1. Aceitação dos Termos</h3>
            <p className="text-muted-foreground">
              Ao acessar e usar a plataforma Creatorly, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">2. Descrição do Serviço</h3>
            <p className="text-muted-foreground mb-2">
              A Creatorly é uma plataforma que oferece ferramentas de gestão de negócios para criadores de conteúdo, incluindo:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>FinanceFlow - Gestão financeira</li>
              <li>OrçaFácil - Criação de orçamentos</li>
              <li>ContratPro - Contratos e documentos legais</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. Conta do Usuário</h3>
            <p className="text-muted-foreground">
              Para usar nossos serviços, você deve criar uma conta fornecendo informações precisas e completas. Você é responsável por manter a confidencialidade de sua conta e senha.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">4. Uso Aceitável</h3>
            <p className="text-muted-foreground mb-2">
              Você concorda em não usar a plataforma para:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Atividades ilegais ou fraudulentas</li>
              <li>Violar direitos de propriedade intelectual</li>
              <li>Transmitir conteúdo malicioso ou prejudicial</li>
              <li>Interferir no funcionamento da plataforma</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">5. Propriedade Intelectual</h3>
            <p className="text-muted-foreground">
              Todo o conteúdo da plataforma Creatorly, incluindo textos, gráficos, logos e software, é propriedade da Creatorly e está protegido por leis de direitos autorais.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">6. Limitação de Responsabilidade</h3>
            <p className="text-muted-foreground">
              A Creatorly não será responsável por danos indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou incapacidade de usar nossos serviços.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">7. Modificações</h3>
            <p className="text-muted-foreground">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação na plataforma.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">8. Contato</h3>
            <p className="text-muted-foreground">
              Para dúvidas sobre estes Termos de Uso, entre em contato conosco através dos canais disponíveis em nossa plataforma.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
