let editingId = null;

document.addEventListener("DOMContentLoaded", () => {
    try {
        loadDepartments();

        const modal = document.getElementById("modal");
        if (modal) modal.classList.add("hidden");

        const confirmModal = document.getElementById("confirm-modal");
        if (confirmModal) confirmModal.classList.add("hidden");

        const addButton = document.getElementById("add-button");
        if (addButton) addButton.addEventListener("click", openModalToAdd);

        const saveButton = document.getElementById("save-button");
        const cancelButton = document.getElementById("cancel-button");
        const confirmDeleteButton = document.getElementById("confirm-delete");
        const cancelDeleteButton = document.getElementById("cancel-delete");

        if (saveButton) saveButton.addEventListener("click", saveDepartment);
        if (cancelButton) cancelButton.addEventListener("click", closeModal);
        if (confirmDeleteButton) confirmDeleteButton.addEventListener("click", deleteDepartment);
        if (cancelDeleteButton) cancelDeleteButton.addEventListener("click", closeConfirmModal);
    } catch (error) {
        console.error("Erro ao configurar os event listeners:", error);
    }
});

// Carregar departamentos do localStorage
function loadDepartments() {
    const storedDepartments = JSON.parse(localStorage.getItem("departments")) || [];
    const tableBody = document.getElementById("departments-list");

    if (!tableBody) {
        console.error("Tabela de departamentos não encontrada!");
        return;
    }

    tableBody.innerHTML = "";

    storedDepartments.forEach((department, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${department.nome}</td>
            <td>${department.sigla}</td>
            <td>
                <button class="edit-button" onclick="editDepartment(${index})"><img src="https://img.icons8.com/?size=100&id=114092&format=png&color=000000" alt="ícone edição" width="auto" height="25rem" class="edit-icon icon"></button>
                <button class="delete-button" onclick="confirmDelete(${index})"><img src="https://img.icons8.com/?size=100&id=14237&format=png&color=000000" alt="ícone excluir" width="auto" height="25rem" class="delete-icon icon">
                        </div></button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Abrir modal para adicionar
function openModalToAdd() {
    editingId = null;
    document.getElementById("department-name").value = "";
    document.getElementById("department-sigla").value = "";
    document.getElementById("modal-title").innerText = "Adicionar Departamento";
    document.getElementById("modal").classList.remove("hidden");
}

// Abrir modal para editar
function editDepartment(index) {
    const storedDepartments = JSON.parse(localStorage.getItem("departments")) || [];
    const department = storedDepartments[index];

    editingId = index;
    document.getElementById("department-name").value = department.nome;
    document.getElementById("department-sigla").value = department.sigla;
    document.getElementById("modal-title").innerText = "Editar Departamento";
    document.getElementById("modal").classList.remove("hidden");
}

// Salvar (criar ou editar)
function saveDepartment() {
    const nome = document.getElementById("department-name").value;
    const sigla = document.getElementById("department-sigla").value;

    if (!nome || !sigla) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const storedDepartments = JSON.parse(localStorage.getItem("departments")) || [];

    if (editingId !== null) {
        storedDepartments[editingId] = { nome, sigla };
        alert("Departamento atualizado!");
    } else {
        storedDepartments.push({ nome, sigla });
        alert("Departamento criado!");
    }

    localStorage.setItem("departments", JSON.stringify(storedDepartments));
    closeModal();
    loadDepartments();
}

// Confirmar exclusão
function confirmDelete(index) {
    editingId = index;
    const confirmModal = document.getElementById("confirm-modal");
    if (confirmModal) confirmModal.classList.remove("hidden");
}

// Excluir departamento
function deleteDepartment() {
    const storedDepartments = JSON.parse(localStorage.getItem("departments")) || [];

    if (editingId !== null) {
        storedDepartments.splice(editingId, 1);
        localStorage.setItem("departments", JSON.stringify(storedDepartments));
        alert("Departamento excluído!");
    }

    closeConfirmModal();
    loadDepartments();
}

// Fechar modais
function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

function closeConfirmModal() {
    const confirmModal = document.getElementById("confirm-modal");
    if (confirmModal) confirmModal.classList.add("hidden");
}
