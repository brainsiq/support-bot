const { AssertionError } = require('assert');
const test = require('ava');
const SupportRota = require('../lib/SupportRota');

const supportRota = new SupportRota({
  startDate: '2019-02-04',
  devs: ['developer1','developer2','developer3','developer4']
});

test('returns a calendar of support for the next 5 days', t => {
  const rota = supportRota.getCalendar();

  t.deepEqual(rota, [
    { date: '04/02/2019', dev: 'developer1' },
    { date: '05/02/2019', dev: 'developer2' },
    { date: '06/02/2019', dev: 'developer3' },
    { date: '07/02/2019', dev: 'developer4' },
    { date: '08/02/2019', dev: 'developer1' }
  ]);
});

test('returns a calendar of support for the next N days excluding weekends', t => {
  const rota = supportRota.getCalendar(10);

  t.deepEqual(rota, [
    { date: '04/02/2019', dev: 'developer1' },
    { date: '05/02/2019', dev: 'developer2' },
    { date: '06/02/2019', dev: 'developer3' },
    { date: '07/02/2019', dev: 'developer4' },
    { date: '08/02/2019', dev: 'developer1' },
    { date: '11/02/2019', dev: 'developer2' },
    { date: '12/02/2019', dev: 'developer3' },
    { date: '13/02/2019', dev: 'developer4' },
    { date: '14/02/2019', dev: 'developer1' },
    { date: '15/02/2019', dev: 'developer2' },
  ]);
});

test('throws a useful error when passed no start date', t => {
  t.throws(() => new SupportRota({ devs: ['developer1'] }), AssertionError, 'options.startDate is required');
});

test('throws a useful error when passed no list of devs', t => {
  t.throws(() => new SupportRota({ startDate: '2019-02-04' }), AssertionError, 'options.devs is required');
});

test('throws a useful error when passed an invalid start date', t => {
  t.throws(() => new SupportRota({
    startDate: '2019-02-31',
    devs: ['developer1']
  }), AssertionError, 'options.startDate is an invalid date');
});

test('throws a useful error when passed an invalid type for devs', t => {
  t.throws(() => new SupportRota({ startDate: '2019-02-04', devs: 1 }), AssertionError, 'options.devs should be an array of length > 0');
});

test('throws a useful error when passed an empty array for devs', t => {
  t.throws(() => new SupportRota({ startDate: '2019-02-04', devs: [] }), AssertionError, 'options.devs should be an array of length > 0');
});

test('it returns the next day on support for a given developer');
test('it changes the dev when there is an exception');
