/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of fbsamples/messenger-bot-samples.
 */

/* eslint-disable max-len, prefer-spread */

/**
 * Displays the password mismatch error message and status icons.
 *
 * @returns {undefined}
 */
const showPasswordError = () => {
  const errorSection = document.getElementById('error');
  const inputStatus = document.querySelector(
    '#password2Field > div.inputStatus'
  );
  if (errorSection) {
    errorSection.innerHTML =
      '<p id="passwordError">Oops. Passwords don’t match.</p>';
  }
  if (inputStatus) {
    inputStatus.innerHTML =
      '<img src="/images/warning.svg" class="statusIcon warning">';
  }
};

/**
 * Removes the password mismatch error message and status icons.
 *
 * @returns {undefined}
 */
const clearPasswordError = () => {
  const errorSection = document.getElementById('error');
  const passwordError = document.getElementById('passwordError');
  if (errorSection && passwordError) {
    errorSection.removeChild(passwordError);
  }

  const inputStatus = document.querySelector(
    '#password2Field > div.inputStatus'
  );
  const warning = document.querySelector(
    '#password2Field > div.inputStatus > img.warning'
  );
  if (inputStatus && warning) {
    inputStatus.removeChild(warning);
  }
};

/**
 * Checks if passwords match, if not displays errors.
 *
 * @returns {Boolean} true if passwords match
 */
const passwordsMatch = () => {
  const password = document.getElementById('password');
  const passwordVerification = document.getElementById('passwordVerification');
  if (!password || !passwordVerification) {
    return true;
  }
  if (
    password.value &&
    passwordVerification.value &&
    password.value !== passwordVerification.value
  ) {
    showPasswordError();
  } else {
    clearPasswordError();
  }
  return password.value === passwordVerification.value;
};

/**
 * Applies a check icon next to a fieldset
 *
 * @param {Object} field Fieldset item to apply check icon to
 * @returns {undefined}
 */
const applyCheckToField = field => {
  const inputStatus = document.querySelector(
    `#${field.name}Field > div.inputStatus`
  );
  const checkExists = document.querySelector(
    `#${field.name}Field > div.inputStatus > img.check`
  );
  if (inputStatus && !checkExists) {
    inputStatus.innerHTML =
      '<img src="/images/check.svg" class="statusIcon check">';
  }
};

/**
 * Removes icon next to a fieldset
 *
 * @param {Object} field Fieldset item to remove icon from
 * @returns {undefined}
 */
const removeStatusFromField = field => {
  const inputStatus = document.querySelector(
    `#${field.name}Field > div.inputStatus`
  );
  if (inputStatus) {
    inputStatus.innerHTML = '';
  }
};

/**
 * Apply check icon to all filled out fieldsets marked required
 *
 * @returns {undefined}
 */
const applyCheckToFilledFields = () => {
  const requiredFields = Array.apply(
    null,
    document.getElementsByClassName('required')
  );
  requiredFields.forEach(field => {
    if (field.value) {
      applyCheckToField(field);
    } else {
      removeStatusFromField(field);
    }
  });
  passwordsMatch();
};

/**
 * Apply check icon to all filled out fieldsets marked required
 *
 * @returns {Boolean} true if all required fields have been filled
 */
const requiredFieldsFilled = () => {
  const requiredFields = Array.apply(
    null,
    document.getElementsByClassName('required')
  );
  const unfilledFields = requiredFields.filter(field => field.value === '');
  return unfilledFields.length === 0;
};

/**
 * Enables the submit button if required fields filled and passwords match
 *
 * @returns {undefined}
 */
const enableSubmit = () => {
  const submitButton = document.getElementById('submit');
  if (submitButton) {
    submitButton.disabled = !requiredFieldsFilled() || !passwordsMatch();
  }
};

/**
 * Show the loading spinner on the submit button.
 *
 * @returns {undefined}
 */
const showSpinner = () => {
  const submitButton = document.getElementById('submitText');
  const spinner = document.getElementById('spinner');
  if (submitButton) {
    submitButton.style.opacity = '0.6';
  }
  if (spinner) {
    spinner.style.display = 'inline';
  }
};

/**
 * Subscribe functions to form events on domready
 *
 * @returns {undefined}
 */
const subscribeToChange = () => {
  const form = document.getElementsByTagName('form')[0];
  if (form) {
    form.addEventListener('change', enableSubmit);
    form.addEventListener('paste', enableSubmit);
    form.addEventListener('keyup', enableSubmit);
    form.addEventListener('keyup', applyCheckToFilledFields);
    form.addEventListener('submit', showSpinner, true);
  }
};

document.addEventListener('DOMContentLoaded', enableSubmit);
document.addEventListener('DOMContentLoaded', subscribeToChange);
