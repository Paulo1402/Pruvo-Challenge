import { Test } from '@/models/test'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useTestsStore = defineStore('tests', () => {
  const tests = ref<Test[]>([])

  function update(newTests: Test[]): void {
    tests.value = newTests
  }

  function getTest(id: string): Test | undefined {
    return tests.value.find(test => test.id === id)
  }

  return { tests, update, getTest }

})
