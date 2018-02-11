var fs = require("fs");
var dane = require("./dane-statyczne");
var randomstring = require("randomstring");

function losowaLiczba (min, max) {
    return Math.floor(Math.random() * (max+1 - min) + min);
}
function losowyElTab (tab) {
    return element = tab[Math.floor(Math.random() * tab.length)];
}
function czyLiczba (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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
            if (miejsce === -1) daneOk = false; //nie udało się znaleźć miejsca na konferencję
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
            if (miejsce === -1) daneOk = false; //nie udało się znaleźć miejsca na warsztaty
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
    const ileIndywidualnych = 1500;
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
        uczestnik.idRezerwacji = -1; //czyli indywidualny
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
function generujRezerwacje() {
    var id = 0;
    //for (var i=0; i<klienci.length; i++) {
    klienci.forEach(klient => {
            
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
            rezerwacja.idKlienta = klient.id;
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
            rezerwacja.klientFirmowy = klient.firmowy;
            rezerwacje.push(rezerwacja);
        }
    });
};
function generujRezerwacjeKonferencji() { // +uczestnicy i studenci firmowi
    var id = 0;
    rezerwacje.forEach(rezerwacja => {
        var liczbaOsob;
        var liczbaStudentow = 0;
        var idUczestnika;
        var uczestnicyFirmowiStworzeni = false;
        if (rezerwacja.klientFirmowy) {
            //klient firmowy
            const maxLiczbaOsob = 30;
            const maxLiczbaStudentow = 5;
            liczbaOsob = losowaLiczba (2, maxLiczbaOsob);
            liczbaStudentow = losowaLiczba (0, maxLiczbaStudentow);
            if (liczbaOsob < 6) liczbaStudentow = 0;
            idUczestnika = -1;

        } else {
            //klient indywidualny
            liczbaOsob = 1;
            uczestnicy.forEach(uczest => {
                if (uczest.idKlienta == rezerwacja.idKlienta) idUczestnika = uczest.id;
            });
            studenci.forEach(stud => {
                if (stud.idUczestnika == idUczestnika) liczbaStudentow = 1;
            });
        }

        var idKonferencji = rezerwacja.idKonferencji;
        var ileDniTrwa;
        konferencje.forEach(konf => {
            if(konf.id == idKonferencji) ileDniTrwa = konf.ileDniTrwa; 
        });

        for(var i=0; i<losowaLiczba(1, ileDniTrwa+1); i++) {
            var rezerwacjaKonferencji = {};
            id++;
            rezerwacjaKonferencji.id = id;
            rezerwacjaKonferencji.idRezerwacji = rezerwacja.id;

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
            rezerwacjaKonferencji.liczbaMiejsc = liczbaOsob;
            rezerwacjaKonferencji.liczbaStudentow = liczbaStudentow;
            rezerwacjaKonferencji.idKlienta = rezerwacja.idKlienta;
            rezerwacjaKonferencji.idUczestnika = idUczestnika;
            rezerwacjaKonferencji.dataWplaty = rezerwacja.dataWplaty;
            rezerwacjaKonferencji.klientFirmowy = rezerwacja.klientFirmowy;
            
            var ileZajetychMiejsc = 0;
            rezerwacjeKonferencji.forEach(wczesniejszaRezerwacja => {
                if (idDniaKonferencji == wczesniejszaRezerwacja.idDniaKonferencji)
                    ileZajetychMiejsc += wczesniejszaRezerwacja.liczbaMiejsc;
            });
            if (ileZajetychMiejsc < liczbaMiejsc) {
                //tworzenie studentow i uczestnikow firmowych
                //flaga zeby to sie zrobilo na raz a nie kazdy dzien
                if (rezerwacja.klientFirmowy && !uczestnicyFirmowiStworzeni) {
                    uczestnicyFirmowiStworzeni = true;
                    if (rezerwacja.dataWplaty == "NULL") {
                        for (var k = 0; k<liczbaOsob; k++) {
                            var uczestnik = {};
                            uczestnik.id = uczestnicy.length + 1
                            uczestnik.idKlienta = rezerwacja.idKlienta;
                            uczestnik.imie = "NULL";
                            uczestnik.nazwisko = "NULL";
                            uczestnik.telefon = "NULL";
                            uczestnik.email = "NULL";
                            uczestnik.idRezerwacji = rezerwacja.id;
                            uczestnicy.push(uczestnik);
                            if (k < liczbaStudentow) {
                                var student = {};
                                student.id = studenci.length + 1;
                                student.idUczestnika = uczestnicy.length;
                                student.numerLegitymacji = losowaLiczba(100000, 999999);
                                studenci.push(student);
                            }
                        }
                    } else {
                        for (var k = 0; k<liczbaOsob; k++) {
                            var uczestnik = {};
                            uczestnik.id = uczestnicy.length + 1
                            uczestnik.idKlienta = rezerwacja.idKlienta;
                            var tmp = generujImieINazwisko();
                            uczestnik.imie = tmp.imie;
                            uczestnik.nazwisko = tmp.nazwisko;
                            uczestnik.telefon = losowaLiczba(100000000, 999999999);
                            uczestnik.email = tmp.imie + "." + tmp.nazwisko + losowyElTab(dane.domeny);
                            uczestnik.idRezerwacji = rezerwacja.id;
                            uczestnicy.push(uczestnik);
                            if (k < liczbaStudentow) {
                                var student = {};
                                student.id = studenci.length + 1;
                                student.idUczestnika = uczestnicy.length;
                                student.numerLegitymacji = losowaLiczba(100000, 999999);
                                studenci.push(student);
                            }
                        }
                    }
                }
                rezerwacjeKonferencji.push(rezerwacjaKonferencji);
            }
        }
    });
};
function generujRezerwacjeWarsztatow() {
    var id = 0;
    rezerwacjeKonferencji.forEach(element => {
        var warsztatyDanegoDnia = [];
        instancjeWarsztatow.forEach(instancjaWarsztatu => {
            if (instancjaWarsztatu.idDniaKonferencji == element.idDniaKonferencji)
                warsztatyDanegoDnia.push(instancjaWarsztatu);
        });

        //klient indywidualny
        if (!element.klientFirmowy) {
            var wIluWarsztatachChceWziacUdzial = losowaLiczba(0,warsztatyDanegoDnia.length);
            for (var i=0; i<wIluWarsztatachChceWziacUdzial; i++) {
                var rezerwacjaWarsztatu = {};
                id++;
                rezerwacjaWarsztatu.id = id;
                rezerwacjaWarsztatu.idRezerwacji = element.idRezerwacji;
                rezerwacjaWarsztatu.idRezerwacjiKonferencji = element.id;
                rezerwacjaWarsztatu.idInstancjiWarsztatu = warsztatyDanegoDnia[i].id;
                rezerwacjaWarsztatu.liczbaMiejsc = 1;

                rezerwacjaWarsztatu.idUczestnika = element.idUczestnika; // dla firmy -1 mozna dac
                rezerwacjaWarsztatu.idKlienta = element.idKlienta;
                rezerwacjaWarsztatu.dataWplaty = element.dataWplaty;
                rezerwacjaWarsztatu.klientFirmowy = element.klientFirmowy;
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
            }
        } else {
            //klient firmowy
            for (var i=0; i<warsztatyDanegoDnia.length; i++) {
                var rezerwacjaWarsztatu = {};
                id++;
                rezerwacjaWarsztatu.id = id;
                rezerwacjaWarsztatu.idRezerwacji = element.idRezerwacji;
                rezerwacjaWarsztatu.idRezerwacjiKonferencji = element.id;
                rezerwacjaWarsztatu.idInstancjiWarsztatu = warsztatyDanegoDnia[i].id;
                
                var liczbaMiejsc = losowaLiczba(0, element.liczbaMiejsc / 2)
                
                rezerwacjaWarsztatu.liczbaMiejsc = liczbaMiejsc;
                rezerwacjaWarsztatu.idUczestnika = -1; // dla firmy -1 mozna dac
                rezerwacjaWarsztatu.idKlienta = element.idKlienta;
                rezerwacjaWarsztatu.dataWplaty = element.dataWplaty;
                rezerwacjaWarsztatu.klientFirmowy = element.klientFirmowy;
                rezerwacjaWarsztatu.idDniaKonferencji = warsztatyDanegoDnia[i].idDniaKonferencji;
                rezerwacjaWarsztatu.godzinaRozpoczecia = warsztatyDanegoDnia[i].godzinaRozpoczecia;
                rezerwacjaWarsztatu.godzinaZakonczenia = warsztatyDanegoDnia[i].godzinaZakonczenia;
                
                //sprawdzenie czy są miejsca
                var ileZajetychMiejsc = 0;
                rezerwacjeWarsztatow.forEach(wczesniejszaRezerwacja => {
                    if (warsztatyDanegoDnia[i].id == wczesniejszaRezerwacja.idInstancjiWarsztatu)
                        ileZajetychMiejsc += wczesniejszaRezerwacja.liczbaMiejsc;
                });

                if (ileZajetychMiejsc + liczbaMiejsc <= warsztatyDanegoDnia[i].liczbaMiejsc) 
                    rezerwacjeWarsztatow.push(rezerwacjaWarsztatu);
            }
        }
    });
};
function generujRejestracjeKonferencji() {
    id = 0;
    rezerwacjeKonferencji.forEach(element => {
        if (element.dataWplaty != "NULL") {
            if (!element.klientFirmowy) {
                //klient indywidualny
                var rejestracjaKonferencji = {};
                id++;
                rejestracjaKonferencji.id = id;
                rejestracjaKonferencji.idRezerwacjiKonferencji = element.id;
                rejestracjaKonferencji.idUczestnika = element.idUczestnika;
                rejestracjeKonferencji.push(rejestracjaKonferencji);
            } else {
                //klient firmowy
                uczestnicy.forEach(uczestnik => {
                    if (uczestnik.idRezerwacji == element.idRezerwacji) {
                        var rejestracjaKonferencji = {};
                        id++;
                        rejestracjaKonferencji.id = id;
                        rejestracjaKonferencji.idRezerwacjiKonferencji = element.id;
                        rejestracjaKonferencji.idUczestnika = uczestnik.id;
                        rejestracjeKonferencji.push(rejestracjaKonferencji);
                    }
                });
            }
        }
    });
};
function generujRejestracjeWarsztatow() {
    id = 0;
    rezerwacjeWarsztatow.forEach(element => {
        if (element.dataWplaty != "NULL") {
            if (!element.klientFirmowy) {
                //klient indywidualny
                var rejestracjaWarsztatu = {};
                id++;
                rejestracjaWarsztatu.id = id;
                rejestracjaWarsztatu.idRezerwacjiWarsztatu = element.id;
                rejestracjaWarsztatu.idUczestnika = element.idUczestnika;
                rejestracjeWarsztatow.push(rejestracjaWarsztatu);
            } else {
                //klient firmowy
                var ileZarejestrowanychMiejsc = 0;
                uczestnicy.forEach(uczestnik => {
                    if (ileZarejestrowanychMiejsc < element.liczbaMiejsc) {
                        if (uczestnik.idRezerwacji == element.idRezerwacji) {
                            var rejestracjaWarsztatu = {};
                            id++;
                            rejestracjaWarsztatu.id = id;
                            rejestracjaWarsztatu.idRezerwacjiWarsztatu = element.id;
                            rejestracjaWarsztatu.idUczestnika = uczestnik.id; //+ spr godzin tu i miejsc

                            rejestracjaWarsztatu.idDniaKonferencji = element.idDniaKonferencji;
                            rejestracjaWarsztatu.godzinaRozpoczecia = element.godzinaRozpoczecia;
                            rejestracjaWarsztatu.godzinaZakonczenia = element.godzinaZakonczenia;

                            godzinyNieKoliduja = true;
                            var gRozp = element.godzinaRozpoczecia;
                            var gZak = element.godzinaZakonczenia;
                            rejestracjeWarsztatow.forEach(wczesniejszaRejestracja => {
                                if (wczesniejszaRejestracja.idDniaKonferencji == element.idDniaKonferencji &&
                                    wczesniejszaRejestracja.idUczestnika == element.idUczestnika) {
                                    var gRozpWczesniejZarejestrowanych = wczesniejszaRejestracja.godzinaRozpoczecia;
                                    var gZakWczesniejZarejestrowanych = wczesniejszaRejestracja.godzinaZakonczenia;
                                    if (!(gRozp > gZakWczesniejZarejestrowanych || gZak < gRozpWczesniejZarejestrowanych))
                                        godzinyNieKoliduja = false;
                                }
                            });
                            
                            rejestracjeWarsztatow.push(rejestracjaWarsztatu);
                            ileZarejestrowanychMiejsc++;
                        }
                    }
                });
            }
        }
    });
};
function generujDane() {
    while (!daneOk) { 
        console.log("Generowanie danych...");
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
        daneOk = true;
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
        generujRezerwacje();
        generujRezerwacjeKonferencji();
        generujRezerwacjeWarsztatow();
        generujRejestracjeKonferencji();
        generujRejestracjeWarsztatow();
    }
};

//=====================

function stworzKrotke(nazwaTabeli, wartosci) {
    var krotka = "INSERT INTO " + nazwaTabeli + " VALUES (";
    wartosci.forEach(wartosc => {
        if (czyLiczba(wartosc) || wartosc == 'NULL')
            krotka += wartosc + ", ";
        else
            krotka += "'" + wartosc + "', ";
    });
    krotka = krotka.substr(0, krotka.length-2);
    krotka += ");\n"
    return krotka;
};
function tworzenieKwerendKraje() {
    kraje.forEach(kraj => {
        kwerendy += stworzKrotke("Kraje", [kraj.nazwa, kraj.symbol]);
    });
};
function tworzenieKwerendMiejsca() {
    miejsca.forEach(miejsce => {
        kwerendy += stworzKrotke("Miejsca", [miejsce.idKraju, miejsce.miasto, miejsce.kodPocztowy, miejsce.ulica, miejsce.numerLokalu, miejsce.iloscMiejsc, miejsce.dodatkoweInformacje]);
    });
};
function tworzenieKwerendKonferencje() {
    konferencje.forEach(konferencja => {
        kwerendy += stworzKrotke("Konferencje", [konferencja.nazwa, konferencja.dataRozpoczecia, konferencja.dataZakonczenia, konferencja.liczbaMiejsc, konferencja.cena, konferencja.znizkaStudencka, konferencja.czyAnulowane]);
    });
};
function tworzenieKwerendZnizki() {
    znizki.forEach(znizka => {
        kwerendy += stworzKrotke("Znizki", [znizka.idKonferencji, znizka.znizka, znizka.doKiedy]);
    });
};
function tworzenieKwerendDniKonferencji() {
    dniKonferencji.forEach(dzien => {
        kwerendy += stworzKrotke("Dni_konferencji", [dzien.idKonferencji, dzien.miejsce, dzien.data, dzien.godzinaRozpoczecia, dzien.godzinaZakonczenia]);
    });
};
function tworzenieKwerendWarsztaty() {
    warsztaty.forEach(warsztat => {
        kwerendy += stworzKrotke("Warsztaty", [warsztat.nazwa, warsztat.sugerowanaCena, warsztat.opis]);
    });
};
function tworzenieKwerendInstancjeWarsztatow() {
    instancjeWarsztatow.forEach(instancja => {
        kwerendy += stworzKrotke("Instancje_warsztatow", [instancja.idWarsztatu, instancja.idDniaKonferencji, instancja.miejsce, instancja.cena, instancja.liczbaMiejsc, instancja.godzinaRozpoczecia, instancja.godzinaZakonczenia, instancja.czyAnulowane]);
    });
};
function tworzenieKwerendKlienci() {
    klienci.forEach(klient => {
        kwerendy += stworzKrotke("Klienci", [klient.login, klient.haslo, klient.email]);
    });
};
function tworzenieKwerendFirmy() {
    firmy.forEach(firma => {
        kwerendy += stworzKrotke("Firmy", [firma.idKraju, firma.nazwa, firma.nip]);
    });
};
function tworzenieKwerendKlienciFirmowi() {
    klienciFirmowi.forEach(klient => {
        kwerendy += stworzKrotke("Klienci_Firmowi", [klient.idKlienta, klient.idFirmy, klient.imiePrzedstawiciela, klient.nazwiskoPrzedstawiciela, klient.telefon]);
    });
};
function tworzenieKwerendUczestnicy() {
    uczestnicy.forEach(uczestnik => {
        kwerendy += stworzKrotke("Uczestnicy", [uczestnik.idKlienta, uczestnik.imie, uczestnik.nazwisko, uczestnik.telefon, uczestnik.email]);
    });
};
function tworzenieKwerendStudenci() {
    studenci.forEach(student => {
        kwerendy += stworzKrotke("Studenci", [student.idUczestnika, student.numerLegitymacji]);
    });
};
function tworzenieKwerendRezerwacje() {
    rezerwacje.forEach(rezerwacja => {
        kwerendy += stworzKrotke("Rezerwacje", [rezerwacja.idKlienta, rezerwacja.dataRezerwacji, rezerwacja.dataWplaty]);
    });
};
function tworzenieKwerendRezerwacjeKonferencji() {
    rezerwacjeKonferencji.forEach(rezerwacja => {
        kwerendy += stworzKrotke("Rezerwacje_konferencji", [rezerwacja.idRezerwacji, rezerwacja.idDniaKonferencji, rezerwacja.liczbaMiejsc, rezerwacja.liczbaStudentow]);
    });
};
function tworzenieKwerendRezerwacjeWarsztatow() {
    rezerwacjeWarsztatow.forEach(rezerwacja => {
        kwerendy += stworzKrotke("Rezerwacje_warsztatow", [rezerwacja.idRezerwacjiKonferencji, rezerwacja.idInstancjiWarsztatu, rezerwacja.liczbaMiejsc]);
    });
};
function tworzenieKwerendRejestracjeKonferencji() {
    rejestracjeKonferencji.forEach(rejestracja => {
        kwerendy += stworzKrotke("Rejestracje_konferencji", [rejestracja.idRezerwacjiKonferencji, rejestracja.idUczestnika]);
    });
};
function tworzenieKwerendRejestracjeWarsztatow() {
    rejestracjeWarsztatow.forEach(rejestracja => {
        kwerendy += stworzKrotke("Rejestracje_warsztatow", [rejestracja.idRezerwacjiWarsztatu, rejestracja.idUczestnika]);
    });
};
function generujKwerendy() {
    tworzenieKwerendKraje();
    tworzenieKwerendMiejsca();
    tworzenieKwerendKonferencje();
    tworzenieKwerendZnizki();
    tworzenieKwerendDniKonferencji();
    tworzenieKwerendWarsztaty();
    tworzenieKwerendInstancjeWarsztatow();
    tworzenieKwerendKlienci();
    tworzenieKwerendFirmy();
    tworzenieKwerendKlienciFirmowi();
    tworzenieKwerendUczestnicy();
    tworzenieKwerendStudenci();
    tworzenieKwerendRezerwacje();
    tworzenieKwerendRezerwacjeKonferencji();
    tworzenieKwerendRezerwacjeWarsztatow();
    tworzenieKwerendRejestracjeKonferencji();
    tworzenieKwerendRejestracjeWarsztatow();
};

//=====================

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
kwerendy = "";
var daneOk = false;
generujDane();
generujKwerendy();

fs.writeFile("dane-z-generatora.txt", kwerendy, function (err) {
    if (err) throw err;
    console.log('Zapisano dane do pliku.');
});