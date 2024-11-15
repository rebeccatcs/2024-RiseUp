function loadDoc() {
// Criando o objeto XMLHttpRequest
var xhr = new XMLHttpRequest();

// Definindo o tipo de requisição (POST) e o URL para onde os dados serão enviados
xhr.open("POST", "http://localhost:8080/login", true);

// Definindo o tipo de conteúdo da requisição (formulário URL-encoded)
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// Definindo o que acontece quando a requisição for concluída
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    // Requisição bem-sucedida, processar a resposta
    console.log(xhr.responseText); // Aqui você pode fazer algo com a resposta do servidor
  }
};

// Preparando os dados para enviar (parâmetros do tipo chave=valor)
var parametros = "nome=Joao&email=joao@example.com";

// Enviando a requisição com os parâmetros
xhr.send(parametros);
  }



// Função para validar o login
function validarLogin() {
var usuario = document.getElementById('Login').value;
var senha = document.getElementById('Senha').value;
var mensagemErro = document.getElementById('erroMensagem');

// Limpar mensagem de erro anterior
mensagemErro.innerHTML = "";

// Verifica se os campos estão vazios
if (usuario === "" || senha === "") {
  mensagemErro.innerHTML = "<span style='color:red;'>Por favor, preencha todos os campos.</span>";
  return false; // Impede o envio do formulário
}

// Verifica se as credenciais são 'admin' e 'admin'
if (usuario === "admin" && senha === "admin") {
  // Redireciona para a página inicial
  window.location.href = "inicial.html";
 return false; // Impede o envio do formulário e a ação padrão
} else {
  // Exibe mensagem de erro se as credenciais estiverem incorretas
  mensagemErro.innerHTML = "<span style='color:red;'>Usuário ou senha incorretos.</span>";
  return false; // Impede o envio do formulário
}
}