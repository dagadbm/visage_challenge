<script setup>
import { ref } from 'vue'

defineProps({
  name: String,
  jobTitle: String,
  notes: String,
})

const count = ref(0)
</script>

<template>
  <div class="candidate-card">
    <h1>{{ name }}</h1>
    <h2>{{ jobTitle }}</h2>
    <p>{{ notes }}</p>
    <a>CV</a>
  </div>
</template>

<style scoped lang="scss">
.candidate-card {
  min-height: 320px;
  min-width: 320px;
  padding: 24px 48px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  font-family: 'Open Sans', sans-serif;
  display: flex;
  flex-flow: column;

  &::after {
    content: '';
    border-radius: 8px;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  &:hover::after {
    opacity: 1;
  }

  h1, h2, p {
    margin: 0;
  }

  h1 {
    font-weight: 600;
    font-size: 20px;
  }
  h2 {
    font-weight: 300;
    font-size: 16px;
    margin-bottom: 24px;
  }

  p {
    font-weight: 400;
    font-style: italic;
    font-size: 16px;
    flex-grow: 1;
  }
}
</style>
