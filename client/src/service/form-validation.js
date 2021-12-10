export default {
  validateAlphanumeric: (text) => {
    return new RegExp('^[a-z0-9]+$', 'i').test(text)
  },
  validateAlphabet: (text) => {
    return new RegExp('^[a-z ]+$', 'i').test(text)
  },
  validateDate: (dateString) => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/
    if (!dateString || !dateString.match(regEx)) return false
    var d = new Date(dateString)
    var dNum = d.getTime()
    if (!dNum && dNum !== 0) return false
    return d.toISOString().slice(0, 10) === dateString
  }
}
