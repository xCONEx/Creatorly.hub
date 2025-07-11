
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Check, Star, FileText, Download, Send, Calculator, Smartphone, Users, Clock, Shield, Zap } from "lucide-react";

const OrcaFacilSales = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">OrçaFácil</span>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              Criar meu primeiro orçamento
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-orange-50 to-red-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              ⚡ Novo: Orçamentos profissionais em minutos
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Crie <span className="text-orange-500">orçamentos profissionais</span> que vendem mais
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A ferramenta mais simples e poderosa para criar, enviar e acompanhar orçamentos que impressionam seus clientes e fecham mais negócios.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-4">
                Criar meu primeiro orçamento
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Ver exemplo de orçamento
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Grátis para sempre</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Sem limite de orçamentos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>PDF profissional</span>
              </div>
            </div>
          </div>

          {/* Orçamento Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold">Gerador de Orçamentos</h3>
                <p className="text-orange-100">Crie orçamentos profissionais em PDF</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3">Dados do Projeto</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cliente:</span>
                      <span className="font-medium">Empresa XYZ Ltda.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Projeto:</span>
                      <span className="font-medium">Website Institucional</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prazo:</span>
                      <span className="font-medium">30 dias</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Validade:</span>
                      <span className="font-medium">15 dias</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Resumo Financeiro</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">R$ 4.500,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Desconto:</span>
                      <span className="font-medium">R$ 450,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Impostos:</span>
                      <span className="font-medium">R$ 405,00</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-lg font-bold text-orange-600">R$ 4.455,00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                  <Download className="mr-2 h-4 w-4" />
                  Baixar PDF
                </Button>
                <Button variant="outline" className="flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar por Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa para orçar como um profissional
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ferramentas simples e poderosas que vão impressionar seus clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Templates Profissionais</h3>
                <p className="text-gray-600">
                  Modelos prontos e personalizáveis que impressionam clientes e fecham mais negócios.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cálculos Automáticos</h3>
                <p className="text-gray-600">
                  Descubra o valor ideal para seus projetos com nossa calculadora inteligente.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Send className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Envio Profissional</h3>
                <p className="text-gray-600">
                  Envie por email ou compartilhe por link com acompanhamento de visualização.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">PDF de Alta Qualidade</h3>
                <p className="text-gray-600">
                  Gere PDFs profissionais com sua marca e identidade visual personalizada.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Acompanhamento</h3>
                <p className="text-gray-600">
                  Saiba quando seu cliente visualizou o orçamento e acompanhe o status.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Acesso Mobile</h3>
                <p className="text-gray-600">
                  Crie e envie orçamentos de qualquer lugar com nosso sistema responsivo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona? É simples!
            </h2>
            <p className="text-xl text-gray-600">
              Em 3 passos você cria orçamentos profissionais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Preencha os dados</h3>
              <p className="text-gray-600">
                Informe os dados do cliente, projeto e serviços de forma simples e rápida.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalize o design</h3>
              <p className="text-gray-600">
                Escolha um template e personalize com sua marca e identidade visual.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Envie e acompanhe</h3>
              <p className="text-gray-600">
                Envie por email ou compartilhe por link e acompanhe quando o cliente visualizar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mais de 15.000 orçamentos criados
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-lg font-semibold">4.8/5 (892 avaliações)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Minha taxa de conversão de orçamentos aumentou 40% depois que comecei a usar o OrçaFácil. Os clientes ficam impressionados!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold">João Pedro</p>
                    <p className="text-sm text-gray-500">Designer Freelancer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Economizo 2 horas na criação de cada orçamento. É simples, rápido e o resultado é super profissional."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Mariana Silva</p>
                    <p className="text-sm text-gray-500">Agência Digital</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-0">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "A calculadora de preços me ajudou a descobrir que estava cobrando muito barato. Agora minha margem é saudável!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Carlos Andrade</p>
                    <p className="text-sm text-gray-500">Desenvolvedor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Escolha o plano ideal para você
            </h2>
            <p className="text-xl text-gray-600">
              Comece grátis e escale conforme seu negócio cresce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Básico */}
            <Card className="p-6 relative">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">Básico</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">R$ 19,90</span>
                  <span className="text-gray-500">/mês</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>100 PDFs por mês</span></li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>5 temas de cores</span></li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>Upload de logo</span></li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>Gestão básica de clientes</span></li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>Exportação em PDF</span></li>
                </ul>
                <Button className="w-full" variant="outline">Assinar Básico</Button>
              </CardContent>
            </Card>

            {/* Profissional */}
            <Card className="p-6 relative border-orange-500 border-2">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">Mais Popular</span>
              </div>
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">Profissional</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">R$ 39,90</span>
                  <span className="text-gray-500">/mês</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>1.000 PDFs por mês</span></li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>Todos os recursos do plano Básico</span></li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>Templates premium</span></li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>Personalização de cores ilimitadas</span></li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>Backup dos orçamentos</span></li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>Analytics básico</span></li>
                </ul>
                <Button className="w-full bg-orange-500 hover:bg-orange-600">Assinar Profissional</Button>
              </CardContent>
            </Card>

            {/* Empresarial */}
            <Card className="p-6 relative">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">Empresarial</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">R$ 59,90</span>
                  <span className="text-gray-500">/mês</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>PDFs ilimitados</span></li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>Todos os recursos do Profissional</span></li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>Analytics avançado</span></li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>Backup completo</span></li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /><span>Suporte prioritário</span></li>
                </ul>
                <Button className="w-full" variant="outline">Assinar Empresarial</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para criar orçamentos que vendem?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Junte-se a milhares de profissionais que já impressionam seus clientes
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100">
              Criar meu primeiro orçamento
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-orange-100">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Grátis para sempre</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Sem limite de orçamentos</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Suporte incluído</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">OrçaFácil</span>
          </div>
          <div className="text-center text-gray-500">
            <p>&copy; 2025 OrçaFácil. Todos os direitos reservados.</p>
            <p>by CreatorlyHub</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-2">
              <a href="https://www.instagram.com/creatorlyhub/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500">Instagram: @creatorlyhub</a>
              <span className="hidden md:inline">|</span>
              <a href="mailto:contato@creatorlyhub.com.br" className="hover:text-orange-500">contato@creatorlyhub.com.br</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrcaFacilSales;
