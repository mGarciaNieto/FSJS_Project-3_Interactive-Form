/* @author Manuel Garcia-Nieto */

'use strict'

/* DOM References
--------------------------------------------------------- */
const nameInput = document.getElementById('name')
const otherJobRoleInput = document.getElementById('other-job-role')
const jobRoleSelect = document.getElementById('title')
const designSelect = document.getElementById('design')
const colorSelect = document.getElementById('color')
const colorSelectOptions = document.querySelectorAll('#color option')
const activitiesFieldset = document.getElementById('activities')
const activitiesTotalCost = document.getElementById('activities-cost')
const checkBoxes = document.querySelectorAll('input[type=checkbox]')

/* Variables
---------------------------------------------------------- */
let totalCost = 0

/**
 * Adds focus state to name input field.
 */
nameInput.focus()

//
otherJobRoleInput.style.visibility = 'hidden'

/**
 * If Other is selected from the Job Role menu, it displays Other Job Role Input, otherwise remains hidden.
 *
 * @param  {event type} 'change'
 * @param  {listener} (e)
 */
jobRoleSelect.addEventListener('change', (e) => {
  e.target.value === 'other' ? (otherJobRoleInput.style.visibility = 'visible') : (otherJobRoleInput.style.visibility = 'hidden')
})

/**
 * Disables the color select drop down menu.
 *
 * @param  {name String} 'disabled'
 * @param  {value boolean} true
 */
colorSelect.setAttribute('disabled', true)

/**
 * Displays color options depending on Design Theme selection.
 *
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
    } else if (!e.target.checked) {
      checkBox.removeAttribute('disabled')
      checkBox.parentElement.classList.remove('disabled')
    }
  }
})

console.log(checkBoxes)

for (const checkBox of checkBoxes) {
  checkBox.addEventListener('focus', (e) => {
    e.target.parentElement.classList.add('focus')
  })
  checkBox.addEventListener('blur', (e) => {
    e.target.parentElement.classList.remove('focus')
  })
}
