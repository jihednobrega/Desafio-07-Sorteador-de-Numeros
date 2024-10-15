const quantity = document.getElementById("quantity")
const firstNumber = document.getElementById("first-number")
const lastNumber = document.getElementById("last-number")
const toggleButton = document.getElementById("toggle-button")

const formInput = document.querySelector(".form-input")
const formResult = document.querySelector(".form-result")
const resultsContainer = document.querySelector(".form-results");
const sortedNumbers = document.querySelector("form .form-results .animation-number strong")

quantity.oninput = () => {
  let value = quantity.value.replace(/\D/g, "")
  quantity.value = value
}

firstNumber.oninput = () => {
  let value = firstNumber.value.replace(/\D/g, "")
  firstNumber.value = value
}

lastNumber.oninput = () => {
  let value = lastNumber.value.replace(/\D/g, "")
  lastNumber.value = value
}

formInput.onsubmit = (event) => {
  event.preventDefault()

  numbersResults()
  randomNumber()
  toggleScreen()
}

formResult.onsubmit = (event) => {
  event.preventDefault()

  resetInputs()
  toggleScreen()
}

document.addEventListener('keydown', function(e) {
  if(e.key == 'Enter' && formInput.classList.contains('hide')) {
    resetInputs()
    toggleScreen()
  }
})

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

function numbersResults() {
  const firstValue = Number(firstNumber.value)
  const lastValue = Number(lastNumber.value)
  const noRepeat = toggleButton.checked
  
  const generatedNumbers = []
  let attempts = 0
  const maxAttempts = 12


  if (firstValue > lastValue) {
    alert("O valor inicial não pode ser maior que o valor final.")
    
    resetInputs()
    toggleScreen()
    return
  }

  while (generatedNumbers.length < quantity.value) {
    
    const generatedNumber = randomNumber(firstValue, lastValue).toString().padStart(2, "0")
    
    if (noRepeat) {
      if (!generatedNumbers.includes(generatedNumber)) {
        generatedNumbers.push(generatedNumber)
      } 
    } else {
      generatedNumbers.push(generatedNumber)
    }

    attempts++
    console.log(attempts)
        
    if (attempts > maxAttempts) {
      alert("Muitas tentativas, verifique o intervalo ou a quantidade de números")
      resetInputs()
      toggleScreen()
      
      attempts = 0
      return
    }
    
  }

  resultsContainer.innerHTML = ""

  generatedNumbers.forEach((number, index) => {
    setTimeout(() => {

      const resultDiv = document.createElement("div")
      resultDiv.classList.add("animation-number")
      
      resultDiv.innerHTML = `
      <div class="rectangle"></div>
      <strong>${number}</strong>
      `
      
      resultsContainer.appendChild(resultDiv)
    }, index * 4500)
  })
}

function resetInputs() {
  quantity.value = ""
  firstNumber.value = ""
  lastNumber.value = ""
}

function toggleScreen() {
  formInput.classList.toggle("hide")
  formResult.classList.toggle("hide")
}