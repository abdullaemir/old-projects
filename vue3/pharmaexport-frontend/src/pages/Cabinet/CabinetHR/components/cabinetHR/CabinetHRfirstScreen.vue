<template>
  <div class="first-screen">
    <div class="first-screen__title-box">
      <CabinetTitle class="first-screen__title">
        HR
      </CabinetTitle>
      <p class="first-screen__desc">
        Post vacancies and find healthcare professionals for your business
      </p>
      <BaseButton
        class="first-screen__button"
        href="#request-tariff"
        :modifiers="['medium', 'round', 'purple']"
        type="submit"
        @click.prevent="useScrollIntoView"
      >
        Yalla!
      </BaseButton>
    </div>
    <div class="first-screen__container-img">
      <div class="first-screen__img-box">
        <img
          alt="HR image excellence"
          height="100%"
          src="../../assets/images/hr-first-screen.png"
          width="100%"
        />
        <div class="card-excellence card-excellence__professionals">
          <p class="card-excellence__title card-excellence__title_pink">
            +200 000
          </p>
          <p class="card-excellence__desc">
            healthcare professionals <br />
            on platform
          </p>
        </div>
        <div class="card-excellence card-excellence__countries">
          <p class="card-excellence__desc">
            Users from over <br />
            <span class="card-excellence__title card-excellence__title-countries card-excellence__title_blue">35</span>
            countries
          </p>
        </div>
        <div class="card-excellence card-excellence__candidate">
          <p class="card-excellence__desc">
            Complete information <br />
            about each candidate
          </p>
        </div>
        <div class="card-excellence card-excellence__search">
          <p class="card-excellence__desc">
            Easy of use and quick search
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScrollIntoView } from "@pg/helpers";

import BaseButton from "~/components/base/BaseButton.vue";
import CabinetTitle from "~/pages/Cabinet/components/CabinetTitle.vue";
</script>

<style scoped>
.first-screen {
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .first-screen {
    margin-bottom: 60px;
  }
}

@media (min-width: 1280px) {
  .first-screen {
    margin-bottom: 20px;
  }
}

@media (min-width: 1280px) {
  .first-screen {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

.first-screen__title-box,
.first-screen__container-img {
  flex: 1;
}

.first-screen__title {
  color: var(--pink);
}

.first-screen__desc {
  max-width: 600px;
  margin-bottom: 32px;
  font-weight: 300;
  font-size: 20px;
  line-height: 1.75;
}

@media (min-width: 768px) {
  .first-screen__desc {
    margin-bottom: 52px;
    font-size: 32px;
    line-height: 1.4;
  }
}

@media (min-width: 1280px) {
  .first-screen__desc {
    max-width: 400px;
    font-size: 25px;
  }
}

@media (min-width: 1370px) {
  .first-screen__desc {
    font-size: 32px;
  }
}

.first-screen__button {
  max-width: 100%;
}

@media (min-width: 540px) {
  .first-screen__button {
    width: auto;
  }
}

.first-screen__container-img {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

@media (min-width: 768px) {
  .first-screen__container-img {
    margin-bottom: 40px;
  }
}

@media (min-width: 1280px) {
  .first-screen__container-img {
    justify-content: flex-start;
    margin-bottom: 0;
    padding-right: 30px;
  }
}

.first-screen__img-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  width: 100%;
}

@media (min-width: 1280px) {
  .first-screen__img-box {
    max-width: 500px;
  }
}

.card-excellence {
  position: absolute;
  display: none;
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0 50px rgb(0 89 193 / 0.1);
}

@media (min-width: 768px) {
  .card-excellence {
    display: block;
  }
}

.card-excellence__title {
  font-weight: 600;
  font-size: 32px;
}

.card-excellence__title_pink {
  color: var(--pink);
}

.card-excellence__title_blue {
  color: #009fe3;
}

.card-excellence__desc {
  color: #04202f;
}

.card-excellence__professionals {
  top: 90px;
  left: -90px;
}

.card-excellence__countries {
  top: 180px;
  right: -80px;
}

.card-excellence__candidate {
  bottom: 68px;
  left: -100px;
}

.card-excellence__search {
  right: -70px;
  bottom: 10px;
}

.card-excellence__title-countries {
  margin-right: 5px;
}

@media (min-width: 1280px) {
  .card-excellence__professionals {
    top: 90px;
    left: -70px;
  }

  .card-excellence__countries {
    top: 180px;
    right: -40px;
  }

  .card-excellence__candidate {
    bottom: 88px;
    left: -90px;
  }

  .card-excellence__search {
    right: -10px;
    bottom: 0;
  }
}
</style>
