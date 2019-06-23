//FLAGS FOR FUTURE
// Api Calls, regex capital letters, dynamic buttons

var gifs = ["Mad Men", "The West Wing", "Black Mirror", "Parks and Rec"];
var count = 0;
let user = "";
let nUser = [];
let l = 0;
var nW = [];

function generate() {

    user = $('#u-sel').val().trim();
    nUser = user.split(' ');
    l = nUser.length;
    $('#u-sel').val('');

    // send it to the CAPITALIZER
    user = capitalWords(nUser, l);
   
  

    // add users text from text input on page to gifs array ONLY if it's not blank 
    // AND it's not included in the array already
    if (user !== "" && !gifs.includes(user)) { gifs.push(user) };


    // empties the buttons div and creates new buttons
    count = 0;
    $('#gif-button').empty();
    for (var i = 0; i < gifs.length; i++) {
        var x = $('<button id="g-but" class="btn btn-lg btn-outline-dark m-1">').text(gifs[i]);

        $('#gif-button').prepend(x);
        count++;
    }

    
}

function gifPlacer() {

    // I know the bonus said to not to overwrite gifs and just add 10 to the page,
    // but that seems silly. I could write some functionality that would stop after
    // a certain amount of gifs are on the page, but I think emptying it and putting 
    // new ones looks nicer.
    // $('#left').empty();
    // $('#right').empty();

    var picked = $(this).text().toLowerCase().replace(/ /g, "+").trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + picked + "&limit=10&api_key=isoPkQRkKFIvW3X6QPNd6mjDb1PQDDxc";
    
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);
        $('#gifs').addClass("gifs_border");
        for(var i = 0; i < 10; i++){
            var g = $('<div class="d-flex flex-column justify-content-between m-2 p-3 shadow-lg rounded text-center" id="gifs">');
            g.html(`<img src="${response.data[i].images["fixed_width"].url}" still="${response.data[i].images["fixed_width_still"].url}" mov="${response.data[i].images["fixed_width"].url}" state="m" id="click-pic">`);
            var rating = $('<p>');
            rating.text(`Rating: ${response.data[i].rating}`);
            g.append(rating);
            $('#gifs').append(g);
        }
        

    });
}

// I don't want to admit how long this took to figure out, but it took 
// a VERY LONG TIME
function capitalWords(arr, len) {

    // clearing the word holder array
    nW = [];
    for (var i = 0; i < len; i++) {

        // regex matches the any first letter of word. this little function returns the same word but with 
        // the first letter capitalized
        const re = new RegExp(/^(\w)/);
        var x = arr[i].replace(re, function (match) {
            return match.toUpperCase();          
        });
        nW.push(x);

    }
    //new capword is all the new capitalized words that were added to the array joined with a space
    var capWord = nW.join(" ")
    return capWord;
}


function imgSwap (){
    var sit = $(this).attr("state");
    // console.log('sit :', sit);
    if(sit === "m"){
        $(this).attr("src", $(this).attr("still"));
        $(this).attr("state", "s");
    }
    else{
        $(this).attr("src", $(this).attr("mov"));
        $(this).attr("state", "m");
    }



}

$(document).on("click", "#click-pic", imgSwap);
$(document).on("click", "#gen", generate);
$(document).on("click", "#g-but", gifPlacer);

generate();