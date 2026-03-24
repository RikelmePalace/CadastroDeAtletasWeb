document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    const inputNome = document.getElementById('nome');
    const btnAjuda = document.getElementById('btn-help');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    // 1. Lógica de Login e Redirecionamento
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o recarregamento da página

        const nomeAtleta = inputNome.value.trim();

        if (nomeAtleta.length > 2) {
            // Salva o nome para usar na tela de cadastro 
            localStorage.setItem('usuarioLogado', nomeAtleta);
            
            // REDIRECIONAMENTO: Altere "cadastro.html" para o nome do seu arquivo de cadastro
            window.location.href = "Dados.html"; 
        } else {
            mostrarToast("O nome deve ter pelo menos 3 letras");
        }
    });

    // 2. Lógica para o botão de ajuda
    btnAjuda.addEventListener('click', function() {
        if (inputNome.value.trim() === "") {
            mostrarToast("Digite seu nome antes de prosseguir");
        } else {
            mostrarToast("Clique em 'Continuar' para acessar o formulário");
        }
    });

    // 3. Função para mostrar o balão (Toast)
    function mostrarToast(mensagem) {
        toastMessage.innerText = mensagem;
        toast.className = "toast-container show";

        // Remove a classe após 3 segundos
        setTimeout(function(){ 
            toast.className = toast.className.replace("show", ""); 
        }, 3000);
    }
});