<template>
  <section
    class="center fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
  >
    <slot></slot>
  </section>
</template>

<script lang="ts">
export default {
  name: "Overlay",
};
</script>
