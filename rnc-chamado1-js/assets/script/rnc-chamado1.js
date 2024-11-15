const btnEditar = document.getElementById('btn-editar');
const salvar = document.getElementById('salvar')
const camposEditaveis = document.querySelectorAll('.descricao-box, .descricao-menor');

btnEditar.addEventListener("click", () => {
    camposEditaveis.forEach(campo => {
        campo.contentEditable = 'true';
        campo.focus();
    })
    
})

salvar.addEventListener("click", () => {
    camposEditaveis.forEach(campo => {
        campo.contentEditable = 'false';
        campo = campo.textContent;
    });
})