<script setup>
const { images } = useImagesStore();

defineProps({
  image: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <img
    class="image"
    :src="images[`/assets/images/${image}`]"
    alt=""
  />
</template>
