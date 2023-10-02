import { ITest } from '@/models/test'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useTestsStore = defineStore('tests', () => {
  const tests = ref<ITest[]>([])

  function update(newTests: ITest[]): void {
    tests.value = newTests
  }

  return { tests, update }

})
