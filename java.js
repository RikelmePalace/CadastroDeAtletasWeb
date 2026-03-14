// 1. Carrega a lista de usuários ou cria uma vazia se não existir
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// 2. Função para Cadastrar o Usuário (Executada no Index.html)
function cadastrar(event) {
    event.preventDefault(); // Impede a página de recarregar

    // Pegando os valores usando a função que você já criou
    const nome = getElementValue("input-nome");
    const email = getElementValue("input-email");
    const senha = getElementValue("input-senha");

    // Criando o objeto do novo usuário
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    // Adiciona na lista e salva no localStorage
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuário cadastrado com sucesso!");
    resetForm();
}

function setElementText(element, text) {
    const el = document.getElementById(element);
    if (el) el.textContent = text;
}

function setElementDisplay(element, display) {
    const el = document.getElementById(element);
    if (el) el.style.display = display;
}

// Função para limpar a lista de usuários
function limparLista() {
    usuarios = [];
    localStorage.removeItem("usuarios");
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "<li>Nenhum usuário cadastrado.</li>";
}

// Função para mostrar a mensagem de ajuda
function showHelpMessage() {
    setElementText("mensagem", "Preencha todos os campos do formulário");
    setElementDisplay("overlay","flex");
}
function fecharOverlay() {
    setElementDisplay("overlay","none");
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("overlay").onclick = function (e) {
        if (e.target.id === "overlay") {
            fecharOverlay();
        }
    }
});

//adiciona um escutador pra toda vez que o usuário digitar dentro da tela
//se for um esc, ele fecha o overlay
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        fecharOverlay();
    }
});

// Verificamos se estamos na página que tem a lista antes de rodar o código
if (document.getElementById("listaUsuarios")) {
    const lista = document.getElementById("listaUsuarios");

    if (usuarios.length === 0) {
        const li = document.createElement("li");
        li.textContent = "Nenhum usuário cadastrado.";
        lista.appendChild(li);
    } else {
        usuarios.forEach(usuario => {
            const li = document.createElement("li");
            li.textContent = `${usuario.nome} - ${usuario.email}`;
            lista.appendChild(li);
        });
    }
}

// --- Funções de Navegação e Auxiliares ---

function verCadastrados() {
    window.location.href = "Cadastrados.html"; 
}

function voltar() {
    window.location.href = "index.html";
}

function getElementValue(element) {
    return document.getElementById(element).value;
}

function resetForm() {
    const form = document.getElementById("form-cadastro");
    if (form) form.reset();
}

// Função para mostrar/esconder a senha
function togglePassword() {
    const inputSenha = document.getElementById("input-senha");
    const icon = document.getElementById("toggleIcon");
    
    if (inputSenha.type === "password") {
        inputSenha.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        inputSenha.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

