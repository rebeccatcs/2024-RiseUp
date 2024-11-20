// Seleção dos elementos da aba modal
const abaCentralizada = document.getElementById('aba-centralizada');
const fecharAba = document.getElementById('fechar-aba');
const abaTitulo = document.getElementById('aba-titulo');
const abaCampos = document.getElementById('aba-campos');
const confirmarAba = document.getElementById('confirmar-aba');

// Seleção dos elementos principais
const addProfileBtn = document.querySelector('.add-profile-btn');
const profileList = document.getElementById('profile-list');

// Variáveis de estado
let actionCallback = null;

// Função para salvar todos os perfis no LocalStorage (fixos e dinâmicos)
function salvarPerfisNoLocalStorage() {
    const perfis = [];
    document.querySelectorAll('#profile-list .perfil').forEach(perfil => {
        const nome = perfil.querySelector('.perfil-info span').textContent;
        const isDinamico = perfil.classList.contains('dinamico');
        perfis.push({ nome, isDinamico });
    });
    localStorage.setItem('perfis', JSON.stringify(perfis));
}

// Função para carregar todos os perfis do LocalStorage
function carregarPerfisDoLocalStorage() {
    const perfisSalvos = JSON.parse(localStorage.getItem('perfis')) || [];

    // Limpar a lista de perfis
    profileList.innerHTML = '';

    // Recriar todos os perfis salvos
    perfisSalvos.forEach(({ nome, isDinamico }) => adicionarPerfil(nome, isDinamico));
}

// Função para abrir uma aba modal
function abrirAba(titulo, campos = [], callback) {
    abaTitulo.textContent = titulo;
    abaCampos.innerHTML = '';

    campos.forEach((campo, index) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = campo.placeholder;
        input.value = campo.valor || '';
        input.id = `campo-${index}`;
        abaCampos.appendChild(input);
    });

    actionCallback = () => {
        const valores = campos.map((_, index) => document.getElementById(`campo-${index}`).value);
        callback(valores);
        fecharAbaFunc();
    };

    abaCentralizada.style.display = 'block';
}

// Função para fechar a aba modal
function fecharAbaFunc() {
    abaCentralizada.style.display = 'none';
    actionCallback = null; // Limpa o callback
}

// Evento para o botão de fechar a aba
fecharAba.addEventListener('click', fecharAbaFunc);

// Evento para o botão "Confirmar" da aba
confirmarAba.addEventListener('click', () => {
    if (actionCallback) actionCallback();
});

// Função para adicionar um perfil à interface
function adicionarPerfil(nomePerfil, isDinamico = true) {
    const novoPerfil = document.createElement('div');
    novoPerfil.classList.add('perfil');
    if (isDinamico) novoPerfil.classList.add('dinamico');

    const perfilInfo = document.createElement('div');
    perfilInfo.className = 'perfil-info';

    const icone = document.createElement('img');
    icone.src =
        'https://static.vecteezy.com/system/resources/previews/019/879/186/large_2x/user-icon-on-transparent-background-free-png.png';
    icone.alt = nomePerfil;
    icone.className = 'perfil-icon';

    const nome = document.createElement('span');
    nome.textContent = nomePerfil;

    perfilInfo.appendChild(icone);
    perfilInfo.appendChild(nome);

    const perfilIcons = document.createElement('div');
    perfilIcons.className = 'perfil-icons';

    // Configurar botões para editar e excluir
    const editarIcone = document.createElement('i');
    editarIcone.className = 'bi bi-pencil-square';
    editarIcone.addEventListener('click', () => {
        abrirAba('Editar Perfil', [{ placeholder: 'Novo nome do perfil', valor: nomePerfil }], valores => {
            const [novoNome] = valores;
            if (novoNome.trim() !== '') {
                nome.textContent = novoNome.trim();
                salvarPerfisNoLocalStorage();
            }
        });
    });

    const excluirIcone = document.createElement('i');
    excluirIcone.className = 'bi bi-trash';
    excluirIcone.addEventListener('click', () => {
        abrirAba('Excluir Perfil', [], () => {
            novoPerfil.remove();
            salvarPerfisNoLocalStorage();
        });
    });

    perfilIcons.appendChild(editarIcone);
    perfilIcons.appendChild(excluirIcone);

    novoPerfil.appendChild(perfilInfo);
    novoPerfil.appendChild(perfilIcons);
    profileList.appendChild(novoPerfil);
}

// Evento para adicionar um novo perfil
addProfileBtn.addEventListener('click', () => {
    abrirAba('Adicionar Novo Perfil', [{ placeholder: 'Nome do perfil' }], valores => {
        const nomePerfil = valores[0];
        if (nomePerfil.trim() !== '') {
            adicionarPerfil(nomePerfil.trim(), true);
            salvarPerfisNoLocalStorage();
        }
    });
});

// Carregar perfis do LocalStorage ao iniciar a página
carregarPerfisDoLocalStorage();

const adminPerfil = document.getElementById("admin")

adminPerfil.addEventListener('click', () => {
    window.location.href = "admin.html";
})
