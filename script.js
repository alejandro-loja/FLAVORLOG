$(document).ready(function () {

  //Detect if anything written
  function validateForm(string) {
    if (string === "") {
      alert("Name must be filled out");
      return false;
    }
  }
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
    const rmDosNum = $("#rm-dosage-number").val();
    const rmDosUnit = $("#rm-dosage-unit").val();
    console.log(rmName, rmDesc, rmNatChkBx, rmArtChkBx, rmDosNum, rmDosUnit);

    validateForm(rmName);
  });



});