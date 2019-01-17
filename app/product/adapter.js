import FirebaseAdapter from "emberfire/adapters/firebase"
import { inject as service } from "@ember/service"

export default FirebaseAdapter.extend({
  fireStorage: service(),

  updateRecord (store, type, snapshot) {
    const _super = this._super
    return Promise.resolve()
      .then(() => {
        if (snapshot.record.file && snapshot.record.photo) {
          return this.fireStorage.delete(snapshot.record.photo)
        }
      })
      .then(() => {
        if (snapshot.record.file) {
          return this.fireStorage.upload(snapshot.record.file)
            .then(url => {
              snapshot.record.set("photo", url)
              snapshot.__attributes.photo = url
            })
        }
      })
      .then(() => {
        return _super.call(this, ...arguments)
      })
  },

  deleteRecord (store, type, snapshot) {
    const _super = this._super
    return Promise.resolve()
      .then(() => {
        if (snapshot.record.photo) {
          return this.fireStorage.delete(snapshot.record.photo)
            .catch(err => {
              const error = JSON.parse(err.serverResponse).error
              if(error.code !== 404) throw err
            })
        }
      })
      .then(() => {
        return _super.call(this, ...arguments)
      })
  }
})
