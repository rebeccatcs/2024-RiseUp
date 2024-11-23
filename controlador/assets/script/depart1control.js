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

        if (saveButton) saveButton.addEventListener("click", saveDepartment);
        if (cancelButton) cancelButton.addEventListener("click", closeModal);
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

    storedDepartments.forEach((department) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${department.nome}</td>
            <td>${department.sigla}</td>
            <td><span class="no-permission">Você não tem permissão para ações</span></td>
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

// Salvar (criar)
function saveDepartment() {
    const nome = document.getElementById("department-name").value;
    const sigla = document.getElementById("department-sigla").value;

    if (!nome || !sigla) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const storedDepartments = JSON.parse(localStorage.getItem("departments")) || [];
    storedDepartments.push({ nome, sigla });
    alert("Departamento criado!");

    localStorage.setItem("departments", JSON.stringify(storedDepartments));
    closeModal();
    loadDepartments();
}

// Fechar modais
function closeModal() {
    document.getElementById("modal").classList.add("hidden");
}
