var addBtn = document.getElementById("addTaskBtn");
var tarefaInput = document.getElementById("taskInput");
var lista = document.getElementById("kanbanCardsEmAberto"); // referência para a coluna "em aberto"

// Função para salvar as tarefas no localStorage
function saveTasks() {
    const columns = document.querySelectorAll('.kanban-column');
    let tasks = [];

    columns.forEach(column => {
        const columnId = column.id;
        const columnTasks = [];
        const cards = column.querySelectorAll('.kanban-card');

        cards.forEach(card => {
            const task = {
                text: card.querySelector('ul li').textContent,  // Salvar apenas o texto da tarefa
                status: card.querySelector('span').className
            };
            columnTasks.push(task);
        });

        tasks.push({ columnId, columnTasks });
    });

    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
}

// Função para carregar as tarefas do localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('kanbanTasks'));
    if (savedTasks) {
        savedTasks.forEach(savedColumn => {
            const column = document.getElementById(savedColumn.columnId);
            const columnCards = column.querySelector('.kanban-cards');

            savedColumn.columnTasks.forEach(task => {
                // Criar o card com as informações salvas
                const newCard = document.createElement("div");
                newCard.classList.add("kanban-card");
                newCard.setAttribute("draggable", "true");

                // Criar o span com a classe da tarefa salva
                const span = document.createElement("span");
                span.classList.add(task.status);
                newCard.appendChild(span);

                // Criar a lista de tarefas dentro do card
                const taskList = document.createElement("ul");
                const newElement = document.createElement("li");
                newElement.textContent = task.text; // Apenas o texto
                taskList.appendChild(newElement);
                newCard.appendChild(taskList);

                // Criar o botão de remoção
                const btnLi = document.createElement("button");
                btnLi.innerHTML = "X";
                newElement.appendChild(btnLi);

                // Remover tarefa
                btnLi.addEventListener("click", function () {
                    newElement.parentNode.removeChild(newElement);
                    newCard.parentNode.removeChild(newCard);
                    saveTasks(); // Atualizar o localStorage
                });

                // Adicionar o card à coluna correspondente
                columnCards.appendChild(newCard);
                addDragEvents(newCard); // Adicionar funcionalidade de arrastar
            });
        });
    }
}

// Função para tornar os cards arrastáveis
function addDragEvents(card) {
    // arrastando
    card.addEventListener('dragstart', e => {
        e.currentTarget.classList.add('dragging');
    });

    // parando de arrastar
    card.addEventListener('dragend', e => {
        e.currentTarget.classList.remove('dragging');
        saveTasks(); // Atualizar o localStorage ao mover o card
    });
}

// Aplicar a funcionalidade de arrastar para todos os cards ao carregar a página
document.querySelectorAll('.kanban-card').forEach(card => {
    addDragEvents(card);
});

// Aplicar a funcionalidade de arrastar para as colunas
document.querySelectorAll('.kanban-column').forEach(column => {
    column.addEventListener('dragover', e => {
        e.preventDefault();
        e.currentTarget.classList.add('cards-hover');
    });

    column.addEventListener('dragleave', e => {
        e.currentTarget.classList.remove('cards-hover');
    });

    column.addEventListener('drop', e => {
        e.currentTarget.classList.remove('cards-hover');
        const dragCard = document.querySelector('.kanban-card.dragging');
        e.currentTarget.querySelector('.kanban-cards').appendChild(dragCard);

        const span = dragCard.querySelector('span');
        const newStatus = e.currentTarget.id;
        switch (newStatus) {
            case 'em-aberto':
                span.className = 'aberto';
                span.style.background = '#ffe23e';
                break;
            case 'bid':
                span.className = 'bid';
                span.style.background = '#ff7c24';
                break;
            case 'em-andamento':
                span.className = 'andamento';
                span.style.background = '#76c4ff';
                break;
            case 'entregue':
                span.className = 'entregue';
                span.style.background = '#81ff5f';
                break;
        }
        saveTasks(); // Atualizar o localStorage após mover o card
    });
});

// Adicionar nova tarefa
addBtn.addEventListener('click', e => {
    var aviso = document.getElementById("spanBox");

    if (tarefaInput.value === '') {
        aviso.innerHTML = "Atenção! Você deve escrever algo.";
    } else {
        aviso.innerHTML = "";

        var newCard = document.createElement("div");
        newCard.classList.add("kanban-card");
        newCard.setAttribute("draggable", "true");

        var span = document.createElement("span");
        span.classList.add("aberto");
        span.style.background = '#ffe23e';
        newCard.appendChild(span);

        var taskList = document.createElement("ul");
        var newElement = document.createElement("li");
        newElement.innerHTML = tarefaInput.value; // A tarefa que foi digitada
        taskList.appendChild(newElement);
        newCard.appendChild(taskList);

        var btnLi = document.createElement("button");
        btnLi.innerHTML = "X";
        newElement.appendChild(btnLi);

        btnLi.addEventListener("click", function () {
            newElement.parentNode.removeChild(newElement);
            newCard.parentNode.removeChild(newCard);
            saveTasks(); // Atualizar o localStorage
        });

        lista.appendChild(newCard);
        addDragEvents(newCard);

        tarefaInput.value = ''; // Limpar o campo de input

        saveTasks(); // Salvar no localStorage
    }
});

// Carregar tarefas quando a página for carregada
window.addEventListener('load', loadTasks);
