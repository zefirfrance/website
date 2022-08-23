object_2 = document.getElementById("goingnext-2");
object_5 = document.getElementById("goingnext-5");

object_2.type = "submit";
object_5.type = "submit";

object_2.addEventListener("click", ErrorMessage);
object_5.addEventListener("click", ErrorMessage);

function redirectToSellerForm() {
  window.location.pathname = "/offre/demande/v2";
}

function ErrorMessage() {
  if (!document.getElementById("autocomplete_2").value.match(/^\d/)) {
    document.getElementById("card-body-2").style.display = "block";
    setTimeout(function () {
      document.getElementById("card-body-2").style.display = "none";
    }, 5000);
  }
  if (!document.getElementById("autocomplete_5").value.match(/^\d/)) {
    document.getElementById("card-body-2").style.display = "block";
    setTimeout(function () {
      document.getElementById("card-body-2").style.display = "none";
    }, 5000);
  }
}

var counter = 0;

// These are the options to be used on each statistic
var options = {
  useEasing: true,
  useGrouping: true,
  separator: "",
  decimal: ".",
};

// This sample uses the Autocomplete widget to help the user select a
// place, then it retrieves the address components associated with that
// place, and then it populates the form fields with those details.

var placeSearch, autocomplete;

var componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "long_name",
  postal_code: "short_name",
};

function initAutocomplete_2() {
  // Create the autocomplete object, restricting the search predictions to
  // addresses and France.
  // Address must start with a number to start Autocomplete

  var input = document.getElementById("autocomplete_2");

  var options = {
    types: ["address"],
    componentRestrictions: { country: "fr" },
  };

  autocomplete = new google.maps.places.Autocomplete(input, options);

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(["address_component"]);

  // When the user selects an address from the drop-down, save the
  // address fields in local storage.
  autocomplete.addListener("place_changed", fillInAddress_2);
}

function initAutocomplete_5() {
  // Create the autocomplete object, restricting the search predictions to
  // addresses and France.
  // Address must start with a number to start Autocomplete

  var input = document.getElementById("autocomplete_5");

  var options = {
    types: ["address"],
    componentRestrictions: { country: "fr" },
  };

  autocomplete = new google.maps.places.Autocomplete(input, options);

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(["address_component"]);

  // When the user selects an address from the drop-down, save the
  // address fields in local storage.
  autocomplete.addListener("place_changed", fillInAddress_5);
}

function patternMatching_2() {
  // Show and Hide the Google Autocomplete based on input values
  // Addresses must to start with a number
  var x = document.getElementById("autocomplete_2").value;
  if (!$("#autocomplete_2").val()) {
    initAutocomplete_2();
  } else if (!x.match(/^\d/)) {
    $(".pac-container").remove();
  }
}

function patternMatching_5() {
  // Show and Hide the Google Autocomplete based on input values
  // Addresses must to start with a number
  var x = document.getElementById("autocomplete_5").value;
  if (!$("#autocomplete_5").val()) {
    initAutocomplete_5();
  } else if (!x.match(/^\d/)) {
    $(".pac-container").remove();
  }
}

function fillInAddress_2() {
  // Get the place details from the autocomplete object.
  if (document.getElementById("autocomplete_2").value.match(/^\d/)) {
    var place_2 = autocomplete.getPlace();
    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the cookie.
    for (var i = 0; i < place_2.address_components.length; i++) {
      var addressType = place_2.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = encodeURIComponent(
          place_2.address_components[i][componentForm[addressType]]
        );
        // Store the home address in a cookie
        var homecookie = addressType + "=" + val;
        var path = "path=/";
        document.cookie = homecookie + ";" + path;
      }
    }
    redirectToSellerForm();
  } else {
    ErrorMessage();
  }
}

function fillInAddress_5() {
  // Get the place details from the autocomplete object.
  if (document.getElementById("autocomplete_5").value.match(/^\d/)) {
    var place_5 = autocomplete.getPlace();
    // Get each component of the address from the place details,
    // and then fill-in the corresponding field on the cookie.
    for (var i = 0; i < place_5.address_components.length; i++) {
      var addressType = place_5.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = encodeURIComponent(
          place_5.address_components[i][componentForm[addressType]]
        );
        // Store the home address in a cookie
        var homecookie = addressType + "=" + val;
        var path = "path=/";
        document.cookie = homecookie + ";" + path;
      }
    }
    redirectToSellerForm();
  } else {
    ErrorMessage();
  }
}

var pac_input_2 = document.getElementById("autocomplete_2");
var pac_input_5 = document.getElementById("autocomplete_5");

(function pacSelectFirst(input) {
  // store the original event binding function
  var _addEventListener = input.addEventListener
    ? input.addEventListener
    : input.attachEvent;

  function addEventListenerWrapper(type, listener) {
    // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
    // and then trigger the original listener.

    if (type == "keydown") {
      var orig_listener = listener;
      listener = function (event) {
        var suggestion_selected = $(".pac-item-selected").length > 0;
        document.getElementById("goingnext-2").onclick = function () {
          if (
            !suggestion_selected &&
            document.getElementById("autocomplete_2").value.match(/^\d/)
          ) {
            var simulated_downarrow = $.Event("keydown", {
              keyCode: 40,
              which: 40,
            });
            var event = $.Event("enter", { keyCode: 13, which: 13 });
            orig_listener.apply(input, [simulated_downarrow]);
            orig_listener.apply(input, [event]);
          }
        };
        if (
          event.which == 13 &&
          !suggestion_selected &&
          document.getElementById("autocomplete_2").value.match(/^\d/)
        ) {
          var simulated_downarrow = $.Event("keydown", {
            keyCode: 40,
            which: 40,
          });
          orig_listener.apply(input, [simulated_downarrow]);
        }
        orig_listener.apply(input, [event]);
      };
    }
    // add the modified listener
    _addEventListener.apply(input, [type, listener]);
  }

  if (input.addEventListener) input.addEventListener = addEventListenerWrapper;
  else if (input.attachEvent) input.attachEvent = addEventListenerWrapper;
})(pac_input_2);

$(function () {
  var autocompleteOptions = {
    types: ["address"],
    componentRestrictions: { country: "fr" },
  };
  var autocomplete = new google.maps.places.Autocomplete(
    pac_input_2,
    autocompleteOptions
  );
});

$(document).ready(function () {
  $(window).scroll(function () {
    var isFocused = $("#autocomplete_2").is(":focus");
    if (isFocused == true) {
      //Set new top to autocomplete dropdown
      newTop =
        $("#autocomplete_2").offset().top + $("#autocomplete_2").outerHeight();
      $(".pac-container").css("top", newTop + "px");
    }
  });
  $("#autocomplete_2").blur(function () {
    $(".pac-container").css("top", "0px");
  });
});
