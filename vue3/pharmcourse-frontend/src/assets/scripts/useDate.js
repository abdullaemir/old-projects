const reformatDate = (date) => (date < 10 ? `0${date}` : date);
const regexDateTime = (date) => {
  if (typeof date === "string") {
    return date.toString().replace(/ /g, "T");
  } else {
    return date;
  }
};
const convertTime = (date) => {
  if (date.toString().length === 10) {
    return date * 1000;
  } else {
    return date;
  }
};

const months = {
  ru: [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Майя",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

class UseDate {
  /**
   * Конвертирует дату в UTC.
   *
   * @param {string} date - Wed Jun 01 2022 22:33:34 GMT+0700 (Новосибирск, стандартное время)
   * @returns {string} - Wed, 01 Jun 2022 15:33:34 GMT
   */
  static convertDateToUTCString(date) {
    return new Date(date).toUTCString();
  }

  /**
   * Конвертирует unix timestamp в дату.
   *
   * @param {number} timestamp - 1654097614
   * @returns {Date} - Wed Jun 01 2022 22:33:34 GMT+0700 (Новосибирск, стандартное время)
   */
  static parseDateFromUnix(timestamp) {
    return new Date(timestamp * 1000);
  }

  /**
   * Возвращает текущую дату в мс с 1 января 1979 года.
   * @param {string} date - Wed Jun 01 2022 22:33:34 GMT+0700 (Новосибирск, стандартное время)
   * @returns {number} - 1654097862
   */
  static getCurrentTimestamp(date = "null") {
    if (date) {
      return Math.floor(new Date(regexDateTime(date)).getTime() / 1000);
    } else {
      return Math.floor(new Date().getTime() / 1000);
    }
  }

  /**
   * Возвращает отформатированный текущий день месяца.
   * @param {string} date - Wed Jun 01 2022 22:33:34 GMT+0700 (Новосибирск, стандартное время)
   * @param {boolean} full - Параметр, от которого зависит возврат даты, с 0 или без в начале даты
   * @returns {string}
   */
  static getDayNumber({ date = "", full = true }) {
    if (date) {
      const newDate = new Date(regexDateTime(convertTime(date))).getDate();
      if (full) {
        return reformatDate(newDate);
      } else {
        return newDate;
      }
    } else {
      return reformatDate(new Date().getDate());
    }
  }

  /**
   * Возвращает отформатированный текущий месяц.
   * @param {string} date - Wed Jun 01 2022 22:33:34 GMT+0700 (Новосибирск, стандартное время)
   * @returns {string}
   */
  static getMonth(date = "") {
    if (date) {
      return reformatDate(new Date(regexDateTime(convertTime(date))).getMonth());
    } else {
      return reformatDate(new Date().getMonth());
    }
  }

  /**
   * Возвращает отформатированный текущий год.
   * @param {string} date - Wed Jun 01 2022 22:33:34 GMT+0700 (Новосибирск, стандартное время)
   * @returns {number}
   */
  static getYear(date = "") {
    if (date) {
      return new Date(regexDateTime(convertTime(date))).getFullYear();
    } else {
      return new Date().getFullYear();
    }
  }

  /**
   * Возвращает отформатированный в строку текущий месяце.
   * @param {{date}} object - Date + location + свойство по которому возвращается заглавная ли первая буква upperCase
   * @returns {string}
   */
  static getMonthString(object = { location: "ru", date: "", upperCase: true }) {
    if (!object.location) {
      object.location = "ru";
    }

    if (!object.upperCase) {
      object.upperCase = true;
    }

    if (object.date) {
      const newDate = months[object.location][Number(UseDate.getMonth(object.date))];
      if (object.upperCase) {
        return newDate;
      } else {
        return newDate.toLowerCase();
      }
    } else {
      return months[location][Number(UseDate.getMonth())].toLowerCase();
    }
  }

  /**
   * Возвращает время в формате CC:HH.
   * @param {string} currentTime - currentTime
   * @returns {string}
   */
  static getCurrentTime(currentTime) {
    return currentTime.substring(11, 16);
  }

  /**
   * Возвращает отформатированную текущую дату.
   * @param {string} date - Wed Jun 01 2022 22:33:34 GMT+0700 (Новосибирск, стандартное время)
   * @returns {string} - 01.06.2022
   */
  static getCurrentDate(date = "") {
    if (date) {
      return `${UseDate.getDayNumber({ date: date })}.${UseDate.getMonth(date)}.${UseDate.getYear(date)}`;
    } else {
      return `${UseDate.getDayNumber()}.${UseDate.getMonth()}.${UseDate.getYear()}`;
    }
  }
}

export default UseDate;
