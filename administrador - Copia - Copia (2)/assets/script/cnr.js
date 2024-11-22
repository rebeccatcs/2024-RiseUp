// Selecionando os elementos do DOM
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("problem");
const impactInput = document.getElementById("impact");
const etiquetasInput = document.getElementById("equitetas");
const dataInput = document.getElementById("data");
const categoriaInput = document.getElementById("categoria");
const localizacaoInput = document.getElementById("localização");
const requerenteInput = document.getElementById("requerente");
const tipoSelect = document.getElementById("tipo");
const severidadeSelect = document.getElementById("sever");
const statusSelect = document.getElementById("status");
const adicionarButton = document.getElementById("adicionar");

// Função para enviar os dados
adicionarButton.addEventListener("click", () => {
    // Coletando os valores inseridos pelo usuário
    const chamado = {
        titulo: titleInput.value.trim(),
        descricao: descriptionInput.innerText.trim(),
        impacto: impactInput.innerText.trim(),
        etiquetas: etiquetasInput.value.trim(),
        dataAbertura: dataInput.value,
        categoria: categoriaInput.value.trim(),
        localizacao: localizacaoInput.value.trim(),
        requerente: requerenteInput.value.trim(),
        tipo: tipoSelect.value,
        severidade: severidadeSelect.value,
        status: statusSelect.value,
    };

    // Validação básica (verifica se campos obrigatórios estão preenchidos)
    if (!chamado.titulo || !chamado.descricao || !chamado.dataAbertura) {
        alert("Preencha os campos obrigatórios: Título, Descrição e Data de Abertura.");
        return;
    }

    // Exibindo os dados no console (para teste)
    console.log("Chamado enviado:", chamado);

    // Limpando os campos após o envio
    limparCampos();
});

// Função para limpar os campos do formulário após envio
function limparCampos() {
    titleInput.value = "";
    descriptionInput.innerText = "";
    impactInput.innerText = "";
    etiquetasInput.value = "";
    dataInput.value = "";
    categoriaInput.value = "";
    localizacaoInput.value = "";
    requerenteInput.value = "";
    tipoSelect.value = "";
    severidadeSelect.value = "";
    statusSelect.value = "";
}
