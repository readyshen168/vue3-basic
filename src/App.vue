<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from 'vue';
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
    const buttonStatus = computed(() => {
      return {
        text: user.age >= 10 ? '可以参加' : '不可以参加',
        disabled: user.age < 10
      }
    })// 访问buttonStatus的值：buttonStatus.value

    // 监听数组：
    watch([count, () => user.age], (newValue, oldValue) => {
      console.log('old age', oldValue)
      console.log('new age', newValue)
      document.title = `目前点击数是：${newValue[0]}`
      console.log('the dom', document.getElementById('age')?.innerHTML)
    }, { flush: 'post' })// 默认是pre, 回调函数默认在视图更新前执行

    const increase = () => {
      if(typeof count.value === 'number') {
        count.value++
      }
      user.age++
    }
    return {
      count,
      increase,
      user,
      buttonStatus
    }
  }
}); 
</script>

<template>
  <div>
    <h1>count: {{ count }}</h1>
    <h2 id="age">age: {{ user.age }}</h2>
    <button @click="increase">Increase</button>
    <button :disabled="buttonStatus.disabled">
      {{ buttonStatus.text }}
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
