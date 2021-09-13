<script setup>
import { useStore } from 'vuex';
import { ref, unref } from 'vue';

const store = useStore();
const name = ref('');
const jobTitle = ref('');
const notes = ref('');
const base64CV = ref('');
const emit = defineEmits(['close']);

function onUploadCV (event) {
  const reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload = () => {
    const base64String = reader.result
      .replace('data:', '')
      .replace(/^.+,/, '');
    base64CV.value = base64String;
  };
}

function onSubmit (event) {
  store.dispatch('createCandidate', {
    name: unref(name),
    jobTitle: unref(jobTitle),
    notes: unref(notes),
    document: unref(base64CV),
  });

  emit('close');
  event.preventDefault();
  return false;
}
</script>

<template>
  <teleport to="body">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <h1>Create Candidate</h1>

        <form action="" @submit="onSubmit">
          <label for="name">Name</label>
          <input name="name" type="text" v-model="name" required/>

          <label for="jobTitle">Job Title</label>
          <input name="jobTitle" type="text" v-model="jobTitle" required/>

          <label for="notes">Notes</label>
          <textarea name="notes" v-model="notes" required/>

            <label for="cv">Upload CV</label>
            <input name="cv" type="file" @change="onUploadCV" accept="application/pdf" required/>

            <div class="form-buttons">
              <button class="modal-default-button" type="reset" @click="$emit('close')">
                Cancel
              </button>
              <button class="modal-default-button" type="submit">
                Submit
              </button>
            </div>
        </form>
      </div>
    </div>
  </div>
  </teleport>
</template>

<style scoped lang="scss">
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
  width: 50vw;
  margin: 0 auto;
  padding: 56px;
  background-color: #faf9f8;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  font-family: 'Open Sans', sans-serif;
  display: flex;
  flex-flow: column;
}

h1 {
  color: #00b074;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 16px;
}

form {
  font-size: 16px;
  display: flex;
  flex-flow: column;
  flex-grow: 1;

  label {
    color: #868c94;
  }

  input, textarea {
    margin-bottom: 16px;
    color: #0b132a;
  }
  textarea {
    resize: vertical;
  }

  .form-buttons {
    display: flex;
    justify-content: flex-end;

    button {
      color: #0b132a;
    }

    button:first-child {
      margin-right: 8px;
    }
  }
}
</style>
