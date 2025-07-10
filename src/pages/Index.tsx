
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import AnimatedText from "@/components/AnimatedText";
import { TermsModal } from "@/components/TermsModal";
import { PrivacyModal } from "@/components/PrivacyModal";
import { ArrowRight, DollarSign, FileText, Calculator, Shield, Users, Zap, TrendingUp, Check, Star, CheckCircle, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Side - Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  🚀 Novo: Plataforma completa para criadores
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                  Creatorly. O hub de negócios para <AnimatedText />.
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-4">
                  Soluções para quem vive de criar: financeiro, orçamentos, campanhas e muito mais. Transforme sua criatividade em negócio sustentável.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  👀 Conheça nossos apps
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" 
                    alt="Criador 1" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face" 
                    alt="Criadora 2" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face" 
                    alt="Criador 3" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face" 
                    alt="Criadora 4" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Junte-se a nós agora!</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">4.9/5</span>
                </div>
              </div>
            </div>

            {/* Right Side - Dashboard Preview */}
            <div className="flex-1 w-full max-w-2xl">
              <div className="bg-white rounded-2xl shadow-card p-6 border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">R$ 45k</h3>
                  <span className="text-2xl font-bold text-green-600">127</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                  <span>Faturamento</span>
                  <span>Jobs</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="h-2 bg-blue-200 rounded-full"></div>
                  <div className="h-2 bg-purple-200 rounded-full"></div>
                  <div className="h-2 bg-green-200 rounded-full"></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Dashboard Pessoal</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FinanceFlow Section */}
      <section className="py-12 md:py-20 px-4 bg-background" id="financeflow">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Side - Content */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  FinanceFlow
                </h2>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Seu financeiro organizado de forma simples e poderosa
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Controle completo de entradas e saídas</h3>
                    <p className="text-muted-foreground text-sm">Monitore todo o fluxo financeiro do seu negócio criativo</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Relatórios, fluxo de caixa e DRE</h3>
                    <p className="text-muted-foreground text-sm">Relatórios profissionais para tomada de decisões</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Gestão financeira intuitiva</h3>
                    <p className="text-muted-foreground text-sm">Interface pensada especificamente para criadores</p>
                  </div>
                </div>
              </div>

             <a
  href="/financeflow"
  target="_blank"
  rel="noopener noreferrer"
>
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Acessar FinanceFlow
                </Button>
              </a>
            </div>

            {/* Right Side - Dashboard Preview */}
            <div className="flex-1 w-full max-w-2xl order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-card p-6 border">
                {/* Header */}
                <div className="bg-gradient-primary text-white p-4 rounded-lg mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">FF</span>
                    </div>
                    <span className="font-semibold">FinanceFlow</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span>Dashboard</span>
                    <span>Projetos</span>
                    <span>Financeiro</span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div>
                  <h3 className="text-xl font-bold mb-2">Dashboard Pessoal</h3>
                  <p className="text-muted-foreground mb-6">Visão geral do seu negócio pessoal</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-sm font-medium">Custos Mensais</span>
                          <DollarSign className="h-4 w-4 ml-auto" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium">Valor Equipamentos</span>
                          <FileText className="h-4 w-4 ml-auto" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">Valor Hora</span>
                          <Clock className="h-4 w-4 ml-auto" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm font-medium">Jobs Aprovados</span>
                          <TrendingUp className="h-4 w-4 ml-auto" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">Últimos Jobs Calculados</h4>
                      <Button variant="outline" size="sm">Ver Histórico</Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Gravação Campanha</p>
                          <p className="text-sm text-muted-foreground">FinanceFlow • 22/06/2025</p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">pendente</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Gravação Conteúdos</p>
                          <p className="text-sm text-muted-foreground">Orça Fácil • 11/06/2025</p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">pendente</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OrçaFácil Section */}
      <section className="py-12 md:py-20 px-4" id="orcafacil">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Side - Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
                <Zap className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  OrçaFácil
                </h2>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Orçamentos e propostas profissionais, em minutos
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Modelos personalizáveis</h3>
                    <p className="text-muted-foreground text-sm">Templates profissionais adaptáveis ao seu negócio</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Envio profissional</h3>
                    <p className="text-muted-foreground text-sm">Compartilhe por link ou exporte em PDF</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Controle de aprovação</h3>
                    <p className="text-muted-foreground text-sm">Acompanhe o status e negocie diretamente na plataforma</p>
                  </div>
                </div>
              </div>

              
                <a
  href="/orcafacil"
  target="_blank"
  rel="noopener noreferrer"
>
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <Zap className="mr-2 h-5 w-5" />
                  Acessar OrçaFácil
                </Button>
              </a>
            </div>

            {/* Right Side - OrçaFácil Preview */}
            <div className="flex-1 w-full max-w-2xl">
              <div className="bg-white rounded-2xl shadow-card p-6 border">
                {/* Header */}
                <div className="bg-blue-500 text-white p-4 rounded-lg mb-6">
                  <h3 className="font-bold text-lg">Gerador de Orçamentos</h3>
                  <p className="text-blue-100">Crie orçamentos profissionais e personalizados em PDF</p>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-green-600 font-bold">Enterprise</div>
                      <div className="text-sm text-muted-foreground">Status: Ativo</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">36</div>
                      <div className="text-sm text-muted-foreground">PDFs Gerados</div>
                      <div className="text-xs text-muted-foreground">Limite: 9999</div>
                    </div>
                    <div>
                      <div className="text-orange-600 font-bold">13/06/2026</div>
                      <div className="text-sm text-muted-foreground">Expira em</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Calculator className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                        <h4 className="font-semibold mb-1">Analytics Dashboard</h4>
                        <p className="text-sm text-muted-foreground mb-3">Relatórios detalhados e insights do seu negócio</p>
                        <Button className="w-full" size="sm">Ver Analytics</Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <FileText className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                        <h4 className="font-semibold mb-1">Backup de Orçamentos</h4>
                        <p className="text-sm text-muted-foreground mb-3">Salve e gerencie seus orçamentos</p>
                        <Button className="w-full" size="sm" variant="outline">Gerenciar Backups</Button>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="font-medium">ORÇAFÁCIL</p>
                    <p className="text-sm text-muted-foreground">Logo da Empresa</p>
                  </div>

                  <Button className="w-full" size="lg">
                    <FileText className="mr-2 h-5 w-5" />
                    Gerar PDF do Orçamento
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ContratPro Section */}
      <section className="py-12 md:py-20 px-4 bg-background" id="contratpro">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Side - Content */}
            <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
                <FileText className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  ContratPro
                </h2>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Contratos inteligentes e assinatura digital profissional
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Contratos inteligentes</h3>
                    <p className="text-muted-foreground text-sm">Modelos personalizáveis com variáveis dinâmicas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Assinatura digital certificada</h3>
                    <p className="text-muted-foreground text-sm">Validade jurídica com certificado digital</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">Automação completa</h3>
                    <p className="text-muted-foreground text-sm">Workflow automatizado da criação à assinatura</p>
                  </div>
                </div>
              </div>

              
 <a
  href="/contratpro"
  target="_blank"
  rel="noopener noreferrer"
>
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <FileText className="mr-2 h-5 w-5" />
                  Acessar ContratPro
                </Button>
              </a>
            </div>

            {/* Right Side - ContratPro Preview */}
            <div className="flex-1 w-full max-w-2xl order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-card p-6 border">
                {/* Header */}
                <div className="bg-gradient-primary text-white p-4 rounded-lg mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-semibold">ContratPro</span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span>Dashboard</span>
                    <span>Contratos</span>
                    <span>Clientes</span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div>
                  <h3 className="text-xl font-bold mb-2">Dashboard</h3>
                  <p className="text-muted-foreground mb-6">Bem-vindo ao ContratPro</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600 mb-1">0</div>
                        <div className="text-sm text-muted-foreground mb-1">Contratos Ativos</div>
                        <div className="text-xs text-muted-foreground">Nenhum contrato ativo</div>
                        <CheckCircle className="h-6 w-6 text-green-500 mx-auto mt-2" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600 mb-1">1</div>
                        <div className="text-sm text-muted-foreground mb-1">Contratos Pendentes</div>
                        <div className="text-xs text-muted-foreground">Aguardando assinatura</div>
                        <Shield className="h-6 w-6 text-orange-500 mx-auto mt-2" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600 mb-1">1</div>
                        <div className="text-sm text-muted-foreground mb-1">Clientes</div>
                        <div className="text-xs text-muted-foreground">Total de clientes</div>
                        <Users className="h-6 w-6 text-blue-500 mx-auto mt-2" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 mb-1">R$ 0,00</div>
                        <div className="text-sm text-muted-foreground mb-1">Receita Total</div>
                        <div className="text-xs text-muted-foreground">Nenhuma receita registrada</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Ações Rápidas</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Novo Contrato
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Users className="mr-2 h-4 w-4" />
                        Gerenciar Clientes
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Shield className="mr-2 h-4 w-4" />
                        Ver Pendentes
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        Ver Relatórios
                      </Button>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <h5 className="font-semibold mb-3">Resumo da Atividade</h5>
                      <div className="text-sm text-muted-foreground">Status geral dos seus contratos</div>
                      
                      <div className="space-y-2 mt-4">
                        <div className="flex justify-between">
                          <span>Contratos Assinados</span>
                          <span className="font-semibold">0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Aguardando Assinatura</span>
                          <span className="font-semibold">1</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total de Clientes</span>
                          <span className="font-semibold">1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Por que usar a Creatorly?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A plataforma mais completa para transformar sua criatividade em negócio sustentável
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Tudo num só lugar</h3>
              <p className="text-muted-foreground text-sm">
                Todas as ferramentas que você precisa integradas em uma única plataforma segura.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Feita para criadores</h3>
              <p className="text-muted-foreground text-sm">
                Desenvolvida especificamente para as necessidades de criadores e produtoras.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Interface simples</h3>
              <p className="text-muted-foreground text-sm">
                Design intuitivo que facilita o uso no dia a dia do seu negócio criativo.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Negócio sustentável</h3>
              <p className="text-muted-foreground text-sm">
                Transforme sua criatividade em um negócio organizado e lucrativo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-primary" id="cta">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para organizar seu negócio criativo?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Junte-se a milhares de criadores que já transformaram seus negócios com a Creatorly. Comece gratuitamente hoje mesmo.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-400" />
              <span className="text-white">Sem cartão de crédito</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-400" />
              <span className="text-white">Setup em 2 minutos</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 transition-all duration-300">
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/blog">
              <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90 transition-all duration-300">
                Ler o Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold text-foreground">Creatorly</span>
              </div>
              <p className="text-muted-foreground text-sm">
                O hub completo para criadores de conteúdo profissionalizarem seus negócios.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Apps</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#financeflow" className="hover:text-primary">FinanceFlow</a></li>
                <li><a href="#orcafacil" className="hover:text-primary">OrçaFácil</a></li>
                <li><a href="#contratpro" className="hover:text-primary">ContratPro</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/blog" className="hover:text-primary">Blog</Link></li>
                <li><a href="#" className="hover:text-primary">Tutoriais</a></li>
                <li><a href="#" className="hover:text-primary">FAQ</a></li>
                <li><a href="#" className="hover:text-primary">Suporte</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Sobre</a></li>
                <li><a href="#" className="hover:text-primary">Contato</a></li>
                <li>
                  <PrivacyModal>
                    <button className="hover:text-primary text-left">Privacidade</button>
                  </PrivacyModal>
                </li>
                <li>
                  <TermsModal>
                    <button className="hover:text-primary text-left">Termos</button>
                  </TermsModal>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Creatorly Hub. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
