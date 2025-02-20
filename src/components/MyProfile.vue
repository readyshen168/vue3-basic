<template>
    <div>
        <h1>{{ user.name }}</h1>
        <h1 v-show="!hidden">{{ user.age }}</h1>
        <h1>{{ doubleAge }}</h1>
        <button @click="toggleHidden">{{ hidden? "显示" : "隐藏" }}</button>
    </div>
</template>

<script setup lang="ts">
    import { type PropType, computed, ref } from 'vue';
    interface IPerson {
        name: string;
        age: number;
    }

    const props = defineProps({
        user: {
            type: Object as PropType<IPerson>,
            required: true
        }
    });

    const emit = defineEmits(['change']);

    const hidden = ref(false);
    const toggleHidden = () => {
        hidden.value = !hidden.value;
        emit('change', hidden.value);
    }
    const doubleAge = computed(() => props.user.age * 2);
</script>


<style scoped></style>