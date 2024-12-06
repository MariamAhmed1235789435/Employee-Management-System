let inputName = document.querySelector("#name");
let inputAge = document.querySelector("#Age");
let inputCity = document.querySelector("#City");
let inputEmail = document.querySelector("#Email");
let inputPhone = document.querySelector("#Phone");
let inputStartDate = document.querySelector("#Start-Date");
let imageInput = document.querySelector("#input-file");
let image = document.querySelector("#image");
let table = document.querySelector("#table-body");
let updateBtn = document.querySelector("#Update");
let addBtn = document.querySelector("#add");
let submitBtn = document.querySelector(".submitBtn");
let selectinput = document.querySelector("#selectInput");
let searchinput = document.querySelector("#searchInput");

let selectedIndex;
const myModalAlternative = new bootstrap.Modal("#exampleModal", {});

const myModalEl = document.getElementById("exampleModal");
myModalEl.addEventListener("hidden.bs.modal", clearForm);

let array = [];
if (localStorage.getItem("employees")) {
  array = JSON.parse(localStorage.getItem("employees"));
  displayData(array); // Fix: Pass array here instead of `arr`
}

submitBtn.addEventListener("click", addEmployee);
imageInput.addEventListener("change", function () {
  if (imageInput.files[0]) {
    image.src = URL.createObjectURL(imageInput.files[0]);
  }
});

selectinput.addEventListener("change", function () {
  if (searchinput.value != "defult") {
    searchinput.removeAttribute("disabled");
    searchinput.focus();
  } else {
    searchinput.setAttribute("disabled", true);
  }
});

searchinput.addEventListener("input", function (e) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      // Ensure the property exists in the employee object before calling toLowerCase()
      let searchKey = selectinput.value;
      if (array[i].hasOwnProperty(searchKey)) {
        // Only perform toLowerCase() if the property exists
        if (array[i][searchKey].toLowerCase().includes(e.target.value.toLowerCase())) {
          result.push(array[i]);
        }
      }
    }
    displayData(result); // Call displayData with the filtered result
  });
  
updateBtn.addEventListener("click", updateEmployee);

function updateEmployee() {
  if (validationConfirm()) {
    let employee = {
      name: inputName.value,
      age: inputAge.value,
      city: inputCity.value,
      email: inputEmail.value,
      phone: inputPhone.value,
      startDate: inputStartDate.value,
      image: imageInput.files[0]?.name || "No Image", // Store file name or fallback
    };
    array[selectedIndex] = employee;
    localStorage.setItem("employees", JSON.stringify(array));
    myModalAlternative.hide();
    
    displayData(array); // Fix: Pass array here instead of `arr`
    clearForm();
    updateBtn.classList.replace("d-block", "d-none");
    addBtn.classList.replace("d-none", "d-block");
  }
}

function addEmployee() {
  if (validationConfirm()) {
    let newEmployee = {
      name: inputName.value,
      age: inputAge.value,
      city: inputCity.value,
      email: inputEmail.value,
      phone: inputPhone.value,
      startDate: inputStartDate.value,
      image: imageInput.files[0]?.name || "No Image", // Store file name or fallback
    };
    array.push(newEmployee);
    localStorage.setItem("employees", JSON.stringify(array));
    myModalAlternative.hide();
    clearForm();
   
    displayData(array);
  } else {
    alert("Please fill all fields correctly");
  }
}

function clearForm() {
  inputName.value = "";
  inputAge.value = "";
  inputCity.value = "";
  inputEmail.value = "";
  inputPhone.value = "";
  inputStartDate.value = "";
  image.src = "https://placehold.co/350x350"; // Reset image preview
  inputName.classList.remove("is-valid");
  inputName.classList.remove("is-invalid");
  inputAge.classList.remove("is-valid");
  inputAge.classList.remove("is-invalid");
  inputCity.classList.remove("is-valid");
  inputCity.classList.remove("is-invalid");
  inputEmail.classList.remove("is-valid");
  inputEmail.classList.remove("is-invalid");
  inputPhone.classList.remove("is-valid");
  inputPhone.classList.remove("is-invalid");
  inputStartDate.classList.remove("is-valid");
  inputStartDate.classList.remove("is-invalid");
}

function displayData(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `<tr>
      <td>${i + 1}</td>
      <td>
        <img src="${arr[i].image !== 'No Image' ? 'image/' + arr[i].image : 'https://placehold.co/100x100'}" 
             alt="Employee Image" width="100" class="rounded">
      </td>
      <td>${arr[i].name}</td>
      <td>${arr[i].age}</td>
      <td>${arr[i].city}</td>
      <td>${arr[i].email}</td>
      <td>${arr[i].phone}</td>
      <td>${arr[i].startDate}</td>
      <td><button class="btn btn-warning" onclick="showModal(${i})">Update</button></td>
      <td><button class="btn btn-danger" onclick="deleteEmployee(${i})">Delete</button></td>
    </tr>`;
  }
  table.innerHTML = cartona;
}

var nameRegex = /^[a-zA-Z ]{3,30}$/;
var ageRegex = /^[1-9][0-9]$/;
var cityRegex = /^[a-zA-Z ]{3,30}$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var phoneRegex = /^01[0-2,5][0-9]{8}$/;

var allinputs = document.querySelectorAll(".input-model > input");

for (let i = 0; i < allinputs.length; i++) {
  allinputs[i].addEventListener("input", function () {
    switch (this) {
      case inputName:
        validateInput(nameRegex, inputName);
        break;
      case inputAge:
        validateInput(ageRegex, inputAge);
        break;
      case inputCity:
        validateInput(cityRegex, inputCity);
        break;
      case inputEmail:
        validateInput(emailRegex, inputEmail);
        break;
      case inputPhone:
        validateInput(phoneRegex, inputPhone);
        break;
    }
  });
}

function validateInput(inputRegex, input) {
  if (inputRegex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
    return true;
  } else {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    return false;
  }
}

function validationConfirm() {
  return (
    nameRegex.test(inputName.value) &&
    ageRegex.test(inputAge.value) &&
    cityRegex.test(inputCity.value) &&
    emailRegex.test(inputEmail.value) &&
    phoneRegex.test(inputPhone.value) &&
    inputStartDate.value &&
    image.src !== "https://placehold.co/350x350"
  );
}

function deleteEmployee(index) {
  array.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(array));
  displayData(array); // Fix: Pass array here instead of `arr`
  console.log(index);
}

function showModal(index) {
  myModalAlternative.show();
  updateBtn.classList.replace("d-none", "d-block");
  addBtn.classList.replace("d-block", "d-none");
  inputName.value = array[index].name;
  inputAge.value = array[index].age;
  inputCity.value = array[index].city;
  inputEmail.value = array[index].email;
  inputPhone.value = array[index].phone;
  inputStartDate.value = array[index].startDate;
  image.src =
    array[index].image !== "No Image"
      ? "image/" + array[index].image
      : "https://placehold.co/100x100";
  selectedIndex = index;
}
