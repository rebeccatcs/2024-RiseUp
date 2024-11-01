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
    
    let currentEditingItem = null; 
    let itemToDelete = null; 

    addButton.addEventListener("click", function() {
        currentEditingItem = null; 
        newDepartmentInput.value = ''; 
        departmentForm.style.display = 'flex'; 
        newDepartmentInput.focus(); 
    });

    submitButton.addEventListener("click", function() {
        const newDepartmentName = newDepartmentInput.value.trim();
        if (newDepartmentName) {
            if (currentEditingItem) {
                const departmentNameElement = currentEditingItem.querySelector("p a");
                departmentNameElement.textContent = newDepartmentName;
            } else {
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
            departmentForm.style.display = 'none'; 
        }
    });

    cancelButton.addEventListener("click", function() {
        newDepartmentInput.value = '';
        departmentForm.style.display = 'none';
    });

    departamentosContainer.addEventListener("click", function(e) {
        if (e.target.closest(".delete-department")) {
            itemToDelete = e.target.closest(".departamentos-item");
            confirmModal.style.display = 'flex'; 
        }

        if (e.target.closest(".edit-department")) {
            currentEditingItem = e.target.closest(".departamentos-item"); 
            const departmentNameElement = currentEditingItem.querySelector("p a");
            newDepartmentInput.value = departmentNameElement.textContent; 
            departmentForm.style.display = 'flex';
        }
    });

    confirmDeleteButton.addEventListener("click", function() {
        if (itemToDelete) {
            departamentosContainer.removeChild(itemToDelete); 
            itemToDelete = null; 
        }
        confirmModal.style.display = 'none';
    });

    cancelDeleteButton.addEventListener("click", function() {
        confirmModal.style.display = 'none';
        itemToDelete = null; 
    });
});
