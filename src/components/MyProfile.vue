<template>
    <div>
        <h1>{{ user.name }}</h1>
        <h1>{{ user.age }}</h1>
        <h1>{{ doubleAge }}</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
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

        setup(props) {
            const doubleAge = computed(() => props.user.age * 2);
            return {
                doubleAge
            }
        }
    })

</script>


<style scoped></style>