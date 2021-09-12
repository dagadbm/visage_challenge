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
  <div class="candidates-list">
    <CreateCandidateCard />
    <template
      v-for="candidate in candidates" :key="candidate.id">
      <CandidateCard
      :name="candidate.name"
      :jobTitle="candidate.jobTitle"
      :notes="candidate.notes"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.candidates-list {
  display: grid;
  grid-gap: 48px;
  grid-template-columns: repeat( auto-fit, minmax(320px, 1fr) );
  padding: 56px;
}
</style>
