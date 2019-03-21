$(document).ready(function(){
    

	//REJESTRACJA
	
	$('#register').click(function() {
	
	//pobranie zmiennych
	var name=$('#name').val();
	var surname=$('#surname').val();
	var numer=$('#number').val();
	var klasa=$('#sell').val();
	var pass=$('#password').val();
	var pass_conf=$('#confirm').val();
	
	
//WALIDACJA REJESTRACJI
	if(name=="")
	{
			alert('Nie podałeś imienia');
	}
	else if(surname=="")
	{
			alert('Nie podałeś nazwiska');
	}
	else if(numer===null || numer.length!=9)
	{
			alert('Nie podałeś numeru lub użyłes niewłaściwego formatu numeru');
	}
	else if(pass=="" || pass.length<5 || pass.length>20)
	{
		alert("Nie podałeś hasła lub hasło ma niewłaściwy format. Pamiętaj, hasło powinno mieć od 5 do 20 znaków");
	}
	else if(pass!=pass_conf)
	{
		alert("podane hasła nie zgadzają się");
	}
	else{
		$.ajax({
            type:"POST", 
            url:"http://smietana.mechanikrac.website.pl/cgi-bin/janeta/register.php", 
            data: {name:name, surname:surname, numer:numer, klasa:klasa, pass:pass}, 
			crossDomain: true,
                 
                success:function(data) {

                   alert("Witaj,"+data);
				   
                    window.location.href = "login.html";
              
             
                },
 

                error: function(error) {
                    alert( "Niestety rejestracja nie powiodła się, możliwe że już istnieje konto o takich danych");
                    console.log(error); 
                }

        });
		
	}
		
		
	});
	//LOGOWANIE I SESJA
	
	$("#login").click(function(){
      var number=$("#number").val();
      var pass=$("#password").val();
       if($.trim(number).length>0 & $.trim(pass).length>0)
       {
			$.ajax({
			type: "POST",
			url: "http://smietana.mechanikrac.website.pl/cgi-bin/janeta/login.php",
			data: { 'number':number, 'pass':pass}, 
			crossDomain: true,
			cache: false,
			beforeSend: function(){ $("#login").html('Connecting...');},
			
			success: function(data){
				
				
				
			if(data["status"]=="success")
			{
				localStorage.login="true";
				localStorage.number=data["Phone"];
				localStorage.id=data["ID"];
				localStorage.name=data["Name"];
				localStorage.surname=data["Surname"];
				localStorage.admin=data["Admin"];
				localStorage.klasa=data["Class"];
				localStorage.ban=data["Banned"];
				
				
				window.location.href = "welcome.html";
				
				
			}
			
			else if(data["status"]=="failed")
				{
				alert("Błędne Dane");
		
				$("#login").html('Login again');
				
				}
				},
		error: function(){
			
			
			alert("Brak łączności z serwerem... sprawdź połączenie z internetem");
			
		}
				
      });
    }return false;
   });
   
   
   //LOGAŁT
			$("#logout").click(function(){
			localStorage.clear();
			localStorage.login="false";
			window.location.href = "login.html";
			});
			
	//ZAMAWIANIE	
			
		$('#zamawiam').click(function(){
			
			//GENEROWANIE ORDER ID
var date = new Date();
var day = date.getDate();
var month = date.getMonth()+1;
var year = date.getFullYear();
day=day.toString();
month=month.toString();
year=year.toString();

if(day<10) {
    day='0'+day
} 

if(month<10) {
    month='0'+month
}    
year=year.substring(2,4);
var Order_ID;
Order_ID=localStorage.id+day+month+year;
Order_ID=parseFloat(Order_ID);
console.log(Order_ID);

localStorage.order=Order_ID;

			
		
		var dlugosc = document.getElementsByClassName('test-full').length; //zliczenie ilości wszyskitch produktów
		var tablica=[]; //zmienna na przechwanie informacji o produktach
		var j=1; //ID produktu w bazie zaczyna się od 1, dlatego w pętli są dwie zmienne odpowiedzialne za przypisywanie ID
		var allsuma=0; //łączna suma wszystkich zamawianych produktów
		var key=0; //index tablicy
		


		 for(var i=0;i<dlugosc;i++)
    {
	
		var node = document.getElementsByClassName("Amount-return")[i].innerHTML; //pobrabie ilości zamawianych produktów
		var cena = document.getElementsByClassName("Cena-produktu")[i].innerHTML; //pobieranie ceny zamawianych produktów
		if (node!=0){ // warunek jezeli wybrany został jakiś produkt
		cena = cena.substring(5); //pobiranie jego ceny
		b=parseFloat(node); //zrzutowanie stringa na float
		b2=parseFloat(cena); //to samo
		suma=(b2*b); //łączna kwotwa to zapłaty za daną ilość poszczególnego produktu
		tablica[key]=[j,b,suma];//tablica ma ID ILOSC CENE
		
		key++;
		
		allsuma+=suma; //suma wszystkiego
		
		}
	j++; //przejście do ID kolejngo produktu
	}
			
		 
var jsonString = JSON.stringify(tablica);	 

console.log(typeof jsonString);
console.log(tablica);
		

			
			
	
		var check=confirm("Za Twoje zamówienie zapłacisz: "+allsuma+"zł\nTo jak, zamawiamy? :)");
		
		
		if(allsuma==0)
		{
			alert("Nie wybrałeś żadnego produktu, więc niestety twoje zamówienie nie może być zrealizowane :/");
		}
		else
	{
		if(check==true)
		{
			
			
			$.ajax({
            type:"POST", 
            url:"http://smietana.mechanikrac.website.pl/cgi-bin/janeta/NEW_order.php", 
            data: {'name':localStorage.name, 'user_id':localStorage.id, 'suma':allsuma,'order_id':Order_ID, 'tablica': tablica}, 
			dataType: "json",
			cache: false,
			crossDomain: true,
                 
               
                success:function(data) {
		
		console.log(data);
					if(data=="success")
					{
						alert("Dodano zamówienie!");
					}
					else if(data=="failed")
					{
						alert("Wygląda na to że masz już coś zamówione :)");
					}
              
             
                },
 

                error: function(xhr, status, error) {
                    alert( "Coś musiało pójść nie tak... sprawdź połączenie z internetem i spróbuj ponownie! :)");
                    
                }

        });
		
		}
		
		else
		{
			alert("Nie ma sprawy, zawsze możesz zamówić coś potem! :)");
		}
			
	}		
		});		
			
		
		//POKAZYWANIE ZAMÓWIENIA
		
		$('#show').click(function(){
			
			
		
			$.ajax({
            type:"POST", 
            url:"http://smietana.mechanikrac.website.pl/cgi-bin/janeta/produkty.php", 
			beforeSend: function(){ $("#loader").show();},
			data: {'order_id':localStorage.order}, 
			crossDomain: true,
                 
               
                success:function(data) {

				
							$("#pokaz").html(data);
							$("#loader").hide();
				

             
                },
 

                error: function() 
				{
				$("#loader").hide();
                $("#error").show();
                }

        });
		
	
		

				
		});
		
		
			
	
});