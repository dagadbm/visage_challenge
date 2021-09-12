<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import CreateCandidateForm from './CreateCandidateForm.vue';

const showForm = ref(false);
</script>

<template>
  <div class="candidate-card" @click="showForm= true">
    <Icon icon="carbon:add-filled" width="56" height="56"/>
  </div>
  <CreateCandidateForm v-if="showForm" @close="showForm = false" />
</template>

<style scoped lang="scss">
.candidate-card {
  padding: 56px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  justify-content: center;
  align-items: center;

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
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    display: block;
    margin-top: 1rem;
  }

  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.5s ease;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
}
</style>
