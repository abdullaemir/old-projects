
class CoreHttp {
  errors
  errorsFld
  successStr
  infoStr

  reset(){
    this.errors = null
    this.errorsFld = null
    this.successStr = null
    this.infoStr = null
  }

  setErrors(Model) {
    this.errors = null
    this.errorsFld = null
    if (Model.errors && Model.errors.length && Model.errors.length > 0) {
      this.errors = Model.errors
    }
    if (Model.errorsFld && Model.errorsFld.length && Model.errorsFld.length > 0) {
      this.errorsFld = Model.errorsFld
    }
  }

  response(res, data) {
    let prms = {result: data, success: true}
    if (this.successStr) prms.successStr = this.successStr
    if (this.infoStr) prms.infoStr = this.infoStr
    if (!this.errors) res.json(prms)
    else {
      res.status(400).json({errors: this.errors, errorsFld: this.errorsFld, success: false})
    }
  }
}


module.exports = CoreHttp
