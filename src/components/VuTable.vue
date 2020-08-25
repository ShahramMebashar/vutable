<template>


  <div class="vutable-wrapper">

    <table class="vutable">


      <thead class="vutable__header">
        <tr>
          <th
            v-for="column in resolvedColumns"
            :key="column.id"
            class="vutable__column vutable__header-column"
            @click="sortBy(column)"
          >
          {{ uppercase(column.name) }}
          </th>
          <th></th>
        </tr>
      </thead>


      <tbody>
          <tr v-for="row in sortableRows" :key="row.id" class="vutable__row">
            <td v-for="column in resolvedColumns" :key="column.id" class="vutable__column">{{ row[column.name] }}</td>
            <td class="vutable__column">
              <div class="vutable__column-actions">
                <button class="btn btn--delete" @click="actionClick($event, 'delete', row)">D</button>
                <button class="btn btn--edit" @click="actionClick($event, 'edit', row)">E</button>
              </div>
            </td>
          </tr>
      </tbody>


    </table>

  </div>


</template>

<script>
export default {



  name: 'VueTable',


  //========================
  // Props
  //========================

  props: {

    columns: {
      type: Array,
      default: null
    },
    endpoint: {
      type: String
    },

  },


  //========================
  // Data
  //========================

  data(){
    return {
      apiColumns: null,
      rows: null,
      sortByColumn: null,
      sortDirection: 'asc'
    }
  },

  //========================
  // Created hook of Vue
  //========================

  async created() {

   //Call api and grab all columns
   if(this.endpoint) {

    try {
       const data = await this.getData();
       this.rows = data;

       if( (!this.columns || this.columns.length == 0)) {
         this.apiColumns = Object.keys(data[0]);
       }
     } catch (e) {
       console.error(e);
     }

   }


  },

  //========================
  // Computed data
  //========================

  computed: {

    resolvedColumns() {

      let columns = [];

      if(this.columns && this.columns.length > 0) {
       columns = this.columns.map( column => column);
      }

      if(this.apiColumns && this.apiColumns.length > 0) {
        columns = this.apiColumns.map( (column, index) => ({id: index, name: column, sortable: true}));
      }

      return columns;
    },

    sortableRows() {
      if(!this.rows) return;

      let rows = this.rows;
      if(this.sortByColumn) {
        rows = rows.sort(this.sort)
      }
      return rows;
    }


  },

  //========================
  // Emits event
  //========================

  emits: ['delete', 'edit'],


  //========================
  // Methods
  //========================

  methods: {

    async getData() {
      let response = await fetch(this.endpoint);
      return await response.json();
    },

    sort(rowA, rowB) {
      let modifier = 1;
      if (this.sortDirection === 'desc') modifier = -1;

      if(rowA[this.sortByColumn] > rowB[this.sortByColumn]) return 1 * modifier;
      if(rowA[this.sortByColumn] < rowB[this.sortByColumn]) return -1 * modifier;
      return 0;
    },

    sortBy(column) {
      if(!column.sortable) return;

      if(this.sortByColumn === column.name) {
        return this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      }

      this.sortByColumn = column.name;
    },

    actionClick(e, actionType, row) {
      console.log('fire event: ' + actionType )
      this.$emit(actionType, row);
    },

    uppercase: function (value) {
      return value.toString().toUpperCase();
    },

    limit(str, length = 100) {
      return str.substr(0, length) + '...';
    }

  }




}
</script>


<style lang="scss" scoped>
  $delete: #e74c3c;
  $edit: #3498db;
  .vutable-wrapper {
    overflow: hidden;
    box-shadow: 0 2px 3px rgba(0,0,0, .16);
  }

  .vutable {
    border-collapse: collapse;
    min-width: 100%;
    border-radius: 15px;
    background: white;

    &__column{
      border-bottom: 1px solid #f4f4f4;
      padding: 12px 16px;
      text-align: left;

      &-actions {
        display: flex;
        align-items: center
      }
    }

    &__row {
      padding: 16px 0;
    }

  }

  .vutable__header {
    background: #ecf0f1;

    &-column {
      font-size: 14px;
      font-weight: normal;
    }

  }

 .btn {
  display: inline-block;
  line-height: 1;
  padding: 8px 16px;
  user-select: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition: .3s;
  background: none;
  border-radius: 8px;
  outline: none;

  &:focus, &:focus-within {
    border-color: #34495e;
  }

  &--default:hover {
    background: #f6f6f6;
    color: #333;
  }

  &--delete {
    color: #fff;
    background: $delete;
    margin-right: 4px;
  }

  &--edit {
    color: #fff;
    background: $edit;
  }

 }


</style>
