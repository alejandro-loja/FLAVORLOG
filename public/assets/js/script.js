$(document).ready(function () {
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
    };
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
    //Value of Radio Button Pressed
    const rmNa = getRadioVal(document.getElementById('entry-form'), 'rm-na');
    //fixes validates radio buttons
    // Form Validation (need for mySQL based on schema)

    if (maxStringLength(rmName, 100) & isThisNum(rmDosNum) & maxStringLength(rmDosNum, 5) & maxStringLength(rmDesc, 250)) {
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
        function () {
          console.log("created a new Entry");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    }
  });

  $(".entry-delete").click(function () {
    const idOfEntry = $(this).parent().data('id');

    const deleteIdPkge = {
      msg: `Entry ${idOfEntry} has been deleted.`
    }

    $.ajax("/flavorlog/delete/" + idOfEntry, {
      type: "DELETE",
      data: deleteIdPkge
    }).then(
      function () {
        location.reload();
      }
    );

  });

  $(".entry-edit").click(function () {
    const idOfEntry = $(this).parent().data('id');

    const entryTitle = $(this).parent().find('h5').html();
    const entryDesc = $(this).parent().find('p').html();

    $(this).parent().find('.entry-delete').addClass('d-none');
    $(this).parent().find('.entry-submit').removeClass('d-none');

    // const editIdPkge = {
    //   msg: `Entry ${idOfEntry} has been deleted.`
    // }

    // $.ajax("/flavorlog/update/" + idOfEntry, {
    //   type: "PUT",
    //   data: editIdPkge
    // }).then(
    //   function () {
    //     location.reload();
    //   }
    // );
  });

  

});