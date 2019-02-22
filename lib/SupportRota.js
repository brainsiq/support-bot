const assert = require('assert');
const moment = require('moment');

const getNextWeekDay = day => {
    let nextDay = day.clone().add(1, 'day');
    let dayOfWeek = nextDay.day();

    while([0, 6].includes(dayOfWeek)) {
      nextDay.add(1, 'day');
      dayOfWeek = nextDay.day();
    }

    return nextDay;
};

class SupportRota {
  constructor(options) {
    assert.ok(options.startDate, 'options.startDate is required');
    assert.ok(moment(options.startDate).isValid(), 'options.startDate must be a valid date');
    assert.ok(options.devs, 'options.devs is required');
    assert.ok(Array.isArray(options.devs) && options.devs.length > 0, 'options.devs should be an array of length > 0');

    this.startDate = options.startDate;
    this.devs = options.devs;
  }

  getCalendar(numberOfDays = 5) {
    // TODO: check https://www.gov.uk/bank-holidays.json ?
    const calendar = new Array();
    let devIndex = 0;
    let nextDay = moment(this.startDate);

    for (let i = 0; i < numberOfDays; i++) {
      calendar.push({ date: nextDay.format('DD/MM/YYYY'), dev: this.devs[devIndex] });

      devIndex += 1;

      if (devIndex >= this.devs.length) {
        devIndex = 0;
      }

      nextDay = getNextWeekDay(nextDay);
    }

    return calendar;
  }
}

module.exports = SupportRota;
