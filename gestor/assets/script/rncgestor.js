document.addEventListener("DOMContentLoaded", () => {
    const initialScreen = document.getElementById("initialScreen");
    const creationScreen = document.getElementById("creationScreen");
    const createButton = document.getElementById("createButton");
    const saveButton = document.getElementById("saveButton");
    const cancelButton = document.getElementById("cancelButton");
    const nonConformitiesList = document.getElementById("nonConformitiesList");

    // Campos do formulário
    const titleField = document.getElementById("title");
    const descriptionField = document.getElementById("description");
    const impactField = document.getElementById("impact");
    const typeField = document.getElementById("type");
    const severityField = document.getElementById("severity");
    const dataField = document.getElementById("data");
    const requerenteField = document.getElementById("requerente");
    const statusField = document.getElementById("status");

    let nonConformities = [];
    let editIndex = null;

    // Carregar dados do Local Storage
    loadNonConformities();

    // Exibir tela de criação
    createButton.addEventListener("click", () => {
        editIndex = null;
        resetForm();
        toggleSaveButton(true);
        initialScreen.style.display = "none";
        creationScreen.style.display = "block";
    });

    // Cancelar e voltar à tela inicial
    cancelButton.addEventListener("click", () => {
        creationScreen.style.display = "none";
        initialScreen.style.display = "block";
    });

    // Salvar ou editar uma não conformidade
    saveButton.addEventListener("click", () => {
        const title = titleField.value.trim();
        const description = descriptionField.value.trim();
        const impact = impactField.value.trim();
        const type = typeField.value;
        const severity = severityField.value;
        const data = dataField.value;
        const requerente = requerenteField.value.trim();
        const status = statusField.value;

        if (!title || !description || !type || !severity || !data || !requerente || !status) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const nonConformity = {
            title,
            description,
            impact,
            type,
            severity,
            data,
            requerente,
            status,
        };

        if (editIndex !== null) {
            nonConformities[editIndex] = nonConformity;
        } else {
            nonConformities.push(nonConformity);
        }

        saveToLocalStorage();
        renderNonConformities();
        creationScreen.style.display = "none";
        initialScreen.style.display = "block";
    });

    // Renderizar a lista de não conformidades
    function renderNonConformities() {
        nonConformitiesList.innerHTML = "";

        if (nonConformities.length === 0) {
            const message = document.createElement("li");
            message.id = "emptyMessage";
            message.textContent = "Nenhuma não conformidade registrada.";
            nonConformitiesList.appendChild(message);
        } else {
            nonConformities.forEach((nonConformity, index) => {
                const li = document.createElement("li");
                li.className = "nonConformity-item";

                const contentDiv = document.createElement("div");
                contentDiv.innerHTML = `
                    <strong>${nonConformity.title}</strong>
                    <p>${nonConformity.description}</p>
                    <p><em>Requerente:</em> ${nonConformity.requerente}</p>
                    <p><em>Tipo:</em> ${nonConformity.type}</p>
                    <p><em>Status:</em> ${nonConformity.status}</p>
                    <p><em>Severidade:</em> ${nonConformity.severity}</p>
                `;

                const buttonContainer = document.createElement("div");
                buttonContainer.className = "button-container";

                // Botão Editar
                const editButton = document.createElement("button");
                editButton.className = "edit-button";
                editButton.textContent = "Editar";
                editButton.addEventListener("click", () => {
                    editIndex = index;
                    loadToForm(nonConformity);
                    toggleSaveButton(true);
                    initialScreen.style.display = "none";
                    creationScreen.style.display = "block";
                });

                // Botão Excluir
                const deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.textContent = "Excluir";
                deleteButton.addEventListener("click", (event) => {
                    event.stopPropagation(); // Evita que o clique no botão dispare o evento do item
                    nonConformities.splice(index, 1);
                    saveToLocalStorage();
                    renderNonConformities();
                });

                buttonContainer.appendChild(editButton);
                buttonContainer.appendChild(deleteButton);

                li.appendChild(contentDiv);
                li.appendChild(buttonContainer);
                nonConformitiesList.appendChild(li);
            });
        }
    }

    // Mostrar ou ocultar o botão de salvar
    function toggleSaveButton(show) {
        saveButton.style.display = show ? "inline-block" : "none";
    }

    // Salvar os dados no Local Storage
    function saveToLocalStorage() {
        localStorage.setItem("nonConformities", JSON.stringify(nonConformities));
    }

    // Carregar os dados do Local Storage
    function loadNonConformities() {
        const data = localStorage.getItem("nonConformities");
        if (data) {
            nonConformities = JSON.parse(data);
        }
        renderNonConformities();
    }

    // Preencher o formulário com os dados
    function loadToForm(nonConformity) {
        titleField.value = nonConformity.title;
        descriptionField.value = nonConformity.description;
        impactField.value = nonConformity.impact;
        typeField.value = nonConformity.type;
        severityField.value = nonConformity.severity;
        dataField.value = nonConformity.data;
        requerenteField.value = nonConformity.requerente;
        statusField.value = nonConformity.status;
    }

    // Resetar o formulário
    function resetForm() {
        titleField.value = "";
        descriptionField.value = "";
        impactField.value = "";
        typeField.value = "";
        severityField.value = "";
        dataField.value = "";
        requerenteField.value = "";
        statusField.value = "";
    }
});
