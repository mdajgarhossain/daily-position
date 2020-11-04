<template>
  <!--Strat LOGIN Modal-->
  <b-modal
    id="login-modal"
    ref="login"
    title="LOGIN"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleLogin"
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
        <b-button size="md" variant="success" @click="ok()"> LOGIN </b-button>
        <p>
          Not registered ?
          <!-- <a @click="(showLoginForm = false) && (showRegisterForm = true)"
                  >Create an account</a
                > -->
          <b-button
            v-b-modal.register-modal
            pill
            variant="outline-secondary"
            class="login-button"
            @click="toggleModal(false, true)"
            >Create an account</b-button
          >
        </p>
      </div>
    </template>
  </b-modal>
  <!-- End LOGIN Modal -->
</template>

<script>
export default {
  props: {
    showLoginForm: {
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
        this.$bvModal.hide("login-modal");
      });
    },
    toggleModal(showLoginForm, showRegisterForm) {
      //   console.log(showLoginForm, showRegisterForm);
      this.$emit("toggleModal", showLoginForm, showRegisterForm);
    },
  },
};
</script>

<style>
</style>