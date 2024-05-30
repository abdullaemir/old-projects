const axios = require("axios")
const Path = require('path')
const fsLib = require('fs')
const NodeCache = require('node-cache')
const validator = require('validator')



class Model {
  axios = axios
  path = Path
  fs = fsLib.promises
  validator = validator
  cache = new NodeCache()

  errors = []
  errorsFld = []

  resetAttributes() {
    for (const key in this) {
      if (key[0] == "_") continue
      if (key === 'fs') continue
      if (key === 'db') continue
      if (key === 'query') continue
      if (key === 'path') continue
      if (key === 'axios') continue
      if (key === 'cache') continue
      if (key === 'validator') continue
      if (key === 'user') continue
      this[key] = null
    }
    this.errors = []
    this.errorsFld = []
  }

  setAttributes(params, user) {
    if (user) this.user = user
    this.resetAttributes()
    for (const key in this) {
      if (params[key]) {
        this[key] = params[key]
      }
    }
  }

  rules() {
    return []
  }
  attributeTitle() {
    return {}
  }

  addError(str, fld) {
    if (fld !== null) this.errorsFld.push(fld)
    this.errors.push(str)
  }

  hasErrors(){
    return this.errors.length > 0 ? true : false
  }

  validate() {
    this.errors = []
    this.errorsFld = []
    let flagReturn = true
    const rules = this.rules()
    for (const i in rules) {
      let flagError = false
      const key = rules[i].name ?? null
      const attributeTitle = this.attributeTitle()
      const title = attributeTitle[key] ?? key
      if (!this.hasOwnProperty(key)) {
        this.errors.push(`${title} должно быть заполнено`)
        flagReturn = false
        flagError = true
      }
      let validators = rules[i].validators ?? null
      if (validators === null) {
        const validator = rules[i].validator ?? null
        if (validator !== null) validators = [validator]
      }
      if (Array.isArray(validators)) {
        for(const i in validators) {
          const validator = validators[i]
          if (validator === "required") {
            if (this.validatorRequired(this[key]) === false) {
              this.errors.push(`${title} должно быть заполнено`)
              flagReturn = false
              flagError = true
              break
            }
          }

          if (validator === "isArray") {
            if (Array.isArray(this[key]) === false) {
              this.errors.push(`${title} должно быть заполнено массивом`)
              flagReturn = false
              flagError = true
              break
            }
          }

          if (validator === "isEmail") {
            if (this.validatorRequired(this[key]) !== false) {
              if (this.validator.isEmail(this[key]) === false) {
                this.errors.push(`${title} должно быть заполнено корректным значением e-mail`)
                flagReturn = false
                flagError = true
                break
              }
            }

          }
        }
      }

      if (flagError === true) {
        this.errorsFld.push(key)
      }

    }

    return flagReturn;
  }

  validatorRequired(name) {
    if (name === null || typeof name == "undefined") return false
    else return true
  }

  log(content, filename) {
    if (typeof filename == "undefined") filename = "log.txt"
    content = new Date().toJSON() + "\n" + content + "\n\n"
    this.fs.writeFile(__dirname + '/../tmp/' + filename, content, {flag: 'a+'}, (err) => {
    })
  }

  logError(content) {
    if (!this.errors) this.errors = []
    this.errors.push(content)
    content = `ERROR - ${content}`
    this.log(content, 'log-error.txt')
  }

}


module.exports = Model
