$(document).ready(function () {


  console.log('hello there');

  $("#entry-form").submit(function (event) {
    console.log('Submit');
    event.preventDefault();
    // Value (or what is written by the client) in the input box
    const rmName = $("#rm-name").val();
    const rmDesc = $("#rm-description").val();
    // using .is(":checked") will give boolean to see if box is checked
    const rmNatChkBx = $("#rm-natural").is(":checked");
    const rmArtChkBx = $("#rm-artificial").is(":checked");
    console.log(rmName,rmDesc,rmNatChkBx,rmArtChkBx);
    // console.log($(".row"));
    // console.log($("#rm_name").text());
  });

  // $(window).click(function() {
  //   console.log($("#rm_name").text());
  // })

});