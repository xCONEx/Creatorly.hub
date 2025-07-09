import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-12 py-8">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 mb-2">
          <img src="/favicon.svg" alt="Creatorly" className="h-6 w-6" />
          <span className="font-bold text-lg text-gray-900">Creatorly</span>
        </div>
        <nav className="flex gap-6 text-sm text-gray-600 mb-2">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link to="/contato" className="hover:text-primary transition-colors">Contato</Link>
        </nav>
        <div className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Creatorly. Todos os direitos reservados.</div>
      </div>
    </footer>
  );
};

export default Footer; 
