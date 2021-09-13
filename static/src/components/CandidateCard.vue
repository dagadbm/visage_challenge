<script setup>
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
  candidate: Object,
});

const {
  name,
  jobTitle,
  notes,
  document,
} = props.candidate
</script>
<script>
export default {
  methods: {
    async downloadCV(event) {
      event.preventDefault();

      // if we dont have the document base64 on our props
      // this means we need to fetch it from the store first
      if (!this.document) {
        await this.$store.dispatch('fetchCandidate', this.candidate);
      }

      const base64Document = this.$store.state.candidates[this.candidate.id].document;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = `data:application/pdf;base64,${base64Document}`;
      downloadAnchor.download = `cv.pdf`;
      downloadAnchor.click();
    }
  },
}
</script>

<template>
  <div class="candidate-card">
    <h1>{{ name }}</h1>
    <h2>{{ jobTitle }}</h2>
    <p>{{ notes }}</p>
    <a @click="downloadCV" href="">Download CV</a>
  </div>
</template>

<style scoped lang="scss">
.candidate-card {
  min-height: 320px;
  min-width: 320px;
  padding: 24px 48px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  background-color: #faf9f8;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  flex-flow: column;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.4);
  }

  h1, h2, p {
    margin: 0;
  }

  h1 {
    font-weight: 600;
    font-size: 20px;
    color: #00b074;
  }
  h2 {
    font-weight: 300;
    font-size: 16px;
    margin-bottom: 24px;
    font-style: italic;
    color: #868c94;
  }

  p {
    font-weight: 400;
    font-size: 16px;
    flex-grow: 1;
    color: #868c94;
    margin-bottom: 24px;
  }

  a {
    font-style: italic;
    color: #0b132a;
    text-decoration: none;
  }
}
</style>
