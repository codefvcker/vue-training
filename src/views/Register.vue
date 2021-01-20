<template>
  <form @submit.prevent="submitHandler" class="card auth-card">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
          >Cant be empty!</small
        >
        <small
          v-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
          >Must be an email!</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          class="validate"
          v-model="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
          >Cant be empty!</small
        >
        <small
          class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.minLength"
          >Should be more than {{ $v.password.$params.minLength.min }} symbols.
          {{ lastLength }} yet.</small
        >
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          class="validate"
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
        />
        <label for="name">Имя</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
          >Name</small
        >
      </div>
      <p>
        <label>
          <input
            v-model="agree"
            :class="{ invalid: !$v.agree.required }"
            type="checkbox"
          />
          <span>С правилами согласен</span>
          <!-- <span v-if="!$v.agree.required">U have to agree!</span> -->
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: '',
  }),
  validations: {
    email: { email, required },
    password: { minLength: minLength(6), required },
    name: { required },
    agree: { checked: v => v },
  },
  computed: {
    lastLength() {
      return this.$v.password.$params.minLength.min - this.password.length
    },
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    },
  },
}
</script>
