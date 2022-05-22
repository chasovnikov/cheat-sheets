<script type="module">
import { createApp } from "vue";
import ChildComp from "./ChildComp.js";

createApp({
    components: {
        ChildComp,
    },
    data() {
        return {
            childMsg: "No child msg yet",
        };
    },
}).mount("#app");
</script>

<div id="app">
  <child-comp @response="(msg) => childMsg = msg"></child-comp>
  <p>{{ childMsg }}</p>
</div>

// in child component export default { // declare emitted events emits:
['response'], created() { // emit with argument this.$emit('response', 'hello
from child') } }
