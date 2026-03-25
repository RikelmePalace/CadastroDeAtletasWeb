document.addEventListener("DOMContentLoaded", function () {
    // 1. MAPEAMENTO DE ELEMENTOS
    const form = document.getElementById('cadastroFormFullscreen');
    const telaCadastro = document.getElementById('tela-cadastro');
    const telaLista = document.getElementById('container-lista');
    const listaUl = document.getElementById('listaUsuarios');
    const btnDadosPessoais = document.getElementById('btn-dados');
    const btnLista = document.getElementById('btn-lista');
    
    // Elementos do Perfil/Dropdown
    const nomeExibicao = document.getElementById('nome-usuario-logado');
    const dropdownNome = document.getElementById('dropdown-nome-usuario');
    const profileBtn = document.getElementById('profile-icon-btn');
    const dropdownMenu = document.getElementById('dropdown-perfil');
    const btnSair = document.getElementById('btn-sair');

    // 2. VERIFICAÇÃO DE LOGIN E NOME DO USUÁRIO
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        if (nomeExibicao) nomeExibicao.innerText = usuarioLogado;
        if (dropdownNome) dropdownNome.innerText = usuarioLogado;
    } else {
        // Se não houver login, redireciona (opcional, remova o comentário abaixo se desejar)
        // window.location.href = "index.html";
        if (nomeExibicao) nomeExibicao.innerText = "Visitante";
    }

    // 3. FUNÇÃO PARA MOSTRAR O AVISO (TOAST)
    function mostrarAviso(mensagem) {
        const toast = document.getElementById('custom-toast');
        if (toast) {
            toast.innerText = mensagem;
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 3000);
        }
    }

    // 4. SALVAR CADASTRO DE ATLETA
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

    // 6. RENDERIZAR LISTA COM TABELA (TD)
   function renderizarLista() {
        if (!listaUl) return;
        listaUl.innerHTML = '';
        const atletas = JSON.parse(localStorage.getItem('bancoAtletas')) || [];

        if (atletas.length === 0) {
            listaUl.innerHTML = '<li style="text-align:center; list-style:none;">Nenhum atleta cadastrado.</li>';
            return;
        }

        // Usamos o 'index' para saber qual atleta excluir
        atletas.forEach((atleta, index) => {
            const li = document.createElement('li');
            li.style = "background: white; margin-bottom: 20px; padding: 20px; border-radius: 15px; list-style: none; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 100%; border-left: 10px solid #136079; font-family: sans-serif; position: relative;";
            
            li.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <table style="width: 90%; border-collapse: collapse; color: #333;">
                        <tr>
                            <td style="padding: 5px; width: 50%;"><strong>Nome:</strong> ${atleta.nomeAtleta}</td>
                            <td style="padding: 5px;"><strong>CPF:</strong> ${atleta.cpf}</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px;"><strong>Nascimento:</strong> ${atleta.dtNascimento}</td>
                            <td style="padding: 5px;"><strong>Nacionalidade:</strong> ${atleta.nacionalidade}</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px;"><strong>Modalidade:</strong> ${atleta.modalidade}</td>
                            <td style="padding: 5px;"><strong>Categoria:</strong> ${atleta.categoriaAtleta}</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px;"><strong>Gênero:</strong> ${atleta.genero || 'N/A'}</td>
                            <td style="padding: 5px;"><strong>Tipo Sanguíneo:</strong> ${atleta.tipoSanguineoAtleta}</td>
                        </tr>
                        <tr>
                            <td style="padding: 5px;"><strong>Peso:</strong> ${atleta.pesoAtleta}kg</td>
                            <td style="padding: 5px;"><strong>Altura:</strong> ${atleta.alturaAtleta}m</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding: 5px; border-top: 1px solid #eee; margin-top: 5px;">
                                <strong>Alergias:</strong> ${atleta.alergiasAtleta || 'Nenhuma'}
                            </td>
                        </tr>
                    </table>
                    
                    <button onclick="excluirAtleta(${index})" style="background: #d9534f; color: white; border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: 0.3s;">
                        Excluir
                    </button>
                </div>
            `;
            listaUl.appendChild(li);
        });
    }

    // 7. DROPDOWN DE PERFIL E SAIR
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

// Função para excluir o atleta
function excluirAtleta(index) {
    if (confirm("Tem certeza que deseja excluir este cadastro?")) {
        // 1. Pega a lista atual do localStorage
        let atletas = JSON.parse(localStorage.getItem('bancoAtletas')) || [];
        
        // 2. Remove o item pelo índice
        atletas.splice(index, 1);
        
        // 3. Salva a lista atualizada de volta no localStorage
        localStorage.setItem('bancoAtletas', JSON.stringify(atletas));
        
        // 4. Atualiza a tela chamando a função de renderizar novamente
        // Como a função está dentro do DOMContentLoaded, podemos disparar um clique no botão de lista para atualizar
        document.getElementById('btn-lista').click();
        
        // Ou, se preferir usar o balão de aviso que criamos:
        const toast = document.getElementById('custom-toast');
        if (toast) {
            toast.innerText = "Atleta excluído com sucesso! 🗑️";
            toast.style.display = 'block';
            setTimeout(() => { toast.style.display = 'none'; }, 3000);
        }
    }
}