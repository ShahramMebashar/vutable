<template>


  <div class="vutable-wrapper">

    <table class="vutable">

      <thead class="vutable__header">
        <tr>
          <th v-for="column in resolvedColumns" :key="column" class="vutable__header-column">{{ uppercase(column) }}</th>
        </tr>
      </thead>
      <tbody>

      </tbody>

    </table>

  </div>


</template>

<script>
export default {



  name: 'VueTable',



  props: {
    columns: {
      type: Array,
      default: null
    }
  },



  data(){
    return {
      apiColumns: null
    }
  },



  async created() {

   //Call api and grab all columns
   if(!this.columns || this.columns.length == 0) {

     try {
       const response = await fetch('https://jsonplaceholder.typicode.com/posts');
       const data =  await response.json();
       this.apiColumns = Object.keys(data[0]);
     } catch (e) {
       console.error(e);
     }

   }

  },


  computed: {

    resolvedColumns() {

      let columns = [];

      if(this.columns && this.columns.length > 0) {
       columns = this.columns;
      }

      if(this.apiColumns && this.apiColumns.length > 0) {
        columns = this.apiColumns;
      }

      return columns;
    }

  },



  methods: {

    uppercase: function (value) {
      return value.toString().toUpperCase();
    }

  }




}
</script>


<style lang="scss" scoped>

  .vutable-wrapper {}

  .vutable {
    border-collapse: collapse;
    width: 100%;
    border-radius: 15px;
    background: white;

    & th, & td {
      border-bottom: 1px solid #e8e8e8;
      padding: 8px 16px;
      text-align: left;
    }

  }

  .vutable__header {
    background: #fcfcfc;

    &-column {
      font-size: 14px;
      font-weight: normal;
    }


  }



</style>
