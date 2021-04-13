var HomeAddress = HomeAddress || [];
var componentForm = [
"street_number",
"route",
"postal_code",
"locality",
"administrative_area_level_1",
"country"
];

// A custom function to get cookies
// Split cookie string and get all individual name=value pairs in an array
var cookieArr = document.cookie.split(';');
// Loop through the array elements
for (var i = 0; i < cookieArr.length; i++) {
var cookiePair = cookieArr[i].split('=');
var cookieidentifier = cookiePair[0].trim();
if (cookieidentifier == componentForm[0]) {
  HomeAddress.push(decodeURIComponent(cookiePair[1]));
  break;
}
}
for (var i = 0; i < cookieArr.length; i++) {
var cookiePair = cookieArr[i].split('=');
var cookieidentifier = cookiePair[0].trim();
if (cookieidentifier == componentForm[1]) {
  HomeAddress.push(decodeURIComponent(cookiePair[1]));
  break;
}
}
for (var i = 0; i < cookieArr.length; i++) {
var cookiePair = cookieArr[i].split('=');
var cookieidentifier = cookiePair[0].trim();
if (cookieidentifier == componentForm[2]) {
  HomeAddress.push(decodeURIComponent(cookiePair[1]));
  break;
}
}
for (var i = 0; i < cookieArr.length; i++) {
var cookiePair = cookieArr[i].split('=');
var cookieidentifier = cookiePair[0].trim();
if (cookieidentifier == componentForm[3]) {
  HomeAddress.push(decodeURIComponent(cookiePair[1]));
  break;
}
}
for (var i = 0; i < cookieArr.length; i++) {
var cookiePair = cookieArr[i].split('=');
var cookieidentifier = cookiePair[0].trim();
if (cookieidentifier == componentForm[4]) {
  HomeAddress.push(decodeURIComponent(cookiePair[1]));
  break;
}
}
for (var i = 0; i < cookieArr.length; i++) {
var cookiePair = cookieArr[i].split('=');
var cookieidentifier = cookiePair[0].trim();
if (cookieidentifier == componentForm[5]) {
  HomeAddress.push(decodeURIComponent(cookiePair[1]));
  break;
}
}

document.getElementById("Home Address 1_2").innerHTML = (HomeAddress[0] + ' ' + HomeAddress[1] + ', ' + HomeAddress[2] + ' ' + HomeAddress[3]);

object_2 = document.getElementById("goingnext-2")

object_2.type = "submit"

$("#goingnext_2").addClass("html-embed-2 homepage button-3-offer button-block-3 bg-primary-3-offer w-button")

object_2.addEventListener("click", ErrorMessage);

function ErrorMessage() {
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

$(window).scroll(function() {
var hT = $('#scroll-to').offset().top,
    hH = $('#scroll-to').outerHeight(),
    wH = $(window).height(),
    wS = $(this).scrollTop();
if (wS > (hT+hH-wH) && (hT > wS) && (wS+wH > hT+hH)){
  counter += 1;
  if (counter == 1) {
    // For each Statistic we find, animate it
    $(".statistic").each(function(index) {
      // Find the value we want to animate (what lives inside the p tags)
      var value = $($(".statistic")[index]).html();
      // Start animating
      var statisticAnimation = new CountUp($(".statistic")[index], 0, value, 0, 5, options);
      statisticAnimation.start();
    });
  }
}
});

var getUrlParameter = function getUrlParameter(sParam) {
var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

for (i = 0; i < sURLVariables.length; i++) {
  sParameterName = sURLVariables[i].split('=');

  if (sParameterName[0] === sParam) {
    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
  }
}
};

ref = getUrlParameter('ref'); 

if (ref) {
createCookie('ref_code', ref, 7)
};

// Store the reference code in a cookie
function createCookie(name, value, days) {
if (days) {
  var date = new Date();
  date.setTime(date.getTime() + (days*24*60*60*1000));
  var expires = "; expires=" + date.toGMTString();
}
else var expires = "";
document.cookie = name + "=" + value + expires + "; path=/";
}

// This sample uses the Autocomplete widget to help the user select a
// place, then it retrieves the address components associated with that
// place, and then it populates the form fields with those details.

var placeSearch, autocomplete_2;

var componentForm = {
street_number: 'short_name',
route: 'long_name',
locality: 'long_name',
administrative_area_level_1: 'short_name',
country: 'long_name',
postal_code: 'short_name'
};

function initAutocomplete_2() {
// Create the autocomplete object, restricting the search predictions to
// adresses and France.
// Address must start with a number to start Autocomplete
var input = document.getElementById('autocomplete_2');

var options = {
  types: ['address'],
  componentRestrictions: {country: 'fr'},
};

autocomplete_2 = new google.maps.places.Autocomplete(input, options);

// Avoid paying for data that you don't need by restricting the set of
// place fields that are returned to just the address components.
autocomplete_2.setFields(['address_component']);

// When the user selects an address from the drop-down, save the
// address fields in local storage.
autocomplete_2.addListener('place_changed', fillInAddress_2);
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

function fillInAddress_2() {
// Get the place details from the autocomplete object.
if (document.getElementById("autocomplete_2").value.match(/^\d/)) {
  var place_2 = autocomplete.getPlace();
  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the cookie.
  for (var i = 0; i < place_2.address_components.length; i++) {
    var addressType = place_2.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = encodeURIComponent(place_2.address_components[i][componentForm[addressType]]);
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

var pac_input_2 = document.getElementById('autocomplete_2');

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
      document.getElementById('goingnext_2').onclick = function() {
        if (!suggestion_selected && document.getElementById("autocomplete_2").value.match(/^\d/)) {
          var simulated_downarrow = $.Event("keydown", {keyCode:40, which:40});
          var event = $.Event("enter", {keyCode:13, which:13})
          orig_listener.apply(input, [simulated_downarrow]);
          orig_listener.apply(input, [event]);
        }
      }
      if (event.which == 13 && !suggestion_selected && document.getElementById("autocomplete_2").value.match(/^\d/)) {
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

})(pac_input);

$(function(){
var autocompleteOptions = { types: ['address'], componentRestrictions: { country: 'fr'}};
var autocomplete = new google.maps.places.Autocomplete(pac_input, autocompleteOptions);
});

$(document).ready(function() {
jQuery(function($) {
  $lis = $('.faq-item-sc'); 
  min = 3;
  max = $lis.length;
  var visible = min;

  function showUpToIndex(index) {
    $lis.hide();
    $lis.slice(0, index).show();
  }

  function disableButtons(){
    if (visible >= max){
      visible = max;
      $('.load-more').hide();
    }
    else
    {
      $('.load-more').show();
    }
  }

  showUpToIndex(visible);
  disableButtons();

  $('.load-more').click(function(e) {
    e.preventDefault();
    visible = visible + 2;
    disableButtons();  
    showUpToIndex(visible);
  });
});
});

