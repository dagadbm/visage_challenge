<script setup>
import { useStore } from 'vuex';
import Header from './components/Header.vue';
import CandidatesList from './components/CandidatesList.vue';

const store = useStore();
store.dispatch('fetchCandidates');

</script>

<template>
  <Header />
  <CandidatesList />
</template>

<style>
html {
  box-sizing: border-box;
}
body {
  margin: 0;
}
*, *:before, *:after {
  box-sizing: inherit;
}
</style>
