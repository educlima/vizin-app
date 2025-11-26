// Banco de dados simulado para o VizinApp
class VizinAppDatabase {
    constructor() {
        this.init();
    }

    init() {
        // Inicializar dados no localStorage se não existirem
        if (!localStorage.getItem('vizinapp_usuarios')) {
            localStorage.setItem('vizinapp_usuarios', JSON.stringify([]));
        }
        if (!localStorage.getItem('vizinapp_solicitacoes')) {
            localStorage.setItem('vizinapp_solicitacoes', JSON.stringify([]));
        }
    }

    // Gerenciamento de Usuários
    getUsuarios() {
        return JSON.parse(localStorage.getItem('vizinapp_usuarios') || '[]');
    }

    salvarUsuario(usuario) {
        const usuarios = this.getUsuarios();
        usuarios.push(usuario);
        localStorage.setItem('vizinapp_usuarios', JSON.stringify(usuarios));
        return usuario;
    }

    buscarUsuarioPorEmail(email) {
        const usuarios = this.getUsuarios();
        return usuarios.find(u => u.email === email);
    }

    // Gerenciamento de Solicitações
    getSolicitacoes() {
        return JSON.parse(localStorage.getItem('vizinapp_solicitacoes') || '[]');
    }

    salvarSolicitacao(solicitacao) {
        const solicitacoes = this.getSolicitacoes();
        solicitacoes.push(solicitacao);
        localStorage.setItem('vizinapp_solicitacoes', JSON.stringify(solicitacoes));
        return solicitacao;
    }

    getSolicitacoesPorUsuario(email) {
        const solicitacoes = this.getSolicitacoes();
        return solicitacoes.filter(s => s.usuarioEmail === email);
    }

    atualizarStatusSolicitacao(id, novoStatus) {
        const solicitacoes = this.getSolicitacoes();
        const solicitacao = solicitacoes.find(s => s.id === id);
        if (solicitacao) {
            solicitacao.status = novoStatus;
            localStorage.setItem('vizinapp_solicitacoes', JSON.stringify(solicitacoes));
            return true;
        }
        return false;
    }

    // Utilitários
    gerarId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    formatarData(data) {
        return new Date(data).toLocaleDateString('pt-BR');
    }
}

// Instância global do banco de dados
const vizinAppDB = new VizinAppDatabase();