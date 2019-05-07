<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  body {
    background: #f5f5f5;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: #66b1ff;
  }

  p {
    margin: 0
  }

  html {
    font-size: 20px;
  }
  .avatar span {
    margin-right: 10px;
}

</style>
