document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("add-button");
    const departamentosContainer = document.querySelector(".departamentos");
    const departmentForm = document.getElementById("department-form");
    const newDepartmentInput = document.getElementById("new-department-input");
    const submitButton = document.getElementById("submit-department");
    const cancelButton = document.getElementById("cancel-department");
    
    const confirmModal = document.getElementById("confirm-modal");
    const confirmDeleteButton = document.getElementById("confirm-delete");
    const cancelDeleteButton = document.getElementById("cancel-delete");
    
    let currentEditingItem = null; // Variável para rastrear o item sendo editado
    let itemToDelete = null; // Variável para rastrear o item a ser excluído

    addButton.addEventListener("click", function() {
        currentEditingItem = null; // Reseta o estado de edição
        newDepartmentInput.value = ''; // Limpa o campo
        departmentForm.style.display = 'flex'; // Exibe o formulário
        newDepartmentInput.focus(); // Foca no campo de entrada
    });

    submitButton.addEventListener("click", function() {
        const newDepartmentName = newDepartmentInput.value.trim();
        if (newDepartmentName) {
            if (currentEditingItem) {
                // Se um item estiver sendo editado
                const departmentNameElement = currentEditingItem.querySelector("p a");
                departmentNameElement.textContent = newDepartmentName;
            } else {
                // Caso contrário, adiciona um novo departamento
                const newDepartmentItem = document.createElement("div");
                newDepartmentItem.classList.add("departamentos-item");

                newDepartmentItem.innerHTML = `
                    <p><a href="#">${newDepartmentName}</a></p>
                    <div class="departamentos-config">
                        <div class="edit-options">
                            <a href="#" class="edit-department"><img src="https://img.icons8.com/?size=100&id=114092&format=png&color=000000" alt="ícone edição" width="auto" height="25rem"></a>
                            <a href="#" class="delete-department"><img src="https://img.icons8.com/?size=100&id=14237&format=png&color=000000" alt="ícone excluir" width="auto" height="25rem"></a>
                        </div>
                    </div>
                `;

                departamentosContainer.appendChild(newDepartmentItem);
            }
            departmentForm.style.display = 'none'; // Oculta o formulário
        }
    });

    cancelButton.addEventListener("click", function() {
        newDepartmentInput.value = ''; // Limpa o campo
        departmentForm.style.display = 'none'; // Oculta o formulário
    });

    // Delegação de eventos para editar e excluir departamentos
    departamentosContainer.addEventListener("click", function(e) {
        if (e.target.closest(".delete-department")) {
            itemToDelete = e.target.closest(".departamentos-item"); // Armazena o item a ser excluído
            confirmModal.style.display = 'flex'; // Exibe a modal de confirmação
        }

        if (e.target.closest(".edit-department")) {
            currentEditingItem = e.target.closest(".departamentos-item"); // Armazena o item a ser editado
            const departmentNameElement = currentEditingItem.querySelector("p a");
            newDepartmentInput.value = departmentNameElement.textContent; // Preenche o campo de entrada
            departmentForm.style.display = 'flex'; // Exibe o formulário para edição
        }
    });

    // Ação de confirmação para excluir o departamento
    confirmDeleteButton.addEventListener("click", function() {
        if (itemToDelete) {
            departamentosContainer.removeChild(itemToDelete); // Remove o departamento
            itemToDelete = null; // Reseta o item a ser excluído
        }
        confirmModal.style.display = 'none'; // Oculta a modal
    });

    // Ação de cancelamento para excluir o departamento
    cancelDeleteButton.addEventListener("click", function() {
        confirmModal.style.display = 'none'; // Oculta a modal
        itemToDelete = null; // Reseta o item a ser excluído
    });
});
