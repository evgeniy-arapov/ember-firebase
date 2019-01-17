import Route from "@ember/routing/route"

export default Route.extend({

  model () {
    return this.store.findAll("product")
  },

  actions: {
    saveProduct (product) {
      if(this.controller.inProgress) return false
      this.controller.set("inProgress", true)
      return product.save()
        .then(() => {
          this.controller.set("currentProduct", null)
          this.controller.set("inProgress", false)
        })
    },
    deleteProduct (product) {
      if(this.controller.inProgress) return false
      this.controller.set("inProgress", true)
      product.destroyRecord()
        .then(() => {
          this.controller.set("currentProduct", null)
          this.controller.set("inProgress", false)
        })
    }
  }
})
