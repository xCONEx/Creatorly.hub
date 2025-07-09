import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  ArrowLeft, 
  Share2, 
  Download, 
  User, 
  Calendar,
  ChevronRight,
  BookOpen,
  Target,
  DollarSign,
  TrendingUp
} from "lucide-react";
import Header from "@/components/Header";

// Mock data - em um app real, isso viria de uma API ou CMS
const blogPostData = {
  "como-precificar-seus-servicos-audiovisuais": {
    title: "Como precificar seus serviços audiovisuais em 2024",
    excerpt: "Aprenda a calcular o valor justo dos seus trabalhos e nunca mais perca dinheiro em projetos mal orçados.",
    content: `
# Como precificar seus serviços audiovisuais em 2024

Precificar serviços audiovisuais é uma das maiores dificuldades dos criadores. Muitos profissionais acabam cobrando muito pouco ou perdendo clientes por cobrar demais. Neste guia completo, vamos te ensinar como encontrar o equilíbrio perfeito.

## Por que a precificação é tão importante?

A precificação correta é fundamental para a sustentabilidade do seu negócio. Ela impacta diretamente:

- **Lucratividade**: Garantir que você tenha margem para crescer
- **Posicionamento**: Como o mercado te enxerga
- **Qualidade de vida**: Trabalhar menos e ganhar mais

## Metodologia de precificação por valor

### 1. Calcule seus custos operacionais

Antes de tudo, você precisa conhecer seus custos:

- Equipamentos (depreciação mensal)
- Software e licenças
- Transporte e deslocamento
- Energia elétrica
- Internet de alta velocidade
- Backup e armazenamento

### 2. Defina seu valor por hora

Para calcular seu valor/hora, considere:

1. **Salário desejado**: Quanto você quer ganhar por mês?
2. **Horas trabalhadas**: Quantas horas você trabalha efetivamente?
3. **Margem de lucro**: Reserve pelo menos 30% para crescimento

**Fórmula**: (Salário desejado + Custos) ÷ Horas trabalhadas × 1.3

### 3. Pacotes de valor

Em vez de cobrar apenas por hora, crie pacotes:

#### Pacote Básico
- Filmagem simples
- Edição padrão
- 1 revisão
- Entrega em 7 dias

#### Pacote Premium
- Filmagem com múltiplas câmeras
- Edição avançada com motion graphics
- 3 revisões
- Entrega em 5 dias
- Trilha sonora personalizada

#### Pacote Completo
- Tudo do Premium +
- Roteiro personalizado
- Making of
- Versões para diferentes redes sociais
- Suporte pós-entrega

## Estratégias avançadas de precificação

### Precificação por resultado

Para campanhas publicitárias, considere cobrar um percentual do resultado:

- Performance de venda
- Alcance e engajamento
- ROI do cliente

### Contratos anuais

Ofereça descontos para contratos de longo prazo:

- 10% para contratos semestrais
- 15% para contratos anuais
- Prioridade no cronograma

## Ferramentas que facilitam sua vida

### Planilhas de cálculo

Use nossa planilha gratuita para calcular automaticamente seus preços baseados nos seus custos e objetivos.

### Software de orçamento

Ferramentas como o OrçaFácil automatizam todo o processo e geram PDFs profissionais para seus clientes.

## Negociação inteligente

### Quando aceitar descontos

- Clientes recorrentes (máximo 10%)
- Projetos que agregam ao portfólio
- Períodos de baixa demanda

### Quando NÃO aceitar

- Cliente que sempre pede desconto
- Projetos muito complexos
- Quando você já está com agenda cheia

## Acompanhamento e ajustes

Revise sua precificação a cada 6 meses:

1. **Analise a demanda**: Muitos clientes? Aumente os preços
2. **Avalie os custos**: Inflação e novos equipamentos
3. **Compare com o mercado**: Pesquise a concorrência

## Conclusão

A precificação correta é uma jornada, não um destino. Continue testando, ajustando e evoluindo seus preços conforme seu negócio cresce.

Lembre-se: seu tempo e talento têm valor. Não tenha medo de cobrá-lo adequadamente.
    `,
    author: "Creatorly Team",
    date: "2024-01-15",
    readTime: "8 min",
    category: "Precificação",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=600&fit=crop",
    tags: ["precificação", "finanças", "negócios", "audiovisual"]
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? blogPostData[slug as keyof typeof blogPostData] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Post não encontrado</h1>
          <p className="text-muted-foreground mb-8">O artigo que você procura não existe ou foi removido.</p>
          <Link to="/blog">
            <Button className="bg-gradient-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{post.category}</span>
        </nav>
      </div>

      {/* Hero do Post */}
      <article className="max-w-4xl mx-auto px-4 pb-16">
        {/* Header */}
        <header className="mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            {post.category}
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta informações */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.date).toLocaleDateString('pt-BR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} de leitura</span>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="outline" className="group">
              <Share2 className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              Compartilhar
            </Button>
            <Link to="/blog">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>
        </header>

        {/* Imagem de capa */}
        <div className="mb-12 overflow-hidden rounded-2xl shadow-elegant">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
          />
        </div>

        {/* Conteúdo principal */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar com sumário */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24">
              <Card className="bg-gradient-card shadow-card border-primary/10 p-6">
                <h3 className="flex items-center gap-2 font-semibold text-foreground mb-4">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Neste artigo
                </h3>
                <nav className="space-y-2 text-sm">
                  <a href="#importancia" className="block text-muted-foreground hover:text-primary transition-colors">
                    Por que é importante
                  </a>
                  <a href="#metodologia" className="block text-muted-foreground hover:text-primary transition-colors">
                    Metodologia de precificação
                  </a>
                  <a href="#estrategias" className="block text-muted-foreground hover:text-primary transition-colors">
                    Estratégias avançadas
                  </a>
                  <a href="#ferramentas" className="block text-muted-foreground hover:text-primary transition-colors">
                    Ferramentas úteis
                  </a>
                  <a href="#negociacao" className="block text-muted-foreground hover:text-primary transition-colors">
                    Negociação inteligente
                  </a>
                </nav>
              </Card>

              {/* CTA Sidebar */}
              <Card className="mt-6 bg-gradient-primary p-6 border-0 text-center">
                <Download className="h-8 w-8 text-white mx-auto mb-3" />
                <h4 className="font-bold text-white mb-2">Material Gratuito</h4>
                <p className="text-white/90 text-sm mb-4">
                  Baixe nossa planilha de precificação
                </p>
                <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90">
                  Baixar Grátis
                </Button>
              </Card>
            </div>
          </aside>

          {/* Conteúdo do artigo */}
          <main className="lg:col-span-3 order-1 lg:order-2">
            <div className="prose prose-lg max-w-none">
              {/* Usando dangerouslySetInnerHTML para renderizar markdown simples */}
              <div 
                className="text-foreground leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/### (.*)/g, '<h3 class="text-xl font-bold text-foreground mt-8 mb-4">$1</h3>')
                    .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-foreground mt-12 mb-6">$1</h2>')
                    .replace(/# (.*)/g, '<h1 class="text-3xl font-bold text-foreground mt-16 mb-8">$1</h1>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                    .replace(/- (.*)/g, '<li class="text-muted-foreground mb-2">$1</li>')
                    .replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed">')
                    .replace(/^(?!<[h|l|p])(.*)$/gm, '<p class="text-muted-foreground leading-relaxed">$1</p>')
                }}
              />
            </div>
          </main>
        </div>

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-semibold text-foreground mb-4">Tags relacionadas:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-muted hover:bg-muted/80 transition-colors">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <Card className="mt-12 bg-gradient-card shadow-elegant border-primary/10 p-8">
          <div className="text-center">
            <div className="flex justify-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-primary">
                <Target className="h-5 w-5" />
                <span className="font-semibold">Precificação</span>
              </div>
              <div className="flex items-center gap-2 text-brand-green">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold">Lucratividade</span>
              </div>
              <div className="flex items-center gap-2 text-brand-purple">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">Crescimento</span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Gostou do conteúdo? Compartilhe com outros criadores!
            </h3>
            <p className="text-muted-foreground mb-6">
              Ajude outros profissionais audiovisuais a precificar corretamente seus serviços.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar Artigo
              </Button>
              <Link to="/blog">
                <Button variant="outline">
                  Ver Mais Artigos
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </article>
    </div>
  );
};

export default BlogPost;