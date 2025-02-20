<template>
    <div>
        <h1>{{ user.name }}</h1>
        <h1 v-show="!hidden">{{ user.age }}</h1>
        <h1>{{ doubleAge }}</h1>
        <button @click="toggleHidden">{{ hidden? "显示" : "隐藏" }}</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import type { PropType } from 'vue';

interface Person {
  name: string;
  age: number;
}

    export default defineComponent({
        name: 'MyProfile',
        props: {
            user:{
                type: Object as PropType<Person>,
                required: true

            }
        },

        emits: ['change'],
        setup(props, ctx) {
            const hidden = ref(false);
            const toggleHidden = () => {
                hidden.value = !hidden.value;
                ctx.emit('change', hidden.value);
            }
            const doubleAge = computed(() => props.user.age * 2);
            return {
                doubleAge,
                toggleHidden,
                hidden
            }
        }
    })

</script>


<style scoped></style>