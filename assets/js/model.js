function toCifre(tal) {
    if (tal < 10) {
        return "0" + tal;
    }
    return "" + tal;
}

function hentMoms() {
    return localStorage.getItem("moms") === "true";
}

function gemMoms(vaerdi) {
    localStorage.setItem("moms", vaerdi);
}

function hentRegion() {
    let region = localStorage.getItem("region");
    if (region === null) {
        return "DK2";
    }
    return region;
}

function gemRegion(vaerdi) {
    localStorage.setItem("region", vaerdi);
}

function lavUrl(dato) {
    let aar = dato.getFullYear();
    let maaned = toCifre(dato.getMonth() + 1);
    let dag = toCifre(dato.getDate());
    return "https://www.elprisenligenu.dk/api/v1/prices/" + aar + "/" + maaned + "-" + dag + "_" + hentRegion() + ".json";
}

function datoTilInput(dato) {
    return dato.getFullYear() + "-" + toCifre(dato.getMonth() + 1) + "-" + toCifre(dato.getDate());
}

function beregnPris(pris) {
    if (hentMoms()) {
        return pris * 1.25;
    }
    return pris;
}

async function hentPriser(dato) {
    let svar = await fetch(lavUrl(dato));
    let data = await svar.json();
    let liste = [];
    for (let i = 0; i < data.length; i++) {
        liste.push({
            time: data[i].time_start.substring(11, 13),
            pris: beregnPris(data[i].DKK_per_kWh)
        });
    }
    return liste;
}

function findLavest(liste) {
    let lavest = liste[0];
    for (let i = 1; i < liste.length; i++) {
        if (liste[i].pris < lavest.pris) {
            lavest = liste[i];
        }
    }
    return lavest;
}

function findHojest(liste) {
    let hojest = liste[0];
    for (let i = 1; i < liste.length; i++) {
        if (liste[i].pris > hojest.pris) {
            hojest = liste[i];
        }
    }
    return hojest;
}