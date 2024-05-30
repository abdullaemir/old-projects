<template>
  <div @wheel="scrollToSlide">
    <div
      :class="`slide-group-${index + 1}`"
      v-for="(slideGroup, index) in slideGroups"
      :key="`slide-group-${index}`"
    >
      <Component
        :ref="slide"
        :is="`Slide${slide}`"
        :data-slide="slide"
        v-for="(slide, index) in slideGroup"
        :key="`slide-${index}`"
        @openModal="switchModalFormVisibility(true)"
      />
    </div>
    <BaseModal
      :isVisible="isModalFormVisible"
      @close="switchModalFormVisibility(false)"
    >
      <h3 class="slide-modal__title">Остались вопросы или желаете записаться на консультацию?</h3>
      <p class="slide-modal__description">Оставьте контакты и я свяжусь с Вами в ближайшее время</p>
      <FormSend class="slide-modal__form-send" />
    </BaseModal>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import BaseModal from "~/components/base/BaseModal.vue";

import Slide1 from "~/components/index/Slide1.vue";
import Slide2 from "~/components/index/Slide2.vue";
import Slide3 from "~/components/index/Slide3.vue";
import Slide4 from "~/components/index/Slide4.vue";
import Slide5 from "~/components/index/Slide5.vue";
import Slide6 from "~/components/index/Slide6.vue";
import Slide7 from "~/components/index/Slide7.vue";

import FormSend from "~/components/FormSend.vue";

export default {
  components: {
    BaseModal,
    Slide1,
    Slide2,
    Slide3,
    Slide4,
    Slide5,
    Slide6,
    Slide7,
    FormSend: FormSend,
  },
  data () {
    return {
      slideGroups: [
        [
          1,
        ],
        [
          2,
          3,
          4,
          5,
          6,
          7,
        ],
      ],
      isScrolling: false,
    };
  },
  computed: {
    ...mapState({
      slideCount: (state) => state.slide.slideCount,
      isAppScrollable: (state) => state.scroll.isAppScrollable,
      isModalFormVisible: (state) => state.modalForm.isModalFormVisible,
    }),
  },
  methods: {
    ...mapMutations({
      changeSlideCount: "slide/changeSlideCount",
      switchModalFormVisibility: "modalForm/switchModalFormVisibility",
    }),
    scrollToSlide (event) {
      if (
        !this.isAppScrollable
        || this.$mq === "mobile"
        || this.$mq === "tablet"
      ) return;

      const currentSlide = this.slideCount;
      const slideToScroll = event.wheelDeltaY > 0 ? currentSlide - 1 : currentSlide + 1;

      event.preventDefault();

      if (
        !this.isScrolling
        && slideToScroll > 0
        && slideToScroll <= 7
      ) {
        this.isScrolling = true;
        this.changeSlideCount(slideToScroll);
      }
    },
  },
  watch: {
    slideCount () {
      this.$refs[this.slideCount][0].$el.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => this.isScrolling = false, 500);
    },
  },
};
</script>

<style>
.slide-group-2 {
  background-image: url("~/assets/images/background--mobile.jpg");
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .slide-group-2 {
    background-image: url("~/assets/images/background--tablet.jpg");
  }
}

@media (min-width: 1024px) {
  .slide-group-2 {
    background-image: url("~/assets/images/background--laptop.jpg");
  }
}

@media (min-width: 1920px) {
  .slide-group-2 {
    background-image: url("~/assets/images/background--desktop.jpg");
  }
}

@media (min-width: 1024px) {
  .slide {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
  }
}

.slide__title {
  margin: 0;
  padding-top: 70px;
  font-size: 26px;
  font-weight: 500;
  line-height: 1;
}

@media (min-width: 768px) {
  .slide__title {
    padding-top: 60px;
    font-size: 32px;
  }
}

@media (min-width: 1024px) {
  .slide__title {
    padding-top: 0;
  }
}

@media (min-width: 1920px) {
  .slide__title {
    font-size: 42px;
  }
}

.slide__title--gold {
  display: block;
  font-size: 40px;
  color: var(--text-color-secondary);
}

@media (min-width: 768px) {
  .slide__title--gold {
    font-size: 50px;
  }
}

@media (min-width: 1920px) {
  .slide__title--gold {
    font-size: 70px;
  }
}

.slide-modal__title {
  margin: 0 0 9px;
  text-align: center;
  font-size: 14px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

@media (min-width: 1280px) {
  .slide-modal__title {
    margin-bottom: 13px;
    font-size: 24px;
  }
}

.slide-modal__description {
  margin: 0 0 15px;
  text-align: center;
  font-weight: 300;
  letter-spacing: 0.04em;
}

@media (min-width: 1280px) {
  .slide-modal__description {
    margin-bottom: 35px;
    font-size: 24px;
  }
}

.slide-modal__form-send {
  display: grid;
  grid-row-gap: 15px;
}
</style>
