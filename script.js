console.log('hello there');

$( "#entry-form" ).submit(function( event ) {
  console.log('Submit');
  event.preventDefault();
});