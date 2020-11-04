<template>
  <div>
    <!--Strat LOGIN Modal-->
    <b-modal
      v-if="showLoginForm"
      id="modal-prevent-closing"
      ref="modal"
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
              v-b-modal.modal-prevent-closing
              pill
              variant="outline-secondary"
              class="login-button"
              @click="showModal"
              >Create an account</b-button
            >
          </p>
        </div>
      </template>
    </b-modal>
    <!-- End LOGIN Modal -->
    <!-- Start REGISTER Modal -->
    <b-modal
      v-if="showRegisterForm"
      id="modal-prevent-closing"
      ref="register-modal"
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
          <p>
            <a @click="(showLoginForm = true) && (showRegisterForm = false)"
              >Already have an account?</a
            >
          </p>
        </div>
      </template>
    </b-modal>
    <!-- End REGISTER Modal -->
  </div>
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
    showModal() {
      // this.$refs["register-modal"].show();
      this.showLoginForm = false;
      this.showRegisterForm = true;
    },
    handleRegister() {},
  },
};
</script>

<style>
</style>