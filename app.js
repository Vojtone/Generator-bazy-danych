var fs = require("fs");
var dane = require("./dane-statyczne");

function losowaLiczba (min, max) {
    return Math.floor(Math.random() * (max+1 - min) + min);
}

function losowyElTab (tab) {
    return element = tab[Math.floor(Math.random() * tab.length)];
}

function dataZZerem (liczba) {
    if (liczba >= 10) return liczba;
    return "0" + liczba;
}

function godzina (x) {
    if (x < 10) x = "0" + x;
    return x + ":00:00";  
}

function generujKraje() {
    var id = 0;
    dane.kraje.forEach(element => {
        var kraj = {};
        id++;
        kraj.id = id;
        kraj.symbol = element.symbol;
        kraj.nazwa = element.nazwa;
        kraje.push(kraj);
    });
};

function generujMiejsca() {
    const ileMiejsc = 10;
    var idPolski;
    kraje.forEach(element => {
        if (element.nazwa == "Polska") idPolski = element.id;
    });
    for (var i=0; i<ileMiejsc; i++) {
        var miejsce = {};
        miejsce.id = i+1;
        miejsce.idKraju = idPolski;
        miejsce.miasto = "Kraków";
        miejsce.kodPocztowy = "30-001";
        miejsce.ulica = "al. Mickiewicza";
        miejsce.numerLokalu = 23;
        miejsce.iloscMiejsc = i < 2 ? 300 : losowaLiczba(5, 15) * 10;
        if (losowaLiczba(0, 10) > 5) 
            miejsce.dodatkoweInformacje = losowyElTab(dane.dodatkoweInformacjeAdresowe);
        else miejsce.dodatkoweInformacje = "NULL";
        miejsca.push(miejsce);
    }
};

function generujKonferencje() {
    const ileKonferencji = 10;
    for (var i=0; i<ileKonferencji; i++) {
        var konferencja = {};
        konferencja.id = i+1;
        konferencja.nazwa = losowyElTab(dane.nazwyKonferencji);
        var dzienRozpoczecia = losowaLiczba(1, 24);
        var miesiacRozpoczecia = dataZZerem(losowaLiczba(1, 12));
        var rokRozpoczecia = losowaLiczba(2015, 2017);
        var ileDniTrwa = losowaLiczba(0, 4);
        var dzienZakonczenia = dzienRozpoczecia + ileDniTrwa; 
        konferencja.ileDniTrwa = ileDniTrwa;
        konferencja.dataRozpoczecia = rokRozpoczecia + "-" + miesiacRozpoczecia + "-"
            + dataZZerem(dzienRozpoczecia);
        konferencja.dataZakonczenia = rokRozpoczecia + "-" + miesiacRozpoczecia + "-"
            + dataZZerem(dzienZakonczenia); 
        konferencja.liczbaMiejsc = losowaLiczba (15, 25) * 10;
        konferencja.cena = losowaLiczba(0, 30) * 10;
        konferencja.znizkaStudencka = losowaLiczba(0, 20) * 5;
        if (losowaLiczba (0, 100) < 3) konferencja.czyAnulowane = 1;
        else konferencja.czyAnulowane = 0;

        konferencje.push(konferencja);
    }
};

function generujZnizki() {
    var id = 0;
    konferencje.forEach(element => {
        var wartoscZnizki = losowaLiczba(20, 80);
        var ileDniPrzed = losowaLiczba(80, 180);
        for (var i=0; i<losowaLiczba(0,4); i++) {
            id++;
            var znizka = {};
            znizka.id = id;
            znizka.idKonferencji = element.id;
            znizka.znizka = Math.floor(wartoscZnizki);
            wartoscZnizki *= losowaLiczba(60, 90) / 100;
            var doKiedy = new Date(new Date(element.dataRozpoczecia) - (1000*60*60*24*ileDniPrzed));
            doKiedy = doKiedy.getFullYear() + "-" + dataZZerem(doKiedy.getMonth()+1) + "-"
             + dataZZerem(doKiedy.getDate()+1);
            znizka.doKiedy = doKiedy;
            ileDniPrzed = Math.floor(ileDniPrzed * losowaLiczba(70, 90) / 100);
            znizki.push(znizka);
        }

    });
};

function generujDniKonferencji() {
    var id = 0;
    konferencje.forEach(element => {
        for (var i=0; i<=element.ileDniTrwa; i++) {
            var dzienKonferencji = {};
            id++;
            dzienKonferencji.id = id;
            dzienKonferencji.idKonferencji = element.id;
            var data = new Date(new Date(element.dataRozpoczecia) - (-1000*60*60*24*i));
            data = data.getFullYear() + "-" + dataZZerem(data.getMonth()+1) + "-"
             + dataZZerem(data.getDate()+1);
            var miejsce = -1;
            for (var j=0; j<miejsca.length; j++) {
                if (miejsca[j].iloscMiejsc < element.liczbaMiejsc) continue;
                var czyZajete = false;
                dniKonferencji.forEach(dzien => {
                    if (dzien.data == data && dzien.miejsce == miejsca[j].id) czyZajete = true;
                });
                if (!czyZajete) {
                    miejsce = miejsca[j].id;
                    break;
                }
            }
            if (miejsce === -1) console.log("NIE UDAŁO SIĘ ZNALEŹĆ MIEJSCA!") //TODO: auto re generacja przez przesyłanie flag 
            dzienKonferencji.miejsce = miejsce;
            dzienKonferencji.data = data;
            dzienKonferencji.godzinaRozpoczecia = godzina(losowaLiczba(7, 10));
            dzienKonferencji.godzinaZakonczenia = godzina(losowaLiczba(15, 19));
            dniKonferencji.push(dzienKonferencji);
        }
    });
}

kraje = [];
miejsca = [];
konferencje = [];
znizki = [];
dniKonferencji = [];
generujKraje();
generujMiejsca();
generujKonferencje();
generujZnizki();
generujDniKonferencji();
console.log(dniKonferencji);
