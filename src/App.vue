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
        <!-- Login Modal goes here -->
        <AuthForm :showLoginForm="showLoginForm" />
        <!-- Register Modal goes here -->
        <AuthForm :showRegisterForm="showRegisterForm" />
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
import AuthForm from "./components/Authentication/AuthForm";
export default {
  components: {
    AuthForm,
  },
  data() {
    return {
      isNavitemActive: false,
      showLoginForm: false,
      showRegisterForm: false,
    };
  },
  methods: {},
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
