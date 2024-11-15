const addButton = document.getElementById("add-button");
const registrosContainer = document.querySelector(".registros");

// Função para adicionar eventos de edição e exclusão a um item de tarefa
function addEventListenersToTaskItem(taskItem) {
    const editButton = taskItem.querySelector(".edit-icon");
    const deleteButton = taskItem.querySelector(".delete-icon");
    const taskTitle = taskItem.querySelector("p");

    // Evento de exclusão
    deleteButton.addEventListener("click", () => {
        registrosContainer.removeChild(taskItem);
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
    taskItem.classList.add("registro-item");

    const taskTitle = document.createElement("p");
    taskTitle.textContent = title;
    taskTitle.contentEditable = false;

    const configContainer = document.createElement("div");
    configContainer.classList.add("registro-config");

    const caixaRegistros2 = document.createElement("div");
    caixaRegistros2.classList.add("caixa-registros2");
    caixaRegistros2.textContent = "0";

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

    addEventListenersToTaskItem(taskItem);  // Adiciona os eventos ao novo item
}

// Adiciona evento para criar novo item ao clicar no botão de adicionar
addButton.addEventListener("click", () => {
    createTaskItem();
});

// Adiciona eventos de edição e exclusão para os itens já existentes na página
console.log("Fazendo o registro nos existentes...");
console.log(document.querySelectorAll(".registro-item"));
document.querySelectorAll(".registro-item").forEach(addEventListenersToTaskItem);

//1176 px 917px -> quebra de linha