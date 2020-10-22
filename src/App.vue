<template>
  <div id="app" class="container">
    <div class="header text-center">
      <h1 class="display-4">Daily Position</h1>
      <div id="nav">
        <router-link to="/">Cash</router-link> |
        <router-link to="/income">Income</router-link> |
        <router-link to="/expense">Expense</router-link>
        <!-- <router-link to="/about">About</router-link> -->
      </div>
    </div>
    <div class="row d-flex justify-content-center my-4 py-2 rounded shadow">
      <div class="col-12">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
/* #app {
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
