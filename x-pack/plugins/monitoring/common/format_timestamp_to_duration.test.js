/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import moment from 'moment';
import { formatTimestampToDuration } from './format_timestamp_to_duration';
import { CALCULATE_DURATION_SINCE, CALCULATE_DURATION_UNTIL } from './constants';

const testTime = moment('2010-05-01'); // pick a date where adding/subtracting 2 months formats roundly to '2 months 0 days'
const getTestTime = () => moment(testTime); // clones the obj so it's not mutated with .adds and .subtracts

/**
 * Test the moment-duration-format template
 */
describe('formatTimestampToDuration', () => {
  describe('format timestamp to duration - time since', () => {
    it('should format timestamp to human-readable duration', () => {
      // time inputs are a few "moments" extra from the time advertised by name
      const fiftyNineSeconds = getTestTime().subtract(59, 'seconds');
      expect(
        formatTimestampToDuration(fiftyNineSeconds, CALCULATE_DURATION_SINCE, getTestTime())
      ).toBe('59 seconds');

      const fiveMins = getTestTime().subtract(5, 'minutes').subtract(30, 'seconds');
      expect(formatTimestampToDuration(fiveMins, CALCULATE_DURATION_SINCE, getTestTime())).toBe(
        '6 mins'
      );

      const sixHours = getTestTime().subtract(6, 'hours').subtract(30, 'minutes');
      expect(formatTimestampToDuration(sixHours, CALCULATE_DURATION_SINCE, getTestTime())).toBe(
        '6 hrs 30 mins'
      );

      const sevenDays = getTestTime()
        .subtract(7, 'days')
        .subtract(6, 'hours')
        .subtract(18, 'minutes');
      expect(formatTimestampToDuration(sevenDays, CALCULATE_DURATION_SINCE, getTestTime())).toBe(
        '7 days 6 hrs 18 mins'
      );

      const eightWeeks = getTestTime()
        .subtract(8, 'weeks')
        .subtract(7, 'days')
        .subtract(6, 'hours')
        .subtract(18, 'minutes');
      expect(formatTimestampToDuration(eightWeeks, CALCULATE_DURATION_SINCE, getTestTime())).toBe(
        '2 months 2 days'
      );

      const oneHour = getTestTime().subtract(1, 'hour'); // should trim 0 min
      expect(formatTimestampToDuration(oneHour, CALCULATE_DURATION_SINCE, getTestTime())).toBe(
        '1 hr'
      );

      const oneDay = getTestTime().subtract(1, 'day'); // should trim 0 hrs
      expect(formatTimestampToDuration(oneDay, CALCULATE_DURATION_SINCE, getTestTime())).toBe(
        '1 day'
      );

      const twoMonths = getTestTime().subtract(2, 'month'); // should trim 0 days
      expect(formatTimestampToDuration(twoMonths, CALCULATE_DURATION_SINCE, getTestTime())).toBe(
        '2 months'
      );
    });
  });

  describe('format timestamp to duration - time until', () => {
    it('should format timestamp to human-readable duration', () => {
      // time inputs are a few "moments" extra from the time advertised by name
      const fiftyNineSeconds = getTestTime().add(59, 'seconds');
      expect(
        formatTimestampToDuration(fiftyNineSeconds, CALCULATE_DURATION_UNTIL, getTestTime())
      ).toBe('59 seconds');

      const fiveMins = getTestTime().add(10, 'minutes');
      expect(formatTimestampToDuration(fiveMins, CALCULATE_DURATION_UNTIL, getTestTime())).toBe(
        '10 mins'
      );

      const sixHours = getTestTime().add(6, 'hours').add(30, 'minutes');
      expect(formatTimestampToDuration(sixHours, CALCULATE_DURATION_UNTIL, getTestTime())).toBe(
        '6 hrs 30 mins'
      );

      const sevenDays = getTestTime().add(7, 'days').add(6, 'hours').add(18, 'minutes');
      expect(formatTimestampToDuration(sevenDays, CALCULATE_DURATION_UNTIL, getTestTime())).toBe(
        '7 days 6 hrs 18 mins'
      );

      const eightWeeks = getTestTime()
        .add(8, 'weeks')
        .add(7, 'days')
        .add(6, 'hours')
        .add(18, 'minutes');
      expect(formatTimestampToDuration(eightWeeks, CALCULATE_DURATION_UNTIL, getTestTime())).toBe(
        '2 months 2 days'
      );

      const oneHour = getTestTime().add(1, 'hour'); // should trim 0 min
      expect(formatTimestampToDuration(oneHour, CALCULATE_DURATION_UNTIL, getTestTime())).toBe(
        '1 hr'
      );

      const oneDay = getTestTime().add(1, 'day'); // should trim 0 hrs
      expect(formatTimestampToDuration(oneDay, CALCULATE_DURATION_UNTIL, getTestTime())).toBe(
        '1 day'
      );

      const twoMonths = getTestTime().add(2, 'month'); // should trim 0 days
      expect(formatTimestampToDuration(twoMonths, CALCULATE_DURATION_UNTIL, getTestTime())).toBe(
        '2 months'
      );
    });
  });
});
