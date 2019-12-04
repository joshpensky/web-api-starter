import { ADD_NOTE, CREATE_NOTE, FETCH_NOTES, NOTES, SET_NOTES } from 'store/types';
import { api } from 'utils';
import { MODULES } from 'utils/constants';

export default {
  name: MODULES.NOTES,
  state: {
    [NOTES]: [],
  },
  mutations: {
    [SET_NOTES]: (state, payload) => ({
      ...state,
      [NOTES]: payload,
    }),
    [ADD_NOTE]: (state, payload) => ({
      ...state,
      [NOTES]: [...state[NOTES], payload],
    }),
  },
  actions: {
    [FETCH_NOTES]: async ({ commit }) => {
      const notes = await api.get('/notes');
      commit(SET_NOTES, notes);
    },
    [CREATE_NOTE]: async ({ commit }, text) => {
      const body = { text };
      const note = await api.post('/notes', { body });
      commit(ADD_NOTE, note);
    },
  },
};
