$(document).ready(function () {

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


  //DRY this
  $("#modal-close-x").click(function(){
    $(".modal-title").text("Message");
    $(".modal-body").html('<h6 class="text-center">Please Enter Valid Data</h6>');
  })

  $("#modal-close-button").click(function(){
    $(".modal-title").text("Message");
    $(".modal-body").html('<h6 class="text-center">Please Enter Valid Data</h6>');
  })

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

/////

  $(".entry-edit").click(function () {
    const idOfEntry = $(this).parent().parent().find('p').data('id');
    console.log(`${idOfEntry} is the id of the entry`)

    // const rmName = $(this).parent().find('h5').html();
    const rmDesc = $(this).parent().parent().find('p').html();

    // $(this).parent().find('.entry-delete').addClass('d-none');
    // $(this).parent().find('.entry-submit').removeClass('d-none');

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