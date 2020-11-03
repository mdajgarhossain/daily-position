<template>
  <div id="app" class="container">
    <div class="header text-center">
      <h1 class="display-4">Daily Position</h1>
      <div id="nav">
        <router-link to="/">Cash</router-link> |
        <router-link to="/income">Income</router-link> |
        <router-link to="/expense">Expense</router-link>
        <!-- LOGIN Modal button -->
        <b-button
          v-b-modal.modal-prevent-closing
          pill
          variant="outline-secondary"
          class="login-button"
          @click="showLoginForm = true"
          >LOGIN</b-button
        >
      </div>

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
              <b-button size="md" variant="success" @click="ok()">
                LOGIN
              </b-button>
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
    </div>
    <div class="row d-flex justify-content-center my-4 py-2 rounded shadow">
      <div class="col-12">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Authentication from "./components/Authentication/Authentication";
export default {
  components: {
    Authentication,
  },
  data() {
    return {
      isNavitemActive: false,
      email: "",
      password: "",
      emailState: null,
      passwordState: null,
      submittedEmails: [],
      submittedPassword: [],
      showLoginForm: false,
      showRegisterForm: false,
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
    //Modal functionality
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
#app {
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  padding: 5px;
}

#nav a.router-link-exact-active {
  color: #42b983;
  text-decoration: underline;
}
.header .login-button {
  margin-left: 90px;
  font-size: 17px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
