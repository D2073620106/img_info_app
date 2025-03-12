
  /**
  * 大小转换
  * @param {*} size
  * @returns
  */
  export const getSize = size => {
    if (!size) return ''
    const sizes = ['KB', 'MB', 'GB', 'TB']
    size = size / 1024
    while (sizes.length) {
      if (size < 1024) {
        return size.toFixed(2) + sizes[0]
      }
      sizes.shift()
      size = size / 1024
    }
    return ''
  }
