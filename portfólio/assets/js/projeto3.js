var addBtn = document.getElementById("addTaskBtn")
var tarefaInput = document.getElementById("taskInput")
var lista = document.getElementById("taskList")

addBtn.addEventListener("click", function() {
    var aviso = document.getElementById("spanBox")

    if (tarefaInput.value === ''){
    aviso.innerHTML = "Atenção! Você deve escrever algo."
    }
    
    else {
    aviso.innerHTML = ""

    var newElement = document.createElement("li")
    newElement.innerHTML = tarefaInput.value
    lista.appendChild(newElement)

    var btnLi = document.createElement("button")
    btnLi.innerHTML = "X"
    newElement.appendChild(btnLi)

    btnLi.addEventListener("click", function(){
        newElement.parentNode.removeChild(newElement)
    })}
})