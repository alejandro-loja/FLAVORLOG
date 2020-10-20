$(document).ready(function () {
  console.log('hello there');


  //Detect if anything written
  const validateForm = (string) => {
    if (string === "") {
      alert("Name must be filled out");
      return false;
    }
  };

  // Tells me is the input is a number or not.
  const isThisNum = (number) => {
    if (isNaN(number)) {
      console.log(`${number} is not a number`);
    } else {
      console.log(`${number} is a number.`)
    }
  };
  //This function tells you the value of the selected radio button
  // You need the id of the form and name of the radio buttons
  const getRadioVal = (form, name) => {

    // get list of radio buttons with specified name
    const radios = form.elements[name];
    // loop through list of radio buttons
    for (var i = 0, len = radios.length; i < len; i++) {
      if (radios[i].checked) { // radio checked?
        return radios[i].value; // if so, hold its value in val
      }
    }
  };

  const stringLength = (number, stringLength) => {
    number.toString().length > stringLength ? 
    console.log(`${number} is too long. Please reduce the length`) : 
    console.log(`${number} length is OK.`)
  };



  $("#entry-form").submit(function (event) {

    console.log('Submit');
    event.preventDefault();


    // Value (or what is written by the client) in the input box
    const rmName = $("#rm-name").val();
    const rmDesc = $("#rm-description").val();
    const rmDosNum = $("#rm-dosage-number").val();
    const rmDosUnit = $("#rm-dosage-unit").val();
    // console.log(rmName, rmDesc, rmDosNum, rmDosUnit);
    //Value of Radio Button Pressed
    const val = getRadioVal(document.getElementById('entry-form'), 'rm-na');
    //fixes validates radio buttons
    console.log(val);
    // Form Validation (need for mySQL based on schema)
    isThisNum(rmDosNum);
    stringLength(rmName, 100);
    stringLength(rmDosNum, 5);
    stringLength(rmDesc, 250);
    validateForm(rmName);
  });

});