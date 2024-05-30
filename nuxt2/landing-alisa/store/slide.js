const state = () => ({
  slideCount: 1,
});

const mutations = {
  changeSlideCount(state, slide) {
    state.slideCount = slide;
  },
};

export default {
  state,
  mutations,
  namespaced: true,
};
