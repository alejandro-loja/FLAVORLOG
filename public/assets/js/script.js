$(document).ready(function () {
  console.log('hello there');


  //Detect if anything written
  // const validateForm = (string) => {
  //   return string === "" ? false : true;
  // };

  // Tells me is the input is a number or not.
  const isThisNum = (number) => {
    return isNaN(number) ? false : true;
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

  const maxStringLength = (number, stringLength) => {
     return number.toString().length > stringLength ?
      // console.log(`${number} is too long. Please reduce the length`)
      false :
      // console.log(`${number} length is OK.`)
      true;
  };



  $("#entry-form").submit(function (event) {

    console.log('Submitted');
    event.preventDefault();


    // Value (or what is written by the client) in the input box
    const rmName = $("#rm-name").val().trim();
    const rmDesc = $("#rm-description").val().trim();
    const rmDosNum = $("#rm-dosage-number").val();
    const rmDosUnit = $("#rm-dosage-unit").val();
    // console.log(rmName, rmDesc, rmDosNum, rmDosUnit);
    //Value of Radio Button Pressed
    const rmNa = getRadioVal(document.getElementById('entry-form'), 'rm-na');
    //fixes validates radio buttons
    // console.log(valOfRM_NA);
    // Form Validation (need for mySQL based on schema)


    if(maxStringLength(rmName, 100) & isThisNum(rmDosNum) & maxStringLength(rmDosNum, 5) & maxStringLength(rmDesc, 250)) {
      console.log('all are true')
      //AJAX POST
      const newEntry = {
        rmName: rmName,
        rmNa: rmNa,
        rmDosNum: rmDosNum,
        rmDosUnit: rmDosUnit,
        rmDesc: rmDesc
      };
      console.log(newEntry);
      // Send the POST request.
      $.ajax("/flavorlog/create", {
        type: "POST",
        data: newEntry
      }).then(
        function() {
          console.log("created a new Entry");
          // Reload the page to get the updated list
          location.reload();
        }
      );

    }

    // $.ajax({
    //   method: "PUT",
    //   url: "/burgers/" + burger_id
    // }).then(function(data) {
    //   // reload page to display devoured burger in proper column
    //   location.reload();
    // });

  });

});