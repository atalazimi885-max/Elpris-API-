function formater(pris) {
    return pris.toFixed(3);
}

function visLigeNu(nu) {
    let slut = Number(nu.time) + 1;
    if (slut === 24) {
        slut = 0;
    }
    document.getElementById("nuPris").textContent = formater(nu.pris) + " KR";
    document.getElementById("nuTid").textContent = nu.time + ".00 - " + toCifre(slut) + ".00";
}

function visMinMax(lavest, hojest) {
    let lave = document.getElementsByClassName("lavestePris");
    let hoje = document.getElementsByClassName("hojestePris");
    for (let i = 0; i < lave.length; i++) {
        lave[i].textContent = formater(lavest.pris) + " KR";
    }
    for (let i = 0; i < hoje.length; i++) {
        hoje[i].textContent = formater(hojest.pris) + " KR";
    }
}

function visListe(id, priser) {
    let ul = document.getElementById(id);
    ul.innerHTML = "";
    for (let i = 0; i < priser.length; i++) {
        ul.innerHTML += "<li><span>kl. " + priser[i].time + ".00</span><span>" + formater(priser[i].pris) + " kr</span></li>";
    }
}

function visHistorikTekst(tekst) {
    document.getElementById("historikTekst").textContent = "Priserne d. " + tekst;
}

function visFejl(tekst) {
    document.getElementById("fejl").textContent = tekst;
}

function visInfo(moms, region) {
    let momsTekst = "ex. moms";
    if (moms) {
        momsTekst = "inkl. moms";
    }
    let regionTekst = "Øst Danmark";
    if (region === "DK1") {
        regionTekst = "Vest Danmark";
    }
    document.getElementById("info").innerHTML =
        "Priserne er <span>" + momsTekst + "</span> og afgifter<br>" +
        "Du vises lige nu priserne for <span>" + regionTekst + "</span>";
}

function visSide(id) {
    let sider = document.getElementsByClassName("side");
    let knapper = document.getElementsByClassName("navKnap");
    for (let i = 0; i < sider.length; i++) {
        sider[i].classList.remove("aktiv");
    }
    for (let i = 0; i < knapper.length; i++) {
        knapper[i].classList.remove("valgt");
        if (knapper[i].getAttribute("data-side") === id) {
            knapper[i].classList.add("valgt");
        }
    }
    document.getElementById(id).classList.add("aktiv");
}