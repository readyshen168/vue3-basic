<template>
    <div>
        <h1>{{ name }}</h1>
        <h1>{{ age }}</h1>
        <h1>{{ doubleAge }}</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

    export default defineComponent({
        name: 'MyProfile',
        props: {
            name: {
                type: String,
                required: true
            },

            age:{
                type:Number,
                required:true
            }
        },

        setup(props) {
            const doubleAge = computed(() => props.age * 2);
            return {
                doubleAge
            }
        }
    })

</script>


<style scoped></style>