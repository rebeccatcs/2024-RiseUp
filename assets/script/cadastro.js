// Função para validar o cadastro
function validarCadastro() {
    var usuario = document.getElementById('Cadastro').value;
    var senha = document.getElementById('Senha').value;
    var confirmeSenha = document.getElementById('Confirme').value;
    var mensagemErro = document.getElementById('erroMensagem');

    // Limpar mensagem de erro anterior
    mensagemErro.innerHTML = "";

    // Verifica se os campos estão vazios
    if (usuario === "" || senha === "" || confirmeSenha === "") {
        mensagemErro.innerHTML = "<span style='color:red;'>Por favor, preencha todos os campos.</span>";
        return false; // Impede o envio do formulário
    }

    // Verifica se a senha e a confirmação de senha são iguais
     if (senha !== confirmeSenha) {
        mensagemErro.innerHTML = "<span style='color:red;'>As senhas não coincidem. Tente novamente.</span>";
        return false; // Impede o envio do formulário
    }

    // Verifica se as credenciais são 'admin' para exemplo
    if (usuario === "adm@adm" && senha === "123") {
        // Redireciona para a página inicial
        window.location.href = "inicial.html";
        return false; // Impede o envio do formulário e a ação padrão
    } else {
        // Exibe mensagem de erro se as credenciais estiverem incorretas
        mensagemErro.innerHTML = "<span style='color:red;'>Cadastro não realizado. Tente novamente.</span>";
        return false; // Impede o envio do formulário
    }
}