import Service from "@ember/service"
import { inject as service } from "@ember/service"

export default Service.extend({
  firebaseApp: service(), // initialized by emberfire
  storage: null,
  imagesRef: null,

  init () {
    this._super(...arguments)
    this.set("storage", this.firebaseApp.storage())
    this.set("imagesRef", this.storage.ref("images"))
  },

  upload (file) {
    if (file.size > 1048576) throw new Error("file size must be less than 1MB")
    let newFileName = (new Date()).getTime() + "." + file.name.split(".").pop()
    const fileRef = this.imagesRef.child(newFileName)
    const metadata = {
      contentType: file.type
    }
    return new Promise((resolve, reject) => {
      const uploadTask = fileRef.put(file, metadata)

      uploadTask.on("state_changed", (/* snapshot */) => {},
        error => {reject(error)},
        (/* success */) => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            resolve(downloadURL)
          })
        })
    })
  },
  delete (url) {
    const fileRef = this.storage.refFromURL(url)
    return fileRef.delete()
  }
})
