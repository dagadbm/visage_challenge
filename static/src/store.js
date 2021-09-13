import { createStore } from 'vuex'

export const store = createStore({
  state: {
    candidates: {},
  },
  getters: {
    candidates(state) {
      return Object.values(state.candidates);
    },
  },
  mutations: {
    setCandidates (state, candidates) {
      state.candidates = candidates;
    },
    setCandidate (state, candidate) {
      state.candidates[candidate.id] = candidate;
    },
  },
  actions: {
    async fetchCandidates (context) {
      const candidates = await fetch(`${import.meta.env.VITE_API_HOST_URL}/api/v1/candidates`)
        .then(response => response.json());
      context.commit('setCandidates', candidates);
    },
    async fetchCandidate (context, candidate) {
      const fetchedCandidate = await fetch(`${import.meta.env.VITE_API_HOST_URL}/api/v1/candidates/${candidate.id}`)
        .then(response => response.json());
      context.commit('setCandidate', fetchedCandidate);
    },
    async createCandidate (context, candidate) {
      const newCandidate = await fetch(`${import.meta.env.VITE_API_HOST_URL}/api/v1/candidates`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(candidate),
      }).then(response => response.json());

      context.commit('setCandidate', newCandidate);
    },
    async updateCandidate (context, candidate) {
      const updatedCandidate = await fetch(`${import.meta.env.API_HOST_URL}/api/v1/candidates/${candidate.id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(candidate),
      }).then(response => response.json());

      if (updatedCandidate) {
        context.commit('setCandidate', updatedCandidate);
      }
    },
  },
});
