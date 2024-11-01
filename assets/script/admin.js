function toggleTab() {
    const content = document.getElementById('tabContent');
    const icon = document.getElementById('rotateIcon');
    const teste = "";

    // Alterna a visibilidade do conteúdo
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block'; // Mostra a aba
        icon.classList.add('rotate'); // Adiciona a classe de rotação
    } else {
        content.style.display = 'none'; // Esconde a aba
        icon.classList.remove('rotate'); // Remove a classe de rotação
    }
}