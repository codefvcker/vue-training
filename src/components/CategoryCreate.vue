<template
  ><div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.reuqired }"
          />
          <label for="name">Название</label>
          <span
            v-if="$v.title.$dirty && !$v.title.reuqired"
            class="helper-text invalid"
            >Введите название</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            v-model.number="limit"
            type="number"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">Лимит</label>
          <span
            v-if="$v.limit.$dirty && !$v.limit.minValue"
            class="helper-text invalid"
            >Минимальная величина
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    title: '',
    limit: 1,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(1) },
  },
  mounted() {
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit,
        })

        this.title = ''
        this.limit = 1
        this.$v.reset()
        this.$message('Category was created!')

        this.$emit('created', category)
      } catch (e) {}
    },
  },
}
</script>
