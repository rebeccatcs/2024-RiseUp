let adicionar = document.querySelector('#add-button')
let add_box = document.querySelector('.add-popup')
let add_gds = document.querySelector('#add-gds')
let cancel_add = document.querySelector('#cancel-gds')
let list = document.querySelector('.middle-gds ul')
let delete_item = document.querySelector('#btn-excluir')
let edit_items = document.querySelectorAll('#btn-edit')
let edit_box = document.querySelector('.edit-popup')
let confirm = document.querySelector('#confirm-gds')

confirm.addEventListener('click', (e) => {
        const event = e.target.closest('li');
        const novoNome = document.querySelector('#nome-gds-edit').value;
        currentItemToEdit.querySelector('.content-left p').textContent = novoNome;

        // Atualiza a cor
        const novaCor = document.querySelector('#color-gds-edit').value;
        newLi.querySelector('.content-left div').style.backgroundColor = novaCor;
        // Fecha o modal de edição
        edit_box.style.display = 'none';
});

adicionar.addEventListener('click', () => {
    add_box.style.display = 'flex';
})

add_gds.addEventListener('click', () => {

    if (document.querySelector('#nome-gds').value === '') {
        alert('Campo de nome vazio!')
    }
    else {
        addGrau()
    }
})

function addGrau() {
    let nomeGds = document.querySelector('#nome-gds').value;
    let colorGds = document.querySelector('#color-gds').value;
    let newLi = document.createElement('li');
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
    newLi.style.justifyContent = 'space-between'
    newLi.style.alignItems = 'center';
    newLi.style.marginTop = '2rem';
    newLi.style.padding = '0 5px';
    newLi.style.gap = '1rem';
    list.appendChild(newLi);
    document.querySelector('#nome-gds').value = '';
    document.querySelector('#color-gds').value = '#000000';
    add_box.style.display = 'none';

    addDeleteEvent(newLi.querySelector('#btn-excluir'));
    editItem(newLi.querySelector('#btn-edit'));
}

cancel_add.addEventListener('click', () => {
    add_box.style.display = 'none';
    document.querySelector('#nome-gds').value = '';
    document.querySelector('#color-gds').value = '#000000';
})

function editItem(edit_items) {
    edit_items.addEventListener('click', (e) => {
        edit_box.style.display = 'flex';
        currentItemToEdit = e.target.closest('li');

        const nomeAtual = currentItemToEdit.querySelector('.content-left p').textContent;
        const corAtual = rgbParaHex(window.getComputedStyle(currentItemToEdit.querySelector('.content-left div')).backgroundColor);

        document.querySelector('#nome-gds-edit').value = nomeAtual;
        document.querySelector('#color-gds-edit').value = corAtual;
    })
}

confirm.addEventListener('click', () => {
    if (currentItemToEdit) {
        // Atualiza o nome
        const novoNome = document.querySelector('#nome-gds-edit').value;
        currentItemToEdit.querySelector('.content-left p').textContent = novoNome;

        // Atualiza a cor
        const novaCor = document.querySelector('#color-gds-edit').value;
        currentItemToEdit.querySelector('.content-left div').style.backgroundColor = novaCor;

        // Fecha o modal de edição
        edit_box.style.display = 'none';
        currentItemToEdit = null; // Reseta a variável após edição
    }
});

document.querySelectorAll('#btn-edit').forEach(editItem)

edit_box.querySelector('#cancel-gds').addEventListener('click', () => {
    edit_box.style.display = 'none';
})

function rgbParaHex(rgb) {
    const rgbArray = rgb.match(/\d+/g);
    return `#${((1 << 24) + (parseInt(rgbArray[0]) << 16) + (parseInt(rgbArray[1]) << 8) + parseInt(rgbArray[2])).toString(16).slice(1)}`;
}

function addDeleteEvent(delete_item) {
    delete_item.addEventListener('click', () => {
        delete_item.closest('li').remove();
    });
}
document.querySelectorAll('#btn-excluir').forEach(addDeleteEvent);