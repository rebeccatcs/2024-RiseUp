const addButton = document.querySelector("add-profile-btn");
const perfisContainer = document.getElementById("profile-list");

// Função para adicionar eventos de edição e exclusão a um item de tarefa
function addEventListenersToTaskItem(taskItem) {
    const editButton = taskItem.querySelector(".bi bi-pencil-square");
    const deleteButton = taskItem.querySelector("bi bi-trash");
    const taskTitle = taskItem.querySelector("span");

    // Evento de exclusão
    deleteButton.addEventListener("click", () => {
        perfisContainer.removeChild(taskItem);
    });

    // Evento de edição
    editButton.addEventListener("click", () => {
        const isEditing = taskTitle.isContentEditable;
        taskTitle.contentEditable = !isEditing;
        taskTitle.focus();

        // Alterna a classe para indicar que o item está em edição
        taskTitle.classList.toggle("editing", !isEditing);
    });
}

// Função para criar um novo item de tarefa dinamicamente
function createTaskItem(title = "Título") {
    const taskItem = document.createElement("div");
    taskItem.classList.add("perfil");

    const taskTitle = document.createElement("span");
    taskTitle.textContent = title;
    taskTitle.contentEditable = false;

    const configContainer = document.createElement("div");
    configContainer.classList.add("perfil-info");

    const editButton = document.createElement("img");
    editButton.alt = "Editar";
    editButton.classList.add("bi bi-pencil-square");

    const deleteButton = document.createElement("img");
    deleteButton.alt = "Excluir";
    deleteButton.classList.add("bi bi-trash");

    editOptions.appendChild(editButton);
    editOptions.appendChild(deleteButton);

    configContainer.appendChild(editOptions);

    taskItem.appendChild(taskTitle);
    taskItem.appendChild(configContainer);

    perfisContainer.appendChild(taskItem);

    addEventListenersToTaskItem(taskItem);  // Adiciona os eventos ao novo item
}

// Adiciona evento para criar novo item ao clicar no botão de adicionar
addButton.addEventListener("click", () => {
    createTaskItem();
});

// Adiciona eventos de edição e exclusão para os itens já existentes na página
console.log("Fazendo o registro nos existentes...");
console.log(document.querySelectorAll(".perfil"));
document.querySelectorAll(".perfil").forEach(addEventListenersToTaskItem);

//1176 px 917px -> quebra de linha