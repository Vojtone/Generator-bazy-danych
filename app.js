var fs = require("fs");
var dane = require("./dane-statyczne");
var randomstring = require("randomstring");

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

function generujLogin() {
    return randomstring.generate({
        length: losowaLiczba(5,12),
        charset: 'alphanumeric'
      });
}

function generujHaslo() {
    return randomstring.generate({
        length: losowaLiczba(40,60),
        charset: 'alphanumeric'
      });
}

function generujImieINazwisko() {
    var imie, nazwisko;
    if (losowaLiczba(0, 10) > 5) {
        imie = losowyElTab(dane.imionaZenskie);
        nazwisko = losowyElTab(dane.nazwiska);
        var koncowkaNazwiska = nazwisko.slice(-3, nazwisko.length)
        if (koncowkaNazwiska == "ski" || koncowkaNazwiska == "cki" || koncowkaNazwiska == "zki") {
            nazwisko = nazwisko.slice(0, nazwisko.length-1) + "a";
        }
    } else {
        imie = losowyElTab(dane.imionaMeskie);
        nazwisko = losowyElTab(dane.nazwiska);
    }
    return {imie: imie, nazwisko: nazwisko};
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
        var rokRozpoczecia = losowaLiczba(2015, 2018);
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
             + dataZZerem(doKiedy.getDate());
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
            var data = new Date(new Date(element.dataRozpoczecia) - (-1000*60*60*24*(i-1)));
            data = data.getFullYear() + "-" + dataZZerem(data.getMonth()+1) + "-"
             + dataZZerem(data.getDate());
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
            if (miejsce === -1) console.log("NIE UDAŁO SIĘ ZNALEŹĆ MIEJSCA NA KONFERENCJĘ!") //TODO: auto re generacja przez przesyłanie flag 
            dzienKonferencji.miejsce = miejsce;
            dzienKonferencji.data = data;
            dzienKonferencji.godzinaRozpoczecia = godzina(losowaLiczba(7, 10));
            dzienKonferencji.godzinaZakonczenia = godzina(losowaLiczba(15, 19));
            dzienKonferencji.liczbaMiejsc = element.liczbaMiejsc;
            dniKonferencji.push(dzienKonferencji);
        }
    });
};

function generujWarsztaty() {
    var id = 0;
    dane.warsztaty.forEach(element => {
        id++;
        var warsztat = {};
        warsztat.id = id;
        warsztat.nazwa = element.nazwa;
        warsztat.sugerowanaCena = element.sugerowanaCena;
        warsztat.opis = element.opisWarsztatu;
        warsztaty.push(warsztat);
    });
};

function generujInstancjeWarsztatow() {
    var id = 0;
    dniKonferencji.forEach(element => {
        for (var i=0; i<losowaLiczba(0,3); i++) {
            id++;
            var instancjaWarsztatu = {};
            instancjaWarsztatu.id = id;
            var wylosowanyWarsztat = losowyElTab(warsztaty);
            instancjaWarsztatu.idWarsztatu = wylosowanyWarsztat.id;
            instancjaWarsztatu.idDniaKonferencji = element.id;
            instancjaWarsztatu.cena = wylosowanyWarsztat.sugerowanaCena + losowaLiczba (-20, 20);
            if (instancjaWarsztatu.cena < 0) instancjaWarsztatu.cena = 0;
            var liczbaMiejsc = losowaLiczba (5, 12) * 10;
            instancjaWarsztatu.liczbaMiejsc = liczbaMiejsc;
            
            instancjaWarsztatu.data = element.data;

            var godzinaRozpoczeciaKonferencji = element.godzinaRozpoczecia;
            godzinaRozpoczeciaKonferencji = Number(godzinaRozpoczeciaKonferencji.slice(0,2));
            var godzinaZakonczeniaKonferencji = element.godzinaZakonczenia;
            godzinaZakonczeniaKonferencji = Number(godzinaZakonczeniaKonferencji.slice(0,2));

            var godzinaRozpoczeciaWarsztatu = losowaLiczba(godzinaRozpoczeciaKonferencji, godzinaZakonczeniaKonferencji-2);
            var godzinaZakonczeniaWarsztatu = losowaLiczba(godzinaRozpoczeciaWarsztatu+1, godzinaZakonczeniaKonferencji);
            instancjaWarsztatu.godzinaRozpoczecia = godzina(godzinaRozpoczeciaWarsztatu);
            instancjaWarsztatu.godzinaZakonczenia = godzina(godzinaZakonczeniaWarsztatu);
            instancjaWarsztatu.czyAnulowane = losowaLiczba(0, 100) < 4 ? 1 : 0;

            var miejsce = -1;
            for (var j=0; j<miejsca.length; j++) {
                if (miejsca[j].iloscMiejsc < liczbaMiejsc) continue;
                var czyZajete = false;
                instancjeWarsztatow.forEach(inneWarsztaty => {
                    if (inneWarsztaty.data == element.data && inneWarsztaty.miejsce == miejsca[j].id &&
                        !((godzinaRozpoczeciaWarsztatu <= inneWarsztaty.godzinaRozpoczeciaWarsztatu &&
                            godzinaZakonczeniaWarsztatu <= inneWarsztaty.godzinaRozpoczeciaWarsztatu ) ||
                        (godzinaRozpoczeciaWarsztatu >= inneWarsztaty.godzinaZakonczeniaWarsztatu &&
                            godzinaZakonczeniaWarsztatu >= inneWarsztaty.godzinaZakonczeniaWarsztatu))) czyZajete = true;
                });
                dniKonferencji.forEach(dzienKonf => {
                    if (dzienKonf.data == element.data && dzienKonf.miejsce == miejsca[j].id) czyZajete = true;
                });
                if (!czyZajete) {
                    miejsce = miejsca[j].id;
                    break;
                }
            }
            if (miejsce === -1) console.log("NIE UDAŁO SIĘ ZNALEŹĆ MIEJSCA NA WARSZTATY!") //TODO: auto re generacja przez przesyłanie flag 
            instancjaWarsztatu.miejsce = miejsce;
            instancjeWarsztatow.push(instancjaWarsztatu);
        }
    });
};

function generujFirmy() {
    for (var i=0; i<dane.nazwyFirm.length; i++) {
        var firma = {};
        firma.id = i+1;
        firma.idKraju = losowyElTab(kraje).id;
        firma.nazwa = dane.nazwyFirm[i];
        firma.nip = losowaLiczba(1000000000, 9999999999);
        firmy.push(firma);
    }
};

function generujKlientow() {
    const ileIndywidualnych = 20;
    const ileKlientow = firmy.length + ileIndywidualnych;
    for (var i=0; i<ileKlientow; i++) {
        var klient = {};
        klient.id = i+1;

        if (i < firmy.length) klient.firmowy = true;
        else klient.firmowy = false;

        var unikalnyLogin = false;
        var login;
        while (!unikalnyLogin) {
            login = generujLogin();
            unikalnyLogin = true;
            klienci.forEach(element => {
                if (element.login == login) unikalnyLogin = false;
            });
        }
        klient.login = login;
        klient.haslo = generujHaslo();
        klient.email = login + losowyElTab(dane.domeny);
        klienci.push(klient);
    }
};

function generujKlientowFirmowych() {
    id = 0;
    firmy.forEach(element => {
        var klientFirmowy = {};
        id++;
        klientFirmowy.id = id;
        klientFirmowy.idKlienta = id; // tak zakładam, bo bez znaczenia
        klientFirmowy.idFirmy = element.id;
        var tmp = generujImieINazwisko();
        klientFirmowy.imiePrzedstawiciela = tmp.imie;
        klientFirmowy.nazwiskoPrzedstawiciela = tmp.nazwisko;
        klientFirmowy.telefon = losowaLiczba(100000000, 999999999);
        klienciFirmowi.push(klientFirmowy);
    });
};

function generujUczestnikowIndywidualnych() { //+ studenci
    var idStudenta = 0;
    for (var i=0; i<klienci.length-firmy.length; i++) {
        var uczestnik = {};
        uczestnik.id = i+1;
        uczestnik.idKlienta = i+1+firmy.length;
        var tmp = generujImieINazwisko();
        uczestnik.imie = tmp.imie;
        uczestnik.nazwisko = tmp.nazwisko;
        uczestnik.telefon = losowaLiczba(100000000, 999999999);
        var email;
        klienci.forEach(element => {
            if(element.id == i+1+firmy.length) email = element.email;
        });
        uczestnik.email = email;
        uczestnicy.push(uczestnik);
        if (losowaLiczba(0, 10) <1) {
            idStudenta++;
            var student = {};
            student.id = idStudenta;
            student.idUczestnika = i+1;
            student.numerLegitymacji = losowaLiczba(100000, 999999);
            studenci.push(student);
        }
    }
};

function generujRezerwacjeIndywidualne() {
    var id = 0;
    for (var i=0; i<uczestnicy.length; i++) { //w tym momencie w uczestnicy są tylko indywidualni
        var ileRezerwacji = losowaLiczba(0, 10);
        if (ileRezerwacji > 8) ileRezerwacji = 3;
        else if (ileRezerwacji > 5) ileRezerwacji = 2;
        else if (ileRezerwacji > 0) ileRezerwacji = 1;
        else ileRezerwacji = 0;
        var losowaKonferencja = losowaLiczba(0, konferencje.length-1);
        for (var j=0; j<ileRezerwacji; j++) {
            var rezerwacja = {};
            id++;
            rezerwacja.id = id;
            rezerwacja.idKlienta = i+1+firmy.length;
            var konferencja = konferencje[losowaKonferencja];
            losowaKonferencja = (losowaKonferencja + 1) % konferencje.length;
            rezerwacja.idKonferencji = konferencja.id;
            var dataRezerwacji = new Date(new Date(konferencja.dataRozpoczecia) - (1000*60*60*24*21+losowaLiczba(0,150)));
            if (dataRezerwacji.getTime() - (new Date()).getTime() > 0) dataRezerwacji = new Date();
            dataRezerwacji = dataRezerwacji.getFullYear() + "-" + dataZZerem(dataRezerwacji.getMonth()+1) + "-"
            + dataZZerem(dataRezerwacji.getDate());
            rezerwacja.dataRezerwacji = dataRezerwacji;
            var dataWplaty;
            if (new Date(dataRezerwacji).getFullYear() == 2018)
                dataWplaty = "NULL";
            else {
                dataWplaty = new Date(new Date(dataRezerwacji) - (-1000*60*60*24*losowaLiczba(1,6)));
                dataWplaty = dataWplaty.getFullYear() + "-" + dataZZerem(dataWplaty.getMonth()+1) + "-"
                + dataZZerem(dataWplaty.getDate());
            }
            rezerwacja.dataWplaty = dataWplaty;
            rezerwacje.push(rezerwacja);
        }
    }
};

function generujRezerwacjeKonferencjiInywidualne() {
    var id = 0;
    rezerwacje.forEach(element => {
        var idKonferencji = element.idKonferencji;
        var ileDniTrwa;
        konferencje.forEach(konf => {
            if(konf.id == idKonferencji) ileDniTrwa = konf.ileDniTrwa; 
        });
        for(var i=0; i<losowaLiczba(1, ileDniTrwa+1); i++) {
            var rezerwacjaKonferencji = {};
            id++;
            rezerwacjaKonferencji.id = id;
            rezerwacjaKonferencji.idRezerwacji = element.id;

            var liczbaMiejsc;
            var idDniaKonferencji;

            var licznik = 0
            for (var j=0; j<dniKonferencji.length; j++) { //zeby bral kolejny dzienKonf, a nie ten sam
                if (dniKonferencji[j].idKonferencji == idKonferencji) {
                    if (licznik == i) {
                        rezerwacjaKonferencji.idDniaKonferencji = dniKonferencji[j].id;
                        liczbaMiejsc = dniKonferencji[j].liczbaMiejsc;
                        idDniaKonferencji = dniKonferencji[j].id;
                        break;
                    } else licznik++;
                }
            }
            rezerwacjaKonferencji.liczbaMiejsc = 1;
            var idKlienta = element.idKlienta;
            var idUczestnika;
            uczestnicy.forEach(uczest => {
                if (uczest.idKlienta == idKlienta) idUczestnika = uczest.id;
            });
            var jestStudentem = 0;
            studenci.forEach(stud => {
                if (stud.idUczestnika == idUczestnika) jestStudentem = 1;
            });
            rezerwacjaKonferencji.liczbaStudentow = jestStudentem;
            rezerwacjaKonferencji.idKlienta = idKlienta;
            rezerwacjaKonferencji.idUczestnika = idUczestnika; // dla firmy -1 mozna dac
            rezerwacjaKonferencji.dataWplaty = element.dataWplaty;
            
            var ileZajetychMiejsc = 0;
            rezerwacjeKonferencji.forEach(wczesniejszaRezerwacja => {
                if (idDniaKonferencji == wczesniejszaRezerwacja.idDniaKonferencji)
                    ileZajetychMiejsc += wczesniejszaRezerwacja.liczbaMiejsc;
            });
            if (ileZajetychMiejsc < liczbaMiejsc) rezerwacjeKonferencji.push(rezerwacjaKonferencji);
            else console.log("Dla kogoś brakło miejsca na dzien konferencji");
        }
    });
};

function generujRezerwacjeWarsztatowIndywidualne() {
    var id = 0;
    rezerwacjeKonferencji.forEach(element => {
        var warsztatyDanegoDnia = [];
        instancjeWarsztatow.forEach(instancjaWarsztatu => {
            if (instancjaWarsztatu.idDniaKonferencji == element.idDniaKonferencji)
                warsztatyDanegoDnia.push(instancjaWarsztatu);
        });

        var wIluWarsztatachChceWziacUdzial = losowaLiczba(0,warsztatyDanegoDnia.length);
        for (var i=0; i<wIluWarsztatachChceWziacUdzial; i++) {
            var rezerwacjaWarsztatu = {};
            id++;
            rezerwacjaWarsztatu.id = id;
            rezerwacjaWarsztatu.idRezerwacjiKonferencji = element.id;
            rezerwacjaWarsztatu.idInstancjiWarsztatu = warsztatyDanegoDnia[i].id;
            rezerwacjaWarsztatu.liczbaMiejsc = 1;

            rezerwacjaWarsztatu.idUczestnika = element.idUczestnika; // dla firmy -1 mozna dac
            rezerwacjaWarsztatu.idKlienta = element.idKlienta;
            rezerwacjaWarsztatu.dataWplaty = element.dataWplaty;
            rezerwacjaWarsztatu.idDniaKonferencji = warsztatyDanegoDnia[i].idDniaKonferencji;
            rezerwacjaWarsztatu.godzinaRozpoczecia = warsztatyDanegoDnia[i].godzinaRozpoczecia;
            rezerwacjaWarsztatu.godzinaZakonczenia = warsztatyDanegoDnia[i].godzinaZakonczenia;

            //sprawdzenie czy godziny sie nie zazebiaja
            //warsztatyDanegoDnia - instancjeWarsztatow
            //wczesniejszeRezerwacje - rezerwacjeWarsztatow
            godzinyNieKoliduja = true;
            var gRozp = warsztatyDanegoDnia[i].godzinaRozpoczecia;
            var gZak = warsztatyDanegoDnia[i].godzinaZakonczenia;
            rezerwacjeWarsztatow.forEach(wczesniejszaRezerwacja => {
                if (wczesniejszaRezerwacja.idDniaKonferencji == warsztatyDanegoDnia[i].idDniaKonferencji &&
                    wczesniejszaRezerwacja.idUczestnika == element.idUczestnika) {
                        var gRozpWczesniejZarezerwowanych = wczesniejszaRezerwacja.godzinaRozpoczecia;
                        var gZakWczesniejZarezerwowanych = wczesniejszaRezerwacja.godzinaZakonczenia;
                        if (!(gRozp > gZakWczesniejZarezerwowanych || gZak < gRozpWczesniejZarezerwowanych))
                            godzinyNieKoliduja = false;
                    }
            });
            //sprawdzenie czy są miejsca
            var ileZajetychMiejsc = 0;
            rezerwacjeWarsztatow.forEach(wczesniejszaRezerwacja => {
                if (warsztatyDanegoDnia[i].id == wczesniejszaRezerwacja.idInstancjiWarsztatu)
                    ileZajetychMiejsc += wczesniejszaRezerwacja.liczbaMiejsc;
            });

            if ((ileZajetychMiejsc < warsztatyDanegoDnia[i].liczbaMiejsc) && godzinyNieKoliduja) 
                rezerwacjeWarsztatow.push(rezerwacjaWarsztatu);
            else console.log("Dla kogoś brakło miejsca na warsztat lub godziny kolidowaly");
        }
    });
}

function generujRejestracjeKonferencjiInywidualne() {
    id = 0;
    rezerwacjeKonferencji.forEach(element => {
        if (element.dataWplaty != "NULL") {
            var rejestracjaKonferencji = {};
            id++;
            rejestracjaKonferencji.id = id;
            rejestracjaKonferencji.idRezerwacjiKonferencji = element.id;
            rejestracjaKonferencji.idUczestnika = element.idUczestnika;
            rejestracjeKonferencji.push(rejestracjaKonferencji);
        }
    });
}

function generujRejestracjeWarsztatowInywidualne() {
    id = 0;
    rezerwacjeWarsztatow.forEach(element => {
        if (element.dataWplaty != "NULL") {
            var rejestracjaWarsztatu = {};
            id++;
            rejestracjaWarsztatu.id = id;
            rejestracjaWarsztatu.idRezerwacjiWarsztatu = element.id;
            rejestracjaWarsztatu.idUczestnika = element.idUczestnika;
            rejestracjeWarsztatow.push(rejestracjaWarsztatu);
        }
    });
}

kraje = [];
miejsca = [];
konferencje = [];
znizki = [];
dniKonferencji = [];
warsztaty = [];
instancjeWarsztatow = [];
klienci = [];
firmy = [];
klienciFirmowi = [];
uczestnicy = [];
studenci = [];
rezerwacje = [];
rezerwacjeKonferencji = [];
rezerwacjeWarsztatow = [];
rejestracjeKonferencji = [];
rejestracjeWarsztatow = [];
generujKraje();
generujMiejsca();
generujKonferencje();
generujZnizki();
generujDniKonferencji();
generujWarsztaty();
generujInstancjeWarsztatow();
generujFirmy();
generujKlientow();
generujKlientowFirmowych();
generujUczestnikowIndywidualnych();
generujRezerwacjeIndywidualne();
generujRezerwacjeKonferencjiInywidualne();
generujRezerwacjeWarsztatowIndywidualne();
generujRejestracjeKonferencjiInywidualne();
generujRejestracjeWarsztatowInywidualne();
console.log(rezerwacjeWarsztatow);
console.log("=====================================================");
console.log(rejestracjeWarsztatow);

