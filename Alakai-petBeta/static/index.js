(function($) {
    'use strict';

    // PRELOADER
    $(window).on('load', async function() {
        // var item_div = $(".navbar-alakai");

        // var navbar = document.createElement("nav");
        // var etiqueta_a = document.createElement("a");

        // navbar.classList.add("navbar");
        // navbar.classList.add("navbar-light");
        // navbar.classList.add("bg-light");
        // etiqueta_a.classList.add("navbar-brand");
        // navbar.appendChild(etiqueta_a);
         
        var x = document.getElementById("page-loader-inicio");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
        setTimeout(function() { 
        $('#page-loader').fadeOut('slow', function() {
            $(this).remove();
        });
    }, 5000);
    await mySleepFunction(5500);
    x.style.display = "block";
    x.setAttribute("id","box"); 
    
    //item_div.append(navbar);
    //navbar.setAttribute("id","box");

//page-loader-navbar
    
    });
    })(jQuery); // End of use strict

function mySleepFunction(delayTime) {
    return new Promise(resolve => setTimeout(resolve, delayTime));
}

document.getElementById("page1").addEventListener("click", recargar);
document.getElementById("page2").addEventListener("click", recargar2);

function recargar(){

    let url = window.location.href;
    url = "../Templates/mapeoCliente.html"
    window.location.href = url
}
function recargar2(){

    let url = window.location.href;
    url = "../Templates/mapeoVete.html"
    window.location.href = url
}