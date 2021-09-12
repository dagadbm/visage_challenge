<script setup>
import { useStore } from 'vuex';
import CandidatesList from './components/CandidatesList.vue';

const store = useStore();
store.dispatch('fetchCandidates');

</script>

<template>
  <CandidatesList />
</template>

<style>
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
</style>
