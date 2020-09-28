$(document).ready(function () {

  //Detect if anything written
  function validateForm(string) {
    if (string === "") {
      alert("Name must be filled out");
      return false;
    }
  }
  console.log('hello there');

  function getRadioVal(form, name) {
    var val;
    // get list of radio buttons with specified name
    var radios = form.elements[name];

    // loop through list of radio buttons
    for (var i = 0, len = radios.length; i < len; i++) {
      if (radios[i].checked) { // radio checked?
        val = radios[i].value; // if so, hold its value in val
        break; // and break out of for loop
      }
    }
    return val; // return value of checked radio or undefined if none checked
  }

  $("#entry-form").submit(function (event) {
    console.log('Submit');
    event.preventDefault();
    // Value (or what is written by the client) in the input box
    const rmName = $("#rm-name").val();
    const rmDesc = $("#rm-description").val();
    // using .is(":checked") will give boolean to see if box is checked
    // const rmNatChkBx = $("#rm-natural").is(":checked");
    // const rmArtChkBx = $("#rm-artificial").is(":checked");
    const rmDosNum = $("#rm-dosage-number").val();
    const rmDosUnit = $("#rm-dosage-unit").val();
    console.log(rmName, rmDesc, rmDosNum, rmDosUnit);

    //fixe validates radio buttons
    const val = getRadioVal(document.getElementById('entry-form'), 'rm-na');
    console.log(val)
    validateForm(rmName);
  });

});