const API_URL = "http://localhost:8080/api/departamentos";
let editingId = null;

// Certifique-se de que o código é executado após o DOM ser carregado
document.addEventListener("DOMContentLoaded", () => {
    try {
        loadDepartments();

        // Ocultar modais no início
        const modal = document.getElementById("modal");
        if (modal) {
            modal.classList.add("hidden");
        }

        const confirmModal = document.getElementById("confirm-modal");
        if (confirmModal) {
            confirmModal.classList.add("hidden");
        }

        // Adiciona event listeners aos botões
        const addButton = document.getElementById("add-button");
        if (addButton) {
            addButton.addEventListener("click", openModalToAdd);
        }

        // Configurar event listeners
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const id = event.target.getAttribute("data-id"); // Certifique-se de usar data-id no botão
            confirmDelete(id);
        });
    });

    const cancelDeleteButton = document.getElementById("cancel-delete");
    if (cancelDeleteButton) {
        cancelDeleteButton.addEventListener("click", closeConfirmModal);
    }

        const saveButton = document.getElementById("save-button");
        const cancelButton = document.getElementById("cancel-button");
        const confirmDeleteButton = document.getElementById("confirm-delete");

        if (saveButton) saveButton.addEventListener("click", saveDepartment);
        if (cancelButton) cancelButton.addEventListener("click", closeModal);
        if (confirmDeleteButton) confirmDeleteButton.addEventListener("click", deleteDepartment);
        if (cancelDeleteButton) cancelDeleteButton.addEventListener("click", closeConfirmModal);
    } catch (error) {
        console.error("Erro ao configurar os event listeners:", error);
    }
});

// Carregar departamentos
async function loadDepartments() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Erro ao acessar API: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Resposta não é um JSON válido.");
        }

        const departments = await response.json();

        const tableBody = document.getElementById("departments-list");
        if (!tableBody) {
            console.error("Tabela de departamentos não encontrada!");
            return;
        }

        tableBody.innerHTML = "";

        departments.forEach(department => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${department.nome}</td>
                <td>${department.sigla}</td>
                <td>
                    <button class="edit-button" onclick="editDepartment(${department.id})"><img src="https://img.icons8.com/?size=100&id=114092&format=png&color=000000" alt="ícone edição" width="auto" height="25rem" class="edit-icon icon"></button>
                    <button class="delete-button" onclick="confirmDelete(${department.id})"><img src="https://img.icons8.com/?size=100&id=14237&format=png&color=000000" alt="ícone excluir" width="auto" height="25rem" class="delete-icon icon">
                            </div></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Erro ao carregar departamentos:", error);
    }
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
async function editDepartment(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Erro ao buscar departamento: ${response.status} ${response.statusText}`);
        }

        const department = await response.json();

        editingId = id;
        document.getElementById("department-name").value = department.nome;
        document.getElementById("department-sigla").value = department.sigla;
        document.getElementById("modal-title").innerText = "Editar Departamento";
        document.getElementById("modal").classList.remove("hidden");
    } catch (error) {
        console.error("Erro ao carregar departamento:", error);
    }
}

// Salvar (criar ou editar)
async function saveDepartment() {
    const nome = document.getElementById("department-name").value;
    const sigla = document.getElementById("department-sigla").value;

    if (!nome || !sigla) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    try {
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, sigla }),
        });

        if (response.ok) {
            alert(editingId ? "Departamento atualizado!" : "Departamento criado!");
            closeModal();
            loadDepartments();
        } else {
            alert("Erro ao salvar departamento.");
        }
    } catch (error) {
        console.error("Erro ao salvar departamento:", error);
    }
}

// Confirmar exclusão
function confirmDelete(id) {
    editingId = id;

    // Certifique-se de que o modal está visível
    const confirmModal = document.getElementById("confirm-modal");
    if (confirmModal) {
        confirmModal.classList.remove("hidden");
    }
}

// Excluir departamento
async function deleteDepartment() {
    try {
        const response = await fetch(`${API_URL}/${editingId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Departamento excluído!");
            closeConfirmModal();
            loadDepartments();
        } else {
            alert("Erro ao excluir departamento.");
        }
    } catch (error) {
        console.error("Erro ao excluir departamento:", error);
    }
}

// Fechar modais
function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}

function closeConfirmModal() {
    const confirmModal = document.getElementById("confirm-modal");
    if (confirmModal) {
        confirmModal.classList.add("hidden");
    }
}

