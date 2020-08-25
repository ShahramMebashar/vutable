import { shallowMount } from '@vue/test-utils'
import VuTable from '@/components/VuTable.vue'

describe('VuTable.vue', () => {

  it('renders props.columns when given an array', () => {

    const columns = ['id','name'];
    const wrapper = shallowMount(VuTable, {
      props: { columns }
    })
    expect(wrapper.find('thead th:first-child').text()).toMatch(columns[0].toUpperCase())
    expect(wrapper.find('thead th:last-child').text()).toMatch(columns[1].toUpperCase())

  })


  it('it doesn\'t render columns when thers is no array to columns prop', () => {

    const columns = null
    const wrapper = shallowMount(VuTable, {
        props: { columns }
    });
    expect(wrapper.find('thead th:first-child').exists()).toBe(false)

  })


})
