// Sistema principal do VizinApp
class VizinApp {
    constructor() {
        this.currentUser = null;
        this.db = vizinAppDB;
        this.isDemoAccount = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkLoggedInUser();
        this.createDemoAccount();
    }

    setupEventListeners() {
        // Login/Cadastro
        document.getElementById('loginForm')?.addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('registerForm')?.addEventListener('submit', (e) => this.handleRegister(e));
        document.getElementById('showRegister')?.addEventListener('click', (e) => this.showRegisterForm(e));
        document.getElementById('showLogin')?.addEventListener('click', (e) => this.showLoginForm(e));
        
        // Login de Demonstração
        document.getElementById('demoLogin')?.addEventListener('click', () => this.handleDemoLogin());
        
        // Dashboard
        document.getElementById('logoutBtn')?.addEventListener('click', () => this.handleLogout());
        document.getElementById('novaSolicitacaoBtn')?.addEventListener('click', () => this.showNovaSolicitacao());
        document.getElementById('cancelarSolicitacao')?.addEventListener('click', () => this.hideNovaSolicitacao());
        document.getElementById('novaSolicitacaoForm')?.addEventListener('submit', (e) => this.handleNovaSolicitacao(e));
    }

    // 🔥 CRIAR CONTA DE DEMONSTRAÇÃO
    createDemoAccount() {
        const demoUser = {
            id: 'demo-account',
            nome: 'Administrador Demo',
            email: 'admin@marica.gov.br',
            cpf: '123.456.789-00',
            endereco: 'Prefeitura Municipal de Maricá - Av. Francisco Sabino da Costa, 227 - Centro',
            senha: '12345',
            dataCadastro: new Date().toISOString()
        };

        // Verificar se já existe o usuário demo, se não, criar
        if (!this.db.buscarUsuarioPorEmail(demoUser.email)) {
            this.db.salvarUsuario(demoUser);
            
            // Criar solicitações de exemplo para a conta demo
            this.createDemoSolicitations(demoUser.email);
        }
    }

    // 🔥 CRIAR SOLICITAÇÕES DE EXEMPLO
    createDemoSolicitations(email) {
        const demoRequests = [
            {
                id: this.db.gerarId(),
                usuarioEmail: email,
                secretaria: 'Infraestrutura',
                titulo: 'Buraco na Rua Principal',
                descricao: 'Existe um buraco grande na Rua Principal, próximo ao número 500, que está causando acidentes.',
                status: 'Em Andamento',
                dataCriacao: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                protocolo: 'VZ-' + (Date.now() - 5 * 24 * 60 * 60 * 1000).toString().slice(-6)
            },
            {
                id: this.db.gerarId(),
                usuarioEmail: email,
                secretaria: 'Limpeza Urbana',
                titulo: 'Lixo Acumulado',
                descricao: 'Lixo acumulado há mais de uma semana na Praça Central.',
                status: 'Concluído',
                dataCriacao: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                protocolo: 'VZ-' + (Date.now() - 2 * 24 * 60 * 60 * 1000).toString().slice(-6)
            },
            {
                id: this.db.gerarId(),
                usuarioEmail: email,
                secretaria: 'Saúde',
                titulo: 'Posto de Saúde sem Médico',
                descricao: 'O posto de saúde do bairro está sem médico há uma semana.',
                status: 'Pendente',
                dataCriacao: new Date().toISOString(),
                protocolo: 'VZ-' + Date.now().toString().slice(-6)
            }
        ];

        demoRequests.forEach(request => this.db.salvarSolicitacao(request));
    }

    // 🔥 LOGIN DE DEMONSTRAÇÃO
    handleDemoLogin() {
        const demoUser = this.db.buscarUsuarioPorEmail('admin@marica.gov.br');
        if (demoUser) {
            this.isDemoAccount = true;
            this.login(demoUser);
            this.showSuccess('✅ Login de demonstração realizado com sucesso!');
        }
    }

    // Sistema de Autenticação
    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const usuario = this.db.buscarUsuarioPorEmail(email);
        
        if (usuario && usuario.senha === password) {
            this.isDemoAccount = (email === 'admin@marica.gov.br');
            this.login(usuario);
        } else {
            alert('E-mail ou senha incorretos!');
        }
    }

    handleRegister(e) {
        e.preventDefault();
        const usuario = {
            id: this.db.gerarId(),
            nome: document.getElementById('regNome').value,
            email: document.getElementById('regEmail').value,
            cpf: document.getElementById('regCpf').value,
            endereco: document.getElementById('regEndereco').value,
            senha: document.getElementById('regPassword').value,
            dataCadastro: new Date().toISOString()
        };

        if (this.db.buscarUsuarioPorEmail(usuario.email)) {
            alert('Já existe um usuário com este e-mail!');
            return;
        }

        this.db.salvarUsuario(usuario);
        this.login(usuario);
        this.showSuccess('Cadastro realizado com sucesso!');
    }

    login(usuario) {
        this.currentUser = usuario;
        localStorage.setItem('vizinapp_current_user', JSON.stringify(usuario));
        this.updateUI();
    }

    handleLogout() {
        this.currentUser = null;
        this.isDemoAccount = false;
        localStorage.removeItem('vizinapp_current_user');
        this.updateUI();
    }

    checkLoggedInUser() {
        const savedUser = localStorage.getItem('vizinapp_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.isDemoAccount = (this.currentUser.email === 'admin@marica.gov.br');
            this.updateUI();
        }
    }

    // Interface do Usuário
    showLoginForm(e) {
        if (e) e.preventDefault();
        document.getElementById('loginSection').classList.remove('hidden');
        document.getElementById('registerSection').classList.add('hidden');
    }

    showRegisterForm(e) {
        if (e) e.preventDefault();
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('registerSection').classList.remove('hidden');
    }

    showNovaSolicitacao() {
        document.getElementById('novaSolicitacaoModal').classList.remove('hidden');
    }

    hideNovaSolicitacao() {
        document.getElementById('novaSolicitacaoModal').classList.add('hidden');
        document.getElementById('novaSolicitacaoForm').reset();
    }

    updateUI() {
        const loginSection = document.getElementById('loginSection');
        const registerSection = document.getElementById('registerSection');
        const dashboardMain = document.getElementById('dashboardMain');
        const demoIndicator = document.getElementById('demoIndicator');

        if (this.currentUser) {
            // Usuário logado - mostrar dashboard
            if (loginSection) loginSection.classList.add('hidden');
            if (registerSection) registerSection.classList.add('hidden');
            if (dashboardMain) {
                dashboardMain.classList.remove('hidden');
                this.updateUserProfile();
                this.loadSolicitacoes();
                
                // Mostrar indicador se for conta demo
                if (demoIndicator) {
                    if (this.isDemoAccount) {
                        demoIndicator.classList.remove('hidden');
                    } else {
                        demoIndicator.classList.add('hidden');
                    }
                }
            }
        } else {
            // Usuário não logado - mostrar formulários
            if (loginSection) loginSection.classList.remove('hidden');
            if (registerSection) registerSection.classList.add('hidden');
            if (dashboardMain) dashboardMain.classList.add('hidden');
        }
    }

    updateUserProfile() {
        if (!this.currentUser) return;

        document.getElementById('userName').textContent = this.currentUser.nome;
        document.getElementById('profileNome').textContent = this.currentUser.nome;
        document.getElementById('profileEmail').textContent = this.currentUser.email;
        document.getElementById('profileCpf').textContent = this.currentUser.cpf;
        document.getElementById('profileEndereco').textContent = this.currentUser.endereco;
    }

    // Gerenciamento de Solicitações
    handleNovaSolicitacao(e) {
        e.preventDefault();
        
        const solicitacao = {
            id: this.db.gerarId(),
            usuarioEmail: this.currentUser.email,
            secretaria: document.getElementById('secretaria').value,
            titulo: document.getElementById('titulo').value,
            descricao: document.getElementById('descricao').value,
            status: 'Pendente',
            dataCriacao: new Date().toISOString(),
            protocolo: 'VZ-' + Date.now()
        };

        this.db.salvarSolicitacao(solicitacao);
        this.hideNovaSolicitacao();
        this.loadSolicitacoes();
        this.showSuccess('Solicitação registrada com sucesso! Protocolo: ' + solicitacao.protocolo);
    }

    loadSolicitacoes() {
        if (!this.currentUser) return;

        const solicitacoes = this.db.getSolicitacoesPorUsuario(this.currentUser.email);
        const container = document.getElementById('solicitacoesList');
        
        if (solicitacoes.length === 0) {
            container.innerHTML = '<p>Nenhuma solicitação encontrada. Clique em "Nova Solicitação" para começar.</p>';
            return;
        }

        container.innerHTML = solicitacoes.map(sol => `
            <div class="solicitacao-card">
                <h4>${sol.titulo}</h4>
                <p><strong>Secretaria:</strong> ${sol.secretaria}</p>
                <p><strong>Protocolo:</strong> ${sol.protocolo}</p>
                <p><strong>Data:</strong> ${this.db.formatarData(sol.dataCriacao)}</p>
                <p><strong>Status:</strong> 
                    <span class="solicitacao-status status-${sol.status.toLowerCase()}">
                        ${sol.status}
                    </span>
                </p>
                <p><strong>Descrição:</strong> ${sol.descricao}</p>
            </div>
        `).join('');
    }

    showSuccess(message) {
        // Criar e mostrar mensagem de sucesso
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        
        const container = document.querySelector('.dashboard-container');
        container.insertBefore(successDiv, container.firstChild);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new VizinApp();
});