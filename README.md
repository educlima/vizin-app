# Vizin APP - Web Prototype

Protótipo web para engajamento cidadão e comunicação entre moradores e secretarias municipais de Maricá - RJ.

## Descrição

O **Vizin APP** é uma plataforma digital que facilita a comunicação entre cidadãos e as secretarias municipais. Através desta aplicação web, os moradores podem:

- **Visualizar informações** sobre os serviços municipais
- **Registrar denúncias e solicitações** de forma simples e intuitiva
- **Acompanhar o status** de suas solicitações em tempo real
- **Anexar documentos e fotos** como comprovantes
- **Receber atualizações** sobre o andamento de suas demandas
- **Participar ativamente** da melhoria da cidade

## Funcionalidades

### Landing Page
- Apresentação clara do projeto e seus benefícios
- Informações sobre como funciona o aplicativo
- Destaques sobre segurança e conformidade com LGPD
- Call-to-action para começar a usar

### Tela de Login/Cadastro
- Cadastro de usuário com CPF, e-mail, nome, CEP e endereço
- Conformidade com LGPD (Lei Geral de Proteção de Dados Pessoais)
- Validação de dados de entrada
- Interface responsiva e intuitiva

### Dashboard Principal
- Bem-vindo personalizado com nome do usuário
- Visualização de dados cadastrados
- Acompanhamento de solicitações ativas
- Barra de progresso para cada solicitação
- Status em tempo real (em análise, registrada, recusada)

### Nova Solicitação
- Seleção de secretaria (Saúde, Educação, Saneamento, Infraestrutura, Transporte, Limpeza Urbana)
- Preenchimento de título e descrição detalhada
- Anexação de documentos obrigatórios
- Geração automática de protocolo
- Informações sobre documentos necessários

## Secretarias Disponíveis

1. **Saúde** 🏥 - Problemas de saúde e atendimento
2. **Educação** 📚 - Questões educacionais e vagas
3. **Saneamento** 🌊 - Problemas de água e saneamento
4. **Infraestrutura** 🛣️ - Buracos, pavimentação e vias
5. **Transporte** 🚌 - Transporte público e mobilidade
6. **Limpeza Urbana** 🧹 - Limpeza e coleta de lixo

## Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Routing**: Wouter
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Requisitos

- Node.js 18+
- pnpm 8+

## Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/vizinapp-web-prototype.git
cd vizinapp-web-prototype
```

### 2. Instalar dependências
```bash
pnpm install
```

### 3. Executar em desenvolvimento
```bash
pnpm dev
```

A aplicação estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
vizinapp-web-prototype/
├── client/
│   ├── public/              # Imagens e assets estáticos
│   │   ├── hero-banner.jpg
│   │   ├── dashboard-illustration.jpg
│   │   ├── community-illustration.jpg
│   │   ├── security-illustration.jpg
│   │   └── success-illustration.jpg
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx     # Página principal (landing + login + dashboard)
│   │   │   └── NotFound.tsx # Página 404
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # Funções utilitárias
│   │   ├── App.tsx          # Componente raiz
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Estilos globais
│   ├── index.html           # HTML template
│   └── vite.config.ts       # Configuração Vite
├── server/                  # Placeholder para backend
├── shared/                  # Código compartilhado
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

## Fluxo de Uso

### 1. Landing Page
- Visualizar informações sobre o projeto
- Entender benefícios e funcionalidades
- Clicar em "Começar Agora" para fazer login

### 2. Login/Cadastro
- Preencher formulário com dados pessoais
- Aceitar termos de LGPD
- Clicar em "Entrar no Dashboard"

### 3. Dashboard
- Visualizar solicitações anteriores
- Acompanhar status de cada solicitação
- Ver informações pessoais cadastradas
- Clicar em "Nova Solicitação" para criar uma nova

### 4. Nova Solicitação
- Selecionar secretaria responsável
- Preencher título e descrição
- Anexar documentos obrigatórios
- Enviar solicitação

### 5. Acompanhamento
- Receber protocolo de solicitação
- Acompanhar status em tempo real
- Visualizar progresso da resolução

## Conformidade e Segurança

- **LGPD Compliant**: Todos os dados pessoais são coletados e armazenados conforme a Lei Geral de Proteção de Dados Pessoais
- **Autenticação Segura**: Validação de dados de entrada
- **Privacidade**: Dados do usuário protegidos e nunca compartilhados sem consentimento
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

## Status das Solicitações

- **Em Análise**: Solicitação recebida e em processo de análise pela secretaria
- **Registrada**: Solicitação validada e registrada no sistema
- **Recusada**: Solicitação não atende aos critérios de aceitação

## Prazos

- **Resposta Garantida**: Até 7 dias úteis
- **Atualizações**: Em tempo real através da plataforma

## Documentos Obrigatórios

Para registrar uma solicitação, é necessário anexar:
1. **Documento de Identidade** (RG, CNH ou Passaporte)
2. **Comprovante de Residência** (com no máximo 3 meses de emissão)
3. **Foto do Problema** (ou relato detalhado se não for possível fotografar)

## Comandos Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Preview do build
pnpm preview

# Linting (se configurado)
pnpm lint

# Testes (se configurado)
pnpm test
```

## Cores e Design

O projeto utiliza uma paleta de cores que transmite confiança e segurança:

- **Cor Primária**: Verde/Azul (OKLCH: 0.55 0.15 163) - Representa confiança, comunidade e ação
- **Cor Secundária**: Azul (OKLCH: 0.60 0.12 200) - Complementa a cor primária
- **Cores de Destaque**: Laranja e Verde - Para ações e sucesso
- **Fundo**: Branco e tons claros - Para clareza e acessibilidade

## Tipografia

- **Font Principal**: Poppins - Para títulos e destaques
- **Font Secundária**: Inter - Para corpo de texto
- Ambas importadas do Google Fonts para melhor performance

## Contato e Suporte

Para dúvidas ou sugestões sobre o Vizin APP, entre em contato com:
- **Prefeitura de Maricá**: [contato@marica.rj.gov.br](mailto:contato@marica.rj.gov.br)
- **GitHub Issues**: [Reportar um problema](https://github.com/seu-usuario/vizinapp-web-prototype/issues)

## Licença

Este projeto é desenvolvido para a Prefeitura de Maricá - RJ e está sob licença MIT.

## Changelog

### v0.1.0 (2025-11-26)
- Protótipo inicial com landing page, login e dashboard
- Integração com React 19 e Tailwind CSS 4
- Imagens geradas com IA para melhor qualidade visual
- Responsivo para desktop, tablet e mobile

## Roadmap Futuro

- [ ] Integração com API backend
- [ ] Notificações em tempo real
- [ ] Geolocalização de problemas
- [ ] Câmera integrada para fotos
- [ ] Chat com secretarias
- [ ] Histórico completo de solicitações
- [ ] Mapa de problemas da cidade
- [ ] Compartilhamento em redes sociais
- [ ] Modo escuro
- [ ] Suporte a múltiplos idiomas

## Notas de Desenvolvimento

### Dados de Exemplo
O dashboard inclui dados de exemplo para demonstração:
- 2 solicitações ativas com diferentes status
- Informações de usuário pré-preenchidas
- Progresso visual de cada solicitação

### Componentes Utilizados
- **Button**: Para ações principais e secundárias
- **Card**: Para organizar informações
- **Input**: Para entrada de dados
- **Dialog**: Para modais de nova solicitação
- **Tabs**: Para alternar entre abas
- **Alert**: Para mensagens importantes

### Customizações Tailwind
- Container customizado com padding responsivo
- Flex com min-width/min-height padrão
- Cores OKLCH para melhor contraste

---

**Desenvolvido para Maricá - RJ**
Participação Cidadã para a Melhoria da Gestão Pública
