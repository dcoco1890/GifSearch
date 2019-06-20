var gifs = ["Mad Men", "The West Wing", "Black Mirror", "Parks and Rec"];
var count = 0;

function generate (){

    var user = $('#u-sel').val().trim();

    // add users text from text input on page to gifs array ONLY if it's not blank 
    // or the  thing they just entered. Technically the same value can be added twice,
    // but this should stop the same thing from being entered again and again.

    if(user !== "" && user !== gifs[count-1]){gifs.push(user)};  

    // empties the buttons div and creates new buttons

    count = 0;
    $('#gif-button').empty();
    for(var i = 0; i < gifs.length; i++){
        var x = $('<button id="g-but">').text(gifs[i]);

        $('#gif-button').prepend(x);
        count++;
    }
}

function gifPlacer() {
    var picked = $(this).text().toLowerCase().replace(/ /g, "+").trim();
    console.log('picked :', picked);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + picked + "&api_key=isoPkQRkKFIvW3X6QPNd6mjDb1PQDDxc";
    //ajax
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response);
    });
}

$(document).on("click", "#gen", generate);
$(document).on("click", "#g-but", gifPlacer);

generate();