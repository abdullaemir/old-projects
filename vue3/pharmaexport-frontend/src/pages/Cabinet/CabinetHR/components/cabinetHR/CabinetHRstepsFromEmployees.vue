<template>
  <div class="steps">
    <p class="steps__title">
      Where to start looking for employees?
    </p>
    <p class="steps__desc">
      And if there are any questions our managers will help you
    </p>

    <div class="steps__container">
      <div class="steps__box">
        <picture>
          <source
            media="(max-width: 768px)"
            :srcset="getImg('hr-steps-sm.svg')"
            type="image/svg+xml"
          />
          <img
            alt="HR steps"
            class="steps__img"
            :src="getImg('hr-steps.svg')"
          />
        </picture>
        <div
          v-for="itemStep in dataSteps"
          :key="itemStep.id"
          class="step-item"
          :class="[`step-item__${itemStep.step}`]"
        >
          <p class="step-item__title">
            STEP
            <span
              class="step-item__title"
              :class="[`step-item__title_${itemStep.titleColor}`]"
            >{{ itemStep.step }}</span>
          </p>
          <p class="step-item__desc">
            {{ itemStep.desc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const dataSteps = [
  {
    desc: "You choose option that suits you and pay",
    id: "hr_step_1",
    step: "1",
    titleColor: "pink",
  },
  {
    desc: "You describe who is needed",
    id: "hr_step_2",
    step: "2",
    titleColor: "light-blue",
  },
  {
    desc: "Vacancies will be published on PharmaCourses platform in “Find a Job” service",
    id: "hr_step_3",
    step: "3",
    titleColor: "blue",
  },
  {
    desc: "Choose the best  employees  among those who responded",
    id: "hr_step_4",
    step: "4",
    titleColor: "orange",
  },
];

const getImg = (name) => {
  const path = `../../assets/images/${name}`;
  const modules = import.meta.globEager("../../assets/images/*");

  return modules[path].default;
};
</script>

<style scoped>
.steps {
  margin-bottom: 160px;
}

@media (min-width: 768px) {
  .steps {
    margin-bottom: 40px;
  }
}

.steps__title {
  margin-bottom: 8px;
  font-weight: 300;
  font-size: 20px;
  line-height: 1.75;
}

.steps__desc {
  margin-bottom: 70px;
}

@media (min-width: 768px) {
  .steps__title {
    margin-bottom: 4px;
    font-size: 24px;
    line-height: 1.88;
  }

  .steps__desc {
    margin-bottom: 20px;
  }
}

.steps__container {
  display: flex;
  justify-content: flex-start;
}

@media (min-width: 768px) {
  .steps__container {
    justify-content: center;
  }
}

.steps__box {
  position: relative;
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .steps__box {
    max-width: 400px;
    width: 100%;
  }
}

@media (min-width: 1280px) {
  .steps__box {
    max-width: 470px;
  }
}

.steps__img {
  position: absolute;
  top: -40px;
  left: 100px;
  width: 440px;
  height: 940px;
}

@media (min-width: 768px) {
  .steps__img {
    position: static;
    width: 100%;
    height: 100%;
  }
}

.step-item {
  margin-bottom: 47px;
  padding-top: 52px;
}

@media (min-width: 768px) {
  .step-item {
    position: absolute;
    margin-bottom: 0;
  }
}

.step-item__title {
  margin: 8px 0;
  font-weight: 600;
  font-size: 20px;
}

.step-item__title_pink {
  color: var(--pink);
}

.step-item__title_light-blue {
  color: #009fe3;
}

.step-item__title_blue {
  color: #0066ff;
}

.step-item__title_orange {
  color: #ff4f13;
}

@media (min-width: 1280px) {
  .step-item__title {
    margin: 8px 0 4px;
    font-size: 24px;
  }

  .step-item__desc {
    font-size: 16px;
  }
}

.step-item__1 .step-item__desc {
  max-width: 160px;
}

.step-item__2 .step-item__desc {
  max-width: 104px;
}

.step-item__3 .step-item__desc {
  max-width: 184px;
}

.step-item__4 .step-item__desc {
  max-width: 160px;
}

@media (min-width: 1024px) {
  .step-item__1 .step-item__desc,
  .step-item__2 .step-item__desc,
  .step-item__3 .step-item__desc,
  .step-item__4 .step-item__desc {
    max-width: 210px;
  }
}

.step-item__1 {
  top: 3%;
  left: -38%;
  width: fit-content;
  background: no-repeat top left url("../../assets/icons/hr-step-1.svg");
}

.step-item__2 {
  top: 15%;
  left: 100%;
  width: fit-content;
  background: no-repeat top left url("../../assets/icons/hr-step-2.svg");
}

.step-item__3 {
  top: 39%;
  left: -38%;
  width: fit-content;
  background: no-repeat top left url("../../assets/icons/hr-step-3.svg");
}

.step-item__4 {
  bottom: 9%;
  left: 100%;
  width: fit-content;
  background: no-repeat top left url("../../assets/icons/hr-step-4.svg");
}

@media (min-width: 1024px) {
  .step-item__1 {
    top: 2%;
    left: -45%;
    width: fit-content;
  }

  .step-item__2 {
    top: 15%;
    left: 110%;
    width: fit-content;
  }

  .step-item__3 {
    top: 39%;
    left: -45%;
    width: fit-content;
  }

  .step-item__4 {
    bottom: 12%;
    left: 110%;
    width: fit-content;
  }
}

@media (min-width: 1280px) {
  .step-item__1 {
    top: 4%;
    left: -45%;
    width: fit-content;
  }

  .step-item__2 {
    top: 16%;
    left: 110%;
    width: fit-content;
  }

  .step-item__3 {
    top: 41%;
    left: -45%;
    width: fit-content;
  }

  .step-item__4 {
    bottom: 13%;
    left: 110%;
    width: fit-content;
  }
}
</style>
