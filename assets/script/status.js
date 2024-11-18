// Seleção dos elementos fixos da aba
const abaCentralizada = document.getElementById('aba-centralizada');
const fecharAba = document.getElementById('fechar-aba');
const abaTitulo = document.getElementById('aba-titulo');
const abaCampos = document.getElementById('aba-campos');
const confirmarAba = document.getElementById('confirmar-aba');

// Seleção dos elementos de manipulação
const adicionarStatusBtn = document.querySelector('.manipular-status img:nth-child(1)');
const editarStatusBtn = document.querySelector('.manipular-status img:nth-child(2)');
const excluirStatusBtn = document.querySelector('.manipular-status img:nth-child(3)');
const operacoesDosStatus = document.querySelector('.operacoes-dos-status');

// Função para salvar no localStorage
function salvarStatusNoLocalStorage() {
    const itensDinamicos = document.querySelectorAll('.item-dinamico');
    const statusArray = Array.from(itensDinamicos).map(item => {
        const nome = item.querySelector('.agrupamento-esquerdo-status p').textContent;
        const valor = item.querySelector('p:last-child').textContent;
        return { nome, valor };
    });
    localStorage.setItem('status', JSON.stringify(statusArray));
}

// Função para carregar os status do localStorage
function carregarStatusDoLocalStorage() {
    // Remover apenas os itens com a classe "item-dinamico"
    document.querySelectorAll('.item-dinamico').forEach(item => item.remove());

    // Recuperar os itens do localStorage
    const statusSalvos = JSON.parse(localStorage.getItem('status')) || [];
    statusSalvos.forEach(({ nome, valor }) => {
        adicionarItemStatus(nome, valor);
    });
}

// Função genérica para adicionar um item de status na interface
function adicionarItemStatus(nomeStatus, valorStatus = '0') {
    const novoItem = document.createElement('div');
    novoItem.className = 'item-status item-dinamico'; // Classe para itens dinâmicos

    const agrupamento = document.createElement('div');
    agrupamento.className = 'agrupamento-esquerdo-status';

    const icone = document.createElement('img');
    icone.src = 'https://img.icons8.com/?size=100&id=11691&format=png&color=5856D6';
    icone.alt = nomeStatus;
    icone.width = 25;

    const texto = document.createElement('p');
    texto.textContent = nomeStatus;

    agrupamento.appendChild(icone);
    agrupamento.appendChild(texto);

    const valorElemento = document.createElement('p');
    valorElemento.textContent = valorStatus;

    novoItem.appendChild(agrupamento);
    novoItem.appendChild(valorElemento);

    operacoesDosStatus.appendChild(novoItem);
}



// Função para abrir a aba
function abrirAba(titulo, campos = [], callback) {
    // Define o título
    abaTitulo.textContent = titulo;

    // Limpa os campos antigos
    abaCampos.innerHTML = '';

    // Adiciona os novos campos, se houver
    campos.forEach((campo, index) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = campo.placeholder;
        input.value = campo.valor || '';
        input.id = `campo-${index}`;
        abaCampos.appendChild(input);
    });

    // Define os eventos dos botões
    confirmarAba.onclick = () => {
        const valores = campos.map((_, index) => document.getElementById(`campo-${index}`).value);
        callback(valores);
        fecharAbaFunc();
    };

    // Exibe a aba
    abaCentralizada.style.display = 'block';
}

// Função para fechar a aba
function fecharAbaFunc() {
    abaCentralizada.style.display = 'none';
}

// Evento para o botão de fechar (ícone de "x")
fecharAba.addEventListener('click', fecharAbaFunc);

// Função para adicionar um novo status
adicionarStatusBtn.addEventListener('click', () => {
    abrirAba('Adicionar Novo Status', [{ placeholder: 'Nome do Status' }], (valores) => {
        const nomeStatus = valores[0];
        if (nomeStatus) {
            adicionarItemStatus(nomeStatus, '0');
            salvarStatusNoLocalStorage();
        }
    });
});

// Função para editar um status existente
editarStatusBtn.addEventListener('click', () => {
    const itensStatus = document.querySelectorAll('.item-status');
    if (itensStatus.length > 0) {
        abrirAba(
            'Editar Status',
            [
                { placeholder: 'Índice do Status (0, 1, ...)', valor: '' },
                { placeholder: 'Novo nome do Status', valor: '' },
                { placeholder: 'Novo valor do Status', valor: '' }
            ],
            (valores) => {
                const [indice, novoNome, novoValor] = valores;
                const index = parseInt(indice, 10);

                if (!isNaN(index) && itensStatus[index]) {
                    const itemStatus = itensStatus[index];

                    // Atualizar o nome do status
                    if (novoNome.trim() !== '') {
                        const nomeElemento = itemStatus.querySelector('.agrupamento-esquerdo-status p');
                        nomeElemento.textContent = novoNome;
                    }

                    // Atualizar o valor do status
                    if (novoValor.trim() !== '') {
                        const valorElemento = itemStatus.querySelector('p:last-child');
                        valorElemento.textContent = novoValor;
                    }

                    salvarStatusNoLocalStorage();
                }
            }
        );
    }
});


// Função para excluir um status existente
excluirStatusBtn.addEventListener('click', () => {
    const itensStatus = document.querySelectorAll('.item-status');
    if (itensStatus.length > 0) {
        abrirAba('Excluir Status', [{ placeholder: 'Índice do Status (0, 1, ...)', valor: '' }], (valores) => {
            const [indice] = valores;
            const index = parseInt(indice, 10);

            if (!isNaN(index) && itensStatus[index]) {
                itensStatus[index].remove();
                salvarStatusNoLocalStorage();
            }
        });
    }
});


// Carrega os status salvos ao carregar a página
carregarStatusDoLocalStorage();




// MOBILE
let btnAbrirMenu = document.getElementById('btn-abrir-menu')
let btnFecharMenu = document.getElementById('btn-fechar-menu')
let itensMenu = document.getElementById('itens-menu')
let overlay = document.getElementById('overlay-menu')
let menu = document.getElementById('menu-mobile')

btnAbrirMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu')
})

btnFecharMenu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

itensMenu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})