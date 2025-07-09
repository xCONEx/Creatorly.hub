import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { Lock, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabaseClient';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState('');

  // Verificar se o usuário já está logado
  useEffect(() => {
    if (!authLoading && user) {
      toast({
        title: "Já logado!",
        description: "Você já está logado no sistema.",
      });
      navigate('/admin');
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Login realizado!",
          description: "Bem-vindo ao painel administrativo.",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro interno do servidor.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading enquanto verifica a sessão
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground">Verificando sessão...</p>
        </div>
      </div>
    );
  }

  // Se já está logado, não mostrar o formulário
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-gradient-card shadow-elegant border-primary/10">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Admin Login
          </CardTitle>
          <p className="text-muted-foreground">
            Acesse o painel administrativo do Creatorly
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@creatorly.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-primary underline text-sm hover:text-primary/80"
              onClick={() => setShowRegister(true)}
            >
              Criar Conta
            </button>
          </div>
          <Dialog open={showRegister} onOpenChange={setShowRegister}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Conta de Administrador</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={async e => {
                e.preventDefault();
                setRegisterError(null);
                setRegisterSuccess(null);
                setRegisterLoading(true);
                const name = (document.getElementById('register-name') as HTMLInputElement).value;
                const email = (document.getElementById('register-email') as HTMLInputElement).value;
                const password = (document.getElementById('register-password') as HTMLInputElement).value;
                const passwordConfirm = (document.getElementById('register-password-confirm') as HTMLInputElement).value;
                const code = (document.getElementById('register-invite-code') as HTMLInputElement).value;
                if (password !== passwordConfirm) {
                  setRegisterError('As senhas não coincidem.');
                  setRegisterLoading(false);
                  return;
                }
                // Validar código de convite
                const { data: codeData, error: codeError } = await supabase
                  .from('invitation_codes')
                  .select('*')
                  .eq('code', code)
                  .eq('used', false)
                  .single();
                if (codeError || !codeData) {
                  setRegisterError('Código de convite inválido ou já utilizado.');
                  setRegisterLoading(false);
                  return;
                }
                // Criar usuário no Supabase Auth
                const { data, error } = await supabase.auth.signUp({
                  email,
                  password,
                  options: { data: { name, role: codeData.role } }
                });
                if (error) {
                  setRegisterError(error.message);
                  setRegisterLoading(false);
                  return;
                }
                // Marcar código como usado
                await supabase
                  .from('invitation_codes')
                  .update({ used: true, used_by: data.user?.id, used_at: new Date().toISOString() })
                  .eq('code', code);
                setRegisterSuccess('Conta criada com sucesso! Verifique seu email para confirmar.');
                setRegisterLoading(false);
              }}>
                <div>
                  <Label htmlFor="register-name">Nome</Label>
                  <Input id="register-name" type="text" placeholder="Seu nome" required />
                </div>
                <div>
                  <Label htmlFor="register-email">Email</Label>
                  <Input id="register-email" type="email" placeholder="seu@email.com" required />
                </div>
                <div>
                  <Label htmlFor="register-password">Senha</Label>
                  <Input id="register-password" type="password" placeholder="••••••••" required minLength={6} />
                </div>
                <div>
                  <Label htmlFor="register-password-confirm">Confirmar Senha</Label>
                  <Input id="register-password-confirm" type="password" placeholder="Repita a senha" required minLength={6} />
                </div>
                <div>
                  <Label htmlFor="register-invite-code">Código de convite</Label>
                  <Input id="register-invite-code" type="text" placeholder="Informe o código fornecido pelo admin" required value={inviteCode} onChange={e => setInviteCode(e.target.value)} />
                </div>
                {registerError && <div className="text-destructive text-sm">{registerError}</div>}
                {registerSuccess && <div className="text-green-600 text-sm">{registerSuccess}</div>}
                <Button type="submit" className="w-full bg-gradient-primary" disabled={registerLoading}>
                  {registerLoading ? 'Criando...' : 'Criar Conta'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
