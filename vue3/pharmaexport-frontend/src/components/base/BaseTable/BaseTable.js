import {ref} from "vue"

export function useTable() {
  const sortsByFields = ref({})
  const sorts = ref({})

  const getTableSort = (sorts) => {
    const filteredSorts = Object.keys(sorts).reduce((acc,curr)=>{
      if (!sorts[curr]) return acc
      acc.push({field: curr, sort: sorts[curr]})
      return acc
    },[])

    return filteredSorts.length ? {orderBy: filteredSorts} : {}
  }

  const sortByField = (sortField) => {
    sortsByFields.value = {...sortsByFields.value, ...sortField}
    sorts.value = getTableSort(sortsByFields.value)
  }

  return {
    sortByField,
    sorts,
  }
}

