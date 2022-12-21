/* @author Manuel Garcia-Nieto */

'use strict'

/* DOM References
--------------------------------------------------------- */
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const otherJobRoleInput = document.getElementById('other-job-role')
const jobRoleSelect = document.getElementById('title')
const designSelect = document.getElementById('design')
const colorSelect = document.getElementById('color')
const colorSelectOptions = document.querySelectorAll('#color option')
const activitiesFieldset = document.getElementById('activities')
const activitiesTotalCost = document.getElementById('activities-cost')
const checkBoxes = document.querySelectorAll('input[type=checkbox]')
const paymentMethod = document.getElementById('payment')
const creditCardMethod = document.getElementById('credit-card')
const paypalMethod = document.getElementById('paypal')
const bitcoinMethod = document.getElementById('bitcoin')
const expirationMonth = document.getElementById('exp-month')
const expirationYear = document.getElementById('exp-year')
const cardNumber = document.getElementById('cc-num')
const zipCode = document.getElementById('zip')
const cvv = document.getElementById('cvv')
const form = document.querySelector('form')
const requiredFields = document.querySelectorAll('.error-border')
const nameHint = document.getElementById('name-hint')

/* Variables
---------------------------------------------------------- */
let totalCost = 0

/**
 * Adds focus state to name input field.
 */
nameInput.focus()

// Hides the Other job role? input
otherJobRoleInput.style.visibility = 'hidden'

/**
 * If Other is selected from the Job Role menu, it displays Other Job Role Input, otherwise remains hidden.
 * @param  {event type} 'change'
 * @param  {listener} (e)
 */
jobRoleSelect.addEventListener('change', (e) => {
  e.target.value === 'other' ? (otherJobRoleInput.style.visibility = 'visible') : (otherJobRoleInput.style.visibility = 'hidden')
})

/**
 * Disables the color select drop down menu.
 * @param  {name String} 'disabled'
 * @param  {value boolean} true
 */
colorSelect.setAttribute('disabled', true)

/**
 * Displays color options depending on Design Theme selection.
 * @param  {event type} 'change'
 * @param  {listener} e
 */
designSelect.addEventListener('change', (e) => {
  colorSelect.removeAttribute('disabled')
  if (e.target.value === 'js puns') {
    colorSelect.selectedIndex = 1
  } else if (e.target.value === 'heart js') {
    colorSelect.selectedIndex = 4
  }
  for (let index = 1; index < colorSelectOptions.length; index++) {
    if (e.target.value !== colorSelectOptions[index].getAttribute('data-theme')) {
      colorSelectOptions[index].setAttribute('hidden', true)
    } else {
      colorSelectOptions[index].removeAttribute('hidden')
    }
  }
})

/**
 * Adds up the total cost of the activities and prevents the user from selecting incompatible activities.
 * @param  {event type} 'change'
 * @param  {listener} (e)
 */
activitiesFieldset.addEventListener('change', (e) => {
  const checkedValue = Number(e.target.getAttribute('data-cost'))
  if (e.target.checked) {
    totalCost += checkedValue
  } else {
    totalCost -= checkedValue
  }
  activitiesTotalCost.innerHTML = `Total: $${totalCost}`

  for (const checkBox of checkBoxes) {
    if (e.target.checked && e.target !== checkBox && checkBox.getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time')) {
      checkBox.setAttribute('disabled', true)
      checkBox.parentElement.classList.add('disabled')
    } else if (!e.target.checked && e.target !== checkBox && checkBox.getAttribute('data-day-and-time') === e.target.getAttribute('data-day-and-time')) {
      checkBox.removeAttribute('disabled')
      checkBox.parentElement.classList.remove('disabled')
    }
  }
})

/**
 * Sets the focus state on the selected checkbox or removes it.
 * @param  {iterator} checkBox
 */
for (const checkBox of checkBoxes) {
  checkBox.addEventListener('focus', (e) => {
    e.target.parentElement.classList.add('focus')
  })
  checkBox.addEventListener('blur', (e) => {
    e.target.parentElement.classList.remove('focus')
  })
}

// Hides paypal and bitcoin payment method and sets credit card payment method to default.
paypalMethod.setAttribute('hidden', true)
bitcoinMethod.setAttribute('hidden', true)
paymentMethod.selectedIndex = 1

/**
 * Displays info according to selected payment method.
 * @param  {event type} 'change'
 * @param  {listener} e
 */
paymentMethod.addEventListener('change', (e) => {
  if (e.target.value === creditCardMethod.id) {
    creditCardMethod.removeAttribute('hidden')
    paypalMethod.setAttribute('hidden', true)
    bitcoinMethod.setAttribute('hidden', true)
  } else if (e.target.value === paypalMethod.id) {
    paypalMethod.removeAttribute('hidden')
    creditCardMethod.setAttribute('hidden', true)
    bitcoinMethod.setAttribute('hidden', true)
  } else {
    bitcoinMethod.removeAttribute('hidden')
    creditCardMethod.setAttribute('hidden', true)
    paypalMethod.setAttribute('hidden', true)
  }
})

/**
 * Form submit button 
 * @param  {event type} 'submit'
 * @param  {listener} (e)
 */
form.addEventListener('submit', (e) => {
  for (const field of requiredFields) {
    if (validationOK(field)) {
      removeHint(field.parentElement, field.parentElement.lastElementChild)
    } else {
      displayHint(field.parentElement, field.parentElement.lastElementChild)
      if (field.id === 'name') {
        // this gets triggered after pressing the submit button
        field.value.includes(' ') ? (nameHint.innerText = 'No spaces allowed!') : (nameHint.innerText = 'Name field cannot be blank.')
      }
      e.preventDefault()
    }
  }
})

/**
 * Methods to be used for validation
 */
const validatingMethods = {
  nameCheck(name) {
    return (name !== '' || name.length !== 0) && /^[a-zA-Z]*[^\s\.]*$/.test(name)
  },
  emailCheck(email) {
    return /^[a-zA-Z0-9]{2,}@[a-zA-Z0-9]{2,10}\.(cat|es|org|com)$/i.test(email)
  },
  activitiesCheck() {
    return activitiesFieldset.querySelector('input[type=checkbox]:checked') ? true : false
  },
  expiryMonthCheck() {
    return expirationMonth.selectedIndex !== 0
  },
  expiryYearCheck() {
    return expirationYear.selectedIndex !== 0
  },
  ccNumCheck() {
    return /^[0-9]{13,16}$/.test(cardNumber.value)
  },
  zipCodeCheck() {
    return /^[0-9]{5}$/.test(zipCode.value)
  },
  cvvCheck() {
    return /^\d{3}$/.test(cvv.value)
  }
}

/**
 * Check required fields validation
 */
const validationOK = function (field) {
  if (field.id === 'name') return validatingMethods.nameCheck(field.value)
  if (field.id === 'email') return validatingMethods.emailCheck(field.value)
  if (field.id === 'activities-box') return validatingMethods.activitiesCheck()
  if (paymentMethod.value === 'credit-card') {
    if (field.id === 'exp-month') return validatingMethods.expiryMonthCheck()
    if (field.id === 'exp-year') return validatingMethods.expiryYearCheck()
    if (field.id === 'cc-num') return validatingMethods.ccNumCheck()
    if (field.id === 'zip') return validatingMethods.zipCodeCheck()
    if (field.id === 'cvv') return validatingMethods.cvvCheck()
  } else {
    return true
  }
}

/**
 * Shows validation hint
 */
const displayHint = function (label, hint) {
  label.classList.add('not-valid')
  label.classList.remove('valid')
  hint.style.display = 'block'
}

/**
 * Hides validation hint
 */
const removeHint = function (label, hint) {
  label.classList.add('valid')
  label.classList.remove('not-valid')
  hint.style.display = ''
}

/**
 * Adds event listener and checks validation
 * @param  {type of input} input
 * @param  {input's label} label
 * @param  {input's hint} hint
 * @param  {event type} 'keyup'
 * @param  {listener} e
 */
const eventInputTarget = function (input, label, hint) {
  input.addEventListener('keyup', (e) => {
    validationOK(input) ? removeHint(label, hint) : displayHint(label, hint)
  })
}

/**
 * Loops over all required fields finding required inputs and adding event listeners
 * @param  {iterator} field 
 */
for (const field of requiredFields) {
  if (field.tagName === 'INPUT') {
    eventInputTarget(field, field.parentElement, field.parentElement.lastElementChild)
  }
}
