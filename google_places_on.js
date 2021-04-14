object_4 = document.getElementById("goingnext-4")

object_4.type = "submit"

object_4.addEventListener("click", ErrorMessage);

function ErrorMessage() {
  if (!document.getElementById("autocomplete_4").value.match(/^\d/)) {
    document.getElementById("card-body-2").style.display = 'block';
    setTimeout(function(){
      document.getElementById("card-body-2").style.display = 'none';
    }, 5000);
  }
  if (!document.getElementById("autocomplete_2").value.match(/^\d/)) {
    document.getElementById("card-body-2").style.display = 'block';
    setTimeout(function(){
      document.getElementById("card-body-2").style.display = 'none';
    }, 5000);
  }
}

var counter = 0;

// These are the options to be used on each statistic
var options = {
  useEasing: true,
  useGrouping: true,
  separator: "",
  decimal: "."
};

// This sample uses the Autocomplete widget to help the user select a
// place, then it retrieves the address components associated with that
// place, and then it populates the form fields with those details.

var placeSearch, autocomplete;

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

function initAutocomplete_4() {
  // Create the autocomplete object, restricting the search predictions to
  // adresses and France.
  // Address must start with a number to start Autocomplete

  var input = document.getElementById('autocomplete_4');

  var options = {
    types: ['address'],
    componentRestrictions: {country: 'fr'},
  };

  autocomplete = new google.maps.places.Autocomplete(input, options);

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(['address_component']);

  // When the user selects an address from the drop-down, save the
  // address fields in local storage.
  autocomplete.addListener('place_changed', fillInAddress_4);
}

function patternMatching_4() {
  // Show and Hide the Google Autocomplete based on input values
  // Addresses must to start with a number
  var x = document.getElementById("autocomplete_4").value;
  if (!$("#autocomplete_4").val()) {
    initAutocomplete_4();
  } else if (!x.match(/^\d/)) {
    $(".pac-container").remove();
  }
}

function fillInAddress_4() {
  // Get the place details from the autocomplete object.
  if (document.getElementById("autocomplete_4").value.match(/^\d/)) {
    var place_4 = autocomplete.getPlace();
    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the cookie.
    for (var i = 0; i < place_4.address_components.length; i++) {
      var addressType = place_4.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = encodeURIComponent(place_4.address_components[i][componentForm[addressType]]);
        // Store the home address in a cookie
        var homecookie = addressType + "=" + val;
        var path = "path=/"
        document.cookie = homecookie + ';' + path;
      }
    }
    window.location.assign("https://zefir.fr/offre/demande");
  } else {
    ErrorMessage();
  }
}

var pac_input_4 = document.getElementById('autocomplete_4');

(function pacSelectFirst(input){
  // store the original event binding function
  var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;

  function addEventListenerWrapper(type, listener) {
    // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
    // and then trigger the original listener.

    if (type == "keydown") {
      var orig_listener = listener;
      listener = function (event) {
        var suggestion_selected = $(".pac-item-selected").length > 0;
        document.getElementById('goingnext-4').onclick = function() {
          if (!suggestion_selected && document.getElementById("autocomplete_4").value.match(/^\d/)) {
            var simulated_downarrow = $.Event("keydown", {keyCode:40, which:40});
            var event = $.Event("enter", {keyCode:13, which:13})
            orig_listener.apply(input, [simulated_downarrow]);
            orig_listener.apply(input, [event]);
          }
        }
        if (event.which == 13 && !suggestion_selected && document.getElementById("autocomplete_4").value.match(/^\d/)) {
          var simulated_downarrow = $.Event("keydown", {keyCode:40, which:40})
          orig_listener.apply(input, [simulated_downarrow]);
        }
        orig_listener.apply(input, [event]);
      };
    }
    // add the modified listener
    _addEventListener.apply(input, [type, listener]);
  }

  if (input.addEventListener)
    input.addEventListener = addEventListenerWrapper;
  else if (input.attachEvent)
    input.attachEvent = addEventListenerWrapper;

})(pac_input_4);

$(function(){
  var autocompleteOptions = { types: ['address'], componentRestrictions: { country: 'fr'}};
  var autocomplete = new google.maps.places.Autocomplete(pac_input_4, autocompleteOptions);
});

$(document).ready(function(){
  $(window).scroll(function(){
  	var isFocused =  $("#autocomplete_4").is(":focus") 
  	if (isFocused == true){
    //Set new top to autocomplete dropdown
    newTop = $('#autocomplete_4').offset().top + $('#autocomplete_4').outerHeight();
    $('.pac-container').css('top', newTop + 'px');
    }
  })
  $('#autocomplete_4').blur(function(){
    $('.pac-container').css('top', '0px');
  })
});