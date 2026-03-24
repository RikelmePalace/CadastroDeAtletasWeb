//Quando a minha tela carregar o conteúdo
document.addEventListener("DOMContentLoaded", function () {

    if(!verificarLogado()){
        window.location.href = "login.html"
    }
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const lista = document.getElementById("listaUsuarios");

    if(usuarios.length === 0){

        const li = document.createElement("li");
        li.textContent = "Nenhum usuário cadastrado.";
        lista.appendChild(li);

    }else{

        usuarios.forEach(usuario => {

            const li = document.createElement("li");

            li.textContent = usuario.nome + " - " + usuario.email;

            lista.appendChild(li);

        });

    }
    onCadastrarClick();
});


function voltar(){
    window.location.href = "login.html";
    logout();
}

function onListarClick(){
    const element = document.getElementById("btn-listar");
    element.classList.remove("btn-aba");
    element.classList.add("btn-aba-selecionado");
    document.getElementById("btn-cadastrar").classList.add("btn-aba");
    document.getElementById("btn-cadastrar").classList.remove("btn-aba-selecionado");

    const listaCadastrados = document.getElementById("container-lista");
    listaCadastrados.style.display = "flex";

    const containerCadastro = document.getElementById("container-cadastro");
    containerCadastro.style.display = "none";
}
function onCadastrarClick(){
    const element = document.getElementById("btn-cadastrar");
    element.classList.remove("btn-aba");
    element.classList.add("btn-aba-selecionado");
    document.getElementById("btn-listar").classList.add("btn-aba");
    document.getElementById("btn-listar").classList.remove("btn-aba-selecionado");

    const listaCadastrados = document.getElementById("container-lista");
    listaCadastrados.style.display = "none";

    const containerCadastro = document.getElementById("container-cadastro");
    containerCadastro.style.display = "flex";
}

function cadastrarAtleta(event){
    event.preventDefault(); //nao recarregar a pagina

    //Atleta

    let nome = getElementValue("input-nome-atleta");
    let nacionalidade = getElementValue("input-nacionalidade");
    let dtNascimento = getElementValue("input-dtNascimento");
    let cpf = getElementValue("input-cpf");
    let modalidade = getElementValue("input-modalidade");
    let genero = getElementValue("input-genero");
    let categoria = getElementValue("input-categoria");
    let peso = getElementValue("input-peso");
    let altura = getElementValue("input-altura");
    let tipoSanguineo = getElementValue("input-tipoSanguineo");
    let alergias = getElementValue("input-alergias");
    let historico = getElementValue("input-historico");

  
    const atleta = { //Criando um objeto atleta que não é mapeado automaticamente
        nome: nome,
        nacionalidade: nacionalidade,
        dtNascimento: dtNascimento,
        cpf: cpf,
        modalidade : modalidade,
        genero : genero,
        categoria : categoria,
        peso : peso,
        altura : altura,
        tipoSanguineo : tipoSanguineo,
        alergias : alergias,
        historico : historico
    };

    //Tenta ler os dados da lista de atletas, se ela não existir, devolve uma vazia
    let atletas = JSON.parse(localStorage.getItem("atletas")) || [];

    //adiciona o atleta na lista de atletas
    atletas.push(atleta);

    //atualiza ou cria a lista no localStorage com o formato de JSON
    localStorage.setItem("atletas", JSON.stringify(atletas));

    setElementText("mensagem","Dados do " + nome + " cadastrados!");
    setElementDisplay("overlay","flex");
    resetFormCadastroAtleta();
}

function resetFormCadastroAtleta(){
    document.getElementById("container-cadastro").reset(); // limpa todos os campos
}

//Função para pegar o valor de um input
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroFormFullscreen');
    const telaCadastro = document.getElementById('tela-cadastro');
    const telaLista = document.getElementById('container-lista');
    const listaUl = document.getElementById('listaUsuarios');
    
    const btnDadosPessoais = document.getElementById('btn-dados');
    const btnLista = document.getElementById('btn-lista');

   // --- FUNÇÃO PARA MOSTRAR O BALÃO ---
    function mostrarAviso(mensagem) {
        const toast = document.getElementById('custom-toast');
        toast.innerText = mensagem;
        toast.style.display = 'block';

        // Esconde o balão após 3 segundos
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    // --- SALVAR CADASTRO ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const novoAtleta = {
            nome: document.getElementById('nomeAtleta').value,
            nacionalidade: document.getElementById('nacionalidade').value,
            modalidade: document.getElementById('modalidade').value
        };

        const atletas = JSON.parse(localStorage.getItem('bancoAtletas')) || [];
        atletas.push(novoAtleta);
        localStorage.setItem('bancoAtletas', JSON.stringify(atletas));

        // Exibe o balão de aviso
        mostrarAviso("Atleta cadastrado com sucesso! ✅");

        form.reset();
    });

    // --- CLIQUE EM LISTA ---
    btnLista.addEventListener('click', () => {
        telaCadastro.style.display = 'none';
        telaLista.style.display = 'flex'; 

        // GERENCIAMENTO DE CORES (AZUL)
        btnLista.classList.add('active-btn');
        btnDadosPessoais.classList.remove('active-btn');

        // RENDERIZAR LISTA
        listaUl.innerHTML = '';
        const atletas = JSON.parse(localStorage.getItem('bancoAtletas')) || [];
        atletas.forEach(atleta => {
            const li = document.createElement('li');
            li.style = "background: white; margin-bottom: 15px; padding: 20px; border-radius: 15px; list-style: none; color: #333; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 100%; border-left: 8px solid #136079;";
            li.innerHTML = `<div><strong>Nome:</strong> ${atleta.nome} | <strong>Modalidade:</strong> ${atleta.modalidade} | <strong>Nacionalidade:</strong> ${atleta.nacionalidade}</div>`;
            listaUl.appendChild(li);
        });
    });

    // --- CLIQUE EM DADOS PESSOAIS ---
    btnDadosPessoais.addEventListener('click', () => {
        telaCadastro.style.display = 'flex'; 
        telaLista.style.display = 'none';

        // GERENCIAMENTO DE CORES (AZUL VOLTA PARA CÁ)
        btnDadosPessoais.classList.add('active-btn');
        btnLista.classList.remove('active-btn');
    });
});

// Assim que a página de cadastro carregar
const usuario = localStorage.getItem('usuarioLogado');
if (usuario) {
    // Procura o título ou uma área de perfil para saudar o usuário
    console.log("Bem-vindo, " + usuario);
}

document.addEventListener('DOMContentLoaded', () => {
    // --- EXIBIR NOME DO USUÁRIO LOGADO ---
    const nomeExibicao = document.getElementById('nome-usuario-logado');
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (usuarioLogado) {
        // Exibe o nome salvo no login
        nomeExibicao.innerText = usuarioLogado;
    } else {
        // Caso a pessoa entre direto sem login, exibe "Visitante"
        nomeExibicao.innerText = "Visitante";
    }

    // ... restante do seu código (form, botões de navegação, etc) ...
});

// Gerenciamento do dropdown de perfil e botão de sair
document.addEventListener('DOMContentLoaded', () => {
    const nomeExibicao = document.getElementById('nome-usuario-logado');
    const dropdownNome = document.getElementById('dropdown-nome-usuario');
    const profileBtn = document.getElementById('profile-icon-btn');
    const dropdownMenu = document.getElementById('dropdown-perfil');
    const btnSair = document.getElementById('btn-sair');
    
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    // Inicializa os nomes
    if (usuarioLogado) {
        nomeExibicao.innerText = usuarioLogado;
        dropdownNome.innerText = usuarioLogado;
    } else {
        nomeExibicao.innerText = "Visitante";
        dropdownNome.innerText = "Visitante";
    }

    // 1. Mostrar/Esconder o menu ao clicar na bolinha
    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede o clique de fechar imediatamente
        const isVisible = dropdownMenu.style.display === 'block';
        dropdownMenu.style.display = isVisible ? 'none' : 'block';
    });

    // 2. Fechar o menu se clicar em qualquer outro lugar da tela
    document.addEventListener('click', () => {
        dropdownMenu.style.display = 'none';
    });

    // 3. Botão de SAIR
    btnSair.addEventListener('click', () => {
        // Limpa o nome do usuário do armazenamento (opcional, para deslogar)
        localStorage.removeItem('usuarioLogado');
        
        // Redireciona para a tela de login
        window.location.href = "index.html"; // Ajuste para o nome do seu arquivo de login
    });
});