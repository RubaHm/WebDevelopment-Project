function validate() {

  //Taking the values from the contact us form
  var firstName = document.getElementById("FirstName");
  var lastName = document.getElementById("LastName");
  var date = document.getElementById("Date");
  var people = document.getElementById("People");
    var email = document.getElementById("email");
  var nationality = document.getElementById("nationalityList") ;


  //regular expressions patterns of the first+last name - email
  var regName = /^(?=.{2,15}$)[a-zA-Z]+$/; //check that entered name is only letters, and range between 2,15 letter
  var regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)*$/;



  //First+last name validity check: must contain only letters and within range of 15 letter
  if (firstName.value == "") {
            alert("First name is required");
    } else {
      if (!firstName.value.match(regName)) {
            alert("First name should contain letters only!");
    } else {
      if (lastName.value == "") {
            alert("Last name is required");
    } else {
      if (!lastName.value.match(regName)) {
            alert("Last name should contain letters only!");
    } else {
      //check date 
      if (date.value=="") {
            alert("Date is required!");
    } else {
      //check people validity
      if (people.value=="" || !(people.value >= 1 || people.value <= 10)) {
            alert("number of people is required within range (1-10 people only)");
    } else {
      //email validity check: not null and correct format
      if (email.value == "" || !email.value.match(regEmail)) {
            alert("Email is required, please check if the email is valid (CORROECT FORMAT: name@domain.com)");
    } else {
      //nationality validity check: not null
      if (nationality.value == "") {
            alert("Nationality is required");
   
    } else {
                //print thank you message with all form inputs
                  var massege = "Welcome to D hotel  " + firstName.value + " " + lastName.value +
                  "\n" + "Your form information:" + "\n" + "booking date : " + date.value+ "\n"+ "people: "+ people.value+
                  "\n" + "Nationality: " + nationality.value + "\n" + "Email: " + email.value +
              +"\n"  + " Language: " + lang.value;
                  window.alert(massege);
                 }
                }
               }
              }
            }
          }
        }
      }
    }
  
 //close function validate

//function clear will clear all inputs
function clearAll() {
  document.getElementById("FirstName").value = "";
  document.getElementById("LastName").value = "";
  document.getElementById("Date").value ="";
  document.getElementById("people").value ="";
  document.getElementById("email").value ="";
  document.getElementById("nationalityList").value ="";
  document.getElementById("languageList").value ="";
}

//function start will add event listener to activate submit button and clear button
function start() {
    
  var submitButton = document.getElementById("submitButton");
  submitButton.addEventListener("click", validate, false);
  var clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", clearAll, false);
}
window.addEventListener("load", start, false);