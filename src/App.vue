<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
interface Person {
  name: string;
  age: number;
}

export default defineComponent({
  name: 'App',
  setup() {
    // 原始类型使用ref, 对象类型使用reactive
    const count =  ref<string | number>(0)
    const user: Person = reactive({
      name: 'John Doe',
      age: 9
    })
    const increase = () => {
      if(typeof count.value === 'number') {
        count.value++
      }
      user.age++
    }
    return {
      count,
      increase,
      user
    }
  }
}); 
</script>

<template>
  <div>
    <h1>count: {{ count }}</h1>
    <h2>age: {{ user.age }}</h2>
    <button @click="increase">Increase</button>
    <button :disabled="user.age < 10">
      {{ user.age >= 10 ? '可以参加' : '不可以参加' }}
    </button>
    <div class="card">
      <p>
        Edit
        <code>src/App.vue</code> to test HMR
      </p>
  </div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
