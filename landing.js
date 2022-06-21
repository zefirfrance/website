$(function () {
  initAutoComplete($("#autocomplete"), $("#goingnext"));
  initAutoComplete($("#autocomplete_2"), $("#goingnext-2"));
  initAutoComplete($("#autocomplete_3"), $("#goingnext-3"));
  storeCookieForLandingPageABTesting();
});

function storeCookieForLandingPageABTesting() {
  var landingPageFocus = { s: "certainty", v: "speed" }[
    location.pathname.split("/")[1]
  ];
  if (landingPageFocus) {
    document.cookie = "landingPageFocus=" + landingPageFocus + "; path=/";
  }
}

let showError = true;

function displayError() {
  if (showError) {
    showError = false;
    alert("Merci de préciser votre numéro de rue.");
    setTimeout(() => (showError = true), 1000);
  }
}

function useFirstPrediction($input) {
  const value = $input.val();
  if (value === "") {
    return;
  }

  if (!value.match(/^\d/)) {
    displayError();
    return;
  }

  const service = new google.maps.places.AutocompleteService();
  service.getPlacePredictions(
    { input: value, componentRestrictions: { country: "fr" } },
    function (predictions) {
      if (predictions.length > 0) {
        $input.val(predictions[0].description);

        const geocoder = new google.maps.Geocoder();
        geocoder
          .geocode({ placeId: predictions[0].place_id })
          .then((response) => {
            createCookieAndRedirect(response.results[0]);
          });
      }
    }
  );
}

function initAutoComplete($input, $button) {
  // Create the autocomplete object, restricting the search predictions to
  // adresses and France.
  // Address must start with a number to start Autocomplete

  var options = {
    types: ["address"],
    componentRestrictions: { country: "fr" },
  };

  const autocomplete = new google.maps.places.Autocomplete($input[0], options);

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(["address_component"]);

  // When the user selects an address from the drop-down, save the
  // address fields in local storage.
  autocomplete.addListener("place_changed", function () {
    if ($input.val().match(/^\d/)) {
      const place = autocomplete.getPlace();

      if (typeof place.address_components !== "undefined") {
        createCookieAndRedirect(place);
      }
    } else {
      displayError();
    }
  });

  $button.on("click", function () {
    useFirstPrediction($input);
    return false;
  });

  $input.keypress(function (evt) {
    if (evt.which == 13) {
      useFirstPrediction($input);
      return false;
    }
  });
}

var componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "long_name",
  postal_code: "short_name",
};

function createCookieAndRedirect(place) {
  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the cookie.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      if (i == 0 && place.address_components[0].types[0] != "street_number") {
        var addressType_1 = "street_number";
        var val_1 = "1";

        var path = "path=/";
        var homecookie = addressType_1 + "=" + val_1;

        document.cookie = homecookie + ";" + path;

        var addressType_2 = addressType;
        var val_2 = encodeURIComponent(
          place.address_components[i][componentForm[addressType]]
        );

        var path = "path=/";
        var homecookie = addressType_2 + "=" + val_2;

        document.cookie = homecookie + ";" + path;
      } else {
        var val = encodeURIComponent(
          place.address_components[i][componentForm[addressType]]
        );
        var homecookie = addressType + "=" + val;
        var path = "path=/";

        document.cookie = homecookie + ";" + path;
      }
    }
  }

  window.location.pathname = "/offre/demande";
}
