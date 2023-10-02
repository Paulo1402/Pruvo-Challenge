import { ITest } from '@/models/test'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useTestsStore = defineStore('tests', () => {
  const tests = ref<ITest[]>([])

  function update(newTests: ITest[]): void {
    tests.value = newTests
  }

  function getTest(id: string): ITest | undefined {
    return tests.value.find(test => test.id === id)
  }

  return { tests, update, getTest }

})
