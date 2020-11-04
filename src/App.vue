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
          v-b-modal.login-modal
          pill
          variant="outline-secondary"
          class="login-button"
          @click="showLoginForm = true"
          >LOGIN</b-button
        >
      </div>

      <div>
        <!-- Login Modal goes here -->
        <LoginForm v-if="showLoginForm" @toggleModal="showRegisterModal" />
        <!-- Register Modal goes here -->
        <RegisterForm @toggleModal="showLoginModal" />
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
import LoginForm from "./components/Authentication/LoginForm";
import RegisterForm from "./components/Authentication/RegisterForm";
export default {
  components: {
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      isNavitemActive: false,
      showLoginForm: false,
      showRegisterForm: false,
    };
  },
  methods: {
    showRegisterModal(showLoginForm, showRegisterForm) {
      this.$bvModal.show("register-modal");
      this.$bvModal.hide("login-modal");
    },
    showLoginModal(showLoginForm, showRegisterForm) {
      this.$bvModal.show("login-modal");
      this.$bvModal.hide("register-modal");
    },
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
