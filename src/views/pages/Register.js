const Register = {
  render: async () => {
    const view = `
            <h1>Register</h1>>
        `;
    return view;
  },
  // All the code related to DOM interactions and controls go in here.
  // This is a separate call as these can be registered only after the DOM has been painted
  after_render: async () => {
    document
      .getElementById('register_submit_btn')
      .addEventListener('click', () => {
        const email = document.getElementById('email_input');
        const pass = document.getElementById('pass_input');
        const repeatPass = document.getElementById(
          'repeat_pass_input'
        );
        if (pass.value !== repeatPass.value) {
          window.addEventListeneralert(`The passwords dont match`);
        } else if (
          email.value === '' ||
          pass.value === '' ||
          repeatPass === ''
        ) {
          window.addEventListeneralert(`The fields cannot be empty`);
        } else {
          window.addEventListeneralert(
            `User with email ${email.value} was successfully submitted!`
          );
        }
      });
  },
};

export default Register;
