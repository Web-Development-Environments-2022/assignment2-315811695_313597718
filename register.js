$(function () {
  
  $("#password_error_message").hide();
  $("fullName_error_message").hide();
  $("#email_error_message").hide();

  var error_password = false;
  var error_fname = false;
  var error_email = false;

  $("#fullNameForm").focusout(function () {
    check_fullNameForm();
  });

  $("#passwordForm").focusout(function () {
    check_password();
  });

  $("#emailForm").focusout(function () {
    check_email();
  });

  function check_fullNameForm() {
    // var pattern = /^[a-zA-Z]*$/;
    var pattern = /^[a-z ,.'-]+$/

    var fname = $("#fullNameForm").val();
    if (!pattern.test(fname) && fname !== "") {
      $("#fullName_error_message").html("Should contain only Characters");
      $("#fullName_error_message").show();
      $("#form_fname").css("border-bottom", "2px solid #F90A0A");
      error_fname = true;
    } else {
      $("#fullName_error_message").hide();
      $("#form_fname").css("border-bottom", "2px solid #34F458");
    }
  }

  function check_password() {
    var patternPassword = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}$/;
    var password = $("#passwordForm").val();
    if (patternPassword.test(password) == false) {
      $("#password_error_message").html("Atleast 6 Characters and Numbers");
      $("#password_error_message").show();
      $("#form_password").css("border-bottom", "4px solid #F90A0A");

      error_password = true;
    } else {
      $("#password_error_message").hide();
      $("#form_password").css("border-bottom", "4px solid #34F458");
    }
  }

  function check_email() {
    var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = $("#emailForm").val();
    if (!pattern.test(email) || email == "") {
      $("#email_error_message").html("Invalid Email");
      $("#email_error_message").show();
      $("#form_email").css("border-bottom", "2px solid #F90A0A");
      error_email = true;
    } else {
      $("#email_error_message").hide();
      $("#form_email").css("border-bottom", "2px solid #34F458");
    }
  }

  $("#register_form").submit(function (e) {
    e.preventDefault();
    error_fname = false;
    error_email = false;
    error_password = false;

    check_fullNameForm();
    check_email();
    check_password();

    if (
      error_fname === false &&
      error_email === false &&
      error_password === false
    ) {
      localStorage.setItem($("#userNameForm").val(), $("#passwordForm").val());
      alert("Registration Successfull");
      changeDiv("loginPage");
    } else {
      alert("Please Fill the form Correctly");
    }
  });
});
