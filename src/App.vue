<template>
  <div id="app">
    <h1>A new intuitive table</h1>
    <vu-table :columns="['id', 'title', 'body']"></vu-table>
  </div>
</template>

<script>
import VuTable from './components/VuTable';

export default {

  name: 'App',

  components: {
    VuTable
  },


}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1040px;
  width: 100%;
  margin-left: auto;
  margin-right: auto
}

</style>
