
const container = document.querySelector(".container");
const cartaCostas = "img/front.png";
const cartaFrente = ["img/bobrossparrot.gif",
    "img/explodyparrot.gif", "img/fiestaparrot.gif", "img/metalparrot.gif",
    "img/revertitparrot.gif", "img/tripletsparrot.gif", "img/unicornparrot.gif"];

let cartas = [];



// Funções ligadas a gerar o jogo /////////////////////////////////////////////////////////////////
function iniciarJogo () {
    let totalCartas = prompt("Com quantas cartas quer jogar?");
    while (!(totalCartas >= 4 && totalCartas <= 14 && totalCartas % 2 == 0)) {
        alert("Apenas números pares de 4 a 14 são válidos.");
        totalCartas = prompt("Com quantas cartas quer jogar?");
    }

    gerarCartas(totalCartas);
    renderizarJogo();
}

function gerarCartas (num) {
    let arr = [];
    for (let i = 0; i < num / 2; i++) {
        arr.push(i);
        arr.push(i);
    }
    arr.sort(comparador);
    for (let i = 0; i < num; i++) {
        cartas.push({tipo: arr[i], estado: "virada", numero: i});
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

function renderizarJogo () {
    container.innerHTML = "";
    for (let i = 0; i < cartas.length; i++) {
        renderizarCarta(cartas[i]);
    }
}

function renderizarCarta (carta) {
    let imagem;
    if (carta.estado === "virada") {
        imagem = cartaCostas;
    }
    else {
        imagem = cartaFrente[carta.tipo];
    }

    container.innerHTML += `
        <div class="carta ${carta.estado}" onclick="selecionarCarta(${carta.numero})">
            <img src="${imagem}" />
        </div>
    `;
}
// Funções ligadas a gerar o jogo /////////////////////////////////////////////////////////////////



// Funções ligadas ao clicar as cartas ////////////////////////////////////////////////////////////
function selecionarCarta (cartaNum) {
    if (cartas[cartaNum].estado === "virada") {
        cartas[cartaNum].estado = "desvirada";
        
        const cartaDiv = document.querySelectorAll(".carta")[cartaNum];
        cartaDiv.classList.add("virando");
        cartaDiv.classList.add("selecionada");
        cartaDiv.classList.remove("virada");
        setTimeout(terminarVirar, 200, cartaNum);
    }
}

function terminarVirar (cartaNum) {
    const cartaDiv = document.querySelectorAll(".carta")[cartaNum];
    cartaDiv.innerHTML = `<img src="${cartaFrente[cartas[cartaNum].tipo]}" />`;
    cartaDiv.classList.remove("virando");
    setTimeout(deselecionarCarta, 1200, cartaNum);
}

function deselecionarCarta (cartaNum) {
    const cartaDiv = document.querySelectorAll(".carta")[cartaNum];
    cartaDiv.classList.remove("selecionada");
}
// Funções ligadas ao clicar as cartas ////////////////////////////////////////////////////////////



iniciarJogo();