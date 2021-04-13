document.getElementById("loading").addEventListener("load", redirect());

$(document).ready(function() {
  const date = new Date($('#date').html());
  const today = new Date();
  const expiring_date = new Date(moment(date).add(4, 'days'));
  const expiring_date_2 = new Date(moment(date).add(3, 'days'));
  let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
  $('.date').html(expiring_date_2.toLocaleString('fr-FR', options));
});

function redirect() {
  window.setTimeout(function() {
    hideLoader();
  }, 3000);
}

function hideLoader() {
  $(document).ready(function() {
    $('#loading').fadeOut();
    $('#loader').fadeOut();
  });
}

var valuation = Number(document.getElementById('value-new').innerHTML.replace(/€| /g, ""));
var est_final_sale_price = Math.round(valuation/1000);
var max = Math.round(est_final_sale_price * 1.2);
var min = Math.round(est_final_sale_price * 0.80);
var rangeSlider4 = document.getElementById('slider-10');
var new_count = 0;

// implement html modifications
document.getElementById('value-new').innerHTML = est_final_sale_price.toString() + " 000 €";

noUiSlider.create(rangeSlider4, {
  start: [est_final_sale_price],
  step: 1000 / 1000,
  connect: 'lower',
  range: {
    'min': min,
    'max': max
  },
  pips: {
    mode: 'range',
    density: 500,
    stepped: true,
    format: wNumb({
      decimals: 0,
      postfix: ' k€',
      thousand: ' '
    })
  }
});

rangeSlider4.noUiSlider.on('update', function(values, handle) {
  var fixed_value = valuation / 1000;
  var value = Math.round(values[handle]);
  document.getElementById('slider-range-value-10').innerHTML = value.toString() + " 000 €";
  if (value <= 130) {
    var costguarantee = 12;
    var costofservice = costguarantee;
    var guaranteed_net_proceed = fixed_value - costguarantee;
    document.getElementById('slider-range-value-11').innerHTML = (value - costguarantee).toString() + " 000 €";
    document.getElementById('cost-of-service-10').innerHTML = costguarantee.toString() + " 000 €";
    SetTable(value, costguarantee, costofservice, guaranteed_net_proceed);
  } else if (value > 130 && value <= 145) {
    var costguarantee = 13;
    var costofservice = costguarantee;
    var guaranteed_net_proceed = fixed_value - costguarantee;
    document.getElementById('slider-range-value-11').innerHTML = (value - costguarantee).toString() + " 000 €";
    document.getElementById('cost-of-service-10').innerHTML = costguarantee.toString() + " 000 €";
    SetTable(value, costguarantee, costofservice, guaranteed_net_proceed);
  } else if (value > 145 && value <= 175) {
    var costguarantee = 14;
    var costofservice = costguarantee;
    var guaranteed_net_proceed = fixed_value - costguarantee;
    document.getElementById('slider-range-value-11').innerHTML = (value - costguarantee).toString() + " 000 €";
    document.getElementById('cost-of-service-10').innerHTML = costguarantee.toString() + " 000 €";
    SetTable(value, costguarantee, costofservice, guaranteed_net_proceed);
  } else if (value > 175 && value <= 400) {
    var costguarantee = 0.08;
    var costofservice = fixed_value * costguarantee;
    var guaranteed_net_proceed = fixed_value - costofservice;
    document.getElementById('slider-range-value-11').innerHTML = Math.round((value - (value * costguarantee))).toString() + " 000 €";
    document.getElementById('cost-of-service-10').innerHTML = parseFloat((costguarantee*100).toString()).toFixed(1).toString().replace('.',',') + "%";
    SetTable(value, costguarantee, costofservice, guaranteed_net_proceed);
  } else if (value > 400 && value <= 600) {
    var costguarantee = 0.075;
    var costofservice = fixed_value * costguarantee;
    var guaranteed_net_proceed = Math.round(fixed_value - costofservice);
    document.getElementById('slider-range-value-11').innerHTML = Math.round((value - (value * costguarantee))).toString() + " 000 €";
    document.getElementById('cost-of-service-10').innerHTML = parseFloat((costguarantee*100).toString()).toFixed(1).toString().replace('.',',') + "%";
    SetTable(value, costguarantee, costofservice, guaranteed_net_proceed);
  } else {
    var costguarantee = 0.07;
    var costofservice = fixed_value * costguarantee;
    var guaranteed_net_proceed = Math.round((fixed_value / 1000) - costofservice);
    document.getElementById('slider-range-value-11').innerHTML = Math.round((value - (value * costguarantee))).toString() + " 000 €";
    document.getElementById('cost-of-service-10').innerHTML = parseFloat((costguarantee*100).toString()).toFixed(1).toString().replace('.',',') + "%";
    SetTable(value, costguarantee, costofservice, guaranteed_net_proceed);
  }
});

function SetTable(value, costguarantee, costofservice, guaranteed_net_proceed, floating_net_proceed) {
  $(document).ready(function() {
  		// Replace HTML Before Setable
      var price_on_market_2 = value;
      $('#price_on_market_2').html((value).toString() + " 000 €");
  	  // Replace HTML content with price_on_market
      var price_on_market = value;
      $('.price_on_market').html((price_on_market).toString() + " 000 €");
      // Replace HTML content with seller_concession
      var seller_concession = Math.round(price_on_market * 0.035);
      $('.seller_concession').html((seller_concession).toString() + " 000 €");
      // Replace HTML content with fee_bridge_loan
      var fee_double_truck = 1.2 * 2 ;
      var fee_storage = 0.12 * 3;
      var fee_mid_term_lease =(price_on_market - seller_concession) / 20 / 12 * 3;
      var fee_double_moving = Math.round(fee_double_truck + fee_storage + fee_mid_term_lease);
      $('.fee_bridge_loan').html((fee_double_moving).toString() + " 000 €");
      // Replace HTML content with fees_vesta
      var fees_vesta = Math.round(costofservice);
      $('#fees_vesta').html((fees_vesta).toString() + " 000 €");
      // Replace HTML content with fees_traditional
      if (value <= 130) {
        var fees_traditional = 9;
      } else if (value > 130 && value <= 145) {
        var fees_traditional = 10;
      } else if (value > 145 && value <= 175) {
      	var fees_traditional = 10;
      } else {
      	var fees_traditional = Math.round((0.05) * price_on_market);
        if (fees_traditional < 10) {fees_traditional = 10}
      }
      $('#fees_traditional').html((fees_traditional).toString() + " 000 €");
      // Replace HTML content with net_proceed_vesta
      var net_proceed_vesta = Math.round(price_on_market - fees_vesta);
      $('#net_proceed_vesta').html((net_proceed_vesta).toString() + " 000 €");
      var equityunlock = net_proceed_vesta;
      $('#equityunlock').html((equityunlock).toString() + " 000 €");
      $('#price_on_market_2').html((equityunlock).toString() + " 000 €");
      // Replace HTML content with net_proceed
      var net_proceed = price_on_market - fees_traditional - seller_concession - fee_double_moving;
      $('#net_proceed').html((net_proceed).toString() + " 000 €");
  });
}
