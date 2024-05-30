const state = () => ({
  isAppScrollable: true,
});

const mutations = {
  changeScrollability(state, value) {
    state.isAppScrollable = value;
    document.body.classList.toggle("non-scrollable", !value);
  },
};

export default {
  state,
  mutations,
  namespaced: true,
};
