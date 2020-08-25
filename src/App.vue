<template>
  <div id="app">
    <h1>A new intuitive table</h1>
    <vu-table
    :columns="[
      {id: 0, name: 'id', sortable: false},
      {id: 1, name: 'title', sortable: true},
      {id: 2, name: 'userId', sortable: true}
    ]"
    endpoint="https://jsonplaceholder.typicode.com/posts"
    @delete="deleteHandler"
    @edit="deleteHandler"
    >
    </vu-table>
  </div>
</template>

<script>
import VuTable from './components/VuTable';

export default {

  name: 'App',

  components: {
    VuTable
  },

  methods: {

    deleteHandler(row) {
      console.log({
        id: row.id,
        title: row.title
      });
      console.log('send delete api call for post id ' + row.id );
    }

  }


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
