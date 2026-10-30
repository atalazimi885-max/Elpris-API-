let momsValg = document.getElementById("momsValg");
let regionValg = document.getElementById("regionValg");
let datoValg = document.getElementById("datoValg");

async function opdaterIdag() {
    try {
        let priser = await hentPriser(new Date());
        let nu = priser[new Date().getHours()];
        visLigeNu(nu);
        visMinMax(findLavest(priser), findHojest(priser));
        visListe("oversigtListe", priser);
        visFejl("");
    } catch (fejl) {
        visFejl("Kunne ikke hente priser");
    }
}

async function opdaterHistorik() {
    let del = datoValg.value.split("-");
    let dato = new Date(del[0], del[1] - 1, del[2]);
    try {
        let priser = await hentPriser(dato);
        visHistorikTekst(del[2] + "-" + del[1] + "-" + del[0]);
        visListe("historikListe", priser);
    } catch (fejl) {
        visFejl("Kunne ikke hente priser");
    }
}

function opdaterAlt() {
    visInfo(hentMoms(), hentRegion());
    opdaterIdag();
    opdaterHistorik();
}

function start() {
    let idag = new Date();
    let enUgeSiden = new Date();
    enUgeSiden.setDate(idag.getDate() - 7);

    datoValg.max = datoTilInput(idag);
    datoValg.min = datoTilInput(enUgeSiden);
    datoValg.value = datoTilInput(idag);
    momsValg.checked = hentMoms();
    regionValg.value = hentRegion();

    visSide("ligenu");
    opdaterAlt();
}

let navKnapper = document.getElementsByClassName("navKnap");
for (let i = 0; i < navKnapper.length; i++) {
    navKnapper[i].addEventListener("click", function () {
        visSide(navKnapper[i].getAttribute("data-side"));
    });
}

document.getElementById("indstillingerKnap").addEventListener("click", function () {
    visSide("indstillinger");
});

document.getElementById("lukKnap").addEventListener("click", function () {
    visSide("ligenu");
});

momsValg.addEventListener("change", function () {
    gemMoms(momsValg.checked);
    opdaterAlt();
});

regionValg.addEventListener("change", function () {
    gemRegion(regionValg.value);
    opdaterAlt();
});

datoValg.addEventListener("change", opdaterHistorik);

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}

start();