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

