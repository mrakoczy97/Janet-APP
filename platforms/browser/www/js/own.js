/*
Mario & Mleko w wodzie Company 2016
*/

 
function Amount(a)
{
  
var co=a.getAttribute('id');

var node = document.getElementsByClassName("Amount-return")[co];
b=node.textContent;
b=parseInt(b);


var znak=a.getAttribute('value');
        
	
	
	if(znak=='-')
	{
		if(b>0)
		{
		b-=1;	
		
		}
		else
		{
		b=0;	
		}
		
	document.getElementsByClassName("Amount-return")[co].innerHTML=b;
	}
	else if(znak=='+')
	{
		
	b+=1;
	document.getElementsByClassName("Amount-return")[co].innerHTML=b;
        
	}
	else
	{
	document.getElementsByClassName("Amount-return")[co].innerHTML='Nie bangla';
	}
	
}


function zmien()
{
 
 $.ajax({
            type:"POST", 
            url:"http://smietana.mechanikrac.website.pl/cgi-bin/janeta/make_zamow.php", 
			
			crossDomain: true,
                 
               
                success:function(data) {

				
							$("#wszystko").html(data);
						 
						 var dlugosc = document.getElementsByClassName('test-full').length;
  
     var j=0;
    for(var i=0;i<dlugosc;i++)
    {
     
     var tmp = document.getElementsByClassName('guzik')[j];
		tmp.setAttribute("id",(i));
		j++;
		tmp = document.getElementsByClassName('guzik')[j];
		tmp.setAttribute("id",(i));
		j++;
		
		
		
     
        
        
    }
				

             
                },
 

                error: function() 
				{
			
                $("#error").show();
                }

        });
 
 
 
  
	
    
 

    
}   
window.onload=zmien;