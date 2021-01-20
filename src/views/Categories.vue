<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  data: () => ({
    categories: [],
    loading: true,
  }),
  methods: {
    addNewCategory(newCategory) {
      this.categories.push(newCategory)

      console.log('cats', this.categories)
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: {
    CategoryCreate,
    CategoryEdit,
  },
}
</script>
