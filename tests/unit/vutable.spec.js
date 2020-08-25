import { shallowMount } from '@vue/test-utils'
import VuTable from '@/components/VuTable.vue'

describe('VuTable.vue', () => {

  it('renders props.columns when given an array', () => {

    const columns = ['id','name'];
    const wrapper = shallowMount(VuTable, {
      props: { columns, endpoint: null }
    })
    expect(wrapper.find('thead th:first-child').text()).toMatch(columns[0].toUpperCase())
    expect(wrapper.find('thead th:nth-child(2)').text()).toMatch(columns[1].toUpperCase())

  })


  it('it renders all columns from api schema when there is no columns prop data', () => {

    const columns = null
    const wrapper = shallowMount(VuTable, {
        props: { columns }
    });
    expect(wrapper.find('thead th:first-child').exists()).toBe(true)

  })


})
