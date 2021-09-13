<script setup>
import CandidateCard from './CandidateCard.vue';
import CreateCandidateCard from './CreateCandidateCard.vue';
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore();
const candidates = computed(() => store.getters.candidates);

</script>
<script>

</script>

<template>
  <main class="candidates-list">
    <CreateCandidateCard />
    <CandidateCard v-for="candidate in candidates" :key="candidate.id"
      :candidate="candidate"
    />
  </main>
</template>

<style scoped lang="scss">
.candidates-list {
  display: grid;
  grid-gap: 48px;
  grid-template-columns: repeat(auto-fill, minmax(320px, auto));
  padding: 56px;
}
</style>
