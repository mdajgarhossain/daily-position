<template>
  <div></div>
</template>

<script>
export default {
  name: "AuthForm",
  props: {
    showLoginForm: {
      type: Boolean,
      default: false,
    },
    showRegisterForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: "",
      password: "",
      emailState: null,
      passwordState: null,
      submittedEmails: [],
      submittedPassword: [],
    };
  },
  computed: {
    itemToBeSaved() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },
  methods: {
    //Login Modal functionality
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.emailState = valid;
      this.passwordState = valid;
      return valid;
    },
    resetModal() {
      this.email = "";
      this.password = "";
      this.emailState = null;
      this.passwordState = null;
    },
    handleLogin(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the email to submitted emails
      this.submittedEmails.push(this.email);
      // Push the password to submitted passwords
      this.submittedPassword.push(this.password);
      console.log(this.itemToBeSaved);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    //Register Modal functionality
    // showModal() {
    //   // this.$refs["register-modal"].show();
    //   this.showLoginForm = false;
    //   this.showRegisterForm = true;
    // },
    handleRegister() {},
    showRegisterModal(showLoginForm, showRegisterForm) {
      console.log(showLoginForm, showRegisterForm);
      this.$emit("showRegisterModal", showLoginForm, showRegisterForm);
    },
  },
};
</script>

<style>
</style>