<template>
  <!-- Start REGISTER Modal -->
  <b-modal
    id="register-modal"
    ref="register"
    title="REGISTER"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleRegister"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <!-- Email -->
      <b-form-group
        :state="emailState"
        label="Email"
        label-for="email-input"
        invalid-feedback="Email is required"
      >
        <b-form-input
          id="email-input"
          v-model="email"
          :state="emailState"
          required
        ></b-form-input>
      </b-form-group>
      <!-- Password -->
      <b-form-group
        :state="passwordState"
        label="Password"
        label-for="password-input"
        invalid-feedback="Password is required"
      >
        <b-form-input
          id="password-input"
          v-model="password"
          :state="passwordState"
          required
        ></b-form-input>
      </b-form-group>
    </form>
    <!-- Modal Footer -->
    <template #modal-footer="{ ok }">
      <!-- Emulate built in modal footer ok button actions -->
      <div class="footer">
        <b-button size="md" variant="success" @click="ok()">
          REGISTER
        </b-button>
        <!-- <p>
          <a @click="toggleModal(true, false)">Already have an account?</a>
        </p> -->
        <b-button
          v-b-modal.login-modal
          pill
          variant="outline-secondary"
          class="login-button"
          @click="toggleModal(true, false)"
          >Already have an account?</b-button
        >
      </div>
    </template>
  </b-modal>
  <!-- End REGISTER Modal -->
</template>

<script>
export default {
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
    handleRegister(bvModalEvt) {
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
        this.$bvModal.hide("register-modal");
      });
    },
    // handleRegister() {},
    toggleModal(showLoginForm, showRegisterForm) {
      //   console.log(showLoginForm, showRegisterForm);
      this.$emit("toggleModal", showLoginForm, showRegisterForm);
    },
  },
};
</script>

<style>
</style>