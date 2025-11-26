import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertCircle, Clock, MapPin, Phone, Mail, FileText, Upload, Home as HomeIcon, Bell, LogOut } from "lucide-react";

type Page = "landing" | "login" | "dashboard";
type RequestStatus = "em_analise" | "registrada" | "recusada";

interface UserRequest {
  id: string;
  secretaria: string;
  titulo: string;
  descricao: string;
  status: RequestStatus;
  data: string;
  protocolo: string;
}

interface UserData {
  nome: string;
  cpf: string;
  email: string;
  cep: string;
  endereco: string;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [requests, setRequests] = useState<UserRequest[]>([
    {
      id: "1",
      secretaria: "Secretaria de Infraestrutura",
      titulo: "Buraco na via pública",
      descricao: "Buraco na Rua Principal, próximo à escola",
      status: "registrada",
      data: "2025-11-20",
      protocolo: "VZ-2025-001",
    },
    {
      id: "2",
      secretaria: "Secretaria de Educação",
      titulo: "Falta de vagas escolares",
      descricao: "Solicitação de vaga para criança de 6 anos",
      status: "em_analise",
      data: "2025-11-18",
      protocolo: "VZ-2025-002",
    },
  ]);

  const [loginForm, setLoginForm] = useState({
    cpf: "",
    email: "",
    nome: "",
    cep: "",
    endereco: "",
  });

  const secretarias = [
    { id: 1, nome: "Saúde", icon: "🏥", color: "bg-blue-50 border-blue-200" },
    { id: 2, nome: "Educação", icon: "📚", color: "bg-green-50 border-green-200" },
    { id: 3, nome: "Saneamento", icon: "🌊", color: "bg-cyan-50 border-cyan-200" },
    { id: 4, nome: "Infraestrutura", icon: "🛣️", color: "bg-orange-50 border-orange-200" },
    { id: 5, nome: "Transporte", icon: "🚌", color: "bg-purple-50 border-purple-200" },
    { id: 6, nome: "Limpeza Urbana", icon: "🧹", color: "bg-yellow-50 border-yellow-200" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.cpf && loginForm.email && loginForm.nome && loginForm.cep && loginForm.endereco) {
      setUserData(loginForm);
      setCurrentPage("dashboard");
    }
  };

  const handleLogout = () => {
    setUserData(null);
    setLoginForm({ cpf: "", email: "", nome: "", cep: "", endereco: "" });
    setCurrentPage("landing");
  };

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "registrada":
        return "text-green-600 bg-green-50";
      case "em_analise":
        return "text-blue-600 bg-blue-50";
      case "recusada":
        return "text-red-600 bg-red-50";
    }
  };

  const getStatusIcon = (status: RequestStatus) => {
    switch (status) {
      case "registrada":
        return <CheckCircle className="w-4 h-4" />;
      case "em_analise":
        return <Clock className="w-4 h-4" />;
      case "recusada":
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: RequestStatus) => {
    switch (status) {
      case "registrada":
        return "Registrada";
      case "em_analise":
        return "Em Análise";
      case "recusada":
        return "Recusada";
    }
  };

  // Landing Page
  if (currentPage === "landing") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-foreground">Vizin APP</span>
            </div>
            <Button onClick={() => setCurrentPage("login")} className="bg-accent hover:bg-accent/90">
              Entrar
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-5xl font-bold text-foreground leading-tight">
                    Sua Voz Importa para Maricá
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Comunicação direta entre cidadãos e secretarias municipais. Reporte problemas, acompanhe soluções e participe da melhoria da sua cidade.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={() => setCurrentPage("login")}
                    className="bg-accent hover:bg-accent/90 text-white px-8 py-6 text-lg"
                  >
                    Começar Agora
                  </Button>
                  <Button variant="outline" className="px-8 py-6 text-lg">
                    Saiba Mais
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/hero-banner.jpg"
                  alt="Vizin APP - Engajamento Cidadão"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">Como Funciona</h2>
              <p className="text-lg text-muted-foreground">Processo simples e transparente para resolver problemas da cidade</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 border-slate-200 hover:border-accent transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <CardTitle>1. Registre</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Faça login e descreva o problema que encontrou na sua comunidade com fotos e documentos.</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-200 hover:border-accent transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <CardTitle>2. Acompanhe</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Receba atualizações em tempo real sobre o status de sua solicitação através do aplicativo.</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-slate-200 hover:border-accent transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <CardTitle>3. Resolva</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">As secretarias municipais trabalham para resolver seu problema com transparência e eficiência.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img
                  src="/community-illustration.jpg"
                  alt="Comunidade Engajada"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-foreground">Benefícios para Maricá</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Transparência Total</h3>
                      <p className="text-muted-foreground">Acompanhe em tempo real todas as etapas de resolução de sua solicitação.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Resposta Garantida</h3>
                      <p className="text-muted-foreground">Retorno em até 7 dias úteis sobre sua solicitação.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Dados Protegidos</h3>
                      <p className="text-muted-foreground">Conformidade total com LGPD. Seus dados são seguros e privados.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Fácil de Usar</h3>
                      <p className="text-muted-foreground">Interface simples e intuitiva para qualquer pessoa usar.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-foreground">Segurança e Privacidade</h2>
                <p className="text-lg text-muted-foreground">
                  Seus dados pessoais são protegidos com os mais altos padrões de segurança digital. Estamos em conformidade total com a Lei Geral de Proteção de Dados Pessoais (LGPD).
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-foreground">Criptografia de dados em trânsito e em repouso</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-foreground">Autenticação segura e verificada</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-foreground">Conformidade com LGPD</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">✓</span>
                    <span className="text-foreground">Auditoria e monitoramento contínuos</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img
                  src="/security-illustration.jpg"
                  alt="Segurança de Dados"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-accent to-accent/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Pronto para Fazer Diferença?</h2>
            <p className="text-xl mb-8 opacity-90">Junte-se a milhares de cidadãos que já estão melhorando Maricá</p>
            <Button
              onClick={() => setCurrentPage("login")}
              className="bg-white text-accent hover:bg-slate-100 px-8 py-6 text-lg font-semibold"
            >
              Começar Agora
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-bold mb-4">Vizin APP</h4>
                <p className="text-slate-400 text-sm">Conectando cidadãos e governo para uma Maricá melhor.</p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Links Rápidos</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-white">Sobre</a></li>
                  <li><a href="#" className="hover:text-white">Contato</a></li>
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Secretarias</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-white">Saúde</a></li>
                  <li><a href="#" className="hover:text-white">Educação</a></li>
                  <li><a href="#" className="hover:text-white">Infraestrutura</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-white">Privacidade</a></li>
                  <li><a href="#" className="hover:text-white">Termos</a></li>
                  <li><a href="#" className="hover:text-white">LGPD</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
              <p>&copy; 2025 Vizin APP. Todos os direitos reservados. Prefeitura de Maricá - RJ</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Login Page
  if (currentPage === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-accent/5 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Vizin APP</h1>
              <p className="text-muted-foreground">Cadastro de Usuário</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input
                  id="nome"
                  placeholder="Seu nome"
                  value={loginForm.nome}
                  onChange={(e) => setLoginForm({ ...loginForm, nome: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={loginForm.cpf}
                  onChange={(e) => setLoginForm({ ...loginForm, cpf: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  placeholder="00000-000"
                  value={loginForm.cep}
                  onChange={(e) => setLoginForm({ ...loginForm, cep: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  placeholder="Rua, número, complemento"
                  value={loginForm.endereco}
                  onChange={(e) => setLoginForm({ ...loginForm, endereco: e.target.value })}
                  required
                />
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Seus dados são protegidos conforme a LGPD. Usamos apenas para processar suas solicitações.
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white py-6">
                Entrar no Dashboard
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setCurrentPage("landing")}
                className="text-accent hover:text-accent/80"
              >
                Voltar para Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Page
  if (currentPage === "dashboard" && userData) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">Vizin APP</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Bem-vindo, {userData.nome.split(" ")[0]}!
            </h2>
            <p className="text-muted-foreground">Acompanhe suas solicitações e reporte novos problemas</p>
          </div>

          {/* User Info Card */}
          <Card className="mb-8 bg-gradient-to-r from-accent/10 to-blue-50 border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HomeIcon className="w-5 h-5 text-accent" />
                Seus Dados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-semibold text-foreground">{userData.nome}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CPF</p>
                  <p className="font-semibold text-foreground">{userData.cpf}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="font-semibold text-foreground">{userData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Endereço</p>
                  <p className="font-semibold text-foreground">{userData.endereco}, {userData.cep}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="requests" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="requests">Minhas Solicitações</TabsTrigger>
              <TabsTrigger value="new">Nova Solicitação</TabsTrigger>
            </TabsList>

            {/* Requests Tab */}
            <TabsContent value="requests" className="space-y-4">
              {requests.length === 0 ? (
                <Card className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Você ainda não tem solicitações</p>
                  <Button className="bg-accent hover:bg-accent/90">Criar Primeira Solicitação</Button>
                </Card>
              ) : (
                requests.map((request) => (
                  <Card key={request.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{request.titulo}</CardTitle>
                          <CardDescription>{request.secretaria}</CardDescription>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          <span className="text-sm font-semibold">{getStatusText(request.status)}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{request.descricao}</p>
                      <div className="flex justify-between text-sm">
                        <div>
                          <p className="text-muted-foreground">Protocolo</p>
                          <p className="font-mono font-semibold text-foreground">{request.protocolo}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Data</p>
                          <p className="font-semibold text-foreground">{new Date(request.data).toLocaleDateString("pt-BR")}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* New Request Tab */}
            <TabsContent value="new" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Selecione a Secretaria</CardTitle>
                  <CardDescription>Escolha qual secretaria pode ajudar com seu problema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {secretarias.map((sec) => (
                      <Dialog key={sec.id}>
                        <DialogTrigger asChild>
                          <button className={`p-6 rounded-xl border-2 border-slate-200 hover:border-accent transition-all cursor-pointer text-left ${sec.color}`}>
                            <div className="text-3xl mb-2">{sec.icon}</div>
                            <h3 className="font-semibold text-foreground">{sec.nome}</h3>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Nova Solicitação - {sec.nome}</DialogTitle>
                            <DialogDescription>Preencha os detalhes da sua solicitação</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Título da Solicitação</Label>
                              <Input placeholder="Descreva brevemente o problema" />
                            </div>
                            <div className="space-y-2">
                              <Label>Descrição Detalhada</Label>
                              <textarea
                                className="w-full p-2 border border-input rounded-md text-sm"
                                placeholder="Forneça detalhes completos do problema"
                                rows={4}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Anexar Documentos</Label>
                              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-accent transition-colors cursor-pointer">
                                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">Clique para anexar fotos ou documentos</p>
                              </div>
                            </div>
                            <Alert className="bg-blue-50 border-blue-200">
                              <FileText className="h-4 w-4 text-blue-600" />
                              <AlertDescription className="text-blue-800 text-sm">
                                Documentos obrigatórios: Identidade, comprovante de residência (até 3 meses) e foto do problema.
                              </AlertDescription>
                            </Alert>
                            <Button className="w-full bg-accent hover:bg-accent/90">Enviar Solicitação</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Info Card */}
              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Informações Importantes
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-green-900 space-y-2 text-sm">
                  <p>✓ Você receberá uma resposta em até 7 dias úteis</p>
                  <p>✓ Acompanhe o status de sua solicitação em tempo real</p>
                  <p>✓ Seus dados estão protegidos conforme a LGPD</p>
                  <p>✓ Todas as solicitações são analisadas pelas secretarias competentes</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    );
  }

  return null;
}
