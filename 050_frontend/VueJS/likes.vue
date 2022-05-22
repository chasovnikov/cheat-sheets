<template>
    <button @click="addLike">like</button>
    <button @click="addDisLike">dislike</button>
    <div>Работает1! {{ likes }}</div>
    <div>Работает2! {{ dislikes }}</div>
</template>
<script>
export default {
    data() {
        return {
            likes: 0,
            dislikes: 0,
        };
    },
    methods: {
        addLike() {
            this.likes += 1;
        },
        addDisLike() {
            this.dislikes += 1;
        },
    },
};
</script>
<style></style>
