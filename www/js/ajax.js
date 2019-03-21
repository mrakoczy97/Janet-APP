$(document).ready(function () {

    //REJESTRACJA

    $('#register').click(function () {

        //pobranie zmiennych
        var name = $('#name').val();
        var surname = $('#surname').val();
        var numer = $('#number').val();
        var klasa = $('#sell').val();
        var pass = $('#password').val();
        var pass_conf = $('#confirm').val();


        //WALIDACJA REJESTRACJI
        if (name == "") {
            alert('Nie podałeś imienia');
        }
        else if (surname == "") {
            alert('Nie podałeś nazwiska');
        }
        else if (numer === null || numer.length != 9) {
            alert('Nie podałeś numeru lub użyłes niewłaściwego formatu numeru');
        }
        else if (pass == "" || pass.length < 5 || pass.length > 20) {
            alert("Nie podałeś hasła lub hasło ma niewłaściwy format. Pamiętaj, hasło powinno mieć od 5 do 20 znaków");
        }
        else if (pass != pass_conf) {
            alert("podane hasła nie zgadzają się");
        }
        else {
            $.ajax({
                type: "POST",
                // link do rejestracji,
                url: "http://127.0.0.1/janeta/www/php/register.php",
                data: { name: name, surname: surname, numer: numer, klasa: klasa, pass: pass },
                crossDomain: true,

                success: function (data) {
                    if (data == "already") {
                        alert("Istnieje juz konto z takim numerem telefonu");
                    }
                    else {
                        alert("Rejestracja zakończona!");
                        window.location.href = "login.html";
                    }
                },
                error: function (error) {
                    alert("Niestety rejestracja nie powiodła się, możliwe że już istnieje konto o takich danych");
                    console.log(error);
                }
            });
        }
    });
    //LOGOWANIE I SESJA

    $("#login").click(function () {
        var number = $("#number").val();
        var pass = $("#password").val();
        if ($.trim(number).length > 0 & $.trim(pass).length > 0) {
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1/janeta/www/php/login.php",
                data: { 'number': number, 'pass': pass },
                crossDomain: true,
                cache: false,
                beforeSend: function () { $("#login").html('Connecting...'); },

                success: function (data) {

                    if (data["status"] == "success") {
                        sessionStorage.login = "true";
                        sessionStorage.number = data["Phone"];
                        sessionStorage.id = data["ID"];
                        sessionStorage.name = data["Name"];
                        sessionStorage.surname = data["Surname"];
                        sessionStorage.admin = data["Admin"];
                        sessionStorage.klasa = data["Class"];
                        sessionStorage.ban = data["Banned"];

                        //GENEROWANIE ORDER_ID
                        var date = new Date();
                        var day = date.getDate();
                        var month = date.getMonth() + 1;
                        var year = date.getFullYear();
                        day = day.toString();
                        month = month.toString();
                        year = year.toString();

                        if (day < 10) {
                            day = '0' + day
                        }

                        if (month < 10) {
                            month = '0' + month
                        }
                        year = year.substring(2, 4);
                        var Order_ID;
                        Order_ID = sessionStorage.id + day + month + year;
                        Order_ID = parseFloat(Order_ID);
                        console.log(Order_ID);

                        sessionStorage.order = Order_ID;
                       
                        window.location.href = "welcome.html";
                    }
                    else if (data["status"] == "failed") {
                        alert("Błędne Dane");

                        $("#login").html('Login again');
                    }
                },
                error: function () {
                    alert("Brak łączności z serwerem... sprawdź połączenie z internetem");
                }
            });
        } return false;
    });

    //LOGAŁT
    $("#logout").click(function () {
        sessionStorage.clear();
        sessionStorage.login = "false";
        window.location.href = "login.html";
    });

    //ZAMAWIANIE	
    $('#zamawiam').click(function () {

        //SPRAWDZENIE CZASU
        var dD = new Date();
        dD.setHours(22);//USTWAW GODZINE
        dD.setMinutes(35);// USTAW MINUTE

        var dO = new Date();
        dO.setHours(7);//USTWAW GODZINE
        dO.setMinutes(0);// USTAW MINUTE

        var d2 = new Date();

        d2.getMinutes();// AKTUALNY CZAS
        d2.getHours();
        if (dD > d2 && dO < d2)//SPRAWDZENIE
        {
            var dlugosc = document.getElementsByClassName('test-full').length; //zliczenie ilości wszyskitch produktów
            var tablica = []; //zmienna na przechwanie informacji o produktach 
            var allsuma = 0; //łączna suma wszystkich zamawianych produktów
            var key = 0; //index tablicy

            for (var i = 0; i < dlugosc; i++) {

                var node = document.getElementsByClassName("Amount-return")[i].innerHTML; //pobrabie ilości zamawianych produktów
                var cena = document.getElementsByClassName("Cena-produktu")[i].innerHTML; //pobieranie ceny zamawianych produktów
                if (node != 0) { // warunek jezeli wybrany został jakiś produkt
                    cena = cena.substring(5); //pobiranie jego ceny
                    b = parseFloat(node); //zrzutowanie stringa na float
                    b2 = parseFloat(cena); //to samo
                    var id_zamowienia = document.getElementsByClassName("Amount-return")[i].id; //id produktu
                    b3 = parseFloat(id_zamowienia);
                    suma = (b2 * b); //łączna kwotwa to zapłaty za daną ilość poszczególnego produktu
                    tablica[key] = [b3, b, suma];//tablica ma ID ILOSC CENE

                    key++;

                    allsuma += suma; //suma wszystkiego
                }
            }

            var jsonString = JSON.stringify(tablica);

            console.log(typeof jsonString);
            console.log(tablica);

            var check = confirm("Wybrane produkty kosztują: " + allsuma + "zł\nDodać do koszyka?");

            if (allsuma == 0) {
                alert("Nie wybrałeś żadnego produktu, więc niestety twoje zamówienie nie może być zrealizowane :/");
            }
            else {
                if (check == true) {

                    $.ajax({
                        type: "POST",
                        url: "http://127.0.0.1/janeta/www/php/NEW_order.php",
                        data: { 'name': sessionStorage.name, 'user_id': sessionStorage.id, 'suma': allsuma, 'order_id': sessionStorage.order, 'tablica': tablica },
                        dataType: "json",
                        cache: false,
                        crossDomain: true,

                        success: function (data) {
                            console.log(data);
                            if (data == "success") {
                                alert("Dodano zamówienie!");
                            }
                            else if (data == "failed") {
                                alert("Wygląda na to że masz już coś zamówione :)");
                            }
                        },
                        error: function (xhr, status, error) {
                            alert("Coś musiało pójść nie tak... sprawdź połączenie z internetem i spróbuj ponownie! :)");
                        }
                    });
                }
                else {
                    alert("Nie ma sprawy, zawsze możesz zamówić coś potem! :)");
                }
            }
        }
        else
            alert('Minął czas składania zamówień.Spróbuj jutro!');
    });

    //POKAZYWANIE ZAMÓWIENIA

    $('#show').click(function () {

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1/janeta/www/php/produkty.php",
            beforeSend: function () { $("#loader").show(); },
            data: { 'order_id': sessionStorage.order },
            crossDomain: true,

            success: function (data) {
                if (data == "already") {
                    $("#nic").hide();
                    $("#loader").hide();
                }
                else {
                    $("#nic").show();
                    $("#twojeid").html('Numer Twojego zamówienia to: <strong>' + sessionStorage.order + '</strong><br>Pokaż ten numer przy odbieraniu zamówienia!');
                    $("#danger").hide();
                    $("#show").hide();
                    $("#loader").hide();
                    //
                    $.ajax({
                        type: "POST",
                        url: "http://127.0.0.1/janeta/www/php/makeconfirmed.php",
                        data: { 'order_id': sessionStorage.order },
                        crossDomain: true,

                        success: function (data) {
                        },
                    });
                    $.ajax({
                        type: "POST",
                        url: "http://127.0.0.1/janeta/www/php/makeactive.php",
                        data: { 'order_id': sessionStorage.order },
                        crossDomain: true,
                        success: function (data) {
                        },
                    });
                }
            },
            error: function () {
                $("#loader").hide();
                $("#error").show();
            }
        });
    });

    //POKAZYWANIE ZAMÓWIENIA ADMIN PAGE

    // ZROB NIEAKTYWNE
    $('#paid').click(function () {
        var order_id = $('#order_id').val();

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1/janeta/www/php/makeinactive.php",
            data: { 'order_id': order_id },
            crossDomain: true,
            success: function (data) {
                $("#pokaz").hide();
                alert("Twoje zamówienie zostało opłacone");
            },
        });
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1/janeta/www/php/makepaid.php",
            data: { 'order_id': order_id },
            crossDomain: true,
            success: function (data) {
            },
        });
        location.reload();
    });
});


