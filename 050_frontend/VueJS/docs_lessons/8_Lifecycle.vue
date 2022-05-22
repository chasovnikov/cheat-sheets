Элемент будет выставлен на this.$refs как this.$refs.p

<script type="module">
import { createApp } from "vue";

createApp({
    mounted() {
        this.$refs.p.textContent = "mounted!";
    },
}).mount("#app");
</script>

<div id="app">
  <p ref="p">hello</p>
</div>
