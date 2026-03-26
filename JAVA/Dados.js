document.addEventListener("DOMContentLoaded", function () {
    // 1. MAPEAMENTO DE ELEMENTOS
    const form = document.getElementById('cadastroFormFullscreen');
    const telaCadastro = document.getElementById('tela-cadastro');
    const telaLista = document.getElementById('container-lista');
    const corpoTabela = document.getElementById('corpo-tabela'); // Novo: TBODY da tabela
    const btnDadosPessoais = document.getElementById('btn-dados');
    const btnLista = document.getElementById('btn-lista');
    
    // Elementos do Perfil/Dropdown
    const nomeExibicao = document.getElementById('nome-usuario-logado');
    const dropdownNome = document.getElementById('dropdown-nome-usuario');
    const profileBtn = document.getElementById('profile-icon-btn');
    const dropdownMenu = document.getElementById('dropdown-perfil');
    const btnSair = document.getElementById('btn-sair');

    // 2. VERIFICAÇÃO DE LOGIN
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        if (nomeExibicao) nomeExibicao.innerText = usuarioLogado;
        if (dropdownNome) dropdownNome.innerText = usuarioLogado;
    } else {
        if (nomeExibicao) nomeExibicao.innerText = "Visitante";
    }

    // 3. FUNÇÃO TOAST (AVISO)
    function mostrarAviso(mensagem) {
        const toast = document.getElementById('custom-toast');
        if (toast) {
            toast.innerText = mensagem;
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 3000);
        }
    }

    // 4. SALVAR CADASTRO
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const novoAtleta = {
                nomeAtleta: document.getElementById('nomeAtleta').value,
                dtNascimento: document.getElementById('dtNascimento').value,
                nacionalidade: document.getElementById('nacionalidade').value,
                cpf: document.getElementById('cpf').value,
                modalidade: document.getElementById('modalidade').value,
                genero: document.getElementById('genero').value,
                categoriaAtleta: document.getElementById('categoriaAtleta').value,
                pesoAtleta: document.getElementById('pesoAtleta').value,
                alturaAtleta: document.getElementById('alturaAtleta').value,
                tipoSanguineoAtleta: document.getElementById('tipoSanguineoAtleta').value,
                alergiasAtleta: document.getElementById('alergiasAtleta').value
            };

            const atletas = JSON.parse(localStorage.getItem('bancoAtletas')) || [];
            atletas.push(novoAtleta);
            localStorage.setItem('bancoAtletas', JSON.stringify(atletas));

            mostrarAviso("Atleta cadastrado com sucesso! ✅");
            form.reset();
        });
    }

    // 5. NAVEGAÇÃO ENTRE ABAS
    if (btnLista) {
        btnLista.addEventListener('click', () => {
            telaCadastro.style.display = 'none';
            telaLista.style.display = 'flex';
            btnLista.classList.add('active-btn');
            btnDadosPessoais.classList.remove('active-btn');
            renderizarLista();
        });
    }

    if (btnDadosPessoais) {
        btnDadosPessoais.addEventListener('click', () => {
            telaCadastro.style.display = 'flex';
            telaLista.style.display = 'none';
            btnDadosPessoais.classList.add('active-btn');
            btnLista.classList.remove('active-btn');
        });
    }

    // 6. RENDERIZAR TABELA (TH/TR/TD)
    
function renderizarLista() {
    if (!corpoTabela) return;
    corpoTabela.innerHTML = '';
    const atletas = JSON.parse(localStorage.getItem('bancoAtletas')) || [];

    if (atletas.length === 0) {
        corpoTabela.innerHTML = '<tr><td colspan="12" style="text-align:center; padding: 20px;">Nenhum atleta cadastrado.</td></tr>';
        return;
    }

    atletas.forEach((atleta, index) => {
        const tr = document.createElement('tr');
        // Estilo para separar as linhas e centralizar
        tr.style.borderBottom = "1px solid #eee"; 

        tr.innerHTML = `
            <td style="padding: 12px; text-align: center; border-right: 1px solid #f0f0f0;">${atleta.nomeAtleta}</td>
            <td style="padding: 12px; text-align: center; border-right: 1px solid #f0f0f0;">${atleta.nacionalidade}</td>
            <td style="padding: 12px; text-align: center; border-right: 1px solid #f0f0f0;">${atleta.dtNascimento}</td>
            <td style="padding: 12px; text-align: center; border-right: 1px solid #f0f0f0;">${atleta.cpf}</td>
            <td style="padding: 12px; text-align: center; border-right: 1px solid #f0f0f0;">${atleta.modalidade}</td>
            <td style="padding: 12px; text-align: center; border-right: 1px solid #f0f0f0;">${atleta.genero || 'N/A'}</td>
            <td style="padding: 12px; text-align: center; border-right: 1px solid #f0f0f0;">${atleta.categoriaAtleta}</td>
            <td style="padding: 12px; text-align: center; border-right: 1px solid #f0f0f0;">${atleta.pesoAtleta}kg</td>
            <td style="padding: 12px; text-align: center; border-right: 1px solid #f0f0f0;">${atleta.alturaAtleta}m</td>
            <td style="padding: 12px; text-align: center; border-right: 1px solid #f0f0f0;">${atleta.tipoSanguineoAtleta}</td>
            <td style="padding: 12px; text-align: center; border-right: 1px solid #f0f0f0;">${atleta.alergiasAtleta || 'Nenhuma'}</td>
            <td style="padding: 12px; text-align: center; width: 80px;">
                <button class="btn-excluir-tabela" onclick="excluirAtleta(${index})" style="width: auto; padding: 5px 10px;">Excluir</button>
            </td>
        `;
        corpoTabela.appendChild(tr);
    });
}

    // 7. DROPDOWN PERFIL
    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = dropdownMenu.style.display === 'block';
            dropdownMenu.style.display = isVisible ? 'none' : 'block';
        });
    }

    document.addEventListener('click', () => {
        if (dropdownMenu) dropdownMenu.style.display = 'none';
    });

    if (btnSair) {
        btnSair.addEventListener('click', () => {
            localStorage.removeItem('usuarioLogado');
            window.location.href = "index.html"; 
        });
    }
});

// 8. FUNÇÃO GLOBAL DE EXCLUSÃO
function excluirAtleta(index) {
    if (confirm("Deseja realmente excluir este atleta?")) {
        let atletas = JSON.parse(localStorage.getItem('bancoAtletas')) || [];
        atletas.splice(index, 1);
        localStorage.setItem('bancoAtletas', JSON.stringify(atletas));
        
        // Dispara o clique no botão de lista para atualizar a tabela visualmente
        document.getElementById('btn-lista').click();
        
        // Mostra aviso de exclusão
        const toast = document.getElementById('custom-toast');
        if (toast) {
            toast.innerText = "Atleta removido! 🗑️";
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 3000);
        }
    }
}