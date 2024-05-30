const state = () => ({
  isModalFormVisible: false,
});

const mutations = {
  switchModalFormVisibility(state, value) {
    state.isModalFormVisible = value;
  },
};

export default {
  state,
  mutations,
  namespaced: true,
};
