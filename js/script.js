
const container = document.querySelector(".container");
const contador = document.querySelector(".contador");
const cartaCostas = "img/front.png";
const cartaFrente = ["img/bobrossparrot.gif",
    "img/explodyparrot.gif", "img/fiestaparrot.gif", "img/metalparrot.gif",
    "img/revertitparrot.gif", "img/tripletsparrot.gif", "img/unicornparrot.gif"];

let cartas = [];
let numeroDeJogadas = 0;
let tempo = 0;
let tempoIntervalo;



// Funções ligadas a gerar o jogo /////////////////////////////////////////////////////////////////
function iniciarJogo () {
    container.innerHTML = "";
    contador.innerHTML = "";
    cartas = [];
    numeroDeJogadas = 0;
    tempo = 0;

    let totalCartas = prompt("Com quantas cartas quer jogar?");
    while (!(totalCartas >= 4 && totalCartas <= 14 && totalCartas % 2 == 0)) {
        alert("Apenas números pares de 4 a 14 são válidos.");
        totalCartas = prompt("Com quantas cartas quer jogar?");
    }
    gerarCartas(totalCartas);
    renderizarJogo();
    iniciarCronometro();
}

function gerarCartas (num) {
    let arr = [];
    for (let i = 0; i < num / 2; i++) {
        arr.push(i);
        arr.push(i);
    }
    arr.sort(comparador);
    for (let i = 0; i < num; i++) {
        cartas.push({tipo: arr[i], estado: "virada", numero: i, promessa: null});
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

function renderizarJogo () {
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
        numeroDeJogadas++;
        cartas[cartaNum].estado = "selecionada";
        const cartaDiv = document.querySelectorAll(".carta")[cartaNum];
        cartaDiv.classList.add("virando");
        cartaDiv.classList.add("selecionada");
        cartaDiv.classList.remove("virada");
        clearTimeout(cartas[cartaNum].promessa);
        cartas[cartaNum].promessa = setTimeout(terminarDesvirar, 220, cartaNum);
    }
}

function terminarDesvirar (cartaNum) {
    const cartaDiv = document.querySelectorAll(".carta")[cartaNum];
    cartaDiv.innerHTML = `<img src="${cartaFrente[cartas[cartaNum].tipo]}" />`;
    cartaDiv.classList.remove("virando");
    const outra = checarOutraSelecionada(cartaNum);
    if (outra !== null) {
        if (cartas[cartaNum].tipo === cartas[outra].tipo) {
            cartas[cartaNum].estado = "desvirada";
            cartas[outra].estado = "desvirada";
            cartas[cartaNum].promessa = setTimeout(deselecionarCarta, 1220, cartaNum);
            cartas[outra].promessa = setTimeout(deselecionarCarta, 1220, outra);
            if (contarViradas() === 0) {
                setTimeout(fimDeJogo, 220);
            }
        }
        else {
            cartas[cartaNum].estado = "virada";
            cartas[outra].estado = "virada";
            cartas[cartaNum].promessa = setTimeout(comecarVirar, 1220, cartaNum);
            cartas[outra].promessa = setTimeout(comecarVirar, 1220, outra);
        }
    }
}

function comecarVirar (cartaNum) {
    const cartaDiv = document.querySelectorAll(".carta")[cartaNum];
    cartaDiv.classList.add("virando");
    cartas[cartaNum].promessa = setTimeout(terminarVirar, 220, cartaNum);
}

function terminarVirar (cartaNum) {
    const cartaDiv = document.querySelectorAll(".carta")[cartaNum];
    cartaDiv.innerHTML = `<img src="${cartaCostas}" />`;
    cartaDiv.classList.remove("virando");
    cartaDiv.classList.remove("selecionada");
    cartaDiv.classList.add("virada");
}

function deselecionarCarta (cartaNum) {
    const cartaDiv = document.querySelectorAll(".carta")[cartaNum];
    cartaDiv.classList.remove("selecionada");
}
// Funções ligadas ao clicar as cartas ////////////////////////////////////////////////////////////



// Funções de suporte /////////////////////////////////////////////////////////////////////////////
function checarOutraSelecionada (num) {
    let outra = null;
    for (let i = 0; i < cartas.length; i++) {
        if (cartas[i].estado === "selecionada" && i !== num) {
            outra = i;
        }
    }
    return outra;
}

function contarViradas () {
    let total = 0;
    for (let i = 0; i < cartas.length; i++) {
        if (cartas[i].estado === "virada") {
            total++;
        }
    }
    return total;
}

function fimDeJogo () {
    pararCronometro();
    alert(`Você ganhou com ${numeroDeJogadas} jogadas e ${tempo} segundos!`);
    let resposta = prompt("Jogar novamente?");
    while (resposta !== "sim" && resposta !== "não") {
        alert("Responda com 'sim' ou 'não', minúsculo e acentuação correta.");
        resposta = prompt("Jogar novamente?");
    }
    if (resposta === "sim") {
        iniciarJogo();
    }
}
// Funções de suporte /////////////////////////////////////////////////////////////////////////////



// Funções do contador de tempo ///////////////////////////////////////////////////////////////////
function iniciarCronometro () {
    tempoIntervalo = setInterval(atualizarCronometro, 1000);
    contador.innerHTML = "0s"
}

function pararCronometro () {
    clearInterval(tempoIntervalo);
}

function atualizarCronometro () {
    tempo++;
    contador.innerHTML = `${tempo}s`;
}
// Funções do contador de tempo ///////////////////////////////////////////////////////////////////



iniciarJogo();
