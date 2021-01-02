$(document).ready(function () {

  // - Data Validation functions
  const stnVal = {
    isThisNum: function (number) {
      return isNaN(number) ? false : true;
    },
    getRadioVal: function (form, name) {
      // get list of radio buttons with specified name
      const radios = form.elements[name];
      // loop through list of radio buttons
      for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) { // radio checked?
          return radios[i].value; // if so, hold its value in val
        }
      };
    },
    maxStringLength: function (number, stringLength) {
      return number.toString().length > stringLength ?
        // console.log(`${number} is too long. Please reduce the length`)
        false :
        // console.log(`${number} length is OK.`)
        true;
    }
  };

  //DRY this
  $("#modal-close-x").click(function(){
    $(".modal-title").text("Message");
    $(".modal-body").html('<h6 class="text-center">Please Enter Valid Data</h6>');
  })

  $("#modal-close-button").click(function(){
    $(".modal-title").text("Message");
    $(".modal-body").html('<h6 class="text-center">Please Enter Valid Data</h6>');
  })

  // FUNCTION - contains POST/CREATE 
  // 1. Get values from inputs and trims. 2. Conditional to see if data is valid length and type/format to ready for mySQL. 3. Creates entry if conditions are met.
  $("#entry-form").submit(function (event) {
    event.preventDefault();

    // Value (or what is written by the client) in the input box
    const rmName = $("#rm-name").val().trim();
    const rmDesc = $("#rm-description").val().trim();
    const rmDosNum = $("#rm-dosage-number").val();
    const rmDosUnit = $("#rm-dosage-unit").val();
    //Value of Radio Button Pressed
    const rmNa = stnVal.getRadioVal(document.getElementById('entry-form'), 'rm-na');
    // Form Validation (need for mySQL based on schema)

    if (stnVal.maxStringLength(rmName, 100)
      & stnVal.isThisNum(rmDosNum)
      & stnVal.maxStringLength(rmDosNum, 5)
      & stnVal.maxStringLength(rmDesc, 250)) {
      //AJAX POST
      const newEntry = {
        rmName,
        rmNa,
        rmDosNum,
        rmDosUnit,
        rmDesc
      };
      
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

  // FUNCTION - contains DELETE/DELETE
  $(".entry-delete").click(function () {
    const idOfEntry = $(this).parent().parent().find('p').data('id');

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

// FUNCTION - contains PUT/UPDATE 
  $(".entry-edit").click(function () {
    const idOfEntry = $(this).parent().parent().find('p').data('id');
    console.log(`${idOfEntry} is the id of the entry`)
    const rmDesc = $(this).parent().parent().find('p').html();
    const editIdPkge = {
      rmDesc
    };

    $.ajax("/flavorlog/update/" + idOfEntry, {
      type: "PUT",
      data: editIdPkge
    }).then(
      function () {
        location.reload();
      }
    );
  });

  // FUNCTION - contains GET/READ 
  $(".view-entry").click(function () {

    console.log("Clicked on entry-view");

    const idOfEntry = $(this).parent().data('id');

    const editIdPkge = {
      msg: `Entry ${idOfEntry} has been viewed.`
    }
    $.ajax("/flavorlog/getOne/" + idOfEntry, {
      type: "GET",
      data: editIdPkge
    }).then(
      function (response) {
        const { rm_name, rm_na, rm_dosage_number, rm_dosage_unit, rm_description } = response;
        console.log(response);
        $(".modal-title").text(`${rm_name} - ${rm_na}`);
        $(".modal-body").html(
          `<h6>Evaluated at ${rm_dosage_number}${rm_dosage_unit}</h6>
                <p data-id="${idOfEntry} "contenteditable="true">${rm_description}</p>`
        )
      }
    );

  });

});