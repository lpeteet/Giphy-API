//   Giphy-API JavaScript

/* Instructions from Homework.md
   * Be sure to read about these GIPHY parameters (hint, hint): 
     * `q`
     * `limit`
     * `rating`
*/

/* Instructions from Video:
    Buttons at top with Select Term
    array of Animals - Initial Values:
        ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret" , "turtle", "sugar glider", "chinchilla",
         "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander" , "frog"];
    10 Images from Search displayed in Still State initially
    Click on Image, Animates
    Click again, Still
    Right Side: Add an Animal Label with Form Input and Submit Button
    Adds New Search Term to Array and Adds Button to Form
*/

$(document).ready(function() {

    //******** EVENTS  ********/
    
    // This function handles events where one button is clicked
    $("#add-animal").on("click", function(event) {
        
        //PREVENT REFRESH OF PAGE ON CLICK (Default Behavior)
        event.preventDefault();

        console.log("Button Clicked")
        //Add New Button
        var input = $('#animal-input').val().trim();
        animals.push(input);
        //console.log("animals", animals);
        $('#animal-input').val('');
    });

    //******** FUNCTIONS  ********/
    // Function for displaying Animal Buttons
    function renderButtons() {
        //Necessary to remove current buttons as we will re-add them
        console.log("RenderButtons(), animals", animals);

            //Scroll back to top in case scrolled on small device
            window.scrollTo(0, 0);
            $("#buttons-view").empty();

        for(i=0; i <animals.length; i++) {
            var b = $('<button>');
            b.addClass('animals btn btn-primary');
            //b.attr('type', 'button')
            b.attr('value', animals[i]);            
            //<button type="button" class="btn btn-primary">Primary</button>
            b.data('name', animals[i]);
            if (animals[i] == newBtn) {
                //$(".target").effect( "highlight", {color:"#669966"}, 3000 );
                //b.attr.effect( "highlight", {color:"#669966"}, 3000 );
                //fast = 200; slow = 600
                for (j=0; j < 4; j++) {
                    b.fadeToggle(1000, "linear" );
                    console.log("fadeToggle");
                }
                newBtn = "";
            }
            b.text(animals[i]), $('#buttons-view').append(b);
        }
    } //function renderButtons()

    // Empties #animals-view and calls GetAnimalInfo for first "animalsToShow" Animal Names from Animal Array
    function renderAnimals() {
        //Necessary to remove current buttons as we will re-add them
        $("#animals-view").empty();

        //Loop through Animals Array showing "animalsToShow" number of Animals
        for(i=0; i < (animalsToShow); i++) {
            GetAnimalInfo(animals[i]);
        }
    }

    /*  GetAnimalInfo - Make an AJAX Call to Giphy API
        Parameters:
            animalName: Search Parameter passed to the Giphy API Call.
        ECMAScript 2015 (aka "ES6")         
        function myFunc(requiredArg, optionalArg = 'defaultValue') {
            // do stuff
        }
    */
    function GetAnimalInfo(animalName, optIterations = 1) {

        var myKey = "434a1e78901643d897f62c06636823da" //Was "dc6zaTOxFJmzC"
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalName + "&limit=" + animalsToShow + "&api_key=" + myKey;
        console.log("animalName", animalName);
        console.log("optIterations", optIterations);
        console.log("queryURL", queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log("AJAX.done method, response.data", response.data);
            /*  console.log("AJAX.done method, response", response);
                console.log("AJAX.done method, response.data", response.data);
            */    

            for (i=0; i < optIterations; i++) {
                console.log("Iteration: " + i);
                // Creating a div to hold the Animal Rating and Gif
                var animalDiv = $("<div class='animal item'>");
                var dataObject = response.data[i];
                console.log("dataObject", dataObject);
                
                // Storing the rating data
                var rating = dataObject.rating;
                // Creating an element to have the rating displayed
                //var pOne = $("<p>").text("Rating: " + rating);
                // Displaying the rating
                //animalDiv.append(pOne);
        
                // Retrieving the URL for the image
                var imgURLStill = dataObject.images["fixed_height_still"].url;
                //console.log("imgURLStill", imgURLStill);
        
                var imgURLAnimated = dataObject.images["fixed_height"].url;
                //console.log("imgURLAnimated", imgURLAnimated);

                //Try Creating img with an <span> as a Child!
                // Creating an element to hold the image
                var newDiv = $("<div>");
                newDiv.addClass("item");
                animalDiv.append(newDiv);

                var newSpan = $("<span>");
                newSpan.addClass("caption");
                newSpan.text("Rating: " + rating);
                //newDiv.append(newSpan);
                newDiv.prepend(newSpan);

                var img = $('<img>');
                //img.addClass('images gif btn btn-primary img-responsive inline-block item');

                //TRY Whittling Down Classes here so ITEM Shows!!
                //img.addClass('images gif btn item');
                img.addClass('images item');
                img.attr("src", imgURLStill);
                img.data('name', animals[i]);
                img.data("state", "still");
                img.data("still", imgURLStill);
                img.data("animate", imgURLAnimated);
                // Appending the image
                //newDiv.append(img);
                newDiv.append(img);
                //OR 
                //newSpan.append(img);

                
                /*
<div class="item">
    <img src=""/>
    <span class="caption">Text below the image</span>
</div>                
                Try Creating <ul> with an <li> as a Child!
                 var li = $('<li/>')
                .addClass('ui-menu-item')
                .attr('role', 'menuitem')
                .appendTo(cList);
                var aaa = $('<a/>')
                .addClass('ui-all')
                .text(countries[i])
                .appendTo(li);
 */                        
       
                // Putting the entire animal below the previous animals
                $("#animals-view").append(animalDiv);
            } //For Loop
        }); //.done Function
        
} //GetAnimalInfo()

    function ToggleImageDisplay() {
        var state = $(this).data("state");
        console.log("ToggleImageDisplay, state", state);
        if (state == "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).data("state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", $(this).data("still"));
            $(this).data("state", "still");
        }
        //console.log("data-state", $(this).data("state"));
        /*         console.log("src After: ", $(this).attr("src"));
                console.log("data-state After: ", $(this).data("state"));
        */
    }

    function displayAnimalInfo(event) {
        //console.log("displayAnimalInfo, this.data('name')", $(this).data("name"));
        //Necessary to remove current buttons as we will re-add them
        $("#animals-view").empty();
        var iterations = event.data.iterations;
        console.log("calling GetAnimalInfo with Animal Name: " + $(this).data("name") + "; iterations: ", iterations);
        GetAnimalInfo($(this).data("name"), iterations);
    }

    $("form").submit(function(event) {
        //var animal = $("input:first").val();
        var animal = $("#animal-input").val().trim();
        console.log("Submit, Animal: " + animal);
        //alert("form Submit: " + $("input:first").val());

        //Does this Animal already exist in the array?
        if ( (jQuery.inArray(animal, animals) >= 0 )) {
            alert("Animal Entered Already Exists.  Please Select a Unique Animal Name" );
            return;
        }

        // Adding the animal from the textbox to our array
        animals.push(animal);

        //Set newBtn Variable to this New Button's Name
        newBtn = animal;
        console.log("Setting newBtn = '" + newBtn + "'");

        //Redisplay Buttons with new animal
        console.log("Submit Event, Calling renderButtons");
        renderButtons();

        //READD?
        //Button Click Event
        // Click event listener for all elements with a class of "animals"
        $(".animals").on("click",  {iterations: animalsToShow}, displayAnimalInfo);
    
        $("input:first").val("");
        
        event.preventDefault();
    }); //$("form").submit(function(event)

    //******** MAIN CODE  ********/

    /* Global Variables */

    // Initial array of Animals
    var animals = [
        "dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret" , "turtle", "sugar glider", "chinchilla",
        "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander" , "frog"];

    const animalsToShow = 10;

    //newBtn Variable indicates if the Button is New and if it is then it will be Highlighted for a span of time
    var newBtn = "";

    //$("#animal-input").width(300);
    
    // Calling the renderButtons function to display the initial list of animals
    console.log("Main Event, Calling renderButtons");
    renderButtons();

    renderAnimals();

    //Button Click Event
    // Click event listener for all elements with a class of "animals"
    $(".animals").on("click",  {iterations: animalsToShow}, displayAnimalInfo);

    //Image Click Event
    // Adding a click event listener to all elements with a class of "images"
    $(document).on("click", ".images", ToggleImageDisplay);
    
}) //$(document).ready(function() {
