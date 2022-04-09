
const container = document.querySelector(".container");
const cartaCostas = "img/front.png";
const cartaFrente = ["img/bobrossparrot.gif",
    "img/explodyparrot.gif", "img/fiestaparrot.gif", "img/metalparrot.gif",
    "img/revertitparrot.gif", "img/tripletsparrot.gif", "img/unicornparrot.gif"];

let cartas = [
    {tipo: 3, estado: "desvirada", numero: 0},
    {tipo: 4, estado: "virada", numero: 1},
    {tipo: 5, estado: "desvirada", numero: 2},
    {tipo: 2, estado: "virada", numero: 3}
];

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

function renderizarJogo () {
    container.innerHTML = "";
    for (let i = 0; i < cartas.length; i++) {
        renderizarCarta(cartas[i]);
    }
}

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

renderizarJogo();