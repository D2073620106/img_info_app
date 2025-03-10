import { formConfig } from '@/duxui/components/Form/config'
import { user, cmsUser, upload, uploadTempFile } from './utils'

const createUpload = _upload => {
  return (...arg) => {
    let task
    const callbacks = {}
    const promise = new Promise(async (resolve, reject) => {
      try {
        // if (!user.isLogin()) {
        //   await user.login()
        // }
        task = _upload(...arg)
          .progress(e => callbacks.progress?.(e))
          .start(() => callbacks.start?.())
        const res = await task
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
    promise.progress = callback => {
      callbacks.progress = callback
      return promise
    }
    promise.start = callback => {
      callbacks.start = callback
      return promise
    }
    promise.abort = () => task?.abort()
    return promise
  }
}

formConfig.setConfig({
  upload: createUpload(upload),
  uploadTempFile: createUpload(uploadTempFile)
})

export default {}
