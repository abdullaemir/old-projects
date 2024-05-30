
const Telega = require("./telega")

class TelegaFeedback extends Telega{

  name
  phone
  email

  rules() {
    return [
      {
        name: "name",
        validator: "required"
      },
      {
        name: "email",
        validator: "isEmail"
      }
    ]
  }

  attributeTitle() {
    return {
      name: "Имя"
    }
  }

  run(){
    if (this.validate() === false) return

    if (this.phone == null && this.email == null) {
      this.addError("Телефон или e-mail должны быть заполнены", "phone")
      return
    }
    if (this.email == null) this.email = "-"
    if (this.phone == null) this.phone = "-"
    const body = `<b>Обратнная форма</b>
Имя: <b>${this.name}</b>
email: <b>${this.email}</b>
Телефон: <b>${this.phone}</b>
`
    this.send(body)



  }

}

module.exports = TelegaFeedback
