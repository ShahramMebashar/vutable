<template>
  <div class="vutable-wrapper">
    <table class="vutable">
      <!-- Header consist of columns which we can select from columns -->
      <thead class="vutable__header">
        <tr>
          <th v-for="column in upperCaseColumns" :key="column" class="vutable__header-column">{{ column }}</th>
        </tr>
      </thead>

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


  mounted() {
   //

  },


  computed: {

    upperCaseColumns() {
      let columns = [];
      if(this.columns && this.columns.length > 0) {
       columns = this.columns;
      }
      return columns.map( column => column.toString().toUpperCase() );
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
