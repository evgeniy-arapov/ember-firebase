import Controller from "@ember/controller"
import { computed } from "@ember/object"

export default Controller.extend({
  currentProduct: null,
  inProgress: false,
  filter: "",
  filteredProducts: computed("model.@each.isNew", "filter", function () {
    // check isNew for recomputed
    const filter = this.get("filter").toLowerCase()
    return this.get("model").filter(el => {
      return !el.isNew && el.title && el.title.toLowerCase().includes(filter)
    })
  }),

  actions: {
    closeModal () {
      if (this.get("currentProduct")) {
        this.get("currentProduct").rollbackAttributes()
        this.set("currentProduct", null)
      }
    },
    showProduct (product) {
      this.set("currentProduct", product)
    },
    createProduct () {
      let newProduct = this.store.createRecord("product", {})
      this.set("currentProduct", newProduct)
    }
  }
})
