// Função para validar o cadastro
function validarCadastro() {
    // Obtendo os valores do formulário
    const username = document.getElementById("Login").value;
    const password = document.getElementById("Senha").value;
  
    // Mensagem de erro
    const erroMensagem = document.getElementById("erroMensagem");
    erroMensagem.textContent = ""; // Limpa a mensagem anterior
  
    // Validação simples de campos vazios
    if (!username || !password) {
        erroMensagem.textContent = "Por favor, preencha todos os campos.";
        erroMensagem.style.color = "red";
        return false;
    }
  
    // Criando o objeto de dados
    const data = new URLSearchParams();
    data.append("username", username);
    data.append("password", password);
  
    // Configurando a requisição para a API
    fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    })
    .then(response => {
        if (response.ok) {
            // Login bem-sucedido
            return response.json();
        } else {
            // Falha no login
            throw new Error("Usuário ou senha inválidos.");
        }
    })
    .then(json => {
        // Redirecionar para outra página, se necessário
        window.location.href = "inicial.html";
    })
    .catch(error => {
        erroMensagem.textContent = error.message;
        erroMensagem.style.color = "red";
    });
  
    // Impede o envio padrão do formulário
    return false;
  }
  