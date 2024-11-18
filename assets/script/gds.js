// Seleção dos elementos
let adicionar = document.querySelector('#add-button');
let add_box = document.querySelector('.add-popup');
let add_gds = document.querySelector('#add-gds');
let cancel_add = document.querySelector('#cancel-gds');
let list = document.querySelector('.middle-gds ul');
let edit_box = document.querySelector('.edit-popup');
let confirm = document.querySelector('#confirm-gds');
let currentItemToEdit = null;

// Abrir modal de adicionar
adicionar.addEventListener('click', () => {
    add_box.style.display = 'flex';
});

// Adicionar novo item
add_gds.addEventListener('click', () => {
    const nomeGds = document.querySelector('#nome-gds').value;
    const colorGds = document.querySelector('#color-gds').value;

    if (!nomeGds.trim()) {
        alert('Campo de nome vazio!');
        return;
    }

    adicionarItemDaLista(nomeGds, colorGds);
    salvarNoLocalStorage();

    document.querySelector('#nome-gds').value = '';
    document.querySelector('#color-gds').value = '#000000';
    add_box.style.display = 'none';
});

// Fechar modal de adicionar
cancel_add.addEventListener('click', () => {
    add_box.style.display = 'none';
    document.querySelector('#nome-gds').value = '';
    document.querySelector('#color-gds').value = '#000000';
});

// Função para adicionar item dinâmico na lista
function adicionarItemDaLista(nomeGds, colorGds) {
    const newLi = document.createElement('li');
    newLi.classList.add('item-dinamico'); // Identifica como item dinâmico
    newLi.innerHTML = `
        <div class="content-left">
            <div style="width: 20px; height: 20px; background-color: ${colorGds}; border-radius: 50%;"></div>
            <p>${nomeGds}</p>
        </div>
        <div class="edit">
            <div id="number-square">0</div>
            <div class="edit-options">
                <a href="#">
                    <img src="https://img.icons8.com/?size=100&id=114092&format=png&color=000000" alt="ícone edição" width="auto" height="25rem" id="btn-edit">
                </a>
                <a href="#">
                    <img src="https://img.icons8.com/?size=100&id=14237&format=png&color=000000" alt="ícone excluir" width="auto" height="25rem" id="btn-excluir">
                </a>
            </div>
        </div>
    `;
    newLi.style.border = '2px solid #DADADA';
    newLi.style.display = 'flex';
    newLi.style.height = '3rem';
    newLi.style.justifyContent = 'space-between';
    newLi.style.alignItems = 'center';
    newLi.style.marginTop = '2rem';
    newLi.style.padding = '0 5px';
    newLi.style.gap = '1rem';
    list.appendChild(newLi);

    // Adiciona eventos aos botões de exclusão e edição
    addDeleteEvent(newLi.querySelector('#btn-excluir'));
    editItem(newLi.querySelector('#btn-edit'));
}

// Função para editar um item
function editItem(editBtn) {
    editBtn.addEventListener('click', (e) => {
        edit_box.style.display = 'flex';
        currentItemToEdit = e.target.closest('li');

        const nomeAtual = currentItemToEdit.querySelector('.content-left p').textContent;
        const corAtual = rgbParaHex(window.getComputedStyle(currentItemToEdit.querySelector('.content-left div')).backgroundColor);

        document.querySelector('#nome-gds-edit').value = nomeAtual;
        document.querySelector('#color-gds-edit').value = corAtual;
    });
}

// Confirmar edição
confirm.addEventListener('click', () => {
    if (!document.querySelector('#nome-gds-edit').value.trim()) {
        alert('Campo de nome vazio!');
        return;
    }

    if (currentItemToEdit) {
        const novoNome = document.querySelector('#nome-gds-edit').value;
        const novaCor = document.querySelector('#color-gds-edit').value;

        currentItemToEdit.querySelector('.content-left p').textContent = novoNome;
        currentItemToEdit.querySelector('.content-left div').style.backgroundColor = novaCor;

        edit_box.style.display = 'none';
        currentItemToEdit = null;
        salvarNoLocalStorage();
    }
});

// Fechar modal de edição
edit_box.querySelector('#cancel-gds').addEventListener('click', () => {
    edit_box.style.display = 'none';
});

// Função para excluir item
function addDeleteEvent(deleteBtn) {
    deleteBtn.addEventListener('click', () => {
        deleteBtn.closest('li').remove();
        salvarNoLocalStorage();
    });
}

// Função para salvar no LocalStorage
function salvarNoLocalStorage() {
    const itens = [];
    document.querySelectorAll('.item-dinamico').forEach(li => {
        const nome = li.querySelector('.content-left p').textContent;
        const cor = li.querySelector('.content-left div').style.backgroundColor;
        itens.push({ nome, cor });
    });
    localStorage.setItem('graus', JSON.stringify(itens));
}

// Função para carregar do LocalStorage
function carregarDoLocalStorage() {
    // Remove apenas itens dinâmicos para evitar duplicação
    document.querySelectorAll('.item-dinamico').forEach(item => item.remove());

    // Carrega os itens do LocalStorage
    const itensSalvos = JSON.parse(localStorage.getItem('graus')) || [];
    itensSalvos.forEach(({ nome, cor }) => adicionarItemDaLista(nome, cor));
}

// Converter RGB para HEX
function rgbParaHex(rgb) {
    const rgbArray = rgb.match(/\d+/g);
    return `#${((1 << 24) + (parseInt(rgbArray[0]) << 16) + (parseInt(rgbArray[1]) << 8) + parseInt(rgbArray[2])).toString(16).slice(1)}`;
}

// Carregar itens ao iniciar
window.onload = carregarDoLocalStorage;
