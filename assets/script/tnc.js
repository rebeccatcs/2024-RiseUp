const addButton = document.getElementById("add-button");
const registrosContainer = document.querySelector(".registros");

// Função para salvar itens no LocalStorage
function salvarNoLocalStorage() {
    const itens = [];
    document.querySelectorAll(".registro-item.dynamic").forEach((taskItem) => {
        const title = taskItem.querySelector("p").textContent;
        const counter = taskItem.querySelector(".caixa-registros2").textContent;
        itens.push({ title, counter });
    });
    localStorage.setItem("tasks", JSON.stringify(itens));
}

// Função para carregar itens do LocalStorage
function carregarDoLocalStorage() {
    const itensSalvos = JSON.parse(localStorage.getItem("tasks")) || [];
    itensSalvos.forEach(({ title, counter }) => createTaskItem(title, counter));
}

// Função para adicionar eventos de edição e exclusão a um item de tarefa
function addEventListenersToTaskItem(taskItem) {
    const editButton = taskItem.querySelector(".edit-icon");
    const deleteButton = taskItem.querySelector(".delete-icon");
    const taskTitle = taskItem.querySelector("p");

    // Evento de exclusão
    deleteButton.addEventListener("click", () => {
        registrosContainer.removeChild(taskItem);
        salvarNoLocalStorage(); // Atualiza o LocalStorage após exclusão
    });

    // Evento de edição
    editButton.addEventListener("click", () => {
        const isEditing = taskTitle.isContentEditable;
        taskTitle.contentEditable = !isEditing;
        taskTitle.focus();

        // Alterna a classe para indicar que o item está em edição
        taskTitle.classList.toggle("editing", !isEditing);

        if (isEditing) {
            salvarNoLocalStorage(); // Salva alterações após edição
        }
    });
}

// Função para criar um novo item de tarefa dinamicamente
function createTaskItem(title = "Título", counter = "0") {
    const taskItem = document.createElement("div");
    taskItem.classList.add("registro-item", "dynamic"); // Adiciona classe 'dynamic' para itens dinâmicos

    const taskTitle = document.createElement("p");
    taskTitle.textContent = title;
    taskTitle.contentEditable = false;

    const configContainer = document.createElement("div");
    configContainer.classList.add("registro-config");

    const caixaRegistros2 = document.createElement("div");
    caixaRegistros2.classList.add("caixa-registros2");
    caixaRegistros2.textContent = counter;

    const editOptions = document.createElement("div");
    editOptions.classList.add("edit-options");

    const editButton = document.createElement("img");
    editButton.src = "https://img.icons8.com/?size=100&id=114092&format=png&color=000000";
    editButton.alt = "Editar";
    editButton.classList.add("edit-icon", "icon");

    const deleteButton = document.createElement("img");
    deleteButton.src = "https://img.icons8.com/?size=100&id=14237&format=png&color=000000";
    deleteButton.alt = "Excluir";
    deleteButton.classList.add("delete-icon", "icon");

    editOptions.appendChild(editButton);
    editOptions.appendChild(deleteButton);

    configContainer.appendChild(caixaRegistros2);
    configContainer.appendChild(editOptions);

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(configContainer);

    registrosContainer.appendChild(taskItem);

    addEventListenersToTaskItem(taskItem); // Adiciona os eventos ao novo item
}

// Adiciona evento para criar novo item ao clicar no botão de adicionar
addButton.addEventListener("click", () => {
    createTaskItem();
    salvarNoLocalStorage(); // Salva no LocalStorage após adicionar um novo item
});

// Adiciona eventos de edição e exclusão para os itens fixos na página
document.querySelectorAll(".registro-item:not(.dynamic)").forEach(addEventListenersToTaskItem);

// Carrega os itens do LocalStorage ao carregar a página
window.onload = carregarDoLocalStorage;
