var gifs = ["Mad Men", "The West Wing", "Black Mirror", "Parks and Rec"];


function generate (){

    $('#gif-but').empty();
    for(var i = 0; i < gifs.length; i++){
        var x = $('<button id="form">').text(gifs[i]);

        $('#gif-but').prepend(x);
    }

}

$('#gif-button').on("click", generate);

// generate();
