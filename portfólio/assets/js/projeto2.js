var display = document.getElementById("display")
var resultado = ""

function Add(teclaatual){
    if (teclaatual === 'C'){
        resultado = " "
    }
    else if (teclaatual === '<'){
        resultado = resultado.slice(0, -1)
    }
    else if (teclaatual === 'x'){
        resultado += '*'
    }
    else {
        resultado += teclaatual
    }
    display.innerHTML = resultado || '0'
}

function Calc(){
    try {
        display.innerHTML = eval(resultado)
        resultado = ""
    }
    catch(error)  {
        display.innerHTML = "Erro."
        resultado = ""
    }
}