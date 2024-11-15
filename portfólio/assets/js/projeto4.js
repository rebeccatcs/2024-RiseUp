var h1car = document.getElementById("result")
var cortexto = document.body.style.color= "white"
var background = document.body.style.backgroundColor= "black"

var carWhite = document.getElementById("white")
var carRed = document.getElementById("red")

var btnBranco = document.getElementById("branco")
var btnVermelho = document.getElementById("vermelho")

var btnResetar = document.getElementById("resetar")
var btnAcelerar = document.getElementById("acelerar")
var btnDesacelerar = document.getElementById("desacelerar")    

var contadorVermelho = 0
var contadorBranco = 0



// carro vermelho
carRed.addEventListener("click",function(){
    if (background === "black", "white"){
        h1car.innerHTML= "Vermelho"
        btnResetar.style.display = "initial"
        btnAcelerar.style.display = "initial"
        btnDesacelerar.style.display = "initial"

        document.body.style.backgroundColor= "white"
        document.body.style.color = 'black'; 
        h1car.style.color= "red"; 

        if(contadorVermelho === 0) {
            contadorVermelho++

            carRed.style.height = '30px'
            carRed.style.top = '3.5rem'

        } else if(contadorVermelho === 1) {
            contadorVermelho++

            carRed.style.height = '20px'
            carRed.style.top = '2.5rem'

        } else if(contadorVermelho === 2) {
            contadorVermelho++

            carRed.style.height = '15px'
            carRed.style.top = '1rem'
        }
    }
})



// carro branco
carWhite.addEventListener("click",function(){
    if (background === "black", "red"){
        h1car.innerHTML= "Branco"
        btnResetar.style.display = "initial"
        btnAcelerar.style.display = "initial"
        btnDesacelerar.style.display = "initial"

        document.body.style.backgroundColor= "red"
        document.body.style.color = 'black'; 
        h1car.style.color= "white";
    
        if(contadorBranco === 0){
            contadorBranco++

            carWhite.style.height = '30px'
            carWhite.style.top = '3.5rem'
            carWhite.style.right = '1rem'
            carWhite.style.marginLeft = '0.5rem'
        
        } else if(contadorBranco === 1) {
            contadorBranco++
        
            carWhite.style.height = '20px'
            carWhite.style.top = '2.5rem'
            carWhite.style.right = '1rem'
            carWhite.style.marginLeft = '1rem'

        } else if(contadorBranco === 2) {
            contadorBranco++

            carWhite.style.height = '15px'
            carWhite.style.top = '1.5rem'
            carWhite.style.right = '1rem'
            carWhite.style.marginLeft = '1.5rem'
        }
    }
})



// botao acelerar 
btnAcelerar.addEventListener('click', function() {
    if(contadorBranco === 0){
        contadorBranco++

        carWhite.style.height = '30px'
        carWhite.style.top = '3.5rem'
        carWhite.style.right = '1rem'
        carWhite.style.marginLeft = '0.5rem'
    
    } else if(contadorBranco === 1) {
        contadorBranco++
    
        carWhite.style.height = '20px'
        carWhite.style.top = '2.5rem'
        carWhite.style.right = '1rem'
        carWhite.style.marginLeft = '1.5rem'

    } else if(contadorBranco === 2) {
        contadorBranco++

        carWhite.style.height = '15px'
        carWhite.style.top = '1.5rem'
        carWhite.style.right = '1rem'
        carWhite.style.marginLeft = '2rem'
}
})

btnAcelerar.addEventListener('click', function() {
    if (contadorVermelho === 0) {
        contadorVermelho++

        carRed.style.height = '30px'
        carRed.style.top = '3.5rem'

    } else if(contadorVermelho === 1) {
        contadorVermelho++

        carRed.style.height = '20px'
        carRed.style.top = '2.5rem'

    } else if(contadorVermelho === 2) {
        contadorVermelho++
        
        carRed.style.height = '15px'
        carRed.style.top = '1.5rem'
    }
})



// botao desacelerar
btnDesacelerar.addEventListener('click', function() {
    if(contadorBranco === 3){
        contadorBranco -= 1

        carWhite.style.height = '15px'
        carWhite.style.top = '1.5rem'
        carWhite.style.right = '1rem'
        carWhite.style.marginLeft = '2rem'
            
    } else if(contadorBranco === 2) {
        contadorBranco -= 1

        carWhite.style.height = '25px'
        carWhite.style.top = '2.5rem'
        carWhite.style.right = '1rem'
        carWhite.style.marginLeft = '1.5rem'

    } else if(contadorBranco === 1) {
        contadorBranco -= 1
           
        carWhite.style.height = '40px'
        carWhite.style.top = '3.5rem'
        carWhite.style.right = '1rem'
        carWhite.style.marginLeft = '0.5rem'
    }
})

btnDesacelerar.addEventListener('click', function() {
    if (contadorVermelho === 3) {
        contadorVermelho -= 1

        carRed.style.height = '15px'
        carRed.style.top = '1.5rem'
  
    } else if(contadorVermelho === 2) {
        contadorVermelho -= 1

        carRed.style.height = '25px'
        carRed.style.top = '2.5rem'

    } else if(contadorVermelho === 1) {
        contadorVermelho -= 1
            
        carRed.style.height = '40px'
        carRed.style.top = '3.5rem'
    }
})



// botao reiniciar
btnResetar.addEventListener("click", function(){
    carWhite.style.height = ''
    carWhite.style.top = ''
    carWhite.style.right = ''
    carWhite.style.marginLeft = ''
    carRed.style.height = ''
    carRed.style.top = ''
    h1car.innerHTML= ""
    document.body.style.backgroundColor= "black"
    document.body.style.color= "white"
    btnResetar.style.display= "none"
    btnAcelerar.style.display= "none"
    btnDesacelerar.style.display= "none"
    contadorBranco = 0
    contadorVermelho = 0
})



// botao acelerar teclado 
document.addEventListener('keyup', function(event) {
    if (event.key === "ArrowUp") {
        if(contadorBranco === 0){
            contadorBranco++

            carWhite.style.height = '30px'
            carWhite.style.top = '3.5rem'
            carWhite.style.right = '1rem'
            carWhite.style.marginLeft = '0.5rem'
        
        } else if(contadorBranco === 1) {
            contadorBranco++
        
            carWhite.style.height = '20px'
            carWhite.style.top = '2.5rem'
            carWhite.style.right = '1rem'
            carWhite.style.marginLeft = '1.5rem'

        } else if(contadorBranco === 2) {
            contadorBranco++

            carWhite.style.height = '15px'
            carWhite.style.top = '1.5rem'
            carWhite.style.right = '1rem'
            carWhite.style.marginLeft = '2rem'
        }
    }
})

document.addEventListener('keyup', function(event) {
    if (event.key === "ArrowUp") {
        if (contadorVermelho === 0) {
            contadorVermelho++

            carRed.style.height = '30px'
            carRed.style.top = '3.5rem'
  
        } else if(contadorVermelho === 1) {
            contadorVermelho++

            carRed.style.height = '20px'
            carRed.style.top = '2.5rem'

        } else if(contadorVermelho === 2) {
            contadorVermelho++
            
            carRed.style.height = '15px'
            carRed.style.top = '1.5rem'
        }
    }
})



// botao desacelerar teclado
document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowDown") {
        if(contadorBranco === 3){
        contadorBranco -= 1

            carWhite.style.height = '15px'
            carWhite.style.top = '1.5rem'
            carWhite.style.right = '1rem'
            carWhite.style.marginLeft = '2rem'
            
        } else if(contadorBranco === 2) {
        contadorBranco -= 1

            carWhite.style.height = '25px'
            carWhite.style.top = '2.5rem'
            carWhite.style.right = '1rem'
            carWhite.style.marginLeft = '1.5rem'

        } else if(contadorBranco === 1) {
        contadorBranco -= 1
           
            carWhite.style.height = '40px'
            carWhite.style.top = '3.5rem'
            carWhite.style.right = '1rem'
            carWhite.style.marginLeft = '0.5rem'
        }
    }
})

document.addEventListener('keydown', function(event) {
    if (event.key === "ArrowDown") {
        if (contadorVermelho === 3) {
            contadorVermelho -= 1
    
            carRed.style.height = '15px'
            carRed.style.top = '1.5rem'
      
        } else if(contadorVermelho === 2) {
            contadorVermelho -= 1
    
            carRed.style.height = '25px'
            carRed.style.top = '2.5rem'
    
        } else if(contadorVermelho === 1) {
            contadorVermelho -= 1
                
            carRed.style.height = '40px'
            carRed.style.top = '3.5rem'
        }
    }
})



// botao vermelho
btnVermelho.addEventListener("click",function(){
    if (background === "black", "white"){
        h1car.innerHTML= "Vermelho"
        btnResetar.style.display = "initial"
        btnAcelerar.style.display = "initial"
        btnDesacelerar.style.display = "initial"

        document.body.style.backgroundColor= "white"
        document.body.style.color = 'black'; 
        h1car.style.color= "red"; 

        if(contadorVermelho === 0) {
            contadorVermelho++

            carRed.style.height = '30px'
            carRed.style.top = '3.5rem'

        } else if(contadorVermelho === 1) {
            contadorVermelho++

            carRed.style.height = '20px'
            carRed.style.top = '2.5rem'

        } else if(contadorVermelho === 2) {
            contadorVermelho++

            carRed.style.height = '15px'
            carRed.style.top = '1rem'
        }
    }
})



// botao branco
btnBranco.addEventListener("click",function(){
    if (background === "black", "red"){
        h1car.innerHTML= "Branco"
        btnResetar.style.display = "initial"
        btnAcelerar.style.display = "initial"
        btnDesacelerar.style.display = "initial"
        
        document.body.style.backgroundColor= "red"
        document.body.style.color = 'black'; 
        h1car.style.color= "white";
    
        if(contadorBranco === 0){
            contadorBranco++

            carWhite.style.height = '30px'
            carWhite.style.top = '3.5rem'
            carWhite.style.right = '1rem'
            carWhite.style.marginLeft = '0.5rem'
        
        } else if(contadorBranco === 1) {
            contadorBranco++
        
            carWhite.style.height = '20px'
            carWhite.style.top = '2.5rem'
            carWhite.style.right = '1rem'
            carWhite.style.marginLeft = '1rem'

        } else if(contadorBranco === 2) {
            contadorBranco++

            carWhite.style.height = '15px'
            carWhite.style.top = '1.5rem'
            carWhite.style.right = '1rem'
            carWhite.style.marginLeft = '1.5rem'
        }
    }
})
