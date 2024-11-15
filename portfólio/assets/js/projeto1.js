const numoculto = Math.round(Math.random() * 101);
let numtentativas = 5;

document.getElementById("enviar").addEventListener("click", function() {
    const numjogador = parseInt(document.getElementById("numjogador").value);

    if (numjogador === numoculto) {
        alert("Parabéns! Você acertou!");
    } 
    else {
        numtentativas--;
        if (numtentativas > 0) {
            if (numjogador < numoculto) {
                alert(`O número oculto é maior que ${numjogador}. Tentativas restantes: ${numtentativas}`);
            } else {
                alert(`O número oculto é menor que ${numjogador}. Tentativas restantes: ${numtentativas}`);
            }
        } else {
            alert(`As suas tentativas acabaram. O número oculto era: ${numoculto}.`);
        }
    }
});