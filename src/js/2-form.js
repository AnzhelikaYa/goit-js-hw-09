let formData = {
  email: "",
  message: ""
};

const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector(".feedback-form");
const emailInput = form.elements.email;
const messageInput = form.elements.message;


function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}


function onInputChange(e) {
  formData[e.target.name] = e.target.value.trim();
  saveToLocalStorage();
}


function populateFormFromStorage() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      formData = JSON.parse(savedData);

      emailInput.value = formData.email || "";
      messageInput.value = formData.message || "";
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
    }
  }
}


function onFormSubmit(e) {
  e.preventDefault();


  formData.email = emailInput.value.trim();
  formData.message = messageInput.value.trim();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log(formData);

 
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
}


form.addEventListener("input", onInputChange);
form.addEventListener("submit", onFormSubmit);


populateFormFromStorage();
