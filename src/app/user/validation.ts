/**
 * Validation messages for user form
 */
export class Validation {

  public validationMessages = {
      'username': {
         'required': 'Username is required',
         'minlength': 'Username must be at least 6 characters long',
         'input-regex': 'Invalid username'
       },

      'email': {
         'required': 'Email address is required',
         'emailAddressInUse': 'Email address entered is already in use',
         'input-regex': 'Invalid email address'
       },

      'firstname': {
         'required': 'First Name is required',
         'minlength': 'First Name must be at leat 2 characters long'
       },

      'lastname': {
         'required': 'Last name is required',
         'minlength': 'Last Name must be at least 2 characters long'
      },

      'role': {
         'required': 'Role is required'
      }
  }

  // No errors when the form hasn't been touched
  public formErrors = {
    'username': '',
    'email': '',
    'firstname': '',
    'lastname': '',
    'role': ''
  }

  constructor() {}
}
