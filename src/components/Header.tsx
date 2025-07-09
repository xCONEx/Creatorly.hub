
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-foreground">Creatorly</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <button 
              onClick={() => scrollToSection('financeflow')}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              FinanceFlow
            </button>
            <button 
              onClick={() => scrollToSection('orcafacil')}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              OrçaFácil
            </button>
            <button 
              onClick={() => scrollToSection('contratpro')}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              ContratPro
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Recursos
            </button>
            <Link 
              to="/blog" 
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Blog
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <Button 
            variant="default" 
            className="hidden lg:inline-flex bg-gradient-primary hover:shadow-glow transition-all duration-300"
            onClick={() => scrollToSection('cta')}
          >
            Começar Grátis
          </Button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
            <nav className="px-4 py-4 space-y-4">
              <Link 
                to="/" 
                className="block text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <button 
                onClick={() => scrollToSection('financeflow')}
                className="block text-left text-muted-foreground hover:text-primary transition-colors font-medium w-full"
              >
                FinanceFlow
              </button>
              <button 
                onClick={() => scrollToSection('orcafacil')}
                className="block text-left text-muted-foreground hover:text-primary transition-colors font-medium w-full"
              >
                OrçaFácil
              </button>
              <button 
                onClick={() => scrollToSection('contratpro')}
                className="block text-left text-muted-foreground hover:text-primary transition-colors font-medium w-full"
              >
                ContratPro
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="block text-left text-muted-foreground hover:text-primary transition-colors font-medium w-full"
              >
                Recursos
              </button>
              <Link 
                to="/blog" 
                className="block text-muted-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Button 
                variant="default" 
                className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 mt-4"
                onClick={() => {
                  scrollToSection('cta');
                  setIsMenuOpen(false);
                }}
              >
                Começar Grátis
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
