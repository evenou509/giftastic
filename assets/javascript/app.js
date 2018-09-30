

$(function () {
    buttonsAdded(artisArray, 'searchButton', '#buttonsSpace');
    console.log("load");
})

var artisArray = ["Drake", "Lil wayne", "Jay-Z"];

// function to add the button on the page(populate button)
function buttonsAdded(artisArray, classToAdd, spaceToAddTo) {
    $(spaceToAddTo).empty();

    for (var i = 0; i < artisArray.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr('data-type', artisArray[i]);
        a.text(artisArray[i]);
        $(spaceToAddTo).append(a);
    }
}
// Event listener for all button elements
$(document).on('click', '.searchButton', function () {
    $('#searches').empty();
    var type = $(this).data('type');

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=NMiV39YeAYploB5Wk45oXq4NBghLAsxy&limit=10";

    // Performing our AJAX GET resquest
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);
            console.log(response);

            //storing the data from the AJAX request in the results variable
            var results = response.data;
            
            // looping through each result item
            for (var i = 0; i < results.length; i++) {
                var searchDiv = $('<div class="search-item">');
                var rating = results[i].rating;
                // Creating a paragrah tag with the result item's rating
                var p = $('<p>').text('Rating: ' + rating);
                var animated = results[i].images.fixed_height.url;
                var still = results[i].images.fixed_height_still.url;
                // image varaible
                var image = $("<img>");
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                // Appending the paragraph and image to a property pulled off the result item
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
            }
        })

})

// Adding the click event listener for the data-state, data-animate, data-still
$(document).on('click', '.searchImage', function(){
    var state = $(this).attr('data-state');
    if (state == 'still'){
        $(this).attr('src', $(this).attr('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).attr('still'));
        $(this).attr('data-state', 'still');
    }
})
// Adding the click event listenr to all buttons
$('#addSearch').on('click', function(){
    var newSearch =  $('input').val().trim();
    artisArray.push(newSearch);
    buttonsAdded(artisArray, 'searchButton', '#buttonsSpace');
    return false;
})
