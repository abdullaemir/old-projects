
const Model = require("../core/Model")

class Telega extends Model{


  _token = '5196854298:AAEdN7EuEcWQd7rvD8WXnmGeZABfNtgofyM'
  _chatId = '-772407366'

  _getToken() {
    return this._token
  }
  _getChatId() {
    return this._chatId
  }

  setToken(token){
    this._token = token
  }
  setChatId(chatId){
    this._chatId = chatId
  }


  async send(body) {
    const data = {
      parse_mode: "html",
      chat_id: this._getChatId(),
      text: body
    }

    const url = 'https://api.telegram.org/bot' + this._getToken() + '/sendMessage'
    console.log(data)
    console.log(url)

    try {
      const result = await this.axios.post(url, data)
    } catch (e) {
      this.addError(e.message)
      console.error("error: ", e.message)
    }



  }
}

module.exports = Telega
