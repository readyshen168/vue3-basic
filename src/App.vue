<script setup lang="ts">
  import { ref, reactive, computed, watch, onMounted, onUpdated, useTemplateRef } from 'vue';
  import MyProfile from './components/MyProfile.vue';
  import useMousePosition from './hooks/useMousePosition';
  import useURLLoader from './hooks/useURLLoader';

  interface Person {
    name: string;
    age: number;
  }

  interface DogResult {
    message: string;
    status: string;
  }

  interface todoResult {
    title: string;
  }


  // 原始类型使用ref, 对象类型使用reactive
  const count =  ref<string | number>(0)
  // const headline = ref<null | HTMLElement>(null) // 声明联合类型
  const headline = useTemplateRef<null | HTMLElement>('headline') // 使用useTemplateRef
  const user: Person = reactive({
    name: 'John Doe',
    age: 9
  })

  const { x, y } = useMousePosition()

  // data:
  const dogURL = 'https://dog.ceo/api/breeds/image/random'
  const todoURL = 'https://jsonplaceholder.typicode.com/todos/1'
  //const { result, loading } = useURLLoader<DogResult>(dogURL)
  const { result, loading } = useURLLoader<todoResult>(todoURL)

  console.log('in setup', headline.value) // 在mounted之前，模板还没有渲染，所以headline的值是null
  onMounted(() => {
    console.log('mounted', headline.value?.innerHTML) //如果没有在ref中声明类型，这里会报错
  })
  onUpdated(() => {
    console.log('updated', document.getElementById('age')?.innerHTML)
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

  const onChange = (hidden: boolean) => {
    document.title = hidden ? 'hidden' : 'show'

  }

</script>

<template>
  <div>
    <h1>count: {{ count }}</h1>
    <h2 id="age" ref="headline">age: {{ user.age }}</h2>
    <button @click="increase">Increase</button>
    <button :disabled="buttonStatus.disabled">
      {{ buttonStatus.text }}
    </button>

    <MyProfile @change="onChange"/>
    <!-- :age后面可以传入js表达式，:age="20"，“20”也算是js表达式，但如果是“name”就不是-->

    <h1>X: {{ x }}</h1>
    <h1>Y: {{ y }}</h1>

    <div class="dog">
      <h1>Dog >></h1>
      <h1 v-if="loading"> loading... </h1>
      <h1 class = "result" v-if="!loading && result">{{ result.title }}</h1>
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
.dog .result {
  width:100%;
  text-align: center;
  margin-top: 20px;
}
</style>
