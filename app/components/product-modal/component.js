import Component from "@ember/component"
import { computed } from "@ember/object"

export default Component.extend({
  isModalOpen: computed("product", function () {
    return this.product !== null
  }),

  actions: {
    showImage (files) {
      if (files && files[0]) {
        let FR = new FileReader();
        FR.addEventListener("load", e => {
          this.set("product.newPhoto", e.target.result);
        });
        FR.readAsDataURL( files[0] );
        this.set("product.file", files[0])
      }
    }
  }
})
