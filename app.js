// Generic function for getting current time
// We'll use it in a few places
var getNow = function() {

  // moment.js makes it easy to create a datetime with particular forma
  // the format below will display to the 100th second
  var result = moment().format('YYYY-MM-DD | HH:mm:ss:SS');

  return result;
};

// Displays current time in DOM (refreshing every half second)
var localClock = function(){
  $('.local-time').text(getNow());

  // setTimeout is a builtin JavaScript function. You pass it a function
  // and a time (in milliseconds) that it should wait to carry out that function
  t = setTimeout(function(){
    localClock();}, 500);
};


// This function makes AJAX calls to the server, and when they comple
var asyncDemo = function(url) {
  // make our AJAX call to the test server
  $.ajax({
    type: 'GET',
    url: url,

    // notify us right before the AJAX call is made 
    beforeSend: function() {
      $('.results').append('<p>Request sent at: ' + getNow() + '</p>');
      }
  })
  // the done block gets executed after the AJAX call returns—whenever that is
  .done(function(data) {
    $('.results').append('<p>Response at: ' + getNow() + '</p>');
    $('.results').append('<p>Response object <em>hello</em> is: <b>' + data.hello + '</b></p><hr>');
    setTimeout(function() {
      asyncDemo(url);
      }, 10000);
  });
};

// Need this set globally so accessible in both doc ready block and 
// myCallback function
var url = "http://echo.jsontest.com/hello/world";

// When DOM loads, add the autoupdating clock, and call asyncDemo
$(document).ready(function(){
  localClock();
  // this url includes a callback parameter
  asyncDemo(url);
});