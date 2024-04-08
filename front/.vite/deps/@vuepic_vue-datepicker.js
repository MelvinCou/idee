import {
  Fragment,
  Teleport,
  Transition,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  createTextVNode,
  createVNode,
  defineComponent,
  getCurrentScope,
  guardReactiveProps,
  h,
  isRef,
  mergeProps,
  nextTick,
  normalizeClass,
  normalizeProps,
  normalizeStyle,
  onBeforeUpdate,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  reactive,
  ref,
  render,
  renderList,
  renderSlot,
  resolveDynamicComponent,
  toDisplayString,
  toRef,
  unref,
  useSlots,
  vShow,
  watch,
  withCtx,
  withDirectives,
  withKeys,
  withModifiers
} from "./chunk-GU3YDFVY.js";
import {
  __publicField
} from "./chunk-TYRVL62N.js";

// node_modules/date-fns/toDate.mjs
function toDate(argument) {
  const argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
    return new argument.constructor(+argument);
  } else if (typeof argument === "number" || argStr === "[object Number]" || typeof argument === "string" || argStr === "[object String]") {
    return new Date(argument);
  } else {
    return /* @__PURE__ */ new Date(NaN);
  }
}

// node_modules/date-fns/constructFrom.mjs
function constructFrom(date, value) {
  if (date instanceof Date) {
    return new date.constructor(value);
  } else {
    return new Date(value);
  }
}

// node_modules/date-fns/addDays.mjs
function addDays(date, amount) {
  const _date = toDate(date);
  if (isNaN(amount))
    return constructFrom(date, NaN);
  if (!amount) {
    return _date;
  }
  _date.setDate(_date.getDate() + amount);
  return _date;
}

// node_modules/date-fns/addMonths.mjs
function addMonths(date, amount) {
  const _date = toDate(date);
  if (isNaN(amount))
    return constructFrom(date, NaN);
  if (!amount) {
    return _date;
  }
  const dayOfMonth = _date.getDate();
  const endOfDesiredMonth = constructFrom(date, _date.getTime());
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth
    );
    return _date;
  }
}

// node_modules/date-fns/add.mjs
function add(date, duration) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  } = duration;
  const _date = toDate(date);
  const dateWithMonths = months || years ? addMonths(_date, months + years * 12) : _date;
  const dateWithDays = days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;
  const minutesToAdd = minutes + hours * 60;
  const secondsToAdd = seconds + minutesToAdd * 60;
  const msToAdd = secondsToAdd * 1e3;
  const finalDate = constructFrom(date, dateWithDays.getTime() + msToAdd);
  return finalDate;
}

// node_modules/date-fns/addMilliseconds.mjs
function addMilliseconds(date, amount) {
  const timestamp = +toDate(date);
  return constructFrom(date, timestamp + amount);
}

// node_modules/date-fns/constants.mjs
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
var minTime = -maxTime;
var millisecondsInWeek = 6048e5;
var millisecondsInDay = 864e5;
var millisecondsInMinute = 6e4;
var millisecondsInHour = 36e5;
var millisecondsInSecond = 1e3;
var secondsInHour = 3600;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;

// node_modules/date-fns/addHours.mjs
function addHours(date, amount) {
  return addMilliseconds(date, amount * millisecondsInHour);
}

// node_modules/date-fns/_lib/defaultOptions.mjs
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}

// node_modules/date-fns/startOfWeek.mjs
function startOfWeek(date, options) {
  var _a, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/startOfISOWeek.mjs
function startOfISOWeek(date) {
  return startOfWeek(date, { weekStartsOn: 1 });
}

// node_modules/date-fns/getISOWeekYear.mjs
function getISOWeekYear(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const fourthOfJanuaryOfNextYear = constructFrom(date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  const fourthOfJanuaryOfThisYear = constructFrom(date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/startOfDay.mjs
function startOfDay(date) {
  const _date = toDate(date);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.mjs
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds()
    )
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

// node_modules/date-fns/differenceInCalendarDays.mjs
function differenceInCalendarDays(dateLeft, dateRight) {
  const startOfDayLeft = startOfDay(dateLeft);
  const startOfDayRight = startOfDay(dateRight);
  const timestampLeft = +startOfDayLeft - getTimezoneOffsetInMilliseconds(startOfDayLeft);
  const timestampRight = +startOfDayRight - getTimezoneOffsetInMilliseconds(startOfDayRight);
  return Math.round((timestampLeft - timestampRight) / millisecondsInDay);
}

// node_modules/date-fns/startOfISOWeekYear.mjs
function startOfISOWeekYear(date) {
  const year = getISOWeekYear(date);
  const fourthOfJanuary = constructFrom(date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

// node_modules/date-fns/addQuarters.mjs
function addQuarters(date, amount) {
  const months = amount * 3;
  return addMonths(date, months);
}

// node_modules/date-fns/addYears.mjs
function addYears(date, amount) {
  return addMonths(date, amount * 12);
}

// node_modules/date-fns/isDate.mjs
function isDate(value) {
  return value instanceof Date || typeof value === "object" && Object.prototype.toString.call(value) === "[object Date]";
}

// node_modules/date-fns/isValid.mjs
function isValid(date) {
  if (!isDate(date) && typeof date !== "number") {
    return false;
  }
  const _date = toDate(date);
  return !isNaN(Number(_date));
}

// node_modules/date-fns/getQuarter.mjs
function getQuarter(date) {
  const _date = toDate(date);
  const quarter = Math.trunc(_date.getMonth() / 3) + 1;
  return quarter;
}

// node_modules/date-fns/eachDayOfInterval.mjs
function eachDayOfInterval(interval, options) {
  const startDate = toDate(interval.start);
  const endDate = toDate(interval.end);
  let reversed = +startDate > +endDate;
  const endTime = reversed ? +startDate : +endDate;
  const currentDate = reversed ? endDate : startDate;
  currentDate.setHours(0, 0, 0, 0);
  let step = (options == null ? void 0 : options.step) ?? 1;
  if (!step)
    return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }
  const dates = [];
  while (+currentDate <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
    currentDate.setHours(0, 0, 0, 0);
  }
  return reversed ? dates.reverse() : dates;
}

// node_modules/date-fns/startOfQuarter.mjs
function startOfQuarter(date) {
  const _date = toDate(date);
  const currentMonth = _date.getMonth();
  const month = currentMonth - currentMonth % 3;
  _date.setMonth(month, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/eachQuarterOfInterval.mjs
function eachQuarterOfInterval(interval, options) {
  const startDate = toDate(interval.start);
  const endDate = toDate(interval.end);
  let reversed = +startDate > +endDate;
  const endTime = reversed ? +startOfQuarter(startDate) : +startOfQuarter(endDate);
  let currentDate = reversed ? startOfQuarter(endDate) : startOfQuarter(startDate);
  let step = (options == null ? void 0 : options.step) ?? 1;
  if (!step)
    return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }
  const dates = [];
  while (+currentDate <= endTime) {
    dates.push(toDate(currentDate));
    currentDate = addQuarters(currentDate, step);
  }
  return reversed ? dates.reverse() : dates;
}

// node_modules/date-fns/endOfYear.mjs
function endOfYear(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  _date.setFullYear(year + 1, 0, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/date-fns/startOfYear.mjs
function startOfYear(date) {
  const cleanDate = toDate(date);
  const _date = constructFrom(date, 0);
  _date.setFullYear(cleanDate.getFullYear(), 0, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

// node_modules/date-fns/endOfWeek.mjs
function endOfWeek(date, options) {
  var _a, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/date-fns/endOfQuarter.mjs
function endOfQuarter(date) {
  const _date = toDate(date);
  const currentMonth = _date.getMonth();
  const month = currentMonth - currentMonth % 3 + 3;
  _date.setMonth(month, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

// node_modules/date-fns/locale/en-US/_lib/formatDistance.mjs
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance = (token, count, options) => {
  let result;
  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options == null ? void 0 : options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};

// node_modules/date-fns/locale/_lib/buildFormatLongFn.mjs
function buildFormatLongFn(args) {
  return (options = {}) => {
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}

// node_modules/date-fns/locale/en-US/_lib/formatLong.mjs
var dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};

// node_modules/date-fns/locale/en-US/_lib/formatRelative.mjs
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

// node_modules/date-fns/locale/_lib/buildLocalizeFn.mjs
function buildLocalizeFn(args) {
  return (value, options) => {
    const context = (options == null ? void 0 : options.context) ? String(options.context) : "standalone";
    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = (options == null ? void 0 : options.width) ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;
    return valuesArray[index];
  };
}

// node_modules/date-fns/locale/en-US/_lib/localize.mjs
var eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
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
    "December"
  ]
};
var dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
};
var dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);
  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};

// node_modules/date-fns/locale/_lib/buildMatchFn.mjs
function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;
    const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];
    const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      findKey(parsePatterns, (pattern) => pattern.test(matchedString))
    );
    let value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      options.valueCallback(value)
    ) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}
function findKey(object, predicate) {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}

// node_modules/date-fns/locale/_lib/buildMatchPatternFn.mjs
function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult)
      return null;
    const matchedString = matchResult[0];
    const parseResult = string.match(args.parsePattern);
    if (!parseResult)
      return null;
    let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    const rest = string.slice(matchedString.length);
    return { value, rest };
  };
}

// node_modules/date-fns/locale/en-US/_lib/match.mjs
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10)
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};

// node_modules/date-fns/locale/en-US.mjs
var enUS = {
  code: "en-US",
  formatDistance,
  formatLong,
  formatRelative,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};

// node_modules/date-fns/getDayOfYear.mjs
function getDayOfYear(date) {
  const _date = toDate(date);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

// node_modules/date-fns/getISOWeek.mjs
function getISOWeek(date) {
  const _date = toDate(date);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/date-fns/getWeekYear.mjs
function getWeekYear(date, options) {
  var _a, _b, _c, _d;
  const _date = toDate(date);
  const year = _date.getFullYear();
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const firstWeekOfNextYear = constructFrom(date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);
  const firstWeekOfThisYear = constructFrom(date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);
  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

// node_modules/date-fns/startOfWeekYear.mjs
function startOfWeekYear(date, options) {
  var _a, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

// node_modules/date-fns/getWeek.mjs
function getWeek(date, options) {
  const _date = toDate(date);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);
  return Math.round(diff / millisecondsInWeek) + 1;
}

// node_modules/date-fns/_lib/addLeadingZeros.mjs
function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

// node_modules/date-fns/_lib/format/lightFormatters.mjs
var lightFormatters = {
  // Year
  y(date, token) {
    const signedYear = date.getFullYear();
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },
  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },
  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },
  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },
  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3)
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};

// node_modules/date-fns/_lib/format/formatters.mjs
var dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  // Era
  G: function(date, token, localize2) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, { width: "abbreviated" });
      case "GGGGG":
        return localize2.era(era, { width: "narrow" });
      case "GGGG":
      default:
        return localize2.era(era, { width: "wide" });
    }
  },
  // Year
  y: function(date, token, localize2) {
    if (token === "yo") {
      const signedYear = date.getFullYear();
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, { unit: "year" });
    }
    return lightFormatters.y(date, token);
  },
  // Local week-numbering year
  Y: function(date, token, localize2, options) {
    const signedWeekYear = getWeekYear(date, options);
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, { unit: "year" });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function(date, token) {
    const isoWeekYear = getISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "Q":
        return String(quarter);
      case "QQ":
        return addLeadingZeros(quarter, 2);
      case "Qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(date, token, localize2) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      case "q":
        return String(quarter);
      case "qq":
        return addLeadingZeros(quarter, 2);
      case "qo":
        return localize2.ordinalNumber(quarter, { unit: "quarter" });
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      case "Mo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return localize2.month(month, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(date, token, localize2) {
    const month = date.getMonth();
    switch (token) {
      case "L":
        return String(month + 1);
      case "LL":
        return addLeadingZeros(month + 1, 2);
      case "Lo":
        return localize2.ordinalNumber(month + 1, { unit: "month" });
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return localize2.month(month, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(date, token, localize2, options) {
    const week = getWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, { unit: "week" });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function(date, token, localize2) {
    const isoWeek = getISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, { unit: "week" });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getDate(), { unit: "date" });
    }
    return lightFormatters.d(date, token);
  },
  // Day of year
  D: function(date, token, localize2) {
    const dayOfYear = getDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "e":
        return String(localDayOfWeek);
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(date, token, localize2, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      case "c":
        return String(localDayOfWeek);
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(date, token, localize2) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      case "i":
        return String(isoDayOfWeek);
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, { unit: "day" });
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(date, token, localize2) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(date, token, localize2) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(date, token, localize2) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0)
        hours = 12;
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return lightFormatters.h(date, token);
  },
  // Hour [0-23]
  H: function(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getHours(), { unit: "hour" });
    }
    return lightFormatters.H(date, token);
  },
  // Hour [0-11]
  K: function(date, token, localize2) {
    const hours = date.getHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function(date, token, localize2) {
    let hours = date.getHours();
    if (hours === 0)
      hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, { unit: "hour" });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }
    return lightFormatters.m(date, token);
  },
  // Second
  s: function(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getSeconds(), { unit: "second" });
    }
    return lightFormatters.s(date, token);
  },
  // Fraction of second
  S: function(date, token) {
    return lightFormatters.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      case "XXXXX":
      case "XXX":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      case "xxxxx":
      case "xxx":
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();
    switch (token) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function(date, token, _localize) {
    const timestamp = Math.trunc(date.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function(date, token, _localize) {
    const timestamp = date.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}
function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

// node_modules/date-fns/_lib/format/longFormatters.mjs
var dateLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "P":
      return formatLong2.date({ width: "short" });
    case "PP":
      return formatLong2.date({ width: "medium" });
    case "PPP":
      return formatLong2.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong2.date({ width: "full" });
  }
};
var timeLongFormatter = (pattern, formatLong2) => {
  switch (pattern) {
    case "p":
      return formatLong2.time({ width: "short" });
    case "pp":
      return formatLong2.time({ width: "medium" });
    case "ppp":
      return formatLong2.time({ width: "long" });
    case "pppp":
    default:
      return formatLong2.time({ width: "full" });
  }
};
var dateTimeLongFormatter = (pattern, formatLong2) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  let dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({ width: "full" });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};

// node_modules/date-fns/_lib/protectedTokens.mjs
var dayOfYearTokenRE = /^D+$/;
var weekYearTokenRE = /^Y+$/;
var throwTokens = ["D", "DD", "YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}
function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}
function warnOrThrowProtectedError(token, format2, input) {
  const _message = message(token, format2, input);
  console.warn(_message);
  if (throwTokens.includes(token))
    throw new RangeError(_message);
}
function message(token, format2, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format2}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

// node_modules/date-fns/format.mjs
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(date, formatStr, options) {
  var _a, _b, _c, _d, _e2, _f, _g, _h;
  const defaultOptions2 = getDefaultOptions();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_f = (_e2 = options == null ? void 0 : options.locale) == null ? void 0 : _e2.options) == null ? void 0 : _f.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_h = (_g = defaultOptions2.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  const originalDate = toDate(date);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  let parts = formatStr.match(longFormattingTokensRegExp).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp).map((substring) => {
    if (substring === "''") {
      return { isToken: false, value: "'" };
    }
    const firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return { isToken: false, value: cleanEscapedString(substring) };
    }
    if (formatters[firstCharacter]) {
      return { isToken: true, value: substring };
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
      );
    }
    return { isToken: false, value: substring };
  });
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }
  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  return parts.map((part) => {
    if (!part.isToken)
      return part.value;
    const token = part.value;
    if (!(options == null ? void 0 : options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token) || !(options == null ? void 0 : options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, String(date));
    }
    const formatter = formatters[token[0]];
    return formatter(originalDate, token, locale.localize, formatterOptions);
  }).join("");
}
function cleanEscapedString(input) {
  const matched = input.match(escapedStringRegExp);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp, "'");
}

// node_modules/date-fns/getDay.mjs
function getDay(date) {
  const _date = toDate(date);
  const day = _date.getDay();
  return day;
}

// node_modules/date-fns/getDaysInMonth.mjs
function getDaysInMonth(date) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const monthIndex = _date.getMonth();
  const lastDayOfMonth2 = constructFrom(date, 0);
  lastDayOfMonth2.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth2.setHours(0, 0, 0, 0);
  return lastDayOfMonth2.getDate();
}

// node_modules/date-fns/getDefaultOptions.mjs
function getDefaultOptions2() {
  return Object.assign({}, getDefaultOptions());
}

// node_modules/date-fns/getHours.mjs
function getHours(date) {
  const _date = toDate(date);
  const hours = _date.getHours();
  return hours;
}

// node_modules/date-fns/getISODay.mjs
function getISODay(date) {
  const _date = toDate(date);
  let day = _date.getDay();
  if (day === 0) {
    day = 7;
  }
  return day;
}

// node_modules/date-fns/getMinutes.mjs
function getMinutes(date) {
  const _date = toDate(date);
  const minutes = _date.getMinutes();
  return minutes;
}

// node_modules/date-fns/getMonth.mjs
function getMonth(date) {
  const _date = toDate(date);
  const month = _date.getMonth();
  return month;
}

// node_modules/date-fns/getSeconds.mjs
function getSeconds(date) {
  const _date = toDate(date);
  const seconds = _date.getSeconds();
  return seconds;
}

// node_modules/date-fns/getYear.mjs
function getYear(date) {
  return toDate(date).getFullYear();
}

// node_modules/date-fns/isAfter.mjs
function isAfter(date, dateToCompare) {
  const _date = toDate(date);
  const _dateToCompare = toDate(dateToCompare);
  return _date.getTime() > _dateToCompare.getTime();
}

// node_modules/date-fns/isBefore.mjs
function isBefore(date, dateToCompare) {
  const _date = toDate(date);
  const _dateToCompare = toDate(dateToCompare);
  return +_date < +_dateToCompare;
}

// node_modules/date-fns/isEqual.mjs
function isEqual(leftDate, rightDate) {
  const _dateLeft = toDate(leftDate);
  const _dateRight = toDate(rightDate);
  return +_dateLeft === +_dateRight;
}

// node_modules/date-fns/transpose.mjs
function transpose(fromDate, constructor) {
  const date = constructor instanceof Date ? constructFrom(constructor, 0) : new constructor(0);
  date.setFullYear(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate()
  );
  date.setHours(
    fromDate.getHours(),
    fromDate.getMinutes(),
    fromDate.getSeconds(),
    fromDate.getMilliseconds()
  );
  return date;
}

// node_modules/date-fns/parse/_lib/Setter.mjs
var TIMEZONE_UNIT_PRIORITY = 10;
var Setter = class {
  constructor() {
    __publicField(this, "subPriority", 0);
  }
  validate(_utcDate, _options) {
    return true;
  }
};
var ValueSetter = class extends Setter {
  constructor(value, validateValue, setValue, priority, subPriority) {
    super();
    this.value = value;
    this.validateValue = validateValue;
    this.setValue = setValue;
    this.priority = priority;
    if (subPriority) {
      this.subPriority = subPriority;
    }
  }
  validate(date, options) {
    return this.validateValue(date, this.value, options);
  }
  set(date, flags, options) {
    return this.setValue(date, flags, this.value, options);
  }
};
var DateToSystemTimezoneSetter = class extends Setter {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", TIMEZONE_UNIT_PRIORITY);
    __publicField(this, "subPriority", -1);
  }
  set(date, flags) {
    if (flags.timestampIsSet)
      return date;
    return constructFrom(date, transpose(date, Date));
  }
};

// node_modules/date-fns/parse/_lib/Parser.mjs
var Parser = class {
  run(dateString, token, match2, options) {
    const result = this.parse(dateString, token, match2, options);
    if (!result) {
      return null;
    }
    return {
      setter: new ValueSetter(
        result.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority
      ),
      rest: result.rest
    };
  }
  validate(_utcDate, _value, _options) {
    return true;
  }
};

// node_modules/date-fns/parse/_lib/parsers/EraParser.mjs
var EraParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 140);
    __publicField(this, "incompatibleTokens", ["R", "u", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "G":
      case "GG":
      case "GGG":
        return match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
      case "GGGGG":
        return match2.era(dateString, { width: "narrow" });
      case "GGGG":
      default:
        return match2.era(dateString, { width: "wide" }) || match2.era(dateString, { width: "abbreviated" }) || match2.era(dateString, { width: "narrow" });
    }
  }
  set(date, flags, value) {
    flags.era = value;
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/constants.mjs
var numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
};
var timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};

// node_modules/date-fns/parse/_lib/utils.mjs
function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }
  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest
  };
}
function parseNumericPattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1)
    };
  }
  const sign = matchResult[1] === "+" ? 1 : -1;
  const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
}
function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, dateString);
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}
function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}
function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  const isCommonEra = currentYear > 0;
  const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  let result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    const rangeEnd = absCurrentYear + 50;
    const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
    const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}

// node_modules/date-fns/parse/_lib/parsers/YearParser.mjs
var YearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "yy"
    });
    switch (token) {
      case "y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "yo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "year"
          }),
          valueCallback
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }
  set(date, flags, value) {
    const currentYear = date.getFullYear();
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear
      );
      date.setFullYear(normalizedTwoDigitYear, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }
    const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/LocalWeekYearParser.mjs
var LocalWeekYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "YY"
    });
    switch (token) {
      case "Y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "Yo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "year"
          }),
          valueCallback
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }
  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }
  set(date, flags, value, options) {
    const currentYear = getWeekYear(date, options);
    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear
      );
      date.setFullYear(
        normalizedTwoDigitYear,
        0,
        options.firstWeekContainsDate
      );
      date.setHours(0, 0, 0, 0);
      return startOfWeek(date, options);
    }
    const year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, options.firstWeekContainsDate);
    date.setHours(0, 0, 0, 0);
    return startOfWeek(date, options);
  }
};

// node_modules/date-fns/parse/_lib/parsers/ISOWeekYearParser.mjs
var ISOWeekYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", [
      "G",
      "y",
      "Y",
      "u",
      "Q",
      "q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token) {
    if (token === "R") {
      return parseNDigitsSigned(4, dateString);
    }
    return parseNDigitsSigned(token.length, dateString);
  }
  set(date, _flags, value) {
    const firstWeekOfYear = constructFrom(date, 0);
    firstWeekOfYear.setFullYear(value, 0, 4);
    firstWeekOfYear.setHours(0, 0, 0, 0);
    return startOfISOWeek(firstWeekOfYear);
  }
};

// node_modules/date-fns/parse/_lib/parsers/ExtendedYearParser.mjs
var ExtendedYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 130);
    __publicField(this, "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
  }
  parse(dateString, token) {
    if (token === "u") {
      return parseNDigitsSigned(4, dateString);
    }
    return parseNDigitsSigned(token.length, dateString);
  }
  set(date, _flags, value) {
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/QuarterParser.mjs
var QuarterParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 120);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "Q":
      case "QQ":
        return parseNDigits(token.length, dateString);
      case "Qo":
        return match2.ordinalNumber(dateString, { unit: "quarter" });
      case "QQQ":
        return match2.quarter(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQQ":
        return match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return match2.quarter(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 4;
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/StandAloneQuarterParser.mjs
var StandAloneQuarterParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 120);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "q":
      case "qq":
        return parseNDigits(token.length, dateString);
      case "qo":
        return match2.ordinalNumber(dateString, { unit: "quarter" });
      case "qqq":
        return match2.quarter(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqqq":
        return match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return match2.quarter(dateString, {
          width: "wide",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.quarter(dateString, {
          width: "narrow",
          context: "standalone"
        });
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 4;
  }
  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/MonthParser.mjs
var MonthParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "L",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
    __publicField(this, "priority", 110);
  }
  parse(dateString, token, match2) {
    const valueCallback = (value) => value - 1;
    switch (token) {
      case "M":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback
        );
      case "MM":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      case "Mo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "month"
          }),
          valueCallback
        );
      case "MMM":
        return match2.month(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.month(dateString, { width: "narrow", context: "formatting" });
      case "MMMMM":
        return match2.month(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return match2.month(dateString, { width: "wide", context: "formatting" }) || match2.month(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.month(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/StandAloneMonthParser.mjs
var StandAloneMonthParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 110);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (value) => value - 1;
    switch (token) {
      case "L":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback
        );
      case "LL":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      case "Lo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "month"
          }),
          valueCallback
        );
      case "LLL":
        return match2.month(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.month(dateString, { width: "narrow", context: "standalone" });
      case "LLLLL":
        return match2.month(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return match2.month(dateString, { width: "wide", context: "standalone" }) || match2.month(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.month(dateString, { width: "narrow", context: "standalone" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/setWeek.mjs
function setWeek(date, week, options) {
  const _date = toDate(date);
  const diff = getWeek(_date, options) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}

// node_modules/date-fns/parse/_lib/parsers/LocalWeekParser.mjs
var LocalWeekParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 100);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "i",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "w":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "wo":
        return match2.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53;
  }
  set(date, _flags, value, options) {
    return startOfWeek(setWeek(date, value, options), options);
  }
};

// node_modules/date-fns/setISOWeek.mjs
function setISOWeek(date, week) {
  const _date = toDate(date);
  const diff = getISOWeek(_date) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}

// node_modules/date-fns/parse/_lib/parsers/ISOWeekParser.mjs
var ISOWeekParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 100);
    __publicField(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "I":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "Io":
        return match2.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 53;
  }
  set(date, _flags, value) {
    return startOfISOWeek(setISOWeek(date, value));
  }
};

// node_modules/date-fns/parse/_lib/parsers/DateParser.mjs
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [
  31,
  29,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];
var DateParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "subPriority", 1);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "w",
      "I",
      "D",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "d":
        return parseNumericPattern(numericPatterns.date, dateString);
      case "do":
        return match2.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear2 = isLeapYearIndex(year);
    const month = date.getMonth();
    if (isLeapYear2) {
      return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
    } else {
      return value >= 1 && value <= DAYS_IN_MONTH[month];
    }
  }
  set(date, _flags, value) {
    date.setDate(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/DayOfYearParser.mjs
var DayOfYearParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "subpriority", 1);
    __publicField(this, "incompatibleTokens", [
      "Y",
      "R",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "I",
      "d",
      "E",
      "i",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "D":
      case "DD":
        return parseNumericPattern(numericPatterns.dayOfYear, dateString);
      case "Do":
        return match2.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear2 = isLeapYearIndex(year);
    if (isLeapYear2) {
      return value >= 1 && value <= 366;
    } else {
      return value >= 1 && value <= 365;
    }
  }
  set(date, _flags, value) {
    date.setMonth(0, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/setDay.mjs
function setDay(date, day, options) {
  var _a, _b, _c, _d;
  const defaultOptions2 = getDefaultOptions();
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.weekStartsOn) ?? 0;
  const _date = toDate(date);
  const currentDay = _date.getDay();
  const remainder = day % 7;
  const dayIndex = (remainder + 7) % 7;
  const delta = 7 - weekStartsOn;
  const diff = day < 0 || day > 6 ? day - (currentDay + delta) % 7 : (dayIndex + delta) % 7 - (currentDay + delta) % 7;
  return addDays(_date, diff);
}

// node_modules/date-fns/parse/_lib/parsers/DayParser.mjs
var DayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "E":
      case "EE":
      case "EEE":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "EEEEE":
        return match2.day(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "EEEE":
      default:
        return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/LocalDayParser.mjs
var LocalDayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
    };
    switch (token) {
      case "e":
      case "ee":
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      case "eo":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "day"
          }),
          valueCallback
        );
      case "eee":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "eeeee":
        return match2.day(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
      case "eeee":
      default:
        return match2.day(dateString, { width: "wide", context: "formatting" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.day(dateString, { width: "short", context: "formatting" }) || match2.day(dateString, { width: "narrow", context: "formatting" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/StandAloneLocalDayParser.mjs
var StandAloneLocalDayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", [
      "y",
      "R",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "I",
      "d",
      "D",
      "E",
      "i",
      "e",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2, options) {
    const valueCallback = (value) => {
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
    };
    switch (token) {
      case "c":
      case "cc":
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      case "co":
        return mapValue(
          match2.ordinalNumber(dateString, {
            unit: "day"
          }),
          valueCallback
        );
      case "ccc":
        return match2.day(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      case "ccccc":
        return match2.day(dateString, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
      case "cccc":
      default:
        return match2.day(dateString, { width: "wide", context: "standalone" }) || match2.day(dateString, {
          width: "abbreviated",
          context: "standalone"
        }) || match2.day(dateString, { width: "short", context: "standalone" }) || match2.day(dateString, { width: "narrow", context: "standalone" });
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 6;
  }
  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/setISODay.mjs
function setISODay(date, day) {
  const _date = toDate(date);
  const currentDay = getISODay(_date);
  const diff = day - currentDay;
  return addDays(_date, diff);
}

// node_modules/date-fns/parse/_lib/parsers/ISODayParser.mjs
var ISODayParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 90);
    __publicField(this, "incompatibleTokens", [
      "y",
      "Y",
      "u",
      "q",
      "Q",
      "M",
      "L",
      "w",
      "d",
      "D",
      "E",
      "e",
      "c",
      "t",
      "T"
    ]);
  }
  parse(dateString, token, match2) {
    const valueCallback = (value) => {
      if (value === 0) {
        return 7;
      }
      return value;
    };
    switch (token) {
      case "i":
      case "ii":
        return parseNDigits(token.length, dateString);
      case "io":
        return match2.ordinalNumber(dateString, { unit: "day" });
      case "iii":
        return mapValue(
          match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      case "iiiii":
        return mapValue(
          match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      case "iiiiii":
        return mapValue(
          match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
      case "iiii":
      default:
        return mapValue(
          match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }),
          valueCallback
        );
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 7;
  }
  set(date, _flags, value) {
    date = setISODay(date, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/AMPMParser.mjs
var AMPMParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "a":
      case "aa":
      case "aaa":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaaa":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/AMPMMidnightParser.mjs
var AMPMMidnightParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "b":
      case "bb":
      case "bbb":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbbb":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/DayPeriodParser.mjs
var DayPeriodParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 80);
    __publicField(this, "incompatibleTokens", ["a", "b", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBBB":
        return match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return match2.dayPeriod(dateString, {
          width: "wide",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "abbreviated",
          context: "formatting"
        }) || match2.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting"
        });
    }
  }
  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/Hour1to12Parser.mjs
var Hour1to12Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["H", "K", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "h":
        return parseNumericPattern(numericPatterns.hour12h, dateString);
      case "ho":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 12;
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else if (!isPM && value === 12) {
      date.setHours(0, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/Hour0to23Parser.mjs
var Hour0to23Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "H":
        return parseNumericPattern(numericPatterns.hour23h, dateString);
      case "Ho":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 23;
  }
  set(date, _flags, value) {
    date.setHours(value, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/Hour0To11Parser.mjs
var Hour0To11Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["h", "H", "k", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "K":
        return parseNumericPattern(numericPatterns.hour11h, dateString);
      case "Ko":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 11;
  }
  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/Hour1To24Parser.mjs
var Hour1To24Parser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 70);
    __publicField(this, "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "k":
        return parseNumericPattern(numericPatterns.hour24h, dateString);
      case "ko":
        return match2.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 1 && value <= 24;
  }
  set(date, _flags, value) {
    const hours = value <= 24 ? value % 24 : value;
    date.setHours(hours, 0, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/MinuteParser.mjs
var MinuteParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 60);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "m":
        return parseNumericPattern(numericPatterns.minute, dateString);
      case "mo":
        return match2.ordinalNumber(dateString, { unit: "minute" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59;
  }
  set(date, _flags, value) {
    date.setMinutes(value, 0, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/SecondParser.mjs
var SecondParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 50);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(dateString, token, match2) {
    switch (token) {
      case "s":
        return parseNumericPattern(numericPatterns.second, dateString);
      case "so":
        return match2.ordinalNumber(dateString, { unit: "second" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }
  validate(_date, value) {
    return value >= 0 && value <= 59;
  }
  set(date, _flags, value) {
    date.setSeconds(value, 0);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/FractionOfSecondParser.mjs
var FractionOfSecondParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 30);
    __publicField(this, "incompatibleTokens", ["t", "T"]);
  }
  parse(dateString, token) {
    const valueCallback = (value) => Math.trunc(value * Math.pow(10, -token.length + 3));
    return mapValue(parseNDigits(token.length, dateString), valueCallback);
  }
  set(date, _flags, value) {
    date.setMilliseconds(value);
    return date;
  }
};

// node_modules/date-fns/parse/_lib/parsers/ISOTimezoneWithZParser.mjs
var ISOTimezoneWithZParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 10);
    __publicField(this, "incompatibleTokens", ["t", "T", "x"]);
  }
  parse(dateString, token) {
    switch (token) {
      case "X":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString
        );
      case "XX":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "XXXX":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString
        );
      case "XXXXX":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString
        );
      case "XXX":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet)
      return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
    );
  }
};

// node_modules/date-fns/parse/_lib/parsers/ISOTimezoneParser.mjs
var ISOTimezoneParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 10);
    __publicField(this, "incompatibleTokens", ["t", "T", "X"]);
  }
  parse(dateString, token) {
    switch (token) {
      case "x":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString
        );
      case "xx":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "xxxx":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString
        );
      case "xxxxx":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString
        );
      case "xxx":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }
  set(date, flags, value) {
    if (flags.timestampIsSet)
      return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value
    );
  }
};

// node_modules/date-fns/parse/_lib/parsers/TimestampSecondsParser.mjs
var TimestampSecondsParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 40);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }
  set(date, _flags, value) {
    return [constructFrom(date, value * 1e3), { timestampIsSet: true }];
  }
};

// node_modules/date-fns/parse/_lib/parsers/TimestampMillisecondsParser.mjs
var TimestampMillisecondsParser = class extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "priority", 20);
    __publicField(this, "incompatibleTokens", "*");
  }
  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }
  set(date, _flags, value) {
    return [constructFrom(date, value), { timestampIsSet: true }];
  }
};

// node_modules/date-fns/parse/_lib/parsers.mjs
var parsers = {
  G: new EraParser(),
  y: new YearParser(),
  Y: new LocalWeekYearParser(),
  R: new ISOWeekYearParser(),
  u: new ExtendedYearParser(),
  Q: new QuarterParser(),
  q: new StandAloneQuarterParser(),
  M: new MonthParser(),
  L: new StandAloneMonthParser(),
  w: new LocalWeekParser(),
  I: new ISOWeekParser(),
  d: new DateParser(),
  D: new DayOfYearParser(),
  E: new DayParser(),
  e: new LocalDayParser(),
  c: new StandAloneLocalDayParser(),
  i: new ISODayParser(),
  a: new AMPMParser(),
  b: new AMPMMidnightParser(),
  B: new DayPeriodParser(),
  h: new Hour1to12Parser(),
  H: new Hour0to23Parser(),
  K: new Hour0To11Parser(),
  k: new Hour1To24Parser(),
  m: new MinuteParser(),
  s: new SecondParser(),
  S: new FractionOfSecondParser(),
  X: new ISOTimezoneWithZParser(),
  x: new ISOTimezoneParser(),
  t: new TimestampSecondsParser(),
  T: new TimestampMillisecondsParser()
};

// node_modules/date-fns/parse.mjs
var formattingTokensRegExp2 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp2 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp2 = /^'([^]*?)'?$/;
var doubleQuoteRegExp2 = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp2 = /[a-zA-Z]/;
function parse(dateStr, formatStr, referenceDate, options) {
  var _a, _b, _c, _d, _e2, _f, _g, _h;
  const defaultOptions2 = getDefaultOptions2();
  const locale = (options == null ? void 0 : options.locale) ?? defaultOptions2.locale ?? enUS;
  const firstWeekContainsDate = (options == null ? void 0 : options.firstWeekContainsDate) ?? ((_b = (_a = options == null ? void 0 : options.locale) == null ? void 0 : _a.options) == null ? void 0 : _b.firstWeekContainsDate) ?? defaultOptions2.firstWeekContainsDate ?? ((_d = (_c = defaultOptions2.locale) == null ? void 0 : _c.options) == null ? void 0 : _d.firstWeekContainsDate) ?? 1;
  const weekStartsOn = (options == null ? void 0 : options.weekStartsOn) ?? ((_f = (_e2 = options == null ? void 0 : options.locale) == null ? void 0 : _e2.options) == null ? void 0 : _f.weekStartsOn) ?? defaultOptions2.weekStartsOn ?? ((_h = (_g = defaultOptions2.locale) == null ? void 0 : _g.options) == null ? void 0 : _h.weekStartsOn) ?? 0;
  if (formatStr === "") {
    if (dateStr === "") {
      return toDate(referenceDate);
    } else {
      return constructFrom(referenceDate, NaN);
    }
  }
  const subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale
  };
  const setters = [new DateToSystemTimezoneSetter()];
  const tokens = formatStr.match(longFormattingTokensRegExp2).map((substring) => {
    const firstCharacter = substring[0];
    if (firstCharacter in longFormatters) {
      const longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp2);
  const usedTokens = [];
  for (let token of tokens) {
    if (!(options == null ? void 0 : options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    if (!(options == null ? void 0 : options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    const firstCharacter = token[0];
    const parser = parsers[firstCharacter];
    if (parser) {
      const { incompatibleTokens } = parser;
      if (Array.isArray(incompatibleTokens)) {
        const incompatibleToken = usedTokens.find(
          (usedToken) => incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter
        );
        if (incompatibleToken) {
          throw new RangeError(
            `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`
          );
        }
      } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
        throw new RangeError(
          `The format string mustn't contain \`${token}\` and any other token at the same time`
        );
      }
      usedTokens.push({ token: firstCharacter, fullToken: token });
      const parseResult = parser.run(
        dateStr,
        token,
        locale.match,
        subFnOptions
      );
      if (!parseResult) {
        return constructFrom(referenceDate, NaN);
      }
      setters.push(parseResult.setter);
      dateStr = parseResult.rest;
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp2)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" + firstCharacter + "`"
        );
      }
      if (token === "''") {
        token = "'";
      } else if (firstCharacter === "'") {
        token = cleanEscapedString2(token);
      }
      if (dateStr.indexOf(token) === 0) {
        dateStr = dateStr.slice(token.length);
      } else {
        return constructFrom(referenceDate, NaN);
      }
    }
  }
  if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
    return constructFrom(referenceDate, NaN);
  }
  const uniquePrioritySetters = setters.map((setter) => setter.priority).sort((a, b) => b - a).filter((priority, index, array) => array.indexOf(priority) === index).map(
    (priority) => setters.filter((setter) => setter.priority === priority).sort((a, b) => b.subPriority - a.subPriority)
  ).map((setterArray) => setterArray[0]);
  let date = toDate(referenceDate);
  if (isNaN(date.getTime())) {
    return constructFrom(referenceDate, NaN);
  }
  const flags = {};
  for (const setter of uniquePrioritySetters) {
    if (!setter.validate(date, subFnOptions)) {
      return constructFrom(referenceDate, NaN);
    }
    const result = setter.set(date, flags, subFnOptions);
    if (Array.isArray(result)) {
      date = result[0];
      Object.assign(flags, result[1]);
    } else {
      date = result;
    }
  }
  return constructFrom(referenceDate, date);
}
function cleanEscapedString2(input) {
  return input.match(escapedStringRegExp2)[1].replace(doubleQuoteRegExp2, "'");
}

// node_modules/date-fns/isSameQuarter.mjs
function isSameQuarter(dateLeft, dateRight) {
  const dateLeftStartOfQuarter = startOfQuarter(dateLeft);
  const dateRightStartOfQuarter = startOfQuarter(dateRight);
  return +dateLeftStartOfQuarter === +dateRightStartOfQuarter;
}

// node_modules/date-fns/subDays.mjs
function subDays(date, amount) {
  return addDays(date, -amount);
}

// node_modules/date-fns/setMonth.mjs
function setMonth(date, month) {
  const _date = toDate(date);
  const year = _date.getFullYear();
  const day = _date.getDate();
  const dateWithDesiredMonth = constructFrom(date, 0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  const daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  _date.setMonth(month, Math.min(day, daysInMonth));
  return _date;
}

// node_modules/date-fns/set.mjs
function set(date, values) {
  let _date = toDate(date);
  if (isNaN(+_date)) {
    return constructFrom(date, NaN);
  }
  if (values.year != null) {
    _date.setFullYear(values.year);
  }
  if (values.month != null) {
    _date = setMonth(_date, values.month);
  }
  if (values.date != null) {
    _date.setDate(values.date);
  }
  if (values.hours != null) {
    _date.setHours(values.hours);
  }
  if (values.minutes != null) {
    _date.setMinutes(values.minutes);
  }
  if (values.seconds != null) {
    _date.setSeconds(values.seconds);
  }
  if (values.milliseconds != null) {
    _date.setMilliseconds(values.milliseconds);
  }
  return _date;
}

// node_modules/date-fns/setHours.mjs
function setHours(date, hours) {
  const _date = toDate(date);
  _date.setHours(hours);
  return _date;
}

// node_modules/date-fns/setMilliseconds.mjs
function setMilliseconds(date, milliseconds) {
  const _date = toDate(date);
  _date.setMilliseconds(milliseconds);
  return _date;
}

// node_modules/date-fns/setMinutes.mjs
function setMinutes(date, minutes) {
  const _date = toDate(date);
  _date.setMinutes(minutes);
  return _date;
}

// node_modules/date-fns/setSeconds.mjs
function setSeconds(date, seconds) {
  const _date = toDate(date);
  _date.setSeconds(seconds);
  return _date;
}

// node_modules/date-fns/setYear.mjs
function setYear(date, year) {
  const _date = toDate(date);
  if (isNaN(+_date)) {
    return constructFrom(date, NaN);
  }
  _date.setFullYear(year);
  return _date;
}

// node_modules/date-fns/subMonths.mjs
function subMonths(date, amount) {
  return addMonths(date, -amount);
}

// node_modules/date-fns/sub.mjs
function sub(date, duration) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0
  } = duration;
  const dateWithoutMonths = subMonths(date, months + years * 12);
  const dateWithoutDays = subDays(dateWithoutMonths, days + weeks * 7);
  const minutestoSub = minutes + hours * 60;
  const secondstoSub = seconds + minutestoSub * 60;
  const mstoSub = secondstoSub * 1e3;
  const finalDate = constructFrom(date, dateWithoutDays.getTime() - mstoSub);
  return finalDate;
}

// node_modules/date-fns/subYears.mjs
function subYears(date, amount) {
  return addYears(date, -amount);
}

// node_modules/@vuepic/vue-datepicker/dist/vue-datepicker.js
function Yt() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M29.333 8c0-2.208-1.792-4-4-4h-18.667c-2.208 0-4 1.792-4 4v18.667c0 2.208 1.792 4 4 4h18.667c2.208 0 4-1.792 4-4v-18.667zM26.667 8v18.667c0 0.736-0.597 1.333-1.333 1.333 0 0-18.667 0-18.667 0-0.736 0-1.333-0.597-1.333-1.333 0 0 0-18.667 0-18.667 0-0.736 0.597-1.333 1.333-1.333 0 0 18.667 0 18.667 0 0.736 0 1.333 0.597 1.333 1.333z"
      }),
      createBaseVNode("path", {
        d: "M20 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      createBaseVNode("path", {
        d: "M9.333 2.667v5.333c0 0.736 0.597 1.333 1.333 1.333s1.333-0.597 1.333-1.333v-5.333c0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      }),
      createBaseVNode("path", {
        d: "M4 14.667h24c0.736 0 1.333-0.597 1.333-1.333s-0.597-1.333-1.333-1.333h-24c-0.736 0-1.333 0.597-1.333 1.333s0.597 1.333 1.333 1.333z"
      })
    ]
  );
}
Yt.compatConfig = {
  MODE: 3
};
function fn() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z"
      }),
      createBaseVNode("path", {
        d: "M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
fn.compatConfig = {
  MODE: 3
};
function Oa() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M20.943 23.057l-7.057-7.057c0 0 7.057-7.057 7.057-7.057 0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-8 8c-0.521 0.521-0.521 1.365 0 1.885l8 8c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
Oa.compatConfig = {
  MODE: 3
};
function Ba() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M12.943 24.943l8-8c0.521-0.521 0.521-1.365 0-1.885l-8-8c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885l7.057 7.057c0 0-7.057 7.057-7.057 7.057-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0z"
      })
    ]
  );
}
Ba.compatConfig = {
  MODE: 3
};
function Ya() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M16 1.333c-8.095 0-14.667 6.572-14.667 14.667s6.572 14.667 14.667 14.667c8.095 0 14.667-6.572 14.667-14.667s-6.572-14.667-14.667-14.667zM16 4c6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.623 0-12-5.377-12-12s5.377-12 12-12z"
      }),
      createBaseVNode("path", {
        d: "M14.667 8v8c0 0.505 0.285 0.967 0.737 1.193l5.333 2.667c0.658 0.329 1.46 0.062 1.789-0.596s0.062-1.46-0.596-1.789l-4.596-2.298c0 0 0-7.176 0-7.176 0-0.736-0.597-1.333-1.333-1.333s-1.333 0.597-1.333 1.333z"
      })
    ]
  );
}
Ya.compatConfig = {
  MODE: 3
};
function Ia() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M24.943 19.057l-8-8c-0.521-0.521-1.365-0.521-1.885 0l-8 8c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l7.057-7.057c0 0 7.057 7.057 7.057 7.057 0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885z"
      })
    ]
  );
}
Ia.compatConfig = {
  MODE: 3
};
function Na() {
  return openBlock(), createElementBlock(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 32 32",
      fill: "currentColor",
      "aria-hidden": "true",
      class: "dp__icon"
    },
    [
      createBaseVNode("path", {
        d: "M7.057 12.943l8 8c0.521 0.521 1.365 0.521 1.885 0l8-8c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0l-7.057 7.057c0 0-7.057-7.057-7.057-7.057-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
      })
    ]
  );
}
Na.compatConfig = {
  MODE: 3
};
function qa(e) {
  return (t) => new Intl.DateTimeFormat(e, { weekday: "short", timeZone: "UTC" }).format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`)).slice(0, 2);
}
function Zn(e) {
  return (t) => format(/* @__PURE__ */ new Date(`2017-01-0${t}T00:00:00+00:00`), "EEEEEE", { locale: e });
}
var xn = (e, t, r) => {
  const n = [1, 2, 3, 4, 5, 6, 7];
  let a;
  if (e !== null)
    try {
      a = n.map(Zn(e));
    } catch {
      a = n.map(qa(t));
    }
  else
    a = n.map(qa(t));
  const f = a.slice(0, r), o = a.slice(r + 1, a.length);
  return [a[r]].concat(...o).concat(...f);
};
var Ea = (e, t, r) => {
  const n = [];
  for (let a = +e[0]; a <= +e[1]; a++)
    n.push({ value: +a, text: gn(a, t) });
  return r ? n.reverse() : n;
};
var vn = (e, t, r) => {
  const n = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((f) => {
    const o = f < 10 ? `0${f}` : f;
    return /* @__PURE__ */ new Date(`2017-${o}-01T00:00:00+00:00`);
  });
  if (e !== null)
    try {
      const f = r === "long" ? "MMMM" : "MMM";
      return n.map((o, s) => {
        const C = format(o, f, { locale: e });
        return {
          text: C.charAt(0).toUpperCase() + C.substring(1),
          value: s
        };
      });
    } catch {
    }
  const a = new Intl.DateTimeFormat(t, { month: r, timeZone: "UTC" });
  return n.map((f, o) => {
    const s = a.format(f);
    return {
      text: s.charAt(0).toUpperCase() + s.substring(1),
      value: o
    };
  });
};
var el = (e) => [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11][e];
var Ie = (e) => {
  const t = unref(e);
  return t != null && t.$el ? t == null ? void 0 : t.$el : t;
};
var tl = (e) => ({ type: "dot", ...e ?? {} });
var mn = (e) => Array.isArray(e) ? !!e[0] && !!e[1] : false;
var Fa = {
  prop: (e) => `"${e}" prop must be enabled!`,
  dateArr: (e) => `You need to use array as "model-value" binding in order to support "${e}"`
};
var Oe = (e) => e;
var Xa = (e) => e === 0 ? e : !e || isNaN(+e) ? null : +e;
var Ja = (e) => e === null;
var pn = (e) => {
  if (e)
    return [...e.querySelectorAll("input, button, select, textarea, a[href]")][0];
};
var al = (e) => {
  const t = [], r = (n) => n.filter((a) => a);
  for (let n = 0; n < e.length; n += 3) {
    const a = [e[n], e[n + 1], e[n + 2]];
    t.push(r(a));
  }
  return t;
};
var Ht = (e, t, r) => {
  const n = r != null, a = t != null;
  if (!n && !a)
    return false;
  const f = +r, o = +t;
  return n && a ? +e > f || +e < o : n ? +e > f : a ? +e < o : false;
};
var _t = (e, t) => al(e).map((r) => r.map((n) => {
  const { active: a, disabled: f, isBetween: o, highlighted: s } = t(n);
  return {
    ...n,
    active: a,
    disabled: f,
    className: {
      dp__overlay_cell_active: a,
      dp__overlay_cell: !a,
      dp__overlay_cell_disabled: f,
      dp__overlay_cell_pad: true,
      dp__overlay_cell_active_disabled: f && a,
      dp__cell_in_between: o,
      "dp--highlighted": s
    }
  };
}));
var vt = (e, t, r = false) => {
  e && t.allowStopPropagation && (r && e.stopImmediatePropagation(), e.stopPropagation());
};
var nl = () => [
  "a[href]",
  "area[href]",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
  "[data-datepicker-instance]"
].join(", ");
function ll(e, t) {
  let r = [...document.querySelectorAll(nl())];
  r = r.filter((a) => !e.contains(a) || a.hasAttribute("data-datepicker-instance"));
  const n = r.indexOf(e);
  if (n >= 0 && (t ? n - 1 >= 0 : n + 1 <= r.length))
    return r[n + (t ? -1 : 1)];
}
var rl = (e, t) => e == null ? void 0 : e.querySelector(`[data-dp-element="${t}"]`);
var gn = (e, t) => new Intl.NumberFormat(t, { useGrouping: false, style: "decimal" }).format(e);
var La = (e) => format(e, "dd-MM-yyyy");
var ga = (e) => Array.isArray(e);
var ta = (e, t) => t.get(La(e));
var ol = (e, t) => e ? t ? t instanceof Map ? !!ta(e, t) : t(W(e)) : false : true;
var Za = (e, t, r, n, a, f) => {
  const o = parse(e, t.slice(0, e.length), /* @__PURE__ */ new Date(), { locale: f });
  return isValid(o) && isDate(o) ? n || a ? o : set(o, {
    hours: +r.hours,
    minutes: +(r == null ? void 0 : r.minutes),
    seconds: +(r == null ? void 0 : r.seconds),
    milliseconds: 0
  }) : null;
};
var sl = (e, t, r, n, a, f) => {
  const o = Array.isArray(r) ? r[0] : r;
  if (typeof t == "string")
    return Za(e, t, o, n, a, f);
  if (Array.isArray(t)) {
    let s = null;
    for (const C of t)
      if (s = Za(e, C, o, n, a, f), s)
        break;
    return s;
  }
  return typeof t == "function" ? t(e) : null;
};
var W = (e) => e ? new Date(e) : /* @__PURE__ */ new Date();
var ul = (e, t, r) => {
  if (t) {
    const a = (e.getMonth() + 1).toString().padStart(2, "0"), f = e.getDate().toString().padStart(2, "0"), o = e.getHours().toString().padStart(2, "0"), s = e.getMinutes().toString().padStart(2, "0"), C = r ? e.getSeconds().toString().padStart(2, "0") : "00";
    return `${e.getFullYear()}-${a}-${f}T${o}:${s}:${C}.000Z`;
  }
  const n = Date.UTC(
    e.getUTCFullYear(),
    e.getUTCMonth(),
    e.getUTCDate(),
    e.getUTCHours(),
    e.getUTCMinutes(),
    e.getUTCSeconds()
  );
  return new Date(n).toISOString();
};
var je = (e) => {
  let t = W(JSON.parse(JSON.stringify(e)));
  return t = setHours(t, 0), t = setMinutes(t, 0), t = setSeconds(t, 0), t = setMilliseconds(t, 0), t;
};
var mt = (e, t, r, n) => {
  let a = e ? W(e) : W();
  return (t || t === 0) && (a = setHours(a, +t)), (r || r === 0) && (a = setMinutes(a, +r)), (n || n === 0) && (a = setSeconds(a, +n)), setMilliseconds(a, 0);
};
var Pe = (e, t) => !e || !t ? false : isBefore(je(e), je(t));
var we = (e, t) => !e || !t ? false : isEqual(je(e), je(t));
var _e = (e, t) => !e || !t ? false : isAfter(je(e), je(t));
var la = (e, t, r) => e != null && e[0] && (e != null && e[1]) ? _e(r, e[0]) && Pe(r, e[1]) : e != null && e[0] && t ? _e(r, e[0]) && Pe(r, t) || Pe(r, e[0]) && _e(r, t) : false;
var Xe = (e) => {
  const t = set(new Date(e), { date: 1 });
  return je(t);
};
var ya = (e, t, r) => t && (r || r === 0) ? Object.fromEntries(
  ["hours", "minutes", "seconds"].map((n) => n === t ? [n, r] : [n, isNaN(+e[n]) ? void 0 : +e[n]])
) : {
  hours: isNaN(+e.hours) ? void 0 : +e.hours,
  minutes: isNaN(+e.minutes) ? void 0 : +e.minutes,
  seconds: isNaN(+e.seconds) ? void 0 : +e.seconds
};
var $t = (e) => ({
  hours: getHours(e),
  minutes: getMinutes(e),
  seconds: getSeconds(e)
});
var yn = (e, t) => {
  if (t) {
    const r = getYear(W(t));
    if (r > e)
      return 12;
    if (r === e)
      return getMonth(W(t));
  }
};
var hn = (e, t) => {
  if (t) {
    const r = getYear(W(t));
    return r < e ? -1 : r === e ? getMonth(W(t)) : void 0;
  }
};
var Ot = (e) => {
  if (e)
    return getYear(W(e));
};
var bn = (e, t) => {
  const r = _e(e, t) ? t : e, n = _e(t, e) ? t : e;
  return eachDayOfInterval({ start: r, end: n });
};
var il = (e) => {
  const t = addMonths(e, 1);
  return { month: getMonth(t), year: getYear(t) };
};
var ot = (e, t) => {
  const r = startOfWeek(e, { weekStartsOn: +t }), n = endOfWeek(e, { weekStartsOn: +t });
  return [r, n];
};
var kn = (e, t) => {
  const r = {
    hours: getHours(W()),
    minutes: getMinutes(W()),
    seconds: t ? getSeconds(W()) : 0
  };
  return Object.assign(r, e);
};
var ft = (e, t, r) => [set(W(e), { date: 1 }), set(W(), { month: t, year: r, date: 1 })];
var st = (e, t, r) => {
  let n = e ? W(e) : W();
  return (t || t === 0) && (n = setMonth(n, t)), r && (n = setYear(n, r)), n;
};
var wn = (e, t, r, n, a) => {
  if (!n || a && !t || !a && !r)
    return false;
  const f = a ? addMonths(e, 1) : subMonths(e, 1), o = [getMonth(f), getYear(f)];
  return a ? !cl(...o, t) : !dl(...o, r);
};
var dl = (e, t, r) => Pe(...ft(r, e, t)) || we(...ft(r, e, t));
var cl = (e, t, r) => _e(...ft(r, e, t)) || we(...ft(r, e, t));
var Mn = (e, t, r, n, a, f, o) => {
  if (typeof t == "function" && !o)
    return t(e);
  const s = r ? { locale: r } : void 0;
  return Array.isArray(e) ? `${format(e[0], f, s)}${a && !e[1] ? "" : n}${e[1] ? format(e[1], f, s) : ""}` : format(e, f, s);
};
var St = (e) => {
  if (e)
    return null;
  throw new Error(Fa.prop("partial-range"));
};
var qt = (e, t) => {
  if (t)
    return e();
  throw new Error(Fa.prop("range"));
};
var Ra = (e) => Array.isArray(e) ? isValid(e[0]) && (e[1] ? isValid(e[1]) : true) : e ? isValid(e) : false;
var fl = (e, t) => set(t ?? W(), {
  hours: +e.hours || 0,
  minutes: +e.minutes || 0,
  seconds: +e.seconds || 0
});
var ha = (e, t, r, n) => {
  if (!e)
    return true;
  if (n) {
    const a = r === "max" ? isBefore(e, t) : isAfter(e, t), f = { seconds: 0, milliseconds: 0 };
    return a || isEqual(set(e, f), set(t, f));
  }
  return r === "max" ? e.getTime() <= t.getTime() : e.getTime() >= t.getTime();
};
var ba = (e, t, r) => e ? fl(e, t) : W(r ?? t);
var xa = (e, t, r, n, a) => {
  if (Array.isArray(n)) {
    const o = ba(e, n[0], t), s = ba(e, n[1], t);
    return ha(n[0], o, r, !!t) && ha(n[1], s, r, !!t) && a;
  }
  const f = ba(e, n, t);
  return ha(n, f, r, !!t) && a;
};
var ka = (e) => set(W(), $t(e));
var vl = (e, t) => e instanceof Map ? Array.from(e.values()).filter((r) => getYear(W(r)) === t).map((r) => getMonth(r)) : [];
var Dn = (e, t, r) => typeof e == "function" ? e({ month: t, year: r }) : !!e.months.find((n) => n.month === t && n.year === r);
var Va = (e, t) => typeof e == "function" ? e(t) : e.years.includes(t);
var Et = reactive({
  menuFocused: false,
  shiftKeyInMenu: false
});
var $n = () => {
  const e = (n) => {
    Et.menuFocused = n;
  }, t = (n) => {
    Et.shiftKeyInMenu !== n && (Et.shiftKeyInMenu = n);
  };
  return {
    control: computed(() => ({ shiftKeyInMenu: Et.shiftKeyInMenu, menuFocused: Et.menuFocused })),
    setMenuFocused: e,
    setShiftKey: t
  };
};
var Te = reactive({
  monthYear: [],
  calendar: [],
  time: [],
  actionRow: [],
  selectionGrid: [],
  timePicker: {
    0: [],
    1: []
  },
  monthPicker: []
});
var wa = ref(null);
var Xt = ref(false);
var Ma = ref(false);
var Da = ref(false);
var $a = ref(false);
var Le = ref(0);
var Ce = ref(0);
var gt = () => {
  const e = computed(() => Xt.value ? [...Te.selectionGrid, Te.actionRow].filter((T) => T.length) : Ma.value ? [
    ...Te.timePicker[0],
    ...Te.timePicker[1],
    $a.value ? [] : [wa.value],
    Te.actionRow
  ].filter((T) => T.length) : Da.value ? [...Te.monthPicker, Te.actionRow] : [Te.monthYear, ...Te.calendar, Te.time, Te.actionRow].filter((T) => T.length)), t = (T) => {
    Le.value = T ? Le.value + 1 : Le.value - 1;
    let H = null;
    e.value[Ce.value] && (H = e.value[Ce.value][Le.value]), !H && e.value[Ce.value + (T ? 1 : -1)] ? (Ce.value = Ce.value + (T ? 1 : -1), Le.value = T ? 0 : e.value[Ce.value].length - 1) : H || (Le.value = T ? Le.value - 1 : Le.value + 1);
  }, r = (T) => {
    if (Ce.value === 0 && !T || Ce.value === e.value.length && T)
      return;
    Ce.value = T ? Ce.value + 1 : Ce.value - 1, e.value[Ce.value] ? e.value[Ce.value] && !e.value[Ce.value][Le.value] && Le.value !== 0 && (Le.value = e.value[Ce.value].length - 1) : Ce.value = T ? Ce.value - 1 : Ce.value + 1;
  }, n = (T) => {
    let H = null;
    e.value[Ce.value] && (H = e.value[Ce.value][Le.value]), H ? H.focus({ preventScroll: !Xt.value }) : Le.value = T ? Le.value - 1 : Le.value + 1;
  }, a = () => {
    t(true), n(true);
  }, f = () => {
    t(false), n(false);
  }, o = () => {
    r(false), n(true);
  }, s = () => {
    r(true), n(true);
  }, C = (T, H) => {
    Te[H] = T;
  }, A = (T, H) => {
    Te[H] = T;
  }, y = () => {
    Le.value = 0, Ce.value = 0;
  };
  return {
    buildMatrix: C,
    buildMultiLevelMatrix: A,
    setTimePickerBackRef: (T) => {
      wa.value = T;
    },
    setSelectionGrid: (T) => {
      Xt.value = T, y(), T || (Te.selectionGrid = []);
    },
    setTimePicker: (T, H = false) => {
      Ma.value = T, $a.value = H, y(), T || (Te.timePicker[0] = [], Te.timePicker[1] = []);
    },
    setTimePickerElements: (T, H = 0) => {
      Te.timePicker[H] = T;
    },
    arrowRight: a,
    arrowLeft: f,
    arrowUp: o,
    arrowDown: s,
    clearArrowNav: () => {
      Te.monthYear = [], Te.calendar = [], Te.time = [], Te.actionRow = [], Te.selectionGrid = [], Te.timePicker[0] = [], Te.timePicker[1] = [], Xt.value = false, Ma.value = false, $a.value = false, Da.value = false, y(), wa.value = null;
    },
    setMonthPicker: (T) => {
      Da.value = T, y();
    },
    refSets: Te
    // exposed for testing
  };
};
var ut = (e, t) => t ? new Date(e.toLocaleString("en-US", { timeZone: t })) : new Date(e);
var An = (e, t) => {
  const r = Pa(e, t);
  return r || W();
};
var ml = (e, t) => t.dateInTz ? ut(new Date(e), t.dateInTz) : W(e);
var Pa = (e, t) => {
  if (!e)
    return null;
  if (!t)
    return W(e);
  const r = W(e);
  return t.exactMatch ? ml(e, t) : ut(r, t.timezone);
};
var pl = (e) => {
  if (!e)
    return 0;
  const t = /* @__PURE__ */ new Date(), r = new Date(t.toLocaleString("en-US", { timeZone: "UTC" })), n = new Date(t.toLocaleString("en-US", { timeZone: e })), a = n.getTimezoneOffset() / 60;
  return (+r - +n) / (1e3 * 60 * 60) - a;
};
var en = (e) => ({
  menuAppearTop: "dp-menu-appear-top",
  menuAppearBottom: "dp-menu-appear-bottom",
  open: "dp-slide-down",
  close: "dp-slide-up",
  next: "calendar-next",
  previous: "calendar-prev",
  vNext: "dp-slide-up",
  vPrevious: "dp-slide-down",
  ...e ?? {}
});
var gl = (e) => ({
  toggleOverlay: "Toggle overlay",
  menu: "Datepicker menu",
  input: "Datepicker input",
  calendarWrap: "Calendar wrapper",
  calendarDays: "Calendar days",
  openTimePicker: "Open time picker",
  closeTimePicker: "Close time Picker",
  incrementValue: (t) => `Increment ${t}`,
  decrementValue: (t) => `Decrement ${t}`,
  openTpOverlay: (t) => `Open ${t} overlay`,
  amPmButton: "Switch AM/PM mode",
  openYearsOverlay: "Open years overlay",
  openMonthsOverlay: "Open months overlay",
  nextMonth: "Next month",
  prevMonth: "Previous month",
  nextYear: "Next year",
  prevYear: "Previous year",
  day: void 0,
  weekDay: void 0,
  ...e ?? {}
});
var tn = (e) => e ? typeof e == "boolean" ? e ? 2 : 0 : +e >= 2 ? +e : 2 : 0;
var yl = (e) => {
  const t = typeof e == "object" && e, r = {
    static: true,
    solo: false
  };
  if (!e)
    return { ...r, count: tn(false) };
  const n = t ? e : {}, a = t ? n.count ?? true : e, f = tn(a);
  return Object.assign(r, n, { count: f });
};
var hl = (e, t, r) => e || (typeof r == "string" ? r : t);
var bl = (e) => typeof e == "boolean" ? e ? en({}) : false : en(e);
var kl = (e) => {
  const t = {
    enterSubmit: true,
    tabSubmit: true,
    openMenu: true,
    selectOnFocus: false,
    rangeSeparator: " - "
  };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : { ...t, enabled: e };
};
var wl = (e) => ({
  months: [],
  years: [],
  times: { hours: [], minutes: [], seconds: [] },
  ...e ?? {}
});
var Ml = (e) => ({
  showSelect: true,
  showCancel: true,
  showNow: false,
  showPreview: true,
  ...e ?? {}
});
var Dl = (e) => {
  const t = { input: false };
  return typeof e == "object" ? { ...t, ...e ?? {}, enabled: true } : {
    enabled: e,
    ...t
  };
};
var $l = (e) => ({ ...{
  allowStopPropagation: true,
  closeOnScroll: false,
  modeHeight: 255,
  allowPreventDefault: false,
  closeOnClearValue: true,
  closeOnAutoApply: true,
  noSwipe: false,
  keepActionRow: false,
  onClickOutside: void 0,
  tabOutClosesMenu: true
}, ...e ?? {} });
var Al = (e) => {
  const t = {
    dates: Array.isArray(e) ? e.map((r) => W(r)) : [],
    years: [],
    months: [],
    quarters: [],
    weeks: [],
    weekdays: [],
    options: { highlightDisabled: false }
  };
  return typeof e == "function" ? e : { ...t, ...e ?? {} };
};
var Tl = (e) => typeof e == "object" ? {
  type: (e == null ? void 0 : e.type) ?? "local",
  hideOnOffsetDates: (e == null ? void 0 : e.hideOnOffsetDates) ?? false
} : {
  type: e,
  hideOnOffsetDates: false
};
var Sl = (e, t) => {
  const r = {
    noDisabledRange: false,
    showLastInRange: true,
    minMaxRawRange: false,
    partialRange: true,
    disableTimeRangeValidation: false,
    maxRange: void 0,
    minRange: void 0,
    autoRange: void 0,
    fixedStart: false,
    fixedEnd: false
  };
  return typeof e == "object" ? { enabled: true, ...r, ...e } : {
    enabled: e,
    noDisabledRange: t.noDisabledRange,
    showLastInRange: t.showLastInRange,
    minMaxRawRange: t.minMaxRawRange,
    partialRange: t.partialRange,
    disableTimeRangeValidation: t.disableTimeRangeValidation,
    maxRange: t.maxRange,
    minRange: t.minRange,
    autoRange: t.autoRange,
    fixedStart: t.fixedStart,
    fixedEnd: t.fixedEnd
  };
};
var Rl = (e, t) => e ? typeof e == "string" ? { timezone: e, exactMatch: false, dateInTz: void 0, emitTimezone: t, convertModel: true } : {
  timezone: e.timezone,
  exactMatch: e.exactMatch ?? false,
  dateInTz: e.dateInTz ?? void 0,
  emitTimezone: t ?? e.emitTimezone,
  convertModel: e.convertModel ?? true
} : { timezone: void 0, exactMatch: false, emitTimezone: t };
var Aa = (e, t) => new Map(
  e.map((r) => {
    const n = An(r, t);
    return [La(n), n];
  })
);
var Pl = (e, t) => e.length ? new Map(
  e.map((r) => {
    const n = An(r.date, t);
    return [La(n), r];
  })
) : null;
var Cl = (e, t, r, n, a, f, o) => ({
  minDate: Pa(e, o),
  maxDate: Pa(t, o),
  disabledDates: ga(r) ? Aa(r, o) : r,
  allowedDates: ga(n) ? Aa(n, o) : null,
  highlight: typeof a == "object" && ga(a == null ? void 0 : a.dates) ? Aa(a.dates, o) : a,
  markers: Pl(f, o)
});
var _l = (e, t) => typeof e == "boolean" ? { enabled: e, dragSelect: true, limit: +t } : {
  enabled: !!e,
  limit: e.limit ? +e.limit : null,
  dragSelect: e.dragSelect ?? true
};
var Re = (e) => {
  const t = () => {
    const I = e.enableSeconds ? ":ss" : "";
    return e.is24 ? `HH:mm${I}` : `hh:mm${I} aa`;
  }, r = () => {
    var I;
    return e.format ? e.format : e.monthPicker ? "MM/yyyy" : e.timePicker ? t() : e.weekPicker ? `${((I = F.value) == null ? void 0 : I.type) === "iso" ? "RR" : "ww"}-yyyy` : e.yearPicker ? "yyyy" : e.quarterPicker ? "QQQ/yyyy" : e.enableTimePicker ? `MM/dd/yyyy, ${t()}` : "MM/dd/yyyy";
  }, n = (I) => kn(I, e.enableSeconds), a = () => P.value.enabled ? e.startTime && Array.isArray(e.startTime) ? [n(e.startTime[0]), n(e.startTime[1])] : null : e.startTime && !Array.isArray(e.startTime) ? n(e.startTime) : null, f = computed(() => yl(e.multiCalendars)), o = computed(() => a()), s = computed(() => gl(e.ariaLabels)), C = computed(() => wl(e.filters)), A = computed(() => bl(e.transitions)), y = computed(() => Ml(e.actionRow)), R = computed(
    () => hl(e.previewFormat, e.format, r())
  ), w = computed(() => kl(e.textInput)), Y = computed(() => Dl(e.inline)), E = computed(() => $l(e.config)), M = computed(() => Al(e.highlight)), F = computed(() => Tl(e.weekNumbers)), T = computed(() => Rl(e.timezone, e.emitTimezone)), H = computed(() => _l(e.multiDates, e.multiDatesLimit)), B = computed(
    () => Cl(
      e.minDate,
      e.maxDate,
      e.disabledDates,
      e.allowedDates,
      M.value,
      e.markers,
      T.value
    )
  ), P = computed(
    () => Sl(e.range, {
      minMaxRawRange: false,
      maxRange: e.maxRange,
      minRange: e.minRange,
      noDisabledRange: e.noDisabledRange,
      showLastInRange: e.showLastInRange,
      partialRange: e.partialRange,
      disableTimeRangeValidation: e.disableTimeRangeValidation,
      autoRange: e.autoRange,
      fixedStart: e.fixedStart,
      fixedEnd: e.fixedEnd
    })
  );
  return {
    defaultedTransitions: A,
    defaultedMultiCalendars: f,
    defaultedStartTime: o,
    defaultedAriaLabels: s,
    defaultedFilters: C,
    defaultedActionRow: y,
    defaultedPreviewFormat: R,
    defaultedTextInput: w,
    defaultedInline: Y,
    defaultedConfig: E,
    defaultedHighlight: M,
    defaultedWeekNumbers: F,
    defaultedRange: P,
    propDates: B,
    defaultedTz: T,
    defaultedMultiDates: H,
    getDefaultPattern: r,
    getDefaultStartTime: a
  };
};
var Ol = (e, t, r) => {
  const n = ref(), { defaultedTextInput: a, defaultedRange: f, defaultedTz: o, defaultedMultiDates: s, getDefaultPattern: C } = Re(t), A = ref(""), y = toRef(t, "format");
  watch(
    n,
    () => {
      e("internal-model-change", n.value);
    },
    { deep: true }
  ), watch(y, () => {
    h2();
  });
  const R = (l) => o.value.timezone && o.value.convertModel ? ut(l, o.value.timezone) : l, w = (l) => {
    if (o.value.timezone && o.value.convertModel) {
      const S = pl(o.value.timezone);
      return addHours(l, S);
    }
    return l;
  }, Y = (l, S, j = false) => Mn(
    l,
    t.format,
    t.formatLocale,
    a.value.rangeSeparator,
    t.modelAuto,
    S ?? C(),
    j
  ), E = (l) => l ? t.modelType ? q(l) : {
    hours: getHours(l),
    minutes: getMinutes(l),
    seconds: t.enableSeconds ? getSeconds(l) : 0
  } : null, M = (l) => t.modelType ? q(l) : { month: getMonth(l), year: getYear(l) }, F = (l) => Array.isArray(l) ? s.value.enabled ? l.map((S) => T(S, setYear(W(), S))) : qt(
    () => [
      setYear(W(), l[0]),
      l[1] ? setYear(W(), l[1]) : St(f.value.partialRange)
    ],
    f.value.enabled
  ) : setYear(W(), +l), T = (l, S) => (typeof l == "string" || typeof l == "number") && t.modelType ? v(l) : S, H = (l) => Array.isArray(l) ? [
    T(
      l[0],
      mt(null, +l[0].hours, +l[0].minutes, l[0].seconds)
    ),
    T(
      l[1],
      mt(null, +l[1].hours, +l[1].minutes, l[1].seconds)
    )
  ] : T(l, mt(null, l.hours, l.minutes, l.seconds)), B = (l) => {
    const S = set(W(), { date: 1 });
    return Array.isArray(l) ? s.value.enabled ? l.map((j) => T(j, st(S, +j.month, +j.year))) : qt(
      () => [
        T(l[0], st(S, +l[0].month, +l[0].year)),
        T(
          l[1],
          l[1] ? st(S, +l[1].month, +l[1].year) : St(f.value.partialRange)
        )
      ],
      f.value.enabled
    ) : T(l, st(S, +l.month, +l.year));
  }, P = (l) => {
    if (Array.isArray(l))
      return l.map((S) => v(S));
    throw new Error(Fa.dateArr("multi-dates"));
  }, I = (l) => {
    if (Array.isArray(l) && f.value.enabled) {
      const S = l[0], j = l[1];
      return [
        W(Array.isArray(S) ? S[0] : null),
        W(Array.isArray(j) ? j[0] : null)
      ];
    }
    return W(l[0]);
  }, L = (l) => t.modelAuto ? Array.isArray(l) ? [v(l[0]), v(l[1])] : t.autoApply ? [v(l)] : [v(l), null] : Array.isArray(l) ? qt(
    () => l[1] ? [
      v(l[0]),
      l[1] ? v(l[1]) : St(f.value.partialRange)
    ] : [v(l[0])],
    f.value.enabled
  ) : v(l), J = () => {
    Array.isArray(n.value) && f.value.enabled && n.value.length === 1 && n.value.push(St(f.value.partialRange));
  }, $ = () => {
    const l = n.value;
    return [
      q(l[0]),
      l[1] ? q(l[1]) : St(f.value.partialRange)
    ];
  }, se = () => n.value[1] ? $() : q(Oe(n.value[0])), le = () => (n.value || []).map((l) => q(l)), ae = () => (J(), t.modelAuto ? se() : s.value.enabled ? le() : Array.isArray(n.value) ? qt(() => $(), f.value.enabled) : q(Oe(n.value))), _ = (l) => !l || Array.isArray(l) && !l.length ? null : t.timePicker ? H(Oe(l)) : t.monthPicker ? B(Oe(l)) : t.yearPicker ? F(Oe(l)) : s.value.enabled ? P(Oe(l)) : t.weekPicker ? I(Oe(l)) : L(Oe(l)), z = (l) => {
    const S = _(l);
    Ra(Oe(S)) ? (n.value = Oe(S), h2()) : (n.value = null, A.value = "");
  }, ee = () => {
    const l = (S) => format(S, a.value.format);
    return `${l(n.value[0])} ${a.value.rangeSeparator} ${n.value[1] ? l(n.value[1]) : ""}`;
  }, V = () => r.value && n.value ? Array.isArray(n.value) ? ee() : format(n.value, a.value.format) : Y(n.value), c = () => n.value ? s.value.enabled ? n.value.map((l) => Y(l)).join("; ") : a.value.enabled && typeof a.value.format == "string" ? V() : Y(n.value) : "", h2 = () => {
    !t.format || typeof t.format == "string" || a.value.enabled && typeof a.value.format == "string" ? A.value = c() : A.value = t.format(n.value);
  }, v = (l) => {
    if (t.utc) {
      const S = new Date(l);
      return t.utc === "preserve" ? new Date(S.getTime() + S.getTimezoneOffset() * 6e4) : S;
    }
    return t.modelType ? t.modelType === "date" || t.modelType === "timestamp" ? R(new Date(l)) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? R(parse(l, C(), /* @__PURE__ */ new Date())) : R(parse(l, t.modelType, /* @__PURE__ */ new Date())) : R(new Date(l));
  }, q = (l) => l ? t.utc ? ul(l, t.utc === "preserve", t.enableSeconds) : t.modelType ? t.modelType === "timestamp" ? +w(l) : t.modelType === "format" && (typeof t.format == "string" || !t.format) ? Y(w(l)) : Y(w(l), t.modelType, true) : w(l) : "", N = (l, S = false) => {
    if (e("update:model-value", l), o.value.emitTimezone && S) {
      const j = Array.isArray(l) ? l.map((d) => ut(Oe(d), o.value.emitTimezone)) : ut(Oe(l), o.value.emitTimezone);
      e("update:model-timezone-value", j);
    }
  }, m = (l) => Array.isArray(n.value) ? s.value.enabled ? n.value.map((S) => l(S)) : [
    l(n.value[0]),
    n.value[1] ? l(n.value[1]) : St(f.value.partialRange)
  ] : l(Oe(n.value)), K = () => {
    if (Array.isArray(n.value)) {
      const l = ot(n.value[0], t.weekStart), S = n.value[1] ? ot(n.value[1], t.weekStart) : [];
      return [l.map((j) => W(j)), S.map((j) => W(j))];
    }
    return ot(n.value, t.weekStart).map((l) => W(l));
  }, te = (l) => N(Oe(m(l)));
  return {
    inputValue: A,
    internalModelValue: n,
    checkBeforeEmit: () => n.value ? f.value.enabled ? f.value.partialRange ? n.value.length >= 1 : n.value.length === 2 : !!n.value : false,
    parseExternalModelValue: z,
    formatInputValue: h2,
    emitModelValue: () => (h2(), t.monthPicker ? te(M) : t.timePicker ? te(E) : t.yearPicker ? te(getYear) : t.weekPicker ? e("update:model-value", K()) : N(ae(), true))
  };
};
var Bl = (e, t) => {
  const { defaultedFilters: r, propDates: n } = Re(e), { validateMonthYearInRange: a } = yt(e), f = (y, R) => {
    let w = y;
    return r.value.months.includes(getMonth(w)) ? (w = R ? addMonths(y, 1) : subMonths(y, 1), f(w, R)) : w;
  }, o = (y, R) => {
    let w = y;
    return r.value.years.includes(getYear(w)) ? (w = R ? addYears(y, 1) : subYears(y, 1), o(w, R)) : w;
  }, s = (y, R = false) => {
    const w = set(W(), { month: e.month, year: e.year });
    let Y = y ? addMonths(w, 1) : subMonths(w, 1);
    e.disableYearSelect && (Y = setYear(Y, e.year));
    let E = getMonth(Y), M = getYear(Y);
    r.value.months.includes(E) && (Y = f(Y, y), E = getMonth(Y), M = getYear(Y)), r.value.years.includes(M) && (Y = o(Y, y), M = getYear(Y)), a(E, M, y, e.preventMinMaxNavigation) && C(E, M, R);
  }, C = (y, R, w) => {
    t("update-month-year", { month: y, year: R, fromNav: w });
  }, A = computed(() => (y) => wn(
    set(W(), { month: e.month, year: e.year }),
    n.value.maxDate,
    n.value.minDate,
    e.preventMinMaxNavigation,
    y
  ));
  return { handleMonthYearChange: s, isDisabled: A, updateMonthYear: C };
};
var Rt = ((e) => (e.center = "center", e.left = "left", e.right = "right", e))(Rt || {});
var qe = ((e) => (e.month = "month", e.year = "year", e))(qe || {});
var wt = ((e) => (e.top = "top", e.bottom = "bottom", e))(wt || {});
var At = ((e) => (e.header = "header", e.calendar = "calendar", e.timePicker = "timePicker", e))(At || {});
var tt = ((e) => (e.month = "month", e.year = "year", e.calendar = "calendar", e.time = "time", e.minutes = "minutes", e.hours = "hours", e.seconds = "seconds", e))(tt || {});
var Yl = ({
  menuRef: e,
  menuRefInner: t,
  inputRef: r,
  pickerWrapperRef: n,
  inline: a,
  emit: f,
  props: o,
  slots: s
}) => {
  const C = ref({}), A = ref(false), y = ref({
    top: "0",
    left: "0"
  }), R = ref(false), w = toRef(o, "teleportCenter");
  watch(w, () => {
    y.value = JSON.parse(JSON.stringify({})), P();
  });
  const Y = (c) => {
    if (o.teleport) {
      const h2 = c.getBoundingClientRect();
      return {
        left: h2.left + window.scrollX,
        top: h2.top + window.scrollY
      };
    }
    return { top: 0, left: 0 };
  }, E = (c, h2) => {
    y.value.left = `${c + h2 - C.value.width}px`;
  }, M = (c) => {
    y.value.left = `${c}px`;
  }, F = (c, h2) => {
    o.position === Rt.left && M(c), o.position === Rt.right && E(c, h2), o.position === Rt.center && (y.value.left = `${c + h2 / 2 - C.value.width / 2}px`);
  }, T = (c) => {
    const { width: h2, height: v } = c.getBoundingClientRect(), { top: q, left: N } = o.altPosition ? o.altPosition(c) : Y(c);
    return { top: +q, left: +N, width: h2, height: v };
  }, H = () => {
    y.value.left = "50%", y.value.top = "50%", y.value.transform = "translate(-50%, -50%)", y.value.position = "fixed", delete y.value.opacity;
  }, B = () => {
    const c = Ie(r), { top: h2, left: v, transform: q } = o.altPosition(c);
    y.value = { top: `${h2}px`, left: `${v}px`, transform: q ?? "" };
  }, P = (c = true) => {
    var h2;
    if (!a.value.enabled) {
      if (w.value)
        return H();
      if (o.altPosition !== null)
        return B();
      if (c) {
        const v = o.teleport ? (h2 = t.value) == null ? void 0 : h2.$el : e.value;
        v && (C.value = v.getBoundingClientRect()), f("recalculate-position");
      }
      return ae();
    }
  }, I = ({ inputEl: c, left: h2, width: v }) => {
    window.screen.width > 768 && !A.value && F(h2, v), $(c);
  }, L = (c) => {
    const { top: h2, left: v, height: q, width: N } = T(c);
    y.value.top = `${q + h2 + +o.offset}px`, R.value = false, A.value || (y.value.left = `${v + N / 2 - C.value.width / 2}px`), I({ inputEl: c, left: v, width: N });
  }, J = (c) => {
    const { top: h2, left: v, width: q } = T(c);
    y.value.top = `${h2 - +o.offset - C.value.height}px`, R.value = true, I({ inputEl: c, left: v, width: q });
  }, $ = (c) => {
    if (o.autoPosition) {
      const { left: h2, width: v } = T(c), { left: q, right: N } = C.value;
      if (!A.value) {
        if (Math.abs(q) !== Math.abs(N)) {
          if (q <= 0)
            return A.value = true, M(h2);
          if (N >= document.documentElement.clientWidth)
            return A.value = true, E(h2, v);
        }
        return F(h2, v);
      }
    }
  }, se = () => {
    const c = Ie(r);
    if (c) {
      const { height: h2 } = C.value, { top: v, height: q } = c.getBoundingClientRect(), m = window.innerHeight - v - q, K = v;
      return h2 <= m ? wt.bottom : h2 > m && h2 <= K ? wt.top : m >= K ? wt.bottom : wt.top;
    }
    return wt.bottom;
  }, le = (c) => se() === wt.bottom ? L(c) : J(c), ae = () => {
    const c = Ie(r);
    if (c)
      return o.autoPosition ? le(c) : L(c);
  }, _ = function(c) {
    if (c) {
      const h2 = c.scrollHeight > c.clientHeight, q = window.getComputedStyle(c).overflowY.indexOf("hidden") !== -1;
      return h2 && !q;
    }
    return true;
  }, z = function(c) {
    return !c || c === document.body || c.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? window : _(c) ? c : z(c.parentNode);
  }, ee = (c) => {
    if (c)
      switch (o.position) {
        case Rt.left:
          return { left: 0, transform: "translateX(0)" };
        case Rt.right:
          return { left: `${c.width}px`, transform: "translateX(-100%)" };
        default:
          return { left: `${c.width / 2}px`, transform: "translateX(-50%)" };
      }
    return {};
  };
  return {
    openOnTop: R,
    menuStyle: y,
    xCorrect: A,
    setMenuPosition: P,
    getScrollableParent: z,
    shadowRender: (c, h2) => {
      var te, i, b;
      const v = document.createElement("div"), q = (te = Ie(r)) == null ? void 0 : te.getBoundingClientRect();
      v.setAttribute("id", "dp--temp-container");
      const N = (i = n.value) != null && i.clientWidth ? n.value : document.body;
      N.append(v);
      const m = ee(q), K = h(
        c,
        {
          ...h2,
          shadow: true,
          style: { opacity: 0, position: "absolute", ...m }
        },
        Object.fromEntries(
          Object.keys(s).filter((l) => ["right-sidebar", "left-sidebar"].includes(l)).map((l) => [l, s[l]])
        )
      );
      render(K, v), C.value = (b = K.el) == null ? void 0 : b.getBoundingClientRect(), render(null, v), N.removeChild(v);
    }
  };
};
var ct = [
  { name: "clock-icon", use: ["time", "calendar", "shared"] },
  { name: "arrow-left", use: ["month-year", "calendar", "shared", "year-mode"] },
  { name: "arrow-right", use: ["month-year", "calendar", "shared", "year-mode"] },
  { name: "arrow-up", use: ["time", "calendar", "month-year", "shared"] },
  { name: "arrow-down", use: ["time", "calendar", "month-year", "shared"] },
  { name: "calendar-icon", use: ["month-year", "time", "calendar", "shared", "year-mode"] },
  { name: "day", use: ["calendar", "shared"] },
  { name: "month-overlay-value", use: ["calendar", "month-year", "shared"] },
  { name: "year-overlay-value", use: ["calendar", "month-year", "shared", "year-mode"] },
  { name: "year-overlay", use: ["month-year", "shared"] },
  { name: "month-overlay", use: ["month-year", "shared"] },
  { name: "month-overlay-header", use: ["month-year", "shared"] },
  { name: "year-overlay-header", use: ["month-year", "shared"] },
  { name: "hours-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "minutes-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "seconds-overlay-value", use: ["calendar", "time", "shared"] },
  { name: "hours", use: ["calendar", "time", "shared"] },
  { name: "minutes", use: ["calendar", "time", "shared"] },
  { name: "month", use: ["calendar", "month-year", "shared"] },
  { name: "year", use: ["calendar", "month-year", "shared", "year-mode"] },
  { name: "action-buttons", use: ["action"] },
  { name: "action-preview", use: ["action"] },
  { name: "calendar-header", use: ["calendar", "shared"] },
  { name: "marker-tooltip", use: ["calendar", "shared"] },
  { name: "action-extra", use: ["menu"] },
  { name: "time-picker-overlay", use: ["calendar", "time", "shared"] },
  { name: "am-pm-button", use: ["calendar", "time", "shared"] },
  { name: "left-sidebar", use: ["menu"] },
  { name: "right-sidebar", use: ["menu"] },
  { name: "month-year", use: ["month-year", "shared"] },
  { name: "time-picker", use: ["menu", "shared"] },
  { name: "action-row", use: ["action"] },
  { name: "marker", use: ["calendar", "shared"] },
  { name: "quarter", use: ["shared"] }
];
var Il = [{ name: "trigger" }, { name: "input-icon" }, { name: "clear-icon" }, { name: "dp-input" }];
var Nl = {
  all: () => ct,
  monthYear: () => ct.filter((e) => e.use.includes("month-year")),
  input: () => Il,
  timePicker: () => ct.filter((e) => e.use.includes("time")),
  action: () => ct.filter((e) => e.use.includes("action")),
  calendar: () => ct.filter((e) => e.use.includes("calendar")),
  menu: () => ct.filter((e) => e.use.includes("menu")),
  shared: () => ct.filter((e) => e.use.includes("shared")),
  yearMode: () => ct.filter((e) => e.use.includes("year-mode"))
};
var Ke = (e, t, r) => {
  const n = [];
  return Nl[t]().forEach((a) => {
    e[a.name] && n.push(a.name);
  }), r != null && r.length && r.forEach((a) => {
    a.slot && n.push(a.slot);
  }), n;
};
var Ut = (e) => {
  const t = computed(() => (n) => e.value ? n ? e.value.open : e.value.close : ""), r = computed(() => (n) => e.value ? n ? e.value.menuAppearTop : e.value.menuAppearBottom : "");
  return { transitionName: t, showTransition: !!e.value, menuTransition: r };
};
var Kt = (e, t) => {
  const { defaultedRange: r, defaultedTz: n } = Re(e), a = W(ut(W(), n.value.timezone)), f = ref([{ month: getMonth(a), year: getYear(a) }]), o = reactive({
    hours: r.value.enabled ? [getHours(a), getHours(a)] : getHours(a),
    minutes: r.value.enabled ? [getMinutes(a), getMinutes(a)] : getMinutes(a),
    seconds: r.value.enabled ? [0, 0] : 0
  }), s = computed({
    get: () => e.internalModelValue,
    set: (y) => {
      !e.readonly && !e.disabled && t("update:internal-model-value", y);
    }
  }), C = computed(
    () => (y) => f.value[y] ? f.value[y].month : 0
  ), A = computed(
    () => (y) => f.value[y] ? f.value[y].year : 0
  );
  return {
    calendars: f,
    time: o,
    modelValue: s,
    month: C,
    year: A
  };
};
var El = (e, t) => {
  const { defaultedMultiCalendars: r, defaultedMultiDates: n, defaultedHighlight: a, defaultedTz: f, propDates: o, defaultedRange: s } = Re(t), { isDisabled: C } = yt(t), A = ref(null), y = ref(ut(/* @__PURE__ */ new Date(), f.value.timezone)), R = (i) => {
    !i.current && t.hideOffsetDates || (A.value = i.value);
  }, w = () => {
    A.value = null;
  }, Y = (i) => Array.isArray(e.value) && s.value.enabled && e.value[0] && A.value ? i ? _e(A.value, e.value[0]) : Pe(A.value, e.value[0]) : true, E = (i, b) => {
    const l = () => e.value ? b ? e.value[0] || null : e.value[1] : null, S = e.value && Array.isArray(e.value) ? l() : null;
    return we(W(i.value), S);
  }, M = (i) => {
    const b = Array.isArray(e.value) ? e.value[0] : null;
    return i ? !Pe(A.value ?? null, b) : true;
  }, F = (i, b = true) => (s.value.enabled || t.weekPicker) && Array.isArray(e.value) && e.value.length === 2 ? t.hideOffsetDates && !i.current ? false : we(W(i.value), e.value[b ? 0 : 1]) : s.value.enabled ? E(i, b) && M(b) || we(i.value, Array.isArray(e.value) ? e.value[0] : null) && Y(b) : false, T = (i, b, l) => Array.isArray(e.value) && e.value[0] && e.value.length === 1 ? i ? false : l ? _e(e.value[0], b.value) : Pe(e.value[0], b.value) : false, H = (i) => !e.value || t.hideOffsetDates && !i.current ? false : s.value.enabled ? t.modelAuto && Array.isArray(e.value) ? we(i.value, e.value[0] ? e.value[0] : y.value) : false : n.value.enabled && Array.isArray(e.value) ? e.value.some((b) => we(b, i.value)) : we(i.value, e.value ? e.value : y.value), B = (i) => {
    if (s.value.autoRange || t.weekPicker) {
      if (A.value) {
        if (t.hideOffsetDates && !i.current)
          return false;
        const b = addDays(A.value, +s.value.autoRange), l = ot(W(A.value), t.weekStart);
        return t.weekPicker ? we(l[1], W(i.value)) : we(b, W(i.value));
      }
      return false;
    }
    return false;
  }, P = (i) => {
    if (s.value.autoRange || t.weekPicker) {
      if (A.value) {
        const b = addDays(A.value, +s.value.autoRange);
        if (t.hideOffsetDates && !i.current)
          return false;
        const l = ot(W(A.value), t.weekStart);
        return t.weekPicker ? _e(i.value, l[0]) && Pe(i.value, l[1]) : _e(i.value, A.value) && Pe(i.value, b);
      }
      return false;
    }
    return false;
  }, I = (i) => {
    if (s.value.autoRange || t.weekPicker) {
      if (A.value) {
        if (t.hideOffsetDates && !i.current)
          return false;
        const b = ot(W(A.value), t.weekStart);
        return t.weekPicker ? we(b[0], i.value) : we(A.value, i.value);
      }
      return false;
    }
    return false;
  }, L = (i) => la(e.value, A.value, i.value), J = () => t.modelAuto && Array.isArray(t.internalModelValue) ? !!t.internalModelValue[0] : false, $ = () => t.modelAuto ? mn(t.internalModelValue) : true, se = (i) => {
    if (t.weekPicker)
      return false;
    const b = s.value.enabled ? !F(i) && !F(i, false) : true;
    return !C(i.value) && !H(i) && !(!i.current && t.hideOffsetDates) && b;
  }, le = (i) => s.value.enabled ? t.modelAuto ? J() && H(i) : false : H(i), ae = (i) => a.value ? ol(i.value, o.value.highlight) : false, _ = (i) => {
    const b = C(i.value);
    return b && (typeof a.value == "function" ? !a.value(i.value, b) : !a.value.options.highlightDisabled);
  }, z = (i) => {
    var b;
    return typeof a.value == "function" ? a.value(i.value) : (b = a.value.weekdays) == null ? void 0 : b.includes(i.value.getDay());
  }, ee = (i) => (s.value.enabled || t.weekPicker) && (!(r.value.count > 0) || i.current) && $() && !(!i.current && t.hideOffsetDates) && !H(i) ? L(i) : false, V = (i) => {
    const { isRangeStart: b, isRangeEnd: l } = q(i), S = s.value.enabled ? b || l : false;
    return {
      dp__cell_offset: !i.current,
      dp__pointer: !t.disabled && !(!i.current && t.hideOffsetDates) && !C(i.value),
      dp__cell_disabled: C(i.value),
      dp__cell_highlight: !_(i) && (ae(i) || z(i)) && !le(i) && !S && !I(i) && !(ee(i) && t.weekPicker) && !l,
      dp__cell_highlight_active: !_(i) && (ae(i) || z(i)) && le(i),
      dp__today: !t.noToday && we(i.value, y.value) && i.current,
      "dp--past": Pe(i.value, y.value),
      "dp--future": _e(i.value, y.value)
    };
  }, c = (i) => ({
    dp__active_date: le(i),
    dp__date_hover: se(i)
  }), h2 = (i) => {
    if (e.value && !Array.isArray(e.value)) {
      const b = ot(e.value, t.weekStart);
      return {
        ...m(i),
        dp__range_start: we(b[0], i.value),
        dp__range_end: we(b[1], i.value),
        dp__range_between_week: _e(i.value, b[0]) && Pe(i.value, b[1])
      };
    }
    return {
      ...m(i)
    };
  }, v = (i) => {
    if (e.value && Array.isArray(e.value)) {
      const b = ot(e.value[0], t.weekStart), l = e.value[1] ? ot(e.value[1], t.weekStart) : [];
      return {
        ...m(i),
        dp__range_start: we(b[0], i.value) || we(l[0], i.value),
        dp__range_end: we(b[1], i.value) || we(l[1], i.value),
        dp__range_between_week: _e(i.value, b[0]) && Pe(i.value, b[1]) || _e(i.value, l[0]) && Pe(i.value, l[1]),
        dp__range_between: _e(i.value, b[1]) && Pe(i.value, l[0])
      };
    }
    return {
      ...m(i)
    };
  }, q = (i) => {
    const b = r.value.count > 0 ? i.current && F(i) && $() : F(i) && $(), l = r.value.count > 0 ? i.current && F(i, false) && $() : F(i, false) && $();
    return { isRangeStart: b, isRangeEnd: l };
  }, N = (i) => {
    const { isRangeStart: b, isRangeEnd: l } = q(i);
    return {
      dp__range_start: b,
      dp__range_end: l,
      dp__range_between: ee(i),
      dp__date_hover: se(i),
      dp__date_hover_start: T(se(i), i, true),
      dp__date_hover_end: T(se(i), i, false)
    };
  }, m = (i) => ({
    ...N(i),
    dp__cell_auto_range: P(i),
    dp__cell_auto_range_start: I(i),
    dp__cell_auto_range_end: B(i)
  }), K = (i) => s.value.enabled ? s.value.autoRange ? m(i) : t.modelAuto ? { ...c(i), ...N(i) } : t.weekPicker ? v(i) : N(i) : t.weekPicker ? h2(i) : c(i);
  return {
    setHoverDate: R,
    clearHoverDate: w,
    getDayClassData: (i) => t.hideOffsetDates && !i.current ? {} : {
      ...V(i),
      ...K(i),
      [t.dayClass ? t.dayClass(i.value) : ""]: true,
      [t.calendarCellClassName]: !!t.calendarCellClassName
    }
  };
};
var yt = (e) => {
  const { defaultedFilters: t, defaultedRange: r, propDates: n, defaultedMultiDates: a } = Re(e), f = (_) => n.value.disabledDates ? typeof n.value.disabledDates == "function" ? n.value.disabledDates(W(_)) : !!ta(_, n.value.disabledDates) : false, o = (_) => {
    const z = n.value.maxDate ? _e(_, n.value.maxDate) : false, ee = n.value.minDate ? Pe(_, n.value.minDate) : false, V = f(_), h2 = t.value.months.map((K) => +K).includes(getMonth(_)), v = e.disabledWeekDays.length ? e.disabledWeekDays.some((K) => +K === getDay(_)) : false, q = R(_), N = getYear(_), m = N < +e.yearRange[0] || N > +e.yearRange[1];
    return !(z || ee || V || h2 || m || v || q);
  }, s = (_, z) => Pe(...ft(n.value.minDate, _, z)) || we(...ft(n.value.minDate, _, z)), C = (_, z) => _e(...ft(n.value.maxDate, _, z)) || we(...ft(n.value.maxDate, _, z)), A = (_, z, ee) => {
    let V = false;
    return n.value.maxDate && ee && C(_, z) && (V = true), n.value.minDate && !ee && s(_, z) && (V = true), V;
  }, y = (_, z, ee, V) => {
    let c = false;
    return V ? n.value.minDate && n.value.maxDate ? c = A(_, z, ee) : (n.value.minDate && s(_, z) || n.value.maxDate && C(_, z)) && (c = true) : c = true, c;
  }, R = (_) => Array.isArray(n.value.allowedDates) && !n.value.allowedDates.length ? true : n.value.allowedDates ? !ta(_, n.value.allowedDates) : false, w = (_) => !o(_), Y = (_) => r.value.noDisabledRange ? !eachDayOfInterval({ start: _[0], end: _[1] }).some((ee) => w(ee)) : true, E = (_) => {
    if (_) {
      const z = getYear(_);
      return z >= +e.yearRange[0] && z <= e.yearRange[1];
    }
    return true;
  }, M = (_, z) => !!(Array.isArray(_) && _[z] && (r.value.maxRange || r.value.minRange) && E(_[z])), F = (_, z, ee = 0) => {
    if (M(z, ee) && E(_)) {
      const V = differenceInCalendarDays(_, z[ee]), c = bn(z[ee], _), h2 = c.length === 1 ? 0 : c.filter((q) => w(q)).length, v = Math.abs(V) - (r.value.minMaxRawRange ? 0 : h2);
      if (r.value.minRange && r.value.maxRange)
        return v >= +r.value.minRange && v <= +r.value.maxRange;
      if (r.value.minRange)
        return v >= +r.value.minRange;
      if (r.value.maxRange)
        return v <= +r.value.maxRange;
    }
    return true;
  }, T = () => !e.enableTimePicker || e.monthPicker || e.yearPicker || e.ignoreTimeValidation, H = (_) => Array.isArray(_) ? [_[0] ? ka(_[0]) : null, _[1] ? ka(_[1]) : null] : ka(_), B = (_, z, ee) => _.find(
    (V) => +V.hours === getHours(z) && V.minutes === "*" ? true : +V.minutes === getMinutes(z) && +V.hours === getHours(z)
  ) && ee, P = (_, z, ee) => {
    const [V, c] = _, [h2, v] = z;
    return !B(V, h2, ee) && !B(c, v, ee) && ee;
  }, I = (_, z) => {
    const ee = Array.isArray(z) ? z : [z];
    return Array.isArray(e.disabledTimes) ? Array.isArray(e.disabledTimes[0]) ? P(e.disabledTimes, ee, _) : !ee.some((V) => B(e.disabledTimes, V, _)) : _;
  }, L = (_, z) => {
    const ee = Array.isArray(z) ? [$t(z[0]), z[1] ? $t(z[1]) : void 0] : $t(z), V = !e.disabledTimes(ee);
    return _ && V;
  }, J = (_, z) => e.disabledTimes ? Array.isArray(e.disabledTimes) ? I(z, _) : L(z, _) : z, $ = (_) => {
    let z = true;
    if (!_ || T())
      return true;
    const ee = !n.value.minDate && !n.value.maxDate ? H(_) : _;
    return (e.maxTime || n.value.maxDate) && (z = xa(
      e.maxTime,
      n.value.maxDate,
      "max",
      Oe(ee),
      z
    )), (e.minTime || n.value.minDate) && (z = xa(
      e.minTime,
      n.value.minDate,
      "min",
      Oe(ee),
      z
    )), J(_, z);
  }, se = (_) => {
    if (!e.monthPicker)
      return true;
    let z = true;
    const ee = W(Xe(_));
    if (n.value.minDate && n.value.maxDate) {
      const V = W(Xe(n.value.minDate)), c = W(Xe(n.value.maxDate));
      return _e(ee, V) && Pe(ee, c) || we(ee, V) || we(ee, c);
    }
    if (n.value.minDate) {
      const V = W(Xe(n.value.minDate));
      z = _e(ee, V) || we(ee, V);
    }
    if (n.value.maxDate) {
      const V = W(Xe(n.value.maxDate));
      z = Pe(ee, V) || we(ee, V);
    }
    return z;
  }, le = computed(() => (_) => !e.enableTimePicker || e.ignoreTimeValidation ? true : $(_)), ae = computed(() => (_) => e.monthPicker ? Array.isArray(_) && (r.value.enabled || a.value.enabled) ? !_.filter((ee) => !se(ee)).length : se(_) : true);
  return {
    isDisabled: w,
    validateDate: o,
    validateMonthYearInRange: y,
    isDateRangeAllowed: Y,
    checkMinMaxRange: F,
    isValidTime: $,
    isTimeValid: le,
    isMonthValid: ae
  };
};
var ra = () => {
  const e = computed(() => (n, a) => n == null ? void 0 : n.includes(a)), t = computed(() => (n, a) => n.count ? n.solo ? true : a === 0 : true), r = computed(() => (n, a) => n.count ? n.solo ? true : a === n.count - 1 : true);
  return { hideNavigationButtons: e, showLeftIcon: t, showRightIcon: r };
};
var Fl = (e, t, r) => {
  const n = ref(0), a = reactive({
    [At.timePicker]: !e.enableTimePicker || e.timePicker || e.monthPicker,
    [At.calendar]: false,
    [At.header]: false
  }), f = computed(() => e.monthPicker), o = (R) => {
    var w;
    if ((w = e.flow) != null && w.length) {
      if (!R && f.value)
        return y();
      a[R] = true, Object.keys(a).filter((Y) => !a[Y]).length || y();
    }
  }, s = () => {
    var R;
    (R = e.flow) != null && R.length && n.value !== -1 && (n.value += 1, t("flow-step", n.value), y());
  }, C = () => {
    n.value = -1;
  }, A = (R, w, ...Y) => {
    var E, M;
    e.flow[n.value] === R && r.value && ((M = (E = r.value)[w]) == null || M.call(E, ...Y));
  }, y = () => {
    A(tt.month, "toggleMonthPicker", true), A(tt.year, "toggleYearPicker", true), A(tt.calendar, "toggleTimePicker", false, true), A(tt.time, "toggleTimePicker", true, true);
    const R = e.flow[n.value];
    (R === tt.hours || R === tt.minutes || R === tt.seconds) && A(R, "toggleTimePicker", true, true, R);
  };
  return { childMount: o, updateFlowStep: s, resetFlow: C, flowStep: n };
};
var oa = {
  multiCalendars: { type: [Boolean, Number, String, Object], default: void 0 },
  modelValue: { type: [String, Date, Array, Object, Number], default: null },
  modelType: { type: String, default: null },
  position: { type: String, default: "center" },
  dark: { type: Boolean, default: false },
  format: {
    type: [String, Function],
    default: () => null
  },
  autoPosition: { type: Boolean, default: true },
  altPosition: { type: Function, default: null },
  transitions: { type: [Boolean, Object], default: true },
  formatLocale: { type: Object, default: null },
  utc: { type: [Boolean, String], default: false },
  ariaLabels: { type: Object, default: () => ({}) },
  offset: { type: [Number, String], default: 10 },
  hideNavigation: { type: Array, default: () => [] },
  timezone: { type: [String, Object], default: null },
  emitTimezone: { type: String, default: null },
  vertical: { type: Boolean, default: false },
  disableMonthYearSelect: { type: Boolean, default: false },
  disableYearSelect: { type: Boolean, default: false },
  menuClassName: { type: String, default: null },
  dayClass: { type: Function, default: null },
  yearRange: { type: Array, default: () => [1900, 2100] },
  calendarCellClassName: { type: String, default: null },
  enableTimePicker: { type: Boolean, default: true },
  autoApply: { type: Boolean, default: false },
  disabledDates: { type: [Array, Function], default: () => [] },
  monthNameFormat: { type: String, default: "short" },
  startDate: { type: [Date, String], default: null },
  startTime: { type: [Object, Array], default: null },
  hideOffsetDates: { type: Boolean, default: false },
  autoRange: { type: [Number, String], default: null },
  noToday: { type: Boolean, default: false },
  disabledWeekDays: { type: Array, default: () => [] },
  allowedDates: { type: Array, default: null },
  nowButtonLabel: { type: String, default: "Now" },
  markers: { type: Array, default: () => [] },
  escClose: { type: Boolean, default: true },
  spaceConfirm: { type: Boolean, default: true },
  monthChangeOnArrows: { type: Boolean, default: true },
  presetDates: { type: Array, default: () => [] },
  flow: { type: Array, default: () => [] },
  partialFlow: { type: Boolean, default: false },
  preventMinMaxNavigation: { type: Boolean, default: false },
  minRange: { type: [Number, String], default: null },
  maxRange: { type: [Number, String], default: null },
  multiDatesLimit: { type: [Number, String], default: null },
  reverseYears: { type: Boolean, default: false },
  weekPicker: { type: Boolean, default: false },
  filters: { type: Object, default: () => ({}) },
  arrowNavigation: { type: Boolean, default: false },
  disableTimeRangeValidation: { type: Boolean, default: false },
  highlight: {
    type: [Function, Object],
    default: null
  },
  teleport: { type: [String, Boolean, Object], default: null },
  teleportCenter: { type: Boolean, default: false },
  locale: { type: String, default: "en-Us" },
  weekNumName: { type: String, default: "W" },
  weekStart: { type: [Number, String], default: 1 },
  weekNumbers: {
    type: [String, Function, Object],
    default: null
  },
  calendarClassName: { type: String, default: null },
  monthChangeOnScroll: { type: [Boolean, String], default: true },
  dayNames: {
    type: [Function, Array],
    default: null
  },
  monthPicker: { type: Boolean, default: false },
  customProps: { type: Object, default: null },
  yearPicker: { type: Boolean, default: false },
  modelAuto: { type: Boolean, default: false },
  selectText: { type: String, default: "Select" },
  cancelText: { type: String, default: "Cancel" },
  previewFormat: {
    type: [String, Function],
    default: () => ""
  },
  multiDates: { type: [Object, Boolean], default: false },
  partialRange: { type: Boolean, default: true },
  ignoreTimeValidation: { type: Boolean, default: false },
  minDate: { type: [Date, String], default: null },
  maxDate: { type: [Date, String], default: null },
  minTime: { type: Object, default: null },
  maxTime: { type: Object, default: null },
  name: { type: String, default: null },
  placeholder: { type: String, default: "" },
  hideInputIcon: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  state: { type: Boolean, default: null },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: "off" },
  inputClassName: { type: String, default: null },
  fixedStart: { type: Boolean, default: false },
  fixedEnd: { type: Boolean, default: false },
  timePicker: { type: Boolean, default: false },
  enableSeconds: { type: Boolean, default: false },
  is24: { type: Boolean, default: true },
  noHoursOverlay: { type: Boolean, default: false },
  noMinutesOverlay: { type: Boolean, default: false },
  noSecondsOverlay: { type: Boolean, default: false },
  hoursGridIncrement: { type: [String, Number], default: 1 },
  minutesGridIncrement: { type: [String, Number], default: 5 },
  secondsGridIncrement: { type: [String, Number], default: 5 },
  hoursIncrement: { type: [Number, String], default: 1 },
  minutesIncrement: { type: [Number, String], default: 1 },
  secondsIncrement: { type: [Number, String], default: 1 },
  range: { type: [Boolean, Object], default: false },
  uid: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  inline: { type: [Boolean, Object], default: false },
  textInput: { type: [Boolean, Object], default: false },
  noDisabledRange: { type: Boolean, default: false },
  sixWeeks: { type: [Boolean, String], default: false },
  actionRow: { type: Object, default: () => ({}) },
  focusStartDate: { type: Boolean, default: false },
  disabledTimes: { type: [Function, Array], default: void 0 },
  showLastInRange: { type: Boolean, default: true },
  timePickerInline: { type: Boolean, default: false },
  calendar: { type: Function, default: null },
  config: { type: Object, default: void 0 },
  quarterPicker: { type: Boolean, default: false },
  yearFirst: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
};
var xe = {
  ...oa,
  shadow: { type: Boolean, default: false },
  flowStep: { type: Number, default: 0 },
  internalModelValue: { type: [Date, Array], default: null },
  noOverlayFocus: { type: Boolean, default: false },
  collapse: { type: Boolean, default: false },
  menuWrapRef: { type: Object, default: null }
};
var Ll = {
  key: 1,
  class: "dp__input_wrap"
};
var Vl = ["id", "name", "inputmode", "placeholder", "disabled", "readonly", "required", "value", "autocomplete", "aria-label", "aria-disabled", "aria-invalid"];
var Wl = {
  key: 2,
  class: "dp__clear_icon"
};
var Hl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerInput",
  props: {
    isMenuOpen: { type: Boolean, default: false },
    inputValue: { type: String, default: "" },
    ...oa
  },
  emits: [
    "clear",
    "open",
    "update:input-value",
    "set-input-date",
    "close",
    "select-date",
    "set-empty-date",
    "toggle",
    "focus-prev",
    "focus",
    "blur",
    "real-blur"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, {
      defaultedTextInput: f,
      defaultedAriaLabels: o,
      defaultedInline: s,
      defaultedConfig: C,
      defaultedRange: A,
      defaultedMultiDates: y,
      getDefaultPattern: R,
      getDefaultStartTime: w
    } = Re(a), { checkMinMaxRange: Y } = yt(a), E = ref(), M = ref(null), F = ref(false), T = ref(false), H = computed(
      () => ({
        dp__pointer: !a.disabled && !a.readonly && !f.value.enabled,
        dp__disabled: a.disabled,
        dp__input_readonly: !f.value.enabled,
        dp__input: true,
        dp__input_icon_pad: !a.hideInputIcon,
        dp__input_valid: !!a.state,
        dp__input_invalid: a.state === false,
        dp__input_focus: F.value || a.isMenuOpen,
        dp__input_reg: !f.value.enabled,
        [a.inputClassName]: !!a.inputClassName
      })
    ), B = () => {
      n("set-input-date", null), a.autoApply && (n("set-empty-date"), E.value = null);
    }, P = (v) => {
      const q = w();
      return sl(
        v,
        f.value.format ?? R(),
        q ?? kn({}, a.enableSeconds),
        a.inputValue,
        T.value,
        a.formatLocale
      );
    }, I = (v) => {
      const { rangeSeparator: q } = f.value, [N, m] = v.split(`${q}`);
      if (N) {
        const K = P(N.trim()), te = m ? P(m.trim()) : null, i = K && te ? [K, te] : [K];
        Y(te, i, 0) && (E.value = K ? i : null);
      }
    }, L = () => {
      T.value = true;
    }, J = (v) => {
      if (A.value.enabled)
        I(v);
      else if (y.value.enabled) {
        const q = v.split(";");
        E.value = q.map((N) => P(N.trim())).filter((N) => N);
      } else
        E.value = P(v);
    }, $ = (v) => {
      var N;
      const q = typeof v == "string" ? v : (N = v.target) == null ? void 0 : N.value;
      q !== "" ? (f.value.openMenu && !a.isMenuOpen && n("open"), J(q), n("set-input-date", E.value)) : B(), T.value = false, n("update:input-value", q);
    }, se = (v) => {
      f.value.enabled ? (J(v.target.value), f.value.enterSubmit && Ra(E.value) && a.inputValue !== "" ? (n("set-input-date", E.value, true), E.value = null) : f.value.enterSubmit && a.inputValue === "" && (E.value = null, n("clear"))) : _(v);
    }, le = (v) => {
      f.value.enabled && f.value.tabSubmit && J(v.target.value), f.value.tabSubmit && Ra(E.value) && a.inputValue !== "" ? (n("set-input-date", E.value, true, true), E.value = null) : f.value.tabSubmit && a.inputValue === "" && (E.value = null, n("clear", true));
    }, ae = () => {
      F.value = true, n("focus"), nextTick().then(() => {
        var v;
        f.value.enabled && f.value.selectOnFocus && ((v = M.value) == null || v.select());
      });
    }, _ = (v) => {
      v.preventDefault(), vt(v, C.value, true), f.value.enabled && f.value.openMenu && !s.value.input && !a.isMenuOpen ? n("open") : f.value.enabled || n("toggle");
    }, z = () => {
      n("real-blur"), F.value = false, (!a.isMenuOpen || s.value.enabled && s.value.input) && n("blur"), a.autoApply && f.value.enabled && E.value && !a.isMenuOpen && (n("set-input-date", E.value), n("select-date"), E.value = null);
    }, ee = (v) => {
      vt(v, C.value, true), n("clear");
    }, V = (v) => {
      if (!f.value.enabled) {
        if (v.code === "Tab")
          return;
        v.preventDefault();
      }
    };
    return t({
      focusInput: () => {
        var v;
        (v = M.value) == null || v.focus({ preventScroll: true });
      },
      setParsedDate: (v) => {
        E.value = v;
      }
    }), (v, q) => {
      var N;
      return openBlock(), createElementBlock("div", { onClick: _ }, [
        v.$slots.trigger && !v.$slots["dp-input"] && !unref(s).enabled ? renderSlot(v.$slots, "trigger", { key: 0 }) : createCommentVNode("", true),
        !v.$slots.trigger && (!unref(s).enabled || unref(s).input) ? (openBlock(), createElementBlock("div", Ll, [
          v.$slots["dp-input"] && !v.$slots.trigger && (!unref(s).enabled || unref(s).enabled && unref(s).input) ? renderSlot(v.$slots, "dp-input", {
            key: 0,
            value: e.inputValue,
            isMenuOpen: e.isMenuOpen,
            onInput: $,
            onEnter: se,
            onTab: le,
            onClear: ee,
            onBlur: z,
            onKeypress: V,
            onPaste: L,
            openMenu: () => v.$emit("open"),
            closeMenu: () => v.$emit("close"),
            toggleMenu: () => v.$emit("toggle")
          }) : createCommentVNode("", true),
          v.$slots["dp-input"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("input", {
            key: 1,
            id: v.uid ? `dp-input-${v.uid}` : void 0,
            ref_key: "inputRef",
            ref: M,
            name: v.name,
            class: normalizeClass(H.value),
            inputmode: unref(f).enabled ? "text" : "none",
            placeholder: v.placeholder,
            disabled: v.disabled,
            readonly: v.readonly,
            required: v.required,
            value: e.inputValue,
            autocomplete: v.autocomplete,
            "aria-label": (N = unref(o)) == null ? void 0 : N.input,
            "aria-disabled": v.disabled || void 0,
            "aria-invalid": v.state === false ? true : void 0,
            onInput: $,
            onKeydown: [
              withKeys(se, ["enter"]),
              withKeys(le, ["tab"]),
              V
            ],
            onBlur: z,
            onFocus: ae,
            onKeypress: V,
            onPaste: L
          }, null, 42, Vl)),
          createBaseVNode("div", {
            onClick: q[2] || (q[2] = (m) => n("toggle"))
          }, [
            v.$slots["input-icon"] && !v.hideInputIcon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "dp__input_icon",
              onClick: q[0] || (q[0] = (m) => n("toggle"))
            }, [
              renderSlot(v.$slots, "input-icon")
            ])) : createCommentVNode("", true),
            !v.$slots["input-icon"] && !v.hideInputIcon && !v.$slots["dp-input"] ? (openBlock(), createBlock(unref(Yt), {
              key: 1,
              class: "dp__input_icon dp__input_icons",
              onClick: q[1] || (q[1] = (m) => n("toggle"))
            })) : createCommentVNode("", true)
          ]),
          v.$slots["clear-icon"] && e.inputValue && v.clearable && !v.disabled && !v.readonly ? (openBlock(), createElementBlock("span", Wl, [
            renderSlot(v.$slots, "clear-icon", { clear: ee })
          ])) : createCommentVNode("", true),
          v.clearable && !v.$slots["clear-icon"] && e.inputValue && !v.disabled && !v.readonly ? (openBlock(), createBlock(unref(fn), {
            key: 3,
            class: "dp__clear_icon dp__input_icons",
            onClick: q[3] || (q[3] = withModifiers((m) => ee(m), ["prevent"]))
          })) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
var zl = ["title"];
var Ul = ["disabled"];
var Kl = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ActionRow",
  props: {
    menuMount: { type: Boolean, default: false },
    calendarWidth: { type: Number, default: 0 },
    ...xe
  },
  emits: ["close-picker", "select-date", "select-now", "invalid-select"],
  setup(e, { emit: t }) {
    const r = t, n = e, {
      defaultedActionRow: a,
      defaultedPreviewFormat: f,
      defaultedMultiCalendars: o,
      defaultedTextInput: s,
      defaultedInline: C,
      defaultedRange: A,
      defaultedMultiDates: y,
      getDefaultPattern: R
    } = Re(n), { isTimeValid: w, isMonthValid: Y } = yt(n), { buildMatrix: E } = gt(), M = ref(null), F = ref(null), T = ref(false), H = ref({}), B = ref(null), P = ref(null);
    onMounted(() => {
      n.arrowNavigation && E([Ie(M), Ie(F)], "actionRow"), I(), window.addEventListener("resize", I);
    }), onUnmounted(() => {
      window.removeEventListener("resize", I);
    });
    const I = () => {
      T.value = false, setTimeout(() => {
        var h2, v;
        const V = (h2 = B.value) == null ? void 0 : h2.getBoundingClientRect(), c = (v = P.value) == null ? void 0 : v.getBoundingClientRect();
        V && c && (H.value.maxWidth = `${c.width - V.width - 20}px`), T.value = true;
      }, 0);
    }, L = computed(() => A.value.enabled && !A.value.partialRange && n.internalModelValue ? n.internalModelValue.length === 2 : true), J = computed(
      () => !w.value(n.internalModelValue) || !Y.value(n.internalModelValue) || !L.value
    ), $ = () => {
      const V = f.value;
      return n.timePicker || n.monthPicker, V(Oe(n.internalModelValue));
    }, se = () => {
      const V = n.internalModelValue;
      return o.value.count > 0 ? `${le(V[0])} - ${le(V[1])}` : [le(V[0]), le(V[1])];
    }, le = (V) => Mn(
      V,
      f.value,
      n.formatLocale,
      s.value.rangeSeparator,
      n.modelAuto,
      R()
    ), ae = computed(() => !n.internalModelValue || !n.menuMount ? "" : typeof f.value == "string" ? Array.isArray(n.internalModelValue) ? n.internalModelValue.length === 2 && n.internalModelValue[1] ? se() : y.value.enabled ? n.internalModelValue.map((V) => `${le(V)}`) : n.modelAuto ? `${le(n.internalModelValue[0])}` : `${le(n.internalModelValue[0])} -` : le(n.internalModelValue) : $()), _ = () => y.value.enabled ? "; " : " - ", z = computed(
      () => Array.isArray(ae.value) ? ae.value.join(_()) : ae.value
    ), ee = () => {
      w.value(n.internalModelValue) && Y.value(n.internalModelValue) && L.value ? r("select-date") : r("invalid-select");
    };
    return (V, c) => (openBlock(), createElementBlock("div", {
      ref_key: "actionRowRef",
      ref: P,
      class: "dp__action_row"
    }, [
      V.$slots["action-row"] ? renderSlot(V.$slots, "action-row", normalizeProps(mergeProps({ key: 0 }, {
        internalModelValue: V.internalModelValue,
        disabled: J.value,
        selectDate: () => V.$emit("select-date"),
        closePicker: () => V.$emit("close-picker")
      }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
        unref(a).showPreview ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "dp__selection_preview",
          title: z.value,
          style: normalizeStyle(H.value)
        }, [
          V.$slots["action-preview"] && T.value ? renderSlot(V.$slots, "action-preview", {
            key: 0,
            value: V.internalModelValue
          }) : createCommentVNode("", true),
          !V.$slots["action-preview"] && T.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(z.value), 1)
          ], 64)) : createCommentVNode("", true)
        ], 12, zl)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "actionBtnContainer",
          ref: B,
          class: "dp__action_buttons",
          "data-dp-element": "action-row"
        }, [
          V.$slots["action-buttons"] ? renderSlot(V.$slots, "action-buttons", {
            key: 0,
            value: V.internalModelValue
          }) : createCommentVNode("", true),
          V.$slots["action-buttons"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            !unref(C).enabled && unref(a).showCancel ? (openBlock(), createElementBlock("button", {
              key: 0,
              ref_key: "cancelButtonRef",
              ref: M,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: c[0] || (c[0] = (h2) => V.$emit("close-picker")),
              onKeydown: [
                c[1] || (c[1] = withKeys((h2) => V.$emit("close-picker"), ["enter"])),
                c[2] || (c[2] = withKeys((h2) => V.$emit("close-picker"), ["space"]))
              ]
            }, toDisplayString(V.cancelText), 545)) : createCommentVNode("", true),
            unref(a).showNow ? (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "dp__action_button dp__action_cancel",
              onClick: c[3] || (c[3] = (h2) => V.$emit("select-now")),
              onKeydown: [
                c[4] || (c[4] = withKeys((h2) => V.$emit("select-now"), ["enter"])),
                c[5] || (c[5] = withKeys((h2) => V.$emit("select-now"), ["space"]))
              ]
            }, toDisplayString(V.nowButtonLabel), 33)) : createCommentVNode("", true),
            unref(a).showSelect ? (openBlock(), createElementBlock("button", {
              key: 2,
              ref_key: "selectButtonRef",
              ref: F,
              type: "button",
              class: "dp__action_button dp__action_select",
              disabled: J.value,
              onKeydown: [
                withKeys(ee, ["enter"]),
                withKeys(ee, ["space"])
              ],
              onClick: ee
            }, toDisplayString(V.selectText), 41, Ul)) : createCommentVNode("", true)
          ], 64))
        ], 512)
      ], 64))
    ], 512));
  }
});
var jl = ["onKeydown"];
var Gl = { class: "dp__selection_grid_header" };
var Ql = ["aria-selected", "aria-disabled", "onClick", "onKeydown", "onMouseover"];
var ql = ["aria-label"];
var jt = defineComponent({
  __name: "SelectionOverlay",
  props: {
    items: {},
    type: {},
    isLast: { type: Boolean },
    arrowNavigation: { type: Boolean },
    skipButtonRef: { type: Boolean },
    headerRefs: {},
    hideNavigation: {},
    escClose: { type: Boolean },
    useRelative: { type: Boolean },
    height: {},
    textInput: { type: [Boolean, Object] },
    config: {},
    noOverlayFocus: { type: Boolean },
    focusValue: {},
    menuWrapRef: {},
    ariaLabels: {}
  },
  emits: ["selected", "toggle", "reset-flow", "hover-value"],
  setup(e, { expose: t, emit: r }) {
    const { setSelectionGrid: n, buildMultiLevelMatrix: a, setMonthPicker: f } = gt(), o = r, s = e, { defaultedAriaLabels: C, defaultedTextInput: A, defaultedConfig: y } = Re(
      s
    ), { hideNavigationButtons: R } = ra(), w = ref(false), Y = ref(null), E = ref(null), M = ref([]), F = ref(), T = ref(null), H = ref(0), B = ref(null);
    onBeforeUpdate(() => {
      Y.value = null;
    }), onMounted(() => {
      nextTick().then(() => ae()), s.noOverlayFocus || I(), P(true);
    }), onUnmounted(() => P(false));
    const P = (N) => {
      var m;
      s.arrowNavigation && ((m = s.headerRefs) != null && m.length ? f(N) : n(N));
    }, I = () => {
      var m;
      const N = Ie(E);
      N && (A.value.enabled || (Y.value ? (m = Y.value) == null || m.focus({ preventScroll: true }) : N.focus({ preventScroll: true })), w.value = N.clientHeight < N.scrollHeight);
    }, L = computed(
      () => ({
        dp__overlay: true,
        "dp--overlay-absolute": !s.useRelative,
        "dp--overlay-relative": s.useRelative
      })
    ), J = computed(
      () => s.useRelative ? { height: `${s.height}px`, width: "260px" } : void 0
    ), $ = computed(() => ({
      dp__overlay_col: true
    })), se = computed(
      () => ({
        dp__btn: true,
        dp__button: true,
        dp__overlay_action: true,
        dp__over_action_scroll: w.value,
        dp__button_bottom: s.isLast
      })
    ), le = computed(() => {
      var N, m;
      return {
        dp__overlay_container: true,
        dp__container_flex: ((N = s.items) == null ? void 0 : N.length) <= 6,
        dp__container_block: ((m = s.items) == null ? void 0 : m.length) > 6
      };
    });
    watch(
      () => s.items,
      () => ae(false),
      { deep: true }
    );
    const ae = (N = true) => {
      nextTick().then(() => {
        const m = Ie(Y), K = Ie(E), te = Ie(T), i = Ie(B), b = te ? te.getBoundingClientRect().height : 0;
        K && (K.getBoundingClientRect().height ? H.value = K.getBoundingClientRect().height - b : H.value = y.value.modeHeight - b), m && i && N && (i.scrollTop = m.offsetTop - i.offsetTop - (H.value / 2 - m.getBoundingClientRect().height) - b);
      });
    }, _ = (N) => {
      N.disabled || o("selected", N.value);
    }, z = () => {
      o("toggle"), o("reset-flow");
    }, ee = () => {
      s.escClose && z();
    }, V = (N, m, K, te) => {
      N && ((m.active || m.value === s.focusValue) && (Y.value = N), s.arrowNavigation && (Array.isArray(M.value[K]) ? M.value[K][te] = N : M.value[K] = [N], c()));
    }, c = () => {
      var m, K;
      const N = (m = s.headerRefs) != null && m.length ? [s.headerRefs].concat(M.value) : M.value.concat([s.skipButtonRef ? [] : [T.value]]);
      a(Oe(N), (K = s.headerRefs) != null && K.length ? "monthPicker" : "selectionGrid");
    }, h2 = (N) => {
      s.arrowNavigation || vt(N, y.value, true);
    }, v = (N) => {
      F.value = N, o("hover-value", N);
    }, q = () => {
      if (z(), !s.isLast) {
        const N = rl(s.menuWrapRef ?? null, "action-row");
        if (N) {
          const m = pn(N);
          m == null || m.focus();
        }
      }
    };
    return t({ focusGrid: I }), (N, m) => {
      var K;
      return openBlock(), createElementBlock("div", {
        ref_key: "gridWrapRef",
        ref: E,
        class: normalizeClass(L.value),
        style: normalizeStyle(J.value),
        role: "dialog",
        tabindex: "0",
        onKeydown: [
          withKeys(withModifiers(ee, ["prevent"]), ["esc"]),
          m[0] || (m[0] = withKeys(withModifiers((te) => h2(te), ["prevent"]), ["left"])),
          m[1] || (m[1] = withKeys(withModifiers((te) => h2(te), ["prevent"]), ["up"])),
          m[2] || (m[2] = withKeys(withModifiers((te) => h2(te), ["prevent"]), ["down"])),
          m[3] || (m[3] = withKeys(withModifiers((te) => h2(te), ["prevent"]), ["right"]))
        ]
      }, [
        createBaseVNode("div", {
          ref_key: "containerRef",
          ref: B,
          class: normalizeClass(le.value),
          role: "grid",
          style: normalizeStyle({ height: `${H.value}px` })
        }, [
          createBaseVNode("div", Gl, [
            renderSlot(N.$slots, "header")
          ]),
          N.$slots.overlay ? renderSlot(N.$slots, "overlay", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(N.items, (te, i) => (openBlock(), createElementBlock("div", {
            key: i,
            class: normalizeClass(["dp__overlay_row", { dp__flex_row: N.items.length >= 3 }]),
            role: "row"
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(te, (b, l) => (openBlock(), createElementBlock("div", {
              key: b.value,
              ref_for: true,
              ref: (S) => V(S, b, i, l),
              role: "gridcell",
              class: normalizeClass($.value),
              "aria-selected": b.active || void 0,
              "aria-disabled": b.disabled || void 0,
              tabindex: "0",
              onClick: (S) => _(b),
              onKeydown: [
                withKeys(withModifiers((S) => _(b), ["prevent"]), ["enter"]),
                withKeys(withModifiers((S) => _(b), ["prevent"]), ["space"])
              ],
              onMouseover: (S) => v(b.value)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(b.className)
              }, [
                N.$slots.item ? renderSlot(N.$slots, "item", {
                  key: 0,
                  item: b
                }) : createCommentVNode("", true),
                N.$slots.item ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(b.text), 1)
                ], 64))
              ], 2)
            ], 42, Ql))), 128))
          ], 2))), 128))
        ], 6),
        N.$slots["button-icon"] ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "toggleButton",
          ref: T,
          type: "button",
          "aria-label": (K = unref(C)) == null ? void 0 : K.toggleOverlay,
          class: normalizeClass(se.value),
          tabindex: "0",
          onClick: z,
          onKeydown: [
            withKeys(z, ["enter"]),
            withKeys(q, ["tab"])
          ]
        }, [
          renderSlot(N.$slots, "button-icon")
        ], 42, ql)), [
          [vShow, !unref(R)(N.hideNavigation, N.type)]
        ]) : createCommentVNode("", true)
      ], 46, jl);
    };
  }
});
var sa = defineComponent({
  __name: "InstanceWrap",
  props: {
    multiCalendars: {},
    stretch: { type: Boolean },
    collapse: { type: Boolean }
  },
  setup(e) {
    const t = e, r = computed(
      () => t.multiCalendars > 0 ? [...Array(t.multiCalendars).keys()] : [0]
    ), n = computed(() => ({
      dp__instance_calendar: t.multiCalendars > 0
    }));
    return (a, f) => (openBlock(), createElementBlock("div", {
      class: normalizeClass({
        dp__menu_inner: !a.stretch,
        "dp--menu--inner-stretched": a.stretch,
        dp__flex_display: a.multiCalendars > 0,
        "dp--flex-display-collapsed": a.collapse
      })
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(r.value, (o, s) => (openBlock(), createElementBlock("div", {
        key: o,
        class: normalizeClass(n.value)
      }, [
        renderSlot(a.$slots, "default", {
          instance: o,
          index: s
        })
      ], 2))), 128))
    ], 2));
  }
});
var Xl = ["aria-label", "aria-disabled"];
var Ft = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "ArrowBtn",
  props: {
    ariaLabel: {},
    disabled: { type: Boolean }
  },
  emits: ["activate", "set-ref"],
  setup(e, { emit: t }) {
    const r = t, n = ref(null);
    return onMounted(() => r("set-ref", n)), (a, f) => (openBlock(), createElementBlock("button", {
      ref_key: "elRef",
      ref: n,
      type: "button",
      class: "dp__btn dp--arrow-btn-nav",
      tabindex: "0",
      "aria-label": a.ariaLabel,
      "aria-disabled": a.disabled || void 0,
      onClick: f[0] || (f[0] = (o) => a.$emit("activate")),
      onKeydown: [
        f[1] || (f[1] = withKeys(withModifiers((o) => a.$emit("activate"), ["prevent"]), ["enter"])),
        f[2] || (f[2] = withKeys(withModifiers((o) => a.$emit("activate"), ["prevent"]), ["space"]))
      ]
    }, [
      createBaseVNode("span", {
        class: normalizeClass(["dp__inner_nav", { dp__inner_nav_disabled: a.disabled }])
      }, [
        renderSlot(a.$slots, "default")
      ], 2)
    ], 40, Xl));
  }
});
var Jl = { class: "dp--year-mode-picker" };
var Zl = ["aria-label"];
var Tn = defineComponent({
  __name: "YearModePicker",
  props: {
    ...xe,
    showYearPicker: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    isDisabled: { type: Function, default: () => false }
  },
  emits: ["toggle-year-picker", "year-select", "handle-year"],
  setup(e, { emit: t }) {
    const r = t, n = e, { showRightIcon: a, showLeftIcon: f } = ra(), { defaultedConfig: o, defaultedMultiCalendars: s, defaultedAriaLabels: C, defaultedTransitions: A } = Re(n), { showTransition: y, transitionName: R } = Ut(A), w = (M = false, F) => {
      r("toggle-year-picker", { flow: M, show: F });
    }, Y = (M) => {
      r("year-select", M);
    }, E = (M = false) => {
      r("handle-year", M);
    };
    return (M, F) => {
      var T, H, B;
      return openBlock(), createElementBlock("div", Jl, [
        unref(f)(unref(s), e.instance) ? (openBlock(), createBlock(Ft, {
          key: 0,
          ref: "mpPrevIconRef",
          "aria-label": (T = unref(C)) == null ? void 0 : T.prevYear,
          disabled: e.isDisabled(false),
          onActivate: F[0] || (F[0] = (P) => E(false))
        }, {
          default: withCtx(() => [
            M.$slots["arrow-left"] ? renderSlot(M.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
            M.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Oa), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createBaseVNode("button", {
          ref: "mpYearButtonRef",
          class: "dp__btn dp--year-select",
          type: "button",
          "aria-label": (H = unref(C)) == null ? void 0 : H.openYearsOverlay,
          onClick: F[1] || (F[1] = () => w(false)),
          onKeydown: F[2] || (F[2] = withKeys(() => w(false), ["enter"]))
        }, [
          M.$slots.year ? renderSlot(M.$slots, "year", {
            key: 0,
            year: e.year
          }) : createCommentVNode("", true),
          M.$slots.year ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e.year), 1)
          ], 64))
        ], 40, Zl),
        unref(a)(unref(s), e.instance) ? (openBlock(), createBlock(Ft, {
          key: 1,
          ref: "mpNextIconRef",
          "aria-label": (B = unref(C)) == null ? void 0 : B.nextYear,
          disabled: e.isDisabled(true),
          onActivate: F[3] || (F[3] = (P) => E(true))
        }, {
          default: withCtx(() => [
            M.$slots["arrow-right"] ? renderSlot(M.$slots, "arrow-right", { key: 0 }) : createCommentVNode("", true),
            M.$slots["arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ba), { key: 1 }))
          ]),
          _: 3
        }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(R)(e.showYearPicker),
          css: unref(y)
        }, {
          default: withCtx(() => [
            e.showYearPicker ? (openBlock(), createBlock(jt, {
              key: 0,
              items: e.items,
              "text-input": M.textInput,
              "esc-close": M.escClose,
              config: M.config,
              "is-last": M.autoApply && !unref(o).keepActionRow,
              "hide-navigation": M.hideNavigation,
              "aria-labels": M.ariaLabels,
              type: "year",
              onToggle: w,
              onSelected: F[4] || (F[4] = (P) => Y(P))
            }, createSlots({
              "button-icon": withCtx(() => [
                M.$slots["calendar-icon"] ? renderSlot(M.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                M.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Yt), { key: 1 }))
              ]),
              _: 2
            }, [
              M.$slots["year-overlay-value"] ? {
                name: "item",
                fn: withCtx(({ item: P }) => [
                  renderSlot(M.$slots, "year-overlay-value", {
                    text: P.text,
                    value: P.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "text-input", "esc-close", "config", "is-last", "hide-navigation", "aria-labels"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var Wa = (e, t, r) => {
  if (t.value && Array.isArray(t.value))
    if (t.value.some((n) => we(e, n))) {
      const n = t.value.filter((a) => !we(a, e));
      t.value = n.length ? n : null;
    } else
      (r && +r > t.value.length || !r) && t.value.push(e);
  else
    t.value = [e];
};
var Ha = (e, t, r) => {
  let n = e.value ? e.value.slice() : [];
  return n.length === 2 && n[1] !== null && (n = []), n.length ? Pe(t, n[0]) ? (n.unshift(t), r("range-start", n[0]), r("range-start", n[1])) : (n[1] = t, r("range-end", t)) : (n = [t], r("range-start", t)), n;
};
var ua = (e, t, r, n) => {
  e && (e[0] && e[1] && r && t("auto-apply"), e[0] && !e[1] && n && r && t("auto-apply"));
};
var Sn = (e) => {
  Array.isArray(e.value) && e.value.length <= 2 && e.range ? e.modelValue.value = e.value.map((t) => ut(W(t), e.timezone)) : Array.isArray(e.value) || (e.modelValue.value = ut(W(e.value), e.timezone));
};
var Rn = (e, t, r, n) => Array.isArray(t.value) && (t.value.length === 2 || t.value.length === 1 && n.value.partialRange) ? n.value.fixedStart && (_e(e, t.value[0]) || we(e, t.value[0])) ? [t.value[0], e] : n.value.fixedEnd && (Pe(e, t.value[1]) || we(e, t.value[1])) ? [e, t.value[1]] : (r("invalid-fixed-range", e), t.value) : [];
var Pn = ({
  multiCalendars: e,
  highlight: t,
  propDates: r,
  calendars: n,
  modelValue: a,
  props: f,
  filters: o,
  year: s,
  month: C,
  emit: A
}) => {
  const y = computed(() => Ea(f.yearRange, f.locale, f.reverseYears)), R = ref([false]), w = computed(() => (L, J) => {
    const $ = set(Xe(/* @__PURE__ */ new Date()), {
      month: C.value(L),
      year: s.value(L)
    });
    return wn(
      $,
      r.value.maxDate,
      r.value.minDate,
      f.preventMinMaxNavigation,
      J
    );
  }), Y = () => {
    for (let L = 0; L < e.value.count; L++)
      if (L === 0)
        n.value[L] = n.value[0];
      else {
        const J = set(W(), n.value[L - 1]);
        n.value[L] = { month: getMonth(J), year: getYear(addYears(J, 1)) };
      }
  }, E = (L) => {
    if (!L)
      return Y();
    const J = set(W(), n.value[L]);
    return n.value[0].year = getYear(subYears(J, e.value.count - 1)), Y();
  }, M = (L) => f.focusStartDate ? L[0] : L[1] ? L[1] : L[0], F = () => {
    if (a.value) {
      const L = Array.isArray(a.value) ? M(a.value) : a.value;
      n.value[0] = { month: getMonth(L), year: getYear(L) };
    }
  };
  onMounted(() => {
    F(), e.value.count && Y();
  });
  const T = (L, J) => {
    n.value[J].year = L, e.value.count && !e.value.solo && E(J);
  }, H = computed(() => (L) => _t(y.value, (J) => {
    var ae;
    const $ = s.value(L) === J.value, se = Ht(
      J.value,
      Ot(r.value.minDate),
      Ot(r.value.maxDate)
    ) || ((ae = o.value.years) == null ? void 0 : ae.includes(s.value(L))), le = Va(t.value, J.value);
    return { active: $, disabled: se, highlighted: le };
  })), B = (L, J) => {
    T(L, J), I(J);
  }, P = (L, J = false) => {
    if (!w.value(L, J)) {
      const $ = J ? s.value(L) + 1 : s.value(L) - 1;
      T($, L);
    }
  }, I = (L, J = false, $) => {
    J || A("reset-flow"), $ !== void 0 ? R.value[L] = $ : R.value[L] = !R.value[L], R.value || A("overlay-closed");
  };
  return {
    isDisabled: w,
    groupedYears: H,
    showYearPicker: R,
    selectYear: T,
    toggleYearPicker: I,
    handleYearSelect: B,
    handleYear: P
  };
};
var xl = (e, t) => {
  const {
    defaultedMultiCalendars: r,
    defaultedAriaLabels: n,
    defaultedTransitions: a,
    defaultedConfig: f,
    defaultedRange: o,
    defaultedHighlight: s,
    propDates: C,
    defaultedTz: A,
    defaultedFilters: y,
    defaultedMultiDates: R
  } = Re(e), { modelValue: w, year: Y, month: E, calendars: M } = Kt(e, t), F = computed(() => vn(e.formatLocale, e.locale, e.monthNameFormat)), T = ref(null), { checkMinMaxRange: H } = yt(e), {
    selectYear: B,
    groupedYears: P,
    showYearPicker: I,
    toggleYearPicker: L,
    handleYearSelect: J,
    handleYear: $,
    isDisabled: se
  } = Pn({
    modelValue: w,
    multiCalendars: r,
    highlight: s,
    calendars: M,
    year: Y,
    propDates: C,
    month: E,
    filters: y,
    props: e,
    emit: t
  });
  onMounted(() => {
    e.startDate && (w.value && e.focusStartDate || !w.value) && B(getYear(W(e.startDate)), 0);
  });
  const le = (b) => b ? { month: getMonth(b), year: getYear(b) } : { month: null, year: null }, ae = () => w.value ? Array.isArray(w.value) ? w.value.map((b) => le(b)) : le(w.value) : le(), _ = (b, l) => {
    const S = M.value[b], j = ae();
    return Array.isArray(j) ? j.some((d) => d.year === (S == null ? void 0 : S.year) && d.month === l) : (S == null ? void 0 : S.year) === j.year && l === j.month;
  }, z = (b, l, S) => {
    var d, p;
    const j = ae();
    return Array.isArray(j) ? Y.value(l) === ((d = j[S]) == null ? void 0 : d.year) && b === ((p = j[S]) == null ? void 0 : p.month) : false;
  }, ee = (b, l) => {
    if (o.value.enabled) {
      const S = ae();
      if (Array.isArray(w.value) && Array.isArray(S)) {
        const j = z(b, l, 0) || z(b, l, 1), d = st(Xe(W()), b, Y.value(l));
        return la(w.value, T.value, d) && !j;
      }
      return false;
    }
    return false;
  }, V = computed(() => (b) => _t(F.value, (l) => {
    var de;
    const S = _(b, l.value), j = Ht(
      l.value,
      yn(Y.value(b), C.value.minDate),
      hn(Y.value(b), C.value.maxDate)
    ) || vl(C.value.disabledDates, Y.value(b)).includes(l.value) || ((de = y.value.months) == null ? void 0 : de.includes(l.value)), d = ee(l.value, b), p = Dn(s.value, l.value, Y.value(b));
    return { active: S, disabled: j, isBetween: d, highlighted: p };
  })), c = (b, l) => st(Xe(W()), b, Y.value(l)), h2 = (b, l) => {
    const S = w.value ? w.value : Xe(/* @__PURE__ */ new Date());
    w.value = st(S, b, Y.value(l)), t("auto-apply"), t("update-flow-step");
  }, v = (b, l) => {
    const S = c(b, l);
    o.value.fixedEnd || o.value.fixedStart ? w.value = Rn(S, w, t, o) : w.value ? H(S, w.value) && (w.value = Ha(w, c(b, l), t)) : w.value = [c(b, l)], ua(w.value, t, e.autoApply, e.modelAuto);
  }, q = (b, l) => {
    Wa(c(b, l), w, R.value.limit), t("auto-apply", true);
  }, N = (b, l) => (M.value[l].month = b, K(l, M.value[l].year, b), R.value.enabled ? q(b, l) : o.value.enabled ? v(b, l) : h2(b, l)), m = (b, l) => {
    B(b, l), K(l, b, null);
  }, K = (b, l, S) => {
    let j = S;
    if (!j && j !== 0) {
      const d = ae();
      j = Array.isArray(d) ? d[b].month : d.month;
    }
    t("update-month-year", { instance: b, year: l, month: j });
  };
  return {
    groupedMonths: V,
    groupedYears: P,
    year: Y,
    isDisabled: se,
    defaultedMultiCalendars: r,
    defaultedAriaLabels: n,
    defaultedTransitions: a,
    defaultedConfig: f,
    showYearPicker: I,
    modelValue: w,
    presetDate: (b, l) => {
      Sn({
        value: b,
        modelValue: w,
        range: o.value.enabled,
        timezone: l ? void 0 : A.value.timezone
      }), t("auto-apply");
    },
    setHoverDate: (b, l) => {
      T.value = c(b, l);
    },
    selectMonth: N,
    selectYear: m,
    toggleYearPicker: L,
    handleYearSelect: J,
    handleYear: $,
    getModelMonthYear: ae
  };
};
var er = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "MonthPicker",
  props: {
    ...xe
  },
  emits: [
    "update:internal-model-value",
    "overlay-closed",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year",
    "update-flow-step",
    "mount",
    "invalid-fixed-range"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = useSlots(), f = Ke(a, "yearMode"), o = e;
    onMounted(() => {
      o.shadow || n("mount", null);
    });
    const {
      groupedMonths: s,
      groupedYears: C,
      year: A,
      isDisabled: y,
      defaultedMultiCalendars: R,
      defaultedConfig: w,
      showYearPicker: Y,
      modelValue: E,
      presetDate: M,
      setHoverDate: F,
      selectMonth: T,
      selectYear: H,
      toggleYearPicker: B,
      handleYearSelect: P,
      handleYear: I,
      getModelMonthYear: L
    } = xl(o, n);
    return t({ getSidebarProps: () => ({
      modelValue: E,
      year: A,
      getModelMonthYear: L,
      selectMonth: T,
      selectYear: H,
      handleYear: I
    }), presetDate: M, toggleYearPicker: ($) => B(0, $) }), ($, se) => (openBlock(), createBlock(sa, {
      "multi-calendars": unref(R).count,
      collapse: $.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: le }) => [
        $.$slots["month-year"] ? renderSlot($.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
          year: unref(A),
          months: unref(s)(le),
          years: unref(C)(le),
          selectMonth: unref(T),
          selectYear: unref(H),
          instance: le
        }))) : (openBlock(), createBlock(jt, {
          key: 1,
          items: unref(s)(le),
          "arrow-navigation": $.arrowNavigation,
          "is-last": $.autoApply && !unref(w).keepActionRow,
          "esc-close": $.escClose,
          height: unref(w).modeHeight,
          config: $.config,
          "no-overlay-focus": !!($.noOverlayFocus || $.textInput),
          "use-relative": "",
          type: "month",
          onSelected: (ae) => unref(T)(ae, le),
          onHoverValue: (ae) => unref(F)(ae, le)
        }, {
          header: withCtx(() => [
            createVNode(Tn, mergeProps($.$props, {
              items: unref(C)(le),
              instance: le,
              "show-year-picker": unref(Y)[le],
              year: unref(A)(le),
              "is-disabled": (ae) => unref(y)(le, ae),
              onHandleYear: (ae) => unref(I)(le, ae),
              onYearSelect: (ae) => unref(P)(ae, le),
              onToggleYearPicker: (ae) => unref(B)(le, ae == null ? void 0 : ae.flow, ae == null ? void 0 : ae.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(f), (ae, _) => ({
                name: ae,
                fn: withCtx((z) => [
                  renderSlot($.$slots, ae, normalizeProps(guardReactiveProps(z)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          _: 2
        }, 1032, ["items", "arrow-navigation", "is-last", "esc-close", "height", "config", "no-overlay-focus", "onSelected", "onHoverValue"]))
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var tr = (e, t) => {
  const { modelValue: r } = Kt(e, t), n = ref(null), { defaultedHighlight: a, defaultedMultiDates: f, defaultedFilters: o, defaultedRange: s, propDates: C } = Re(e), A = ref();
  onMounted(() => {
    e.startDate && (r.value && e.focusStartDate || !r.value) && (A.value = getYear(W(e.startDate)));
  });
  const y = (F) => Array.isArray(r.value) ? r.value.some((T) => getYear(T) === F) : r.value ? getYear(r.value) === F : false, R = (F) => s.value.enabled && Array.isArray(r.value) ? la(r.value, n.value, Y(F)) : false, w = computed(() => _t(Ea(e.yearRange, e.locale, e.reverseYears), (F) => {
    const T = y(F.value), H = Ht(
      F.value,
      Ot(C.value.minDate),
      Ot(C.value.maxDate)
    ) || o.value.years.includes(F.value), B = R(F.value) && !T, P = Va(a.value, F.value);
    return { active: T, disabled: H, isBetween: B, highlighted: P };
  })), Y = (F) => setYear(Xe(/* @__PURE__ */ new Date()), F);
  return {
    groupedYears: w,
    modelValue: r,
    focusYear: A,
    setHoverValue: (F) => {
      n.value = setYear(Xe(/* @__PURE__ */ new Date()), F);
    },
    selectYear: (F) => {
      var T;
      if (t("update-month-year", { instance: 0, year: F }), f.value.enabled)
        return r.value ? Array.isArray(r.value) && (((T = r.value) == null ? void 0 : T.map((B) => getYear(B))).includes(F) ? r.value = r.value.filter((B) => getYear(B) !== F) : r.value.push(setYear(je(W()), F))) : r.value = [setYear(je(W()), F)], t("auto-apply", true);
      if (s.value.enabled)
        return r.value = Ha(r, Y(F), t), ua(r.value, t, e.autoApply, e.modelAuto);
      r.value = Y(F), t("auto-apply");
    }
  };
};
var ar = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "YearPicker",
  props: {
    ...xe
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "range-start",
    "range-end",
    "auto-apply",
    "update-month-year"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { groupedYears: f, modelValue: o, focusYear: s, selectYear: C, setHoverValue: A } = tr(a, n), { defaultedConfig: y } = Re(a);
    return t({ getSidebarProps: () => ({
      modelValue: o,
      selectYear: C
    }) }), (w, Y) => (openBlock(), createElementBlock("div", null, [
      w.$slots["month-year"] ? renderSlot(w.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, {
        years: unref(f),
        selectYear: unref(C)
      }))) : (openBlock(), createBlock(jt, {
        key: 1,
        items: unref(f),
        "is-last": w.autoApply && !unref(y).keepActionRow,
        height: unref(y).modeHeight,
        config: w.config,
        "no-overlay-focus": !!(w.noOverlayFocus || w.textInput),
        "focus-value": unref(s),
        type: "year",
        "use-relative": "",
        onSelected: unref(C),
        onHoverValue: unref(A)
      }, createSlots({ _: 2 }, [
        w.$slots["year-overlay-value"] ? {
          name: "item",
          fn: withCtx(({ item: E }) => [
            renderSlot(w.$slots, "year-overlay-value", {
              text: E.text,
              value: E.value
            })
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["items", "is-last", "height", "config", "no-overlay-focus", "focus-value", "onSelected", "onHoverValue"]))
    ]));
  }
});
var nr = {
  key: 0,
  class: "dp__time_input"
};
var lr = ["aria-label", "onKeydown", "onClick"];
var rr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var or = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var sr = ["aria-label", "disabled", "onKeydown", "onClick"];
var ur = ["aria-label", "onKeydown", "onClick"];
var ir = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_l" }, null, -1);
var dr = createBaseVNode("span", { class: "dp__tp_inline_btn_bar dp__tp_btn_in_r" }, null, -1);
var cr = { key: 0 };
var fr = ["aria-label", "onKeydown"];
var vr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimeInput",
  props: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 },
    seconds: { type: Number, default: 0 },
    closeTimePickerBtn: { type: Object, default: null },
    order: { type: Number, default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    validateTime: { type: Function, default: () => false },
    ...xe
  },
  emits: [
    "set-hours",
    "set-minutes",
    "update:hours",
    "update:minutes",
    "update:seconds",
    "reset-flow",
    "mounted",
    "overlay-closed",
    "am-pm-change"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { setTimePickerElements: f, setTimePickerBackRef: o } = gt(), { defaultedAriaLabels: s, defaultedTransitions: C, defaultedFilters: A, defaultedConfig: y, defaultedRange: R } = Re(a), { transitionName: w, showTransition: Y } = Ut(C), E = reactive({
      hours: false,
      minutes: false,
      seconds: false
    }), M = ref("AM"), F = ref(null), T = ref([]);
    onMounted(() => {
      n("mounted");
    });
    const H = (d) => set(/* @__PURE__ */ new Date(), {
      hours: d.hours,
      minutes: d.minutes,
      seconds: a.enableSeconds ? d.seconds : 0,
      milliseconds: 0
    }), B = computed(
      () => (d) => V(d, a[d]) || I(d, a[d])
    ), P = computed(() => ({ hours: a.hours, minutes: a.minutes, seconds: a.seconds })), I = (d, p) => R.value.enabled && !R.value.disableTimeRangeValidation ? !a.validateTime(d, p) : false, L = (d, p) => {
      if (R.value.enabled && !R.value.disableTimeRangeValidation) {
        const de = p ? +a[`${d}Increment`] : -+a[`${d}Increment`], ne = a[d] + de;
        return !a.validateTime(d, ne);
      }
      return false;
    }, J = computed(() => (d) => !q(+a[d] + +a[`${d}Increment`], d) || L(d, true)), $ = computed(() => (d) => !q(+a[d] - +a[`${d}Increment`], d) || L(d, false)), se = (d, p) => add(set(W(), d), p), le = (d, p) => sub(set(W(), d), p), ae = computed(
      () => ({
        dp__time_col: true,
        dp__time_col_block: !a.timePickerInline,
        dp__time_col_reg_block: !a.enableSeconds && a.is24 && !a.timePickerInline,
        dp__time_col_reg_inline: !a.enableSeconds && a.is24 && a.timePickerInline,
        dp__time_col_reg_with_button: !a.enableSeconds && !a.is24,
        dp__time_col_sec: a.enableSeconds && a.is24,
        dp__time_col_sec_with_button: a.enableSeconds && !a.is24
      })
    ), _ = computed(() => {
      const d = [{ type: "hours" }, { type: "", separator: true }, { type: "minutes" }];
      return a.enableSeconds ? d.concat([{ type: "", separator: true }, { type: "seconds" }]) : d;
    }), z = computed(() => _.value.filter((d) => !d.separator)), ee = computed(() => (d) => {
      if (d === "hours") {
        const p = i(+a.hours);
        return { text: p < 10 ? `0${p}` : `${p}`, value: p };
      }
      return { text: a[d] < 10 ? `0${a[d]}` : `${a[d]}`, value: a[d] };
    }), V = (d, p) => {
      var ne;
      if (!a.disabledTimesConfig)
        return false;
      const de = a.disabledTimesConfig(a.order, d === "hours" ? p : void 0);
      return de[d] ? !!((ne = de[d]) != null && ne.includes(p)) : true;
    }, c = (d) => {
      const p = a.is24 ? 24 : 12, de = d === "hours" ? p : 60, ne = +a[`${d}GridIncrement`], k = d === "hours" && !a.is24 ? ne : 0, U = [];
      for (let ve = k; ve < de; ve += ne)
        U.push({ value: ve, text: ve < 10 ? `0${ve}` : `${ve}` });
      return d === "hours" && !a.is24 && U.push({ value: 0, text: "12" }), _t(U, (ve) => ({ active: false, disabled: A.value.times[d].includes(ve.value) || !q(ve.value, d) || V(d, ve.value) || I(d, ve.value) }));
    }, h2 = (d) => d >= 0 ? d : 59, v = (d) => d >= 0 ? d : 23, q = (d, p) => {
      const de = a.minTime ? H(ya(a.minTime)) : null, ne = a.maxTime ? H(ya(a.maxTime)) : null, k = H(
        ya(
          P.value,
          p,
          p === "minutes" || p === "seconds" ? h2(d) : v(d)
        )
      );
      return de && ne ? (isBefore(k, ne) || isEqual(k, ne)) && (isAfter(k, de) || isEqual(k, de)) : de ? isAfter(k, de) || isEqual(k, de) : ne ? isBefore(k, ne) || isEqual(k, ne) : true;
    }, N = (d) => a[`no${d[0].toUpperCase() + d.slice(1)}Overlay`], m = (d) => {
      N(d) || (E[d] = !E[d], E[d] || n("overlay-closed"));
    }, K = (d) => d === "hours" ? getHours : d === "minutes" ? getMinutes : getSeconds, te = (d, p = true) => {
      const de = p ? se : le, ne = p ? +a[`${d}Increment`] : -+a[`${d}Increment`];
      q(+a[d] + ne, d) && n(
        `update:${d}`,
        K(d)(de({ [d]: +a[d] }, { [d]: +a[`${d}Increment`] }))
      );
    }, i = (d) => a.is24 ? d : (d >= 12 ? M.value = "PM" : M.value = "AM", el(d)), b = () => {
      M.value === "PM" ? (M.value = "AM", n("update:hours", a.hours - 12)) : (M.value = "PM", n("update:hours", a.hours + 12)), n("am-pm-change", M.value);
    }, l = (d) => {
      E[d] = true;
    }, S = (d, p, de) => {
      if (d && a.arrowNavigation) {
        Array.isArray(T.value[p]) ? T.value[p][de] = d : T.value[p] = [d];
        const ne = T.value.reduce(
          (k, U) => U.map((ve, ue) => [...k[ue] || [], U[ue]]),
          []
        );
        o(a.closeTimePickerBtn), F.value && (ne[1] = ne[1].concat(F.value)), f(ne, a.order);
      }
    }, j = (d, p) => (m(d), d === "hours" && !a.is24 ? n(`update:${d}`, M.value === "PM" ? p + 12 : p) : n(`update:${d}`, p));
    return t({ openChildCmp: l }), (d, p) => {
      var de;
      return d.disabled ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", nr, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_.value, (ne, k) => {
          var U, ve, ue;
          return openBlock(), createElementBlock("div", {
            key: k,
            class: normalizeClass(ae.value)
          }, [
            ne.separator ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createTextVNode(" : ")
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => S(he, k, 0),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !d.timePickerInline,
                  dp__inc_dec_button_inline: d.timePickerInline,
                  dp__tp_inline_btn_top: d.timePickerInline,
                  dp__inc_dec_button_disabled: J.value(ne.type)
                }),
                "aria-label": (U = unref(s)) == null ? void 0 : U.incrementValue(ne.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((he) => te(ne.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((he) => te(ne.type), ["prevent"]), ["space"])
                ],
                onClick: (he) => te(ne.type)
              }, [
                a.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  rr,
                  or
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  d.$slots["arrow-up"] ? renderSlot(d.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
                  d.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ia), { key: 1 }))
                ], 64))
              ], 42, lr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => S(he, k, 1),
                type: "button",
                "aria-label": (ve = unref(s)) == null ? void 0 : ve.openTpOverlay(ne.type),
                class: normalizeClass({
                  dp__time_display: true,
                  dp__time_display_block: !d.timePickerInline,
                  dp__time_display_inline: d.timePickerInline,
                  "dp--time-invalid": B.value(ne.type),
                  "dp--time-overlay-btn": !B.value(ne.type)
                }),
                disabled: N(ne.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((he) => m(ne.type), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((he) => m(ne.type), ["prevent"]), ["space"])
                ],
                onClick: (he) => m(ne.type)
              }, [
                d.$slots[ne.type] ? renderSlot(d.$slots, ne.type, {
                  key: 0,
                  text: ee.value(ne.type).text,
                  value: ee.value(ne.type).value
                }) : createCommentVNode("", true),
                d.$slots[ne.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(ee.value(ne.type).text), 1)
                ], 64))
              ], 42, sr),
              createBaseVNode("button", {
                ref_for: true,
                ref: (he) => S(he, k, 2),
                type: "button",
                class: normalizeClass({
                  dp__btn: true,
                  dp__inc_dec_button: !d.timePickerInline,
                  dp__inc_dec_button_inline: d.timePickerInline,
                  dp__tp_inline_btn_bottom: d.timePickerInline,
                  dp__inc_dec_button_disabled: $.value(ne.type)
                }),
                "aria-label": (ue = unref(s)) == null ? void 0 : ue.decrementValue(ne.type),
                tabindex: "0",
                onKeydown: [
                  withKeys(withModifiers((he) => te(ne.type, false), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((he) => te(ne.type, false), ["prevent"]), ["space"])
                ],
                onClick: (he) => te(ne.type, false)
              }, [
                a.timePickerInline ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  ir,
                  dr
                ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  d.$slots["arrow-down"] ? renderSlot(d.$slots, "arrow-down", { key: 0 }) : createCommentVNode("", true),
                  d.$slots["arrow-down"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Na), { key: 1 }))
                ], 64))
              ], 42, ur)
            ], 64))
          ], 2);
        }), 128)),
        d.is24 ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", cr, [
          d.$slots["am-pm-button"] ? renderSlot(d.$slots, "am-pm-button", {
            key: 0,
            toggle: b,
            value: M.value
          }) : createCommentVNode("", true),
          d.$slots["am-pm-button"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
            key: 1,
            ref_key: "amPmButton",
            ref: F,
            type: "button",
            class: "dp__pm_am_button",
            role: "button",
            "aria-label": (de = unref(s)) == null ? void 0 : de.amPmButton,
            tabindex: "0",
            onClick: b,
            onKeydown: [
              withKeys(withModifiers(b, ["prevent"]), ["enter"]),
              withKeys(withModifiers(b, ["prevent"]), ["space"])
            ]
          }, toDisplayString(M.value), 41, fr))
        ])),
        (openBlock(true), createElementBlock(Fragment, null, renderList(z.value, (ne, k) => (openBlock(), createBlock(Transition, {
          key: k,
          name: unref(w)(E[ne.type]),
          css: unref(Y)
        }, {
          default: withCtx(() => [
            E[ne.type] ? (openBlock(), createBlock(jt, {
              key: 0,
              items: c(ne.type),
              "is-last": d.autoApply && !unref(y).keepActionRow,
              "esc-close": d.escClose,
              type: ne.type,
              "text-input": d.textInput,
              config: d.config,
              "arrow-navigation": d.arrowNavigation,
              "aria-labels": d.ariaLabels,
              onSelected: (U) => j(ne.type, U),
              onToggle: (U) => m(ne.type),
              onResetFlow: p[0] || (p[0] = (U) => d.$emit("reset-flow"))
            }, createSlots({
              "button-icon": withCtx(() => [
                d.$slots["clock-icon"] ? renderSlot(d.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
                d.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(d.timePickerInline ? unref(Yt) : unref(Ya)), { key: 1 }))
              ]),
              _: 2
            }, [
              d.$slots[`${ne.type}-overlay-value`] ? {
                name: "item",
                fn: withCtx(({ item: U }) => [
                  renderSlot(d.$slots, `${ne.type}-overlay-value`, {
                    text: U.text,
                    value: U.value
                  })
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["items", "is-last", "esc-close", "type", "text-input", "config", "arrow-navigation", "aria-labels", "onSelected", "onToggle"])) : createCommentVNode("", true)
          ]),
          _: 2
        }, 1032, ["name", "css"]))), 128))
      ]));
    };
  }
});
var mr = { class: "dp--tp-wrap" };
var pr = ["aria-label", "tabindex"];
var gr = ["tabindex"];
var yr = ["aria-label"];
var Cn = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePicker",
  props: {
    hours: { type: [Number, Array], default: 0 },
    minutes: { type: [Number, Array], default: 0 },
    seconds: { type: [Number, Array], default: 0 },
    disabledTimesConfig: { type: Function, default: null },
    validateTime: {
      type: Function,
      default: () => false
    },
    ...xe
  },
  emits: [
    "update:hours",
    "update:minutes",
    "update:seconds",
    "mount",
    "reset-flow",
    "overlay-opened",
    "overlay-closed",
    "am-pm-change"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { buildMatrix: f, setTimePicker: o } = gt(), s = useSlots(), { defaultedTransitions: C, defaultedAriaLabels: A, defaultedTextInput: y, defaultedConfig: R, defaultedRange: w } = Re(a), { transitionName: Y, showTransition: E } = Ut(C), { hideNavigationButtons: M } = ra(), F = ref(null), T = ref(null), H = ref([]), B = ref(null);
    onMounted(() => {
      n("mount"), !a.timePicker && a.arrowNavigation ? f([Ie(F.value)], "time") : o(true, a.timePicker);
    });
    const P = computed(() => w.value.enabled && a.modelAuto ? mn(a.internalModelValue) : true), I = ref(false), L = (c) => ({
      hours: Array.isArray(a.hours) ? a.hours[c] : a.hours,
      minutes: Array.isArray(a.minutes) ? a.minutes[c] : a.minutes,
      seconds: Array.isArray(a.seconds) ? a.seconds[c] : a.seconds
    }), J = computed(() => {
      const c = [];
      if (w.value.enabled)
        for (let h2 = 0; h2 < 2; h2++)
          c.push(L(h2));
      else
        c.push(L(0));
      return c;
    }), $ = (c, h2 = false, v = "") => {
      h2 || n("reset-flow"), I.value = c, n(c ? "overlay-opened" : "overlay-closed"), a.arrowNavigation && o(c), nextTick(() => {
        v !== "" && H.value[0] && H.value[0].openChildCmp(v);
      });
    }, se = computed(() => ({
      dp__btn: true,
      dp__button: true,
      dp__button_bottom: a.autoApply && !R.value.keepActionRow
    })), le = Ke(s, "timePicker"), ae = (c, h2, v) => w.value.enabled ? h2 === 0 ? [c, J.value[1][v]] : [J.value[0][v], c] : c, _ = (c) => {
      n("update:hours", c);
    }, z = (c) => {
      n("update:minutes", c);
    }, ee = (c) => {
      n("update:seconds", c);
    }, V = () => {
      if (B.value && !y.value.enabled && !a.noOverlayFocus) {
        const c = pn(B.value);
        c && c.focus({ preventScroll: true });
      }
    };
    return t({ toggleTimePicker: $ }), (c, h2) => {
      var v;
      return openBlock(), createElementBlock("div", mr, [
        !c.timePicker && !c.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
          key: 0,
          ref_key: "openTimePickerBtn",
          ref: F,
          type: "button",
          class: normalizeClass(se.value),
          "aria-label": (v = unref(A)) == null ? void 0 : v.openTimePicker,
          tabindex: c.noOverlayFocus ? void 0 : 0,
          onKeydown: [
            h2[0] || (h2[0] = withKeys((q) => $(true), ["enter"])),
            h2[1] || (h2[1] = withKeys((q) => $(true), ["space"]))
          ],
          onClick: h2[2] || (h2[2] = (q) => $(true))
        }, [
          c.$slots["clock-icon"] ? renderSlot(c.$slots, "clock-icon", { key: 0 }) : createCommentVNode("", true),
          c.$slots["clock-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ya), { key: 1 }))
        ], 42, pr)), [
          [vShow, !unref(M)(c.hideNavigation, "time")]
        ]) : createCommentVNode("", true),
        createVNode(Transition, {
          name: unref(Y)(I.value),
          css: unref(E) && !c.timePickerInline
        }, {
          default: withCtx(() => {
            var q;
            return [
              I.value || c.timePicker || c.timePickerInline ? (openBlock(), createElementBlock("div", {
                key: 0,
                ref_key: "overlayRef",
                ref: B,
                class: normalizeClass({
                  dp__overlay: !c.timePickerInline,
                  "dp--overlay-absolute": !a.timePicker && !c.timePickerInline,
                  "dp--overlay-relative": a.timePicker
                }),
                style: normalizeStyle(c.timePicker ? { height: `${unref(R).modeHeight}px` } : void 0),
                tabindex: c.timePickerInline ? void 0 : 0
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(
                    c.timePickerInline ? "dp__time_picker_inline_container" : "dp__overlay_container dp__container_flex dp__time_picker_overlay_container"
                  ),
                  style: { display: "flex" }
                }, [
                  c.$slots["time-picker-overlay"] ? renderSlot(c.$slots, "time-picker-overlay", {
                    key: 0,
                    hours: e.hours,
                    minutes: e.minutes,
                    seconds: e.seconds,
                    setHours: _,
                    setMinutes: z,
                    setSeconds: ee
                  }) : createCommentVNode("", true),
                  c.$slots["time-picker-overlay"] ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
                    key: 1,
                    class: normalizeClass(c.timePickerInline ? "dp__flex" : "dp__overlay_row dp__flex_row")
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(J.value, (N, m) => withDirectives((openBlock(), createBlock(vr, mergeProps({ key: m }, {
                      ...c.$props,
                      order: m,
                      hours: N.hours,
                      minutes: N.minutes,
                      seconds: N.seconds,
                      closeTimePickerBtn: T.value,
                      disabledTimesConfig: e.disabledTimesConfig,
                      disabled: m === 0 ? c.fixedStart : c.fixedEnd
                    }, {
                      ref_for: true,
                      ref_key: "timeInputRefs",
                      ref: H,
                      "validate-time": (K, te) => e.validateTime(K, ae(te, m, K)),
                      "onUpdate:hours": (K) => _(ae(K, m, "hours")),
                      "onUpdate:minutes": (K) => z(ae(K, m, "minutes")),
                      "onUpdate:seconds": (K) => ee(ae(K, m, "seconds")),
                      onMounted: V,
                      onOverlayClosed: V,
                      onAmPmChange: h2[3] || (h2[3] = (K) => c.$emit("am-pm-change", K))
                    }), createSlots({ _: 2 }, [
                      renderList(unref(le), (K, te) => ({
                        name: K,
                        fn: withCtx((i) => [
                          renderSlot(c.$slots, K, normalizeProps(guardReactiveProps(i)))
                        ])
                      }))
                    ]), 1040, ["validate-time", "onUpdate:hours", "onUpdate:minutes", "onUpdate:seconds"])), [
                      [vShow, m === 0 ? true : P.value]
                    ])), 128))
                  ], 2)),
                  !c.timePicker && !c.timePickerInline ? withDirectives((openBlock(), createElementBlock("button", {
                    key: 2,
                    ref_key: "closeTimePickerBtn",
                    ref: T,
                    type: "button",
                    class: normalizeClass(se.value),
                    "aria-label": (q = unref(A)) == null ? void 0 : q.closeTimePicker,
                    tabindex: "0",
                    onKeydown: [
                      h2[4] || (h2[4] = withKeys((N) => $(false), ["enter"])),
                      h2[5] || (h2[5] = withKeys((N) => $(false), ["space"]))
                    ],
                    onClick: h2[6] || (h2[6] = (N) => $(false))
                  }, [
                    c.$slots["calendar-icon"] ? renderSlot(c.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                    c.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Yt), { key: 1 }))
                  ], 42, yr)), [
                    [vShow, !unref(M)(c.hideNavigation, "time")]
                  ]) : createCommentVNode("", true)
                ], 2)
              ], 14, gr)) : createCommentVNode("", true)
            ];
          }),
          _: 3
        }, 8, ["name", "css"])
      ]);
    };
  }
});
var _n = (e, t, r, n) => {
  const { defaultedRange: a } = Re(e), f = (B, P) => Array.isArray(t[B]) ? t[B][P] : t[B], o = (B) => e.enableSeconds ? Array.isArray(t.seconds) ? t.seconds[B] : t.seconds : 0, s = (B, P) => B ? P !== void 0 ? mt(B, f("hours", P), f("minutes", P), o(P)) : mt(B, t.hours, t.minutes, o()) : setSeconds(W(), o(P)), C = (B, P) => {
    t[B] = P;
  }, A = computed(() => e.modelAuto && a.value.enabled ? Array.isArray(r.value) ? r.value.length > 1 : false : a.value.enabled), y = (B, P) => {
    const I = Object.fromEntries(
      Object.keys(t).map((L) => L === B ? [L, P] : [L, t[L]].slice())
    );
    if (A.value && !a.value.disableTimeRangeValidation) {
      const L = ($) => r.value ? mt(
        r.value[$],
        I.hours[$],
        I.minutes[$],
        I.seconds[$]
      ) : null, J = ($) => setMilliseconds(r.value[$], 0);
      return !(we(L(0), L(1)) && (isAfter(L(0), J(1)) || isBefore(L(1), J(0))));
    }
    return true;
  }, R = (B, P) => {
    y(B, P) && (C(B, P), n && n());
  }, w = (B) => {
    R("hours", B);
  }, Y = (B) => {
    R("minutes", B);
  }, E = (B) => {
    R("seconds", B);
  }, M = (B, P, I, L) => {
    P && w(B), !P && !I && Y(B), I && E(B), r.value && L(r.value);
  }, F = (B) => {
    if (B) {
      const P = Array.isArray(B), I = P ? [+B[0].hours, +B[1].hours] : +B.hours, L = P ? [+B[0].minutes, +B[1].minutes] : +B.minutes, J = P ? [+B[0].seconds, +B[1].seconds] : +B.seconds;
      C("hours", I), C("minutes", L), e.enableSeconds && C("seconds", J);
    }
  }, T = (B, P) => {
    const I = {
      hours: Array.isArray(t.hours) ? t.hours[B] : t.hours,
      disabledArr: []
    };
    return (P || P === 0) && (I.hours = P), Array.isArray(e.disabledTimes) && (I.disabledArr = a.value.enabled && Array.isArray(e.disabledTimes[B]) ? e.disabledTimes[B] : e.disabledTimes), I;
  }, H = computed(() => (B, P) => {
    var I;
    if (Array.isArray(e.disabledTimes)) {
      const { disabledArr: L, hours: J } = T(B, P), $ = L.filter((se) => +se.hours === J);
      return ((I = $[0]) == null ? void 0 : I.minutes) === "*" ? { hours: [J], minutes: void 0, seconds: void 0 } : {
        hours: [],
        minutes: ($ == null ? void 0 : $.map((se) => +se.minutes)) ?? [],
        seconds: ($ == null ? void 0 : $.map((se) => se.seconds ? +se.seconds : void 0)) ?? []
      };
    }
    return { hours: [], minutes: [], seconds: [] };
  });
  return {
    setTime: C,
    updateHours: w,
    updateMinutes: Y,
    updateSeconds: E,
    getSetDateTime: s,
    updateTimeValues: M,
    getSecondsValue: o,
    assignStartTime: F,
    validateTime: y,
    disabledTimesConfig: H
  };
};
var hr = (e, t) => {
  const { modelValue: r, time: n } = Kt(e, t), { defaultedStartTime: a, defaultedRange: f } = Re(e), { updateTimeValues: o, getSetDateTime: s, setTime: C, assignStartTime: A, disabledTimesConfig: y, validateTime: R } = _n(e, n, r), w = (P) => {
    const { hours: I, minutes: L, seconds: J } = P;
    return { hours: +I, minutes: +L, seconds: J ? +J : 0 };
  }, Y = () => {
    if (e.startTime) {
      if (Array.isArray(e.startTime)) {
        const I = w(e.startTime[0]), L = w(e.startTime[1]);
        return [set(W(), I), set(W(), L)];
      }
      const P = w(e.startTime);
      return set(W(), P);
    }
    return f.value.enabled ? [null, null] : null;
  }, E = () => {
    if (f.value.enabled) {
      const [P, I] = Y();
      r.value = [s(P, 0), s(I, 1)];
    } else
      r.value = s(Y());
  }, M = (P) => Array.isArray(P) ? [$t(W(P[0])), $t(W(P[1]))] : [$t(P ?? W())], F = (P, I, L) => {
    C("hours", P), C("minutes", I), C("seconds", e.enableSeconds ? L : 0);
  }, T = () => {
    const [P, I] = M(r.value);
    return f.value.enabled ? F(
      [P.hours, I.hours],
      [P.minutes, I.minutes],
      [P.seconds, I.seconds]
    ) : F(P.hours, P.minutes, P.seconds);
  };
  onMounted(() => {
    if (!e.shadow)
      return A(a.value), r.value ? T() : E();
  });
  const H = () => {
    Array.isArray(r.value) ? r.value = r.value.map((P, I) => P && s(P, I)) : r.value = s(r.value), t("time-update");
  };
  return {
    modelValue: r,
    time: n,
    disabledTimesConfig: y,
    updateTime: (P, I = true, L = false) => {
      o(P, I, L, H);
    },
    validateTime: R
  };
};
var br = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "TimePickerSolo",
  props: {
    ...xe
  },
  emits: ["update:internal-model-value", "time-update", "am-pm-change"],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, f = useSlots(), o = Ke(f, "timePicker"), { time: s, modelValue: C, disabledTimesConfig: A, updateTime: y, validateTime: R } = hr(a, n);
    return t({ getSidebarProps: () => ({
      modelValue: C,
      time: s,
      updateTime: y
    }) }), (Y, E) => (openBlock(), createBlock(sa, {
      "multi-calendars": 0,
      stretch: ""
    }, {
      default: withCtx(() => [
        createVNode(Cn, mergeProps(Y.$props, {
          hours: unref(s).hours,
          minutes: unref(s).minutes,
          seconds: unref(s).seconds,
          "internal-model-value": Y.internalModelValue,
          "disabled-times-config": unref(A),
          "validate-time": unref(R),
          "onUpdate:hours": E[0] || (E[0] = (M) => unref(y)(M)),
          "onUpdate:minutes": E[1] || (E[1] = (M) => unref(y)(M, false)),
          "onUpdate:seconds": E[2] || (E[2] = (M) => unref(y)(M, false, true)),
          onAmPmChange: E[3] || (E[3] = (M) => Y.$emit("am-pm-change", M))
        }), createSlots({ _: 2 }, [
          renderList(unref(o), (M, F) => ({
            name: M,
            fn: withCtx((T) => [
              renderSlot(Y.$slots, M, normalizeProps(guardReactiveProps(T)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"])
      ]),
      _: 3
    }));
  }
});
var kr = { class: "dp__month_year_row" };
var wr = ["aria-label", "onClick", "onKeydown"];
var Mr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpHeader",
  props: {
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    instance: { type: Number, default: 0 },
    years: { type: Array, default: () => [] },
    months: { type: Array, default: () => [] },
    ...xe
  },
  emits: ["update-month-year", "mount", "reset-flow", "overlay-closed"],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, {
      defaultedTransitions: f,
      defaultedAriaLabels: o,
      defaultedMultiCalendars: s,
      defaultedFilters: C,
      defaultedConfig: A,
      defaultedHighlight: y,
      propDates: R
    } = Re(a), { transitionName: w, showTransition: Y } = Ut(f), { buildMatrix: E } = gt(), { handleMonthYearChange: M, isDisabled: F, updateMonthYear: T } = Bl(a, n), { showLeftIcon: H, showRightIcon: B } = ra(), P = ref(false), I = ref(false), L = ref([null, null, null, null]);
    onMounted(() => {
      n("mount");
    });
    const J = (m) => ({
      get: () => a[m],
      set: (K) => {
        const te = m === qe.month ? qe.year : qe.month;
        n("update-month-year", { [m]: K, [te]: a[te] }), m === qe.month ? V(true) : c(true);
      }
    }), $ = computed(J(qe.month)), se = computed(J(qe.year)), le = computed(() => (m) => ({
      month: a.month,
      year: a.year,
      items: m === qe.month ? a.months : a.years,
      instance: a.instance,
      updateMonthYear: T,
      toggle: m === qe.month ? V : c
    })), ae = computed(() => {
      const m = a.months.find((K) => K.value === a.month);
      return m || { text: "", value: 0 };
    }), _ = computed(() => _t(a.months, (m) => {
      const K = a.month === m.value, te = Ht(
        m.value,
        yn(a.year, R.value.minDate),
        hn(a.year, R.value.maxDate)
      ) || C.value.months.includes(m.value), i = Dn(y.value, m.value, a.year);
      return { active: K, disabled: te, highlighted: i };
    })), z = computed(() => _t(a.years, (m) => {
      const K = a.year === m.value, te = Ht(
        m.value,
        Ot(R.value.minDate),
        Ot(R.value.maxDate)
      ) || C.value.years.includes(m.value), i = Va(y.value, m.value);
      return { active: K, disabled: te, highlighted: i };
    })), ee = (m, K) => {
      K !== void 0 ? m.value = K : m.value = !m.value, m.value || n("overlay-closed");
    }, V = (m = false, K) => {
      h2(m), ee(P, K);
    }, c = (m = false, K) => {
      h2(m), ee(I, K);
    }, h2 = (m) => {
      m || n("reset-flow");
    }, v = (m, K) => {
      a.arrowNavigation && (L.value[K] = Ie(m), E(L.value, "monthYear"));
    }, q = computed(() => {
      var m, K;
      return [
        {
          type: qe.month,
          index: 1,
          toggle: V,
          modelValue: $.value,
          updateModelValue: (te) => $.value = te,
          text: ae.value.text,
          showSelectionGrid: P.value,
          items: _.value,
          ariaLabel: (m = o.value) == null ? void 0 : m.openMonthsOverlay
        },
        {
          type: qe.year,
          index: 2,
          toggle: c,
          modelValue: se.value,
          updateModelValue: (te) => se.value = te,
          text: gn(a.year, a.locale),
          showSelectionGrid: I.value,
          items: z.value,
          ariaLabel: (K = o.value) == null ? void 0 : K.openYearsOverlay
        }
      ];
    }), N = computed(() => a.disableYearSelect ? [q.value[0]] : a.yearFirst ? [...q.value].reverse() : q.value);
    return t({
      toggleMonthPicker: V,
      toggleYearPicker: c,
      handleMonthYearChange: M
    }), (m, K) => {
      var te, i, b;
      return openBlock(), createElementBlock("div", kr, [
        m.$slots["month-year"] ? renderSlot(m.$slots, "month-year", normalizeProps(mergeProps({ key: 0 }, { month: e.month, year: e.year, months: e.months, years: e.years, updateMonthYear: unref(T), handleMonthYearChange: unref(M), instance: e.instance }))) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          unref(H)(unref(s), e.instance) && !m.vertical ? (openBlock(), createBlock(Ft, {
            key: 0,
            "aria-label": (te = unref(o)) == null ? void 0 : te.prevMonth,
            disabled: unref(F)(false),
            onActivate: K[0] || (K[0] = (l) => unref(M)(false, true)),
            onSetRef: K[1] || (K[1] = (l) => v(l, 0))
          }, {
            default: withCtx(() => [
              m.$slots["arrow-left"] ? renderSlot(m.$slots, "arrow-left", { key: 0 }) : createCommentVNode("", true),
              m.$slots["arrow-left"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Oa), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["dp__month_year_wrap", {
              dp__year_disable_select: m.disableYearSelect
            }])
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(N.value, (l, S) => (openBlock(), createElementBlock(Fragment, {
              key: l.type
            }, [
              createBaseVNode("button", {
                ref_for: true,
                ref: (j) => v(j, S + 1),
                type: "button",
                class: "dp__btn dp__month_year_select",
                tabindex: "0",
                "aria-label": l.ariaLabel,
                onClick: l.toggle,
                onKeydown: [
                  withKeys(withModifiers(l.toggle, ["prevent"]), ["enter"]),
                  withKeys(withModifiers(l.toggle, ["prevent"]), ["space"])
                ]
              }, [
                m.$slots[l.type] ? renderSlot(m.$slots, l.type, {
                  key: 0,
                  text: l.text,
                  value: a[l.type]
                }) : createCommentVNode("", true),
                m.$slots[l.type] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(l.text), 1)
                ], 64))
              ], 40, wr),
              createVNode(Transition, {
                name: unref(w)(l.showSelectionGrid),
                css: unref(Y)
              }, {
                default: withCtx(() => [
                  l.showSelectionGrid ? (openBlock(), createBlock(jt, {
                    key: 0,
                    items: l.items,
                    "arrow-navigation": m.arrowNavigation,
                    "hide-navigation": m.hideNavigation,
                    "is-last": m.autoApply && !unref(A).keepActionRow,
                    "skip-button-ref": false,
                    config: m.config,
                    type: l.type,
                    "header-refs": [],
                    "esc-close": m.escClose,
                    "menu-wrap-ref": m.menuWrapRef,
                    "text-input": m.textInput,
                    "aria-labels": m.ariaLabels,
                    onSelected: l.updateModelValue,
                    onToggle: l.toggle
                  }, createSlots({
                    "button-icon": withCtx(() => [
                      m.$slots["calendar-icon"] ? renderSlot(m.$slots, "calendar-icon", { key: 0 }) : createCommentVNode("", true),
                      m.$slots["calendar-icon"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Yt), { key: 1 }))
                    ]),
                    _: 2
                  }, [
                    m.$slots[`${l.type}-overlay-value`] ? {
                      name: "item",
                      fn: withCtx(({ item: j }) => [
                        renderSlot(m.$slots, `${l.type}-overlay-value`, {
                          text: j.text,
                          value: j.value
                        })
                      ]),
                      key: "0"
                    } : void 0,
                    m.$slots[`${l.type}-overlay`] ? {
                      name: "overlay",
                      fn: withCtx(() => [
                        renderSlot(m.$slots, `${l.type}-overlay`, normalizeProps(guardReactiveProps(le.value(l.type))))
                      ]),
                      key: "1"
                    } : void 0,
                    m.$slots[`${l.type}-overlay-header`] ? {
                      name: "header",
                      fn: withCtx(() => [
                        renderSlot(m.$slots, `${l.type}-overlay-header`, {
                          toggle: l.toggle
                        })
                      ]),
                      key: "2"
                    } : void 0
                  ]), 1032, ["items", "arrow-navigation", "hide-navigation", "is-last", "config", "type", "esc-close", "menu-wrap-ref", "text-input", "aria-labels", "onSelected", "onToggle"])) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["name", "css"])
            ], 64))), 128))
          ], 2),
          unref(H)(unref(s), e.instance) && m.vertical ? (openBlock(), createBlock(Ft, {
            key: 1,
            "aria-label": (i = unref(o)) == null ? void 0 : i.prevMonth,
            disabled: unref(F)(false),
            onActivate: K[2] || (K[2] = (l) => unref(M)(false, true))
          }, {
            default: withCtx(() => [
              m.$slots["arrow-up"] ? renderSlot(m.$slots, "arrow-up", { key: 0 }) : createCommentVNode("", true),
              m.$slots["arrow-up"] ? createCommentVNode("", true) : (openBlock(), createBlock(unref(Ia), { key: 1 }))
            ]),
            _: 3
          }, 8, ["aria-label", "disabled"])) : createCommentVNode("", true),
          unref(B)(unref(s), e.instance) ? (openBlock(), createBlock(Ft, {
            key: 2,
            ref: "rightIcon",
            disabled: unref(F)(true),
            "aria-label": (b = unref(o)) == null ? void 0 : b.nextMonth,
            onActivate: K[3] || (K[3] = (l) => unref(M)(true, true)),
            onSetRef: K[4] || (K[4] = (l) => v(l, m.disableYearSelect ? 2 : 3))
          }, {
            default: withCtx(() => [
              m.$slots[m.vertical ? "arrow-down" : "arrow-right"] ? renderSlot(m.$slots, m.vertical ? "arrow-down" : "arrow-right", { key: 0 }) : createCommentVNode("", true),
              m.$slots[m.vertical ? "arrow-down" : "arrow-right"] ? createCommentVNode("", true) : (openBlock(), createBlock(resolveDynamicComponent(m.vertical ? unref(Na) : unref(Ba)), { key: 1 }))
            ]),
            _: 3
          }, 8, ["disabled", "aria-label"])) : createCommentVNode("", true)
        ], 64))
      ]);
    };
  }
});
var Dr = ["aria-label"];
var $r = {
  class: "dp__calendar_header",
  role: "row"
};
var Ar = {
  key: 0,
  class: "dp__calendar_header_item",
  role: "gridcell"
};
var Tr = ["aria-label"];
var Sr = createBaseVNode("div", { class: "dp__calendar_header_separator" }, null, -1);
var Rr = ["aria-label"];
var Pr = {
  key: 0,
  role: "gridcell",
  class: "dp__calendar_item dp__week_num"
};
var Cr = { class: "dp__cell_inner" };
var _r = ["id", "aria-selected", "aria-disabled", "aria-label", "onClick", "onKeydown", "onMouseenter", "onMouseleave", "onMousedown"];
var Or = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DpCalendar",
  props: {
    mappedDates: { type: Array, default: () => [] },
    instance: { type: Number, default: 0 },
    month: { type: Number, default: 0 },
    year: { type: Number, default: 0 },
    ...xe
  },
  emits: [
    "select-date",
    "set-hover-date",
    "handle-scroll",
    "mount",
    "handle-swipe",
    "handle-space",
    "tooltip-open",
    "tooltip-close"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, { buildMultiLevelMatrix: f } = gt(), {
      defaultedTransitions: o,
      defaultedConfig: s,
      defaultedAriaLabels: C,
      defaultedMultiCalendars: A,
      defaultedWeekNumbers: y,
      defaultedMultiDates: R
    } = Re(a), w = ref(null), Y = ref({
      bottom: "",
      left: "",
      transform: ""
    }), E = ref([]), M = ref(null), F = ref(true), T = ref(""), H = ref({ startX: 0, endX: 0, startY: 0, endY: 0 }), B = ref([]), P = ref({ left: "50%" }), I = ref(false), L = computed(() => a.calendar ? a.calendar(a.mappedDates) : a.mappedDates), J = computed(() => a.dayNames ? Array.isArray(a.dayNames) ? a.dayNames : a.dayNames(a.locale, +a.weekStart) : xn(a.formatLocale, a.locale, +a.weekStart));
    onMounted(() => {
      n("mount", { cmp: "calendar", refs: E }), s.value.noSwipe || M.value && (M.value.addEventListener("touchstart", q, { passive: false }), M.value.addEventListener("touchend", N, { passive: false }), M.value.addEventListener("touchmove", m, { passive: false })), a.monthChangeOnScroll && M.value && M.value.addEventListener("wheel", i, { passive: false });
    });
    const $ = (p) => p ? a.vertical ? "vNext" : "next" : a.vertical ? "vPrevious" : "previous", se = (p, de) => {
      if (a.transitions) {
        const ne = je(st(W(), a.month, a.year));
        T.value = _e(je(st(W(), p, de)), ne) ? o.value[$(true)] : o.value[$(false)], F.value = false, nextTick(() => {
          F.value = true;
        });
      }
    }, le = computed(
      () => ({
        [a.calendarClassName]: !!a.calendarClassName
      })
    ), ae = computed(() => (p) => {
      const de = tl(p);
      return {
        dp__marker_dot: de.type === "dot",
        dp__marker_line: de.type === "line"
      };
    }), _ = computed(() => (p) => we(p, w.value)), z = computed(() => ({
      dp__calendar: true,
      dp__calendar_next: A.value.count > 0 && a.instance !== 0
    })), ee = computed(() => (p) => a.hideOffsetDates ? p.current : true), V = (p) => format(p, "yyyy-MM-dd"), c = async (p, de, ne) => {
      const k = Ie(E.value[de][ne]);
      if (k) {
        const { width: U, height: ve } = k.getBoundingClientRect();
        w.value = p.value;
        let ue = { left: `${U / 2}px` }, he = -50;
        if (await nextTick(), B.value[0]) {
          const { left: oe, width: We } = B.value[0].getBoundingClientRect();
          oe < 0 && (ue = { left: "0" }, he = 0, P.value.left = `${U / 2}px`), window.innerWidth < oe + We && (ue = { right: "0" }, he = 0, P.value.left = `${We - U / 2}px`);
        }
        Y.value = {
          bottom: `${ve}px`,
          ...ue,
          transform: `translateX(${he}%)`
        }, n("tooltip-open", p.marker);
      }
    }, h2 = async (p, de, ne) => {
      var k, U;
      if (I.value && R.value.enabled && R.value.dragSelect)
        return n("select-date", p);
      n("set-hover-date", p), (U = (k = p.marker) == null ? void 0 : k.tooltip) != null && U.length && await c(p, de, ne);
    }, v = (p) => {
      w.value && (w.value = null, Y.value = JSON.parse(JSON.stringify({ bottom: "", left: "", transform: "" })), n("tooltip-close", p.marker));
    }, q = (p) => {
      H.value.startX = p.changedTouches[0].screenX, H.value.startY = p.changedTouches[0].screenY;
    }, N = (p) => {
      H.value.endX = p.changedTouches[0].screenX, H.value.endY = p.changedTouches[0].screenY, K();
    }, m = (p) => {
      a.vertical && !a.inline && p.preventDefault();
    }, K = () => {
      const p = a.vertical ? "Y" : "X";
      Math.abs(H.value[`start${p}`] - H.value[`end${p}`]) > 10 && n("handle-swipe", H.value[`start${p}`] > H.value[`end${p}`] ? "right" : "left");
    }, te = (p, de, ne) => {
      p && (Array.isArray(E.value[de]) ? E.value[de][ne] = p : E.value[de] = [p]), a.arrowNavigation && f(E.value, "calendar");
    }, i = (p) => {
      a.monthChangeOnScroll && (p.preventDefault(), n("handle-scroll", p));
    }, b = (p) => y.value.type === "local" ? getWeek(p.value, { weekStartsOn: +a.weekStart }) : y.value.type === "iso" ? getISOWeek(p.value) : typeof y.value.type == "function" ? y.value.type(p.value) : "", l = (p) => {
      const de = p[0];
      return y.value.hideOnOffsetDates ? p.some((ne) => ne.current) ? b(de) : "" : b(de);
    }, S = (p, de) => {
      R.value.enabled || (vt(p, s.value), n("select-date", de));
    }, j = (p) => {
      vt(p, s.value);
    }, d = (p) => {
      R.value.enabled && R.value.dragSelect ? (I.value = true, n("select-date", p)) : R.value.enabled && n("select-date", p);
    };
    return t({ triggerTransition: se }), (p, de) => {
      var ne;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(z.value)
      }, [
        createBaseVNode("div", {
          ref_key: "calendarWrapRef",
          ref: M,
          role: "grid",
          class: normalizeClass(le.value),
          "aria-label": (ne = unref(C)) == null ? void 0 : ne.calendarWrap
        }, [
          createBaseVNode("div", $r, [
            p.weekNumbers ? (openBlock(), createElementBlock("div", Ar, toDisplayString(p.weekNumName), 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(J.value, (k, U) => {
              var ve, ue;
              return openBlock(), createElementBlock("div", {
                key: U,
                class: "dp__calendar_header_item",
                role: "gridcell",
                "aria-label": (ue = (ve = unref(C)) == null ? void 0 : ve.weekDay) == null ? void 0 : ue.call(ve, U)
              }, [
                p.$slots["calendar-header"] ? renderSlot(p.$slots, "calendar-header", {
                  key: 0,
                  day: k,
                  index: U
                }) : createCommentVNode("", true),
                p.$slots["calendar-header"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString(k), 1)
                ], 64))
              ], 8, Tr);
            }), 128))
          ]),
          Sr,
          createVNode(Transition, {
            name: T.value,
            css: !!p.transitions
          }, {
            default: withCtx(() => {
              var k;
              return [
                F.value ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  class: "dp__calendar",
                  role: "rowgroup",
                  "aria-label": ((k = unref(C)) == null ? void 0 : k.calendarDays) || void 0,
                  onMouseleave: de[1] || (de[1] = (U) => I.value = false)
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(L.value, (U, ve) => (openBlock(), createElementBlock("div", {
                    key: ve,
                    class: "dp__calendar_row",
                    role: "row"
                  }, [
                    p.weekNumbers ? (openBlock(), createElementBlock("div", Pr, [
                      createBaseVNode("div", Cr, toDisplayString(l(U.days)), 1)
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(U.days, (ue, he) => {
                      var oe, We, Fe;
                      return openBlock(), createElementBlock("div", {
                        id: V(ue.value),
                        ref_for: true,
                        ref: (Ye) => te(Ye, ve, he),
                        key: he + ve,
                        role: "gridcell",
                        class: "dp__calendar_item",
                        "aria-selected": (ue.classData.dp__active_date || ue.classData.dp__range_start || ue.classData.dp__range_start) ?? void 0,
                        "aria-disabled": ue.classData.dp__cell_disabled || void 0,
                        "aria-label": (We = (oe = unref(C)) == null ? void 0 : oe.day) == null ? void 0 : We.call(oe, ue),
                        tabindex: "0",
                        onClick: withModifiers((Ye) => S(Ye, ue), ["prevent"]),
                        onKeydown: [
                          withKeys((Ye) => p.$emit("select-date", ue), ["enter"]),
                          withKeys((Ye) => p.$emit("handle-space", ue), ["space"])
                        ],
                        onMouseenter: (Ye) => h2(ue, ve, he),
                        onMouseleave: (Ye) => v(ue),
                        onMousedown: (Ye) => d(ue),
                        onMouseup: de[0] || (de[0] = (Ye) => I.value = false)
                      }, [
                        createBaseVNode("div", {
                          class: normalizeClass(["dp__cell_inner", ue.classData])
                        }, [
                          p.$slots.day && ee.value(ue) ? renderSlot(p.$slots, "day", {
                            key: 0,
                            day: +ue.text,
                            date: ue.value
                          }) : createCommentVNode("", true),
                          p.$slots.day ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            createTextVNode(toDisplayString(ue.text), 1)
                          ], 64)),
                          ue.marker && ee.value(ue) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                            p.$slots.marker ? renderSlot(p.$slots, "marker", {
                              key: 0,
                              marker: ue.marker,
                              day: +ue.text,
                              date: ue.value
                            }) : (openBlock(), createElementBlock("div", {
                              key: 1,
                              class: normalizeClass(ae.value(ue.marker)),
                              style: normalizeStyle(ue.marker.color ? { backgroundColor: ue.marker.color } : {})
                            }, null, 6))
                          ], 64)) : createCommentVNode("", true),
                          _.value(ue.value) ? (openBlock(), createElementBlock("div", {
                            key: 3,
                            ref_for: true,
                            ref_key: "activeTooltip",
                            ref: B,
                            class: "dp__marker_tooltip",
                            style: normalizeStyle(Y.value)
                          }, [
                            (Fe = ue.marker) != null && Fe.tooltip ? (openBlock(), createElementBlock("div", {
                              key: 0,
                              class: "dp__tooltip_content",
                              onClick: j
                            }, [
                              (openBlock(true), createElementBlock(Fragment, null, renderList(ue.marker.tooltip, (Ye, ht) => (openBlock(), createElementBlock("div", {
                                key: ht,
                                class: "dp__tooltip_text"
                              }, [
                                p.$slots["marker-tooltip"] ? renderSlot(p.$slots, "marker-tooltip", {
                                  key: 0,
                                  tooltip: Ye,
                                  day: ue.value
                                }) : createCommentVNode("", true),
                                p.$slots["marker-tooltip"] ? createCommentVNode("", true) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                                  createBaseVNode("div", {
                                    class: "dp__tooltip_mark",
                                    style: normalizeStyle(Ye.color ? { backgroundColor: Ye.color } : {})
                                  }, null, 4),
                                  createBaseVNode("div", null, toDisplayString(Ye.text), 1)
                                ], 64))
                              ]))), 128)),
                              createBaseVNode("div", {
                                class: "dp__arrow_bottom_tp",
                                style: normalizeStyle(P.value)
                              }, null, 4)
                            ])) : createCommentVNode("", true)
                          ], 4)) : createCommentVNode("", true)
                        ], 2)
                      ], 40, _r);
                    }), 128))
                  ]))), 128))
                ], 40, Rr)) : createCommentVNode("", true)
              ];
            }),
            _: 3
          }, 8, ["name", "css"])
        ], 10, Dr)
      ], 2);
    };
  }
});
var an = (e) => Array.isArray(e);
var Br = (e, t, r, n) => {
  const a = ref([]), f = ref(/* @__PURE__ */ new Date()), { modelValue: o, calendars: s, time: C } = Kt(e, t), { defaultedMultiCalendars: A, defaultedStartTime: y, defaultedRange: R, defaultedTz: w, propDates: Y, defaultedMultiDates: E } = Re(e), { validateMonthYearInRange: M, isDisabled: F, isDateRangeAllowed: T, checkMinMaxRange: H } = yt(e), { updateTimeValues: B, getSetDateTime: P, setTime: I, assignStartTime: L, validateTime: J, disabledTimesConfig: $ } = _n(e, C, o, n), se = computed(
    () => (g) => s.value[g] ? s.value[g].month : 0
  ), le = computed(
    () => (g) => s.value[g] ? s.value[g].year : 0
  ), ae = (g, Z, ce) => {
    var O, re;
    s.value[g] || (s.value[g] = { month: 0, year: 0 }), s.value[g].month = Ja(Z) ? (O = s.value[g]) == null ? void 0 : O.month : Z, s.value[g].year = Ja(ce) ? (re = s.value[g]) == null ? void 0 : re.year : ce;
  }, _ = () => {
    e.autoApply && t("select-date");
  };
  watch(
    o,
    (g, Z) => {
      JSON.stringify(g) !== JSON.stringify(Z) && V();
    },
    { deep: true }
  ), onMounted(() => {
    e.shadow || (o.value || (l(), y.value && L(y.value)), V(true), e.focusStartDate && e.startDate && l());
  });
  const z = computed(() => {
    var g;
    return (g = e.flow) != null && g.length && !e.partialFlow ? e.flowStep === e.flow.length : true;
  }), ee = () => {
    e.autoApply && z.value && t("auto-apply");
  }, V = (g = false) => {
    if (o.value)
      return Array.isArray(o.value) ? (a.value = o.value, K(g)) : v(o.value, g);
    if (A.value.count && g && !e.startDate)
      return h2(W(), g);
  }, c = () => Array.isArray(o.value) && R.value.enabled ? getMonth(o.value[0]) === getMonth(o.value[1] ?? o.value[0]) : false, h2 = (g, Z = false) => {
    if ((!A.value.count || !A.value.static || Z) && ae(0, getMonth(g), getYear(g)), A.value.count && (!A.value.solo || !o.value || c()))
      for (let ce = 1; ce < A.value.count; ce++) {
        const O = set(W(), { month: se.value(ce - 1), year: le.value(ce - 1) }), re = add(O, { months: 1 });
        s.value[ce] = { month: getMonth(re), year: getYear(re) };
      }
  }, v = (g, Z) => {
    h2(g), I("hours", getHours(g)), I("minutes", getMinutes(g)), I("seconds", getSeconds(g)), A.value.count && Z && b();
  }, q = (g) => {
    if (A.value.count) {
      if (A.value.solo)
        return 0;
      const Z = getMonth(g[0]), ce = getMonth(g[1]);
      return Math.abs(ce - Z) < A.value.count ? 0 : 1;
    }
    return 1;
  }, N = (g, Z) => {
    g[1] && R.value.showLastInRange ? h2(g[q(g)], Z) : h2(g[0], Z);
    const ce = (O, re) => [
      O(g[0]),
      g[1] ? O(g[1]) : C[re][1]
    ];
    I("hours", ce(getHours, "hours")), I("minutes", ce(getMinutes, "minutes")), I("seconds", ce(getSeconds, "seconds"));
  }, m = (g, Z) => {
    if ((R.value.enabled || e.weekPicker) && !E.value.enabled)
      return N(g, Z);
    if (E.value.enabled && Z) {
      const ce = g[g.length - 1];
      return v(ce, Z);
    }
  }, K = (g) => {
    const Z = o.value;
    m(Z, g), A.value.count && A.value.solo && b();
  }, te = (g, Z) => {
    const ce = set(W(), { month: se.value(Z), year: le.value(Z) }), O = g < 0 ? addMonths(ce, 1) : subMonths(ce, 1);
    M(getMonth(O), getYear(O), g < 0, e.preventMinMaxNavigation) && (ae(Z, getMonth(O), getYear(O)), t("update-month-year", { instance: Z, month: getMonth(O), year: getYear(O) }), A.value.count && !A.value.solo && i(Z), r());
  }, i = (g) => {
    for (let Z = g - 1; Z >= 0; Z--) {
      const ce = subMonths(set(W(), { month: se.value(Z + 1), year: le.value(Z + 1) }), 1);
      ae(Z, getMonth(ce), getYear(ce));
    }
    for (let Z = g + 1; Z <= A.value.count - 1; Z++) {
      const ce = addMonths(set(W(), { month: se.value(Z - 1), year: le.value(Z - 1) }), 1);
      ae(Z, getMonth(ce), getYear(ce));
    }
  }, b = () => {
    if (Array.isArray(o.value) && o.value.length === 2) {
      const g = W(
        W(o.value[1] ? o.value[1] : addMonths(o.value[0], 1))
      ), [Z, ce] = [getMonth(o.value[0]), getYear(o.value[0])], [O, re] = [getMonth(o.value[1]), getYear(o.value[1])];
      (Z !== O || Z === O && ce !== re) && A.value.solo && ae(1, getMonth(g), getYear(g));
    } else
      o.value && !Array.isArray(o.value) && (ae(0, getMonth(o.value), getYear(o.value)), h2(W()));
  }, l = () => {
    e.startDate && (ae(0, getMonth(W(e.startDate)), getYear(W(e.startDate))), A.value.count && i(0));
  }, S = (g, Z) => {
    if (e.monthChangeOnScroll) {
      const ce = (/* @__PURE__ */ new Date()).getTime() - f.value.getTime(), O = Math.abs(g.deltaY);
      let re = 500;
      O > 1 && (re = 100), O > 100 && (re = 0), ce > re && (f.value = /* @__PURE__ */ new Date(), te(e.monthChangeOnScroll !== "inverse" ? -g.deltaY : g.deltaY, Z));
    }
  }, j = (g, Z, ce = false) => {
    e.monthChangeOnArrows && e.vertical === ce && d(g, Z);
  }, d = (g, Z) => {
    te(g === "right" ? -1 : 1, Z);
  }, p = (g) => {
    if (Y.value.markers)
      return ta(g.value, Y.value.markers);
  }, de = (g, Z) => {
    switch (e.sixWeeks === true ? "append" : e.sixWeeks) {
      case "prepend":
        return [true, false];
      case "center":
        return [g == 0, true];
      case "fair":
        return [g == 0 || Z > g, true];
      case "append":
        return [false, false];
      default:
        return [false, false];
    }
  }, ne = (g, Z, ce, O) => {
    if (e.sixWeeks && g.length < 6) {
      const re = 6 - g.length, fe = (Z.getDay() + 7 - O) % 7, et = 6 - (ce.getDay() + 7 - O) % 7, [bt, ma] = de(fe, et);
      for (let kt = 1; kt <= re; kt++)
        if (ma ? !!(kt % 2) == bt : bt) {
          const Qt = g[0].days[0], pa = k(addDays(Qt.value, -7), getMonth(Z));
          g.unshift({ days: pa });
        } else {
          const Qt = g[g.length - 1], pa = Qt.days[Qt.days.length - 1], Bn = k(addDays(pa.value, 1), getMonth(Z));
          g.push({ days: Bn });
        }
    }
    return g;
  }, k = (g, Z) => {
    const ce = W(g), O = [];
    for (let re = 0; re < 7; re++) {
      const fe = addDays(ce, re), rt = getMonth(fe) !== Z;
      O.push({
        text: e.hideOffsetDates && rt ? "" : fe.getDate(),
        value: fe,
        current: !rt,
        classData: {}
      });
    }
    return O;
  }, U = (g, Z) => {
    const ce = [], O = new Date(Z, g), re = new Date(Z, g + 1, 0), fe = e.weekStart, rt = startOfWeek(O, { weekStartsOn: fe }), et = (bt) => {
      const ma = k(bt, g);
      if (ce.push({ days: ma }), !ce[ce.length - 1].days.some(
        (kt) => we(je(kt.value), je(re))
      )) {
        const kt = addDays(bt, 7);
        et(kt);
      }
    };
    return et(rt), ne(ce, O, re, fe);
  }, ve = (g) => {
    const Z = mt(W(g.value), C.hours, C.minutes, ht());
    t("date-update", Z), E.value.enabled ? Wa(Z, o, E.value.limit) : o.value = Z, n(), nextTick().then(() => {
      ee();
    });
  }, ue = (g) => R.value.noDisabledRange ? bn(a.value[0], g).some((ce) => F(ce)) : false, he = () => {
    a.value = o.value ? o.value.slice() : [], a.value.length === 2 && !(R.value.fixedStart || R.value.fixedEnd) && (a.value = []);
  }, oe = (g, Z) => {
    const ce = [
      W(g.value),
      addDays(W(g.value), +R.value.autoRange)
    ];
    T(ce) ? (Z && We(g.value), a.value = ce) : t("invalid-date", g.value);
  }, We = (g) => {
    const Z = getMonth(W(g)), ce = getYear(W(g));
    if (ae(0, Z, ce), A.value.count > 0)
      for (let O = 1; O < A.value.count; O++) {
        const re = il(
          set(W(g), { year: se.value(O - 1), month: le.value(O - 1) })
        );
        ae(O, re.month, re.year);
      }
  }, Fe = (g) => {
    if (ue(g.value) || !H(g.value, o.value, R.value.fixedStart ? 0 : 1))
      return t("invalid-date", g.value);
    a.value = Rn(W(g.value), o, t, R);
  }, Ye = (g, Z) => {
    if (he(), R.value.autoRange)
      return oe(g, Z);
    if (R.value.fixedStart || R.value.fixedEnd)
      return Fe(g);
    a.value[0] ? H(W(g.value), o.value) && !ue(g.value) ? Pe(W(g.value), W(a.value[0])) ? (a.value.unshift(W(g.value)), t("range-end", a.value[0])) : (a.value[1] = W(g.value), t("range-end", a.value[1])) : (e.autoApply && t("auto-apply-invalid", g.value), t("invalid-date", g.value)) : (a.value[0] = W(g.value), t("range-start", a.value[0]));
  }, ht = (g = true) => e.enableSeconds ? Array.isArray(C.seconds) ? g ? C.seconds[0] : C.seconds[1] : C.seconds : 0, It = (g) => {
    a.value[g] = mt(
      a.value[g],
      C.hours[g],
      C.minutes[g],
      ht(g !== 1)
    );
  }, Nt = () => {
    var g, Z;
    a.value[0] && a.value[1] && +((g = a.value) == null ? void 0 : g[0]) > +((Z = a.value) == null ? void 0 : Z[1]) && (a.value.reverse(), t("range-start", a.value[0]), t("range-end", a.value[1]));
  }, Ge = () => {
    a.value.length && (a.value[0] && !a.value[1] ? It(0) : (It(0), It(1), n()), Nt(), o.value = a.value.slice(), ua(a.value, t, e.autoApply, e.modelAuto));
  }, ia = (g, Z = false) => {
    if (F(g.value) || !g.current && e.hideOffsetDates)
      return t("invalid-date", g.value);
    if (!R.value.enabled)
      return ve(g);
    an(C.hours) && an(C.minutes) && !E.value.enabled && (Ye(g, Z), Ge());
  }, da = (g, Z) => {
    var O;
    ae(g, Z.month, Z.year), A.value.count && !A.value.solo && i(g), t("update-month-year", { instance: g, month: Z.month, year: Z.year }), r(A.value.solo ? g : void 0);
    const ce = (O = e.flow) != null && O.length ? e.flow[e.flowStep] : void 0;
    !Z.fromNav && (ce === tt.month || ce === tt.year) && n();
  }, Gt = (g, Z) => {
    Sn({
      value: g,
      modelValue: o,
      range: R.value.enabled,
      timezone: Z ? void 0 : w.value.timezone
    }), _(), e.multiCalendars && nextTick().then(() => V(true));
  }, ca = () => {
    R.value.enabled ? o.value && Array.isArray(o.value) && o.value[0] ? o.value = Pe(W(), o.value[0]) ? [W(), o.value[0]] : [o.value[0], W()] : o.value = [W()] : o.value = W(), _();
  }, fa = () => {
    if (Array.isArray(o.value))
      if (E.value.enabled) {
        const g = va();
        o.value[o.value.length - 1] = P(g);
      } else
        o.value = o.value.map((g, Z) => g && P(g, Z));
    else
      o.value = P(o.value);
    t("time-update");
  }, va = () => Array.isArray(o.value) && o.value.length ? o.value[o.value.length - 1] : null;
  return {
    calendars: s,
    modelValue: o,
    month: se,
    year: le,
    time: C,
    disabledTimesConfig: $,
    validateTime: J,
    getCalendarDays: U,
    getMarker: p,
    handleScroll: S,
    handleSwipe: d,
    handleArrow: j,
    selectDate: ia,
    updateMonthYear: da,
    presetDate: Gt,
    selectCurrentDate: ca,
    updateTime: (g, Z = true, ce = false) => {
      B(g, Z, ce, fa);
    }
  };
};
var Yr = { key: 0 };
var Ir = defineComponent({
  __name: "DatePicker",
  props: {
    ...xe
  },
  emits: [
    "tooltip-open",
    "tooltip-close",
    "mount",
    "update:internal-model-value",
    "update-flow-step",
    "reset-flow",
    "auto-apply",
    "focus-menu",
    "select-date",
    "range-start",
    "range-end",
    "invalid-fixed-range",
    "time-update",
    "am-pm-change",
    "time-picker-open",
    "time-picker-close",
    "recalculate-position",
    "update-month-year",
    "auto-apply-invalid",
    "date-update",
    "invalid-date"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, {
      calendars: f,
      month: o,
      year: s,
      modelValue: C,
      time: A,
      disabledTimesConfig: y,
      validateTime: R,
      getCalendarDays: w,
      getMarker: Y,
      handleArrow: E,
      handleScroll: M,
      handleSwipe: F,
      selectDate: T,
      updateMonthYear: H,
      presetDate: B,
      selectCurrentDate: P,
      updateTime: I
    } = Br(a, n, q, N), L = useSlots(), { setHoverDate: J, getDayClassData: $, clearHoverDate: se } = El(C, a), { defaultedMultiCalendars: le } = Re(a), ae = ref([]), _ = ref([]), z = ref(null), ee = Ke(L, "calendar"), V = Ke(L, "monthYear"), c = Ke(L, "timePicker"), h2 = (l) => {
      a.shadow || n("mount", l);
    };
    watch(
      f,
      () => {
        a.shadow || setTimeout(() => {
          n("recalculate-position");
        }, 0);
      },
      { deep: true }
    );
    const v = computed(() => (l) => w(o.value(l), s.value(l)).map((S) => ({
      ...S,
      days: S.days.map((j) => (j.marker = Y(j), j.classData = $(j), j))
    })));
    function q(l) {
      var S;
      l || l === 0 ? (S = _.value[l]) == null || S.triggerTransition(o.value(l), s.value(l)) : _.value.forEach((j, d) => j.triggerTransition(o.value(d), s.value(d)));
    }
    function N() {
      n("update-flow-step");
    }
    const m = (l, S = false) => {
      T(l, S), a.spaceConfirm && n("select-date");
    };
    return t({
      clearHoverDate: se,
      presetDate: B,
      selectCurrentDate: P,
      toggleMonthPicker: (l, S, j = 0) => {
        var d;
        (d = ae.value[j]) == null || d.toggleMonthPicker(l, S);
      },
      toggleYearPicker: (l, S, j = 0) => {
        var d;
        (d = ae.value[j]) == null || d.toggleYearPicker(l, S);
      },
      toggleTimePicker: (l, S, j) => {
        var d;
        (d = z.value) == null || d.toggleTimePicker(l, S, j);
      },
      handleArrow: E,
      updateMonthYear: H,
      getSidebarProps: () => ({
        modelValue: C,
        month: o,
        year: s,
        time: A,
        updateTime: I,
        updateMonthYear: H,
        selectDate: T,
        presetDate: B
      })
    }), (l, S) => (openBlock(), createElementBlock(Fragment, null, [
      createVNode(sa, {
        "multi-calendars": unref(le).count,
        collapse: l.collapse
      }, {
        default: withCtx(({ instance: j, index: d }) => [
          l.disableMonthYearSelect ? createCommentVNode("", true) : (openBlock(), createBlock(Mr, mergeProps({
            key: 0,
            ref: (p) => {
              p && (ae.value[d] = p);
            },
            months: unref(vn)(l.formatLocale, l.locale, l.monthNameFormat),
            years: unref(Ea)(l.yearRange, l.locale, l.reverseYears),
            month: unref(o)(j),
            year: unref(s)(j),
            instance: j
          }, l.$props, {
            onMount: S[0] || (S[0] = (p) => h2(unref(At).header)),
            onResetFlow: S[1] || (S[1] = (p) => l.$emit("reset-flow")),
            onUpdateMonthYear: (p) => unref(H)(j, p),
            onOverlayClosed: S[2] || (S[2] = (p) => l.$emit("focus-menu"))
          }), createSlots({ _: 2 }, [
            renderList(unref(V), (p, de) => ({
              name: p,
              fn: withCtx((ne) => [
                renderSlot(l.$slots, p, normalizeProps(guardReactiveProps(ne)))
              ])
            }))
          ]), 1040, ["months", "years", "month", "year", "instance", "onUpdateMonthYear"])),
          createVNode(Or, mergeProps({
            ref: (p) => {
              p && (_.value[d] = p);
            },
            "mapped-dates": v.value(j),
            month: unref(o)(j),
            year: unref(s)(j),
            instance: j
          }, l.$props, {
            onSelectDate: (p) => unref(T)(p, j !== 1),
            onHandleSpace: (p) => m(p, j !== 1),
            onSetHoverDate: S[3] || (S[3] = (p) => unref(J)(p)),
            onHandleScroll: (p) => unref(M)(p, j),
            onHandleSwipe: (p) => unref(F)(p, j),
            onMount: S[4] || (S[4] = (p) => h2(unref(At).calendar)),
            onResetFlow: S[5] || (S[5] = (p) => l.$emit("reset-flow")),
            onTooltipOpen: S[6] || (S[6] = (p) => l.$emit("tooltip-open", p)),
            onTooltipClose: S[7] || (S[7] = (p) => l.$emit("tooltip-close", p))
          }), createSlots({ _: 2 }, [
            renderList(unref(ee), (p, de) => ({
              name: p,
              fn: withCtx((ne) => [
                renderSlot(l.$slots, p, normalizeProps(guardReactiveProps({ ...ne })))
              ])
            }))
          ]), 1040, ["mapped-dates", "month", "year", "instance", "onSelectDate", "onHandleSpace", "onHandleScroll", "onHandleSwipe"])
        ]),
        _: 3
      }, 8, ["multi-calendars", "collapse"]),
      l.enableTimePicker ? (openBlock(), createElementBlock("div", Yr, [
        l.$slots["time-picker"] ? renderSlot(l.$slots, "time-picker", normalizeProps(mergeProps({ key: 0 }, { time: unref(A), updateTime: unref(I) }))) : (openBlock(), createBlock(Cn, mergeProps({
          key: 1,
          ref_key: "timePickerRef",
          ref: z
        }, l.$props, {
          hours: unref(A).hours,
          minutes: unref(A).minutes,
          seconds: unref(A).seconds,
          "internal-model-value": l.internalModelValue,
          "disabled-times-config": unref(y),
          "validate-time": unref(R),
          onMount: S[8] || (S[8] = (j) => h2(unref(At).timePicker)),
          "onUpdate:hours": S[9] || (S[9] = (j) => unref(I)(j)),
          "onUpdate:minutes": S[10] || (S[10] = (j) => unref(I)(j, false)),
          "onUpdate:seconds": S[11] || (S[11] = (j) => unref(I)(j, false, true)),
          onResetFlow: S[12] || (S[12] = (j) => l.$emit("reset-flow")),
          onOverlayClosed: S[13] || (S[13] = (j) => l.$emit("time-picker-close")),
          onOverlayOpened: S[14] || (S[14] = (j) => l.$emit("time-picker-open", j)),
          onAmPmChange: S[15] || (S[15] = (j) => l.$emit("am-pm-change", j))
        }), createSlots({ _: 2 }, [
          renderList(unref(c), (j, d) => ({
            name: j,
            fn: withCtx((p) => [
              renderSlot(l.$slots, j, normalizeProps(guardReactiveProps(p)))
            ])
          }))
        ]), 1040, ["hours", "minutes", "seconds", "internal-model-value", "disabled-times-config", "validate-time"]))
      ])) : createCommentVNode("", true)
    ], 64));
  }
});
var Nr = (e, t) => {
  const r = ref(), {
    defaultedMultiCalendars: n,
    defaultedConfig: a,
    defaultedHighlight: f,
    defaultedRange: o,
    propDates: s,
    defaultedFilters: C,
    defaultedMultiDates: A
  } = Re(e), { modelValue: y, year: R, month: w, calendars: Y } = Kt(e, t), { isDisabled: E } = yt(e), { selectYear: M, groupedYears: F, showYearPicker: T, isDisabled: H, toggleYearPicker: B, handleYearSelect: P, handleYear: I } = Pn({
    modelValue: y,
    multiCalendars: n,
    highlight: f,
    calendars: Y,
    propDates: s,
    month: w,
    year: R,
    filters: C,
    props: e,
    emit: t
  }), L = (h2, v) => [h2, v].map((q) => format(q, "MMMM", { locale: e.formatLocale })).join("-"), J = computed(() => (h2) => y.value ? Array.isArray(y.value) ? y.value.some((v) => isSameQuarter(h2, v)) : isSameQuarter(y.value, h2) : false), $ = (h2) => {
    if (o.value.enabled) {
      if (Array.isArray(y.value)) {
        const v = we(h2, y.value[0]) || we(h2, y.value[1]);
        return la(y.value, r.value, h2) && !v;
      }
      return false;
    }
    return false;
  }, se = (h2, v) => h2.quarter === getQuarter(v) && h2.year === getYear(v), le = (h2) => typeof f.value == "function" ? f.value({ quarter: getQuarter(h2), year: getYear(h2) }) : !!f.value.quarters.find((v) => se(v, h2)), ae = computed(() => (h2) => {
    const v = set(/* @__PURE__ */ new Date(), { year: R.value(h2) });
    return eachQuarterOfInterval({
      start: startOfYear(v),
      end: endOfYear(v)
    }).map((q) => {
      const N = startOfQuarter(q), m = endOfQuarter(q), K = E(q), te = $(N), i = le(N);
      return {
        text: L(N, m),
        value: N,
        active: J.value(N),
        highlighted: i,
        disabled: K,
        isBetween: te
      };
    });
  }), _ = (h2) => {
    Wa(h2, y, A.value.limit), t("auto-apply", true);
  }, z = (h2) => {
    y.value = Ha(y, h2, t), ua(y.value, t, e.autoApply, e.modelAuto);
  }, ee = (h2) => {
    y.value = h2, t("auto-apply");
  };
  return {
    defaultedConfig: a,
    defaultedMultiCalendars: n,
    groupedYears: F,
    year: R,
    isDisabled: H,
    quarters: ae,
    showYearPicker: T,
    modelValue: y,
    setHoverDate: (h2) => {
      r.value = h2;
    },
    selectYear: M,
    selectQuarter: (h2, v, q) => {
      if (!q)
        return Y.value[v].month = getMonth(endOfQuarter(h2)), A.value.enabled ? _(h2) : o.value.enabled ? z(h2) : ee(h2);
    },
    toggleYearPicker: B,
    handleYearSelect: P,
    handleYear: I
  };
};
var Er = { class: "dp--quarter-items" };
var Fr = ["disabled", "onClick", "onMouseover"];
var Lr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "QuarterPicker",
  props: {
    ...xe
  },
  emits: [
    "update:internal-model-value",
    "reset-flow",
    "overlay-closed",
    "auto-apply",
    "range-start",
    "range-end"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, f = useSlots(), o = Ke(f, "yearMode"), {
      defaultedMultiCalendars: s,
      defaultedConfig: C,
      groupedYears: A,
      year: y,
      isDisabled: R,
      quarters: w,
      modelValue: Y,
      showYearPicker: E,
      setHoverDate: M,
      selectQuarter: F,
      toggleYearPicker: T,
      handleYearSelect: H,
      handleYear: B
    } = Nr(a, n);
    return t({ getSidebarProps: () => ({
      modelValue: Y,
      year: y,
      selectQuarter: F,
      handleYearSelect: H,
      handleYear: B
    }) }), (I, L) => (openBlock(), createBlock(sa, {
      "multi-calendars": unref(s).count,
      collapse: I.collapse,
      stretch: ""
    }, {
      default: withCtx(({ instance: J }) => [
        createBaseVNode("div", {
          class: "dp-quarter-picker-wrap",
          style: normalizeStyle({ minHeight: `${unref(C).modeHeight}px` })
        }, [
          createBaseVNode("div", null, [
            createVNode(Tn, mergeProps(I.$props, {
              items: unref(A)(J),
              instance: J,
              "show-year-picker": unref(E)[J],
              year: unref(y)(J),
              "is-disabled": ($) => unref(R)(J, $),
              onHandleYear: ($) => unref(B)(J, $),
              onYearSelect: ($) => unref(H)($, J),
              onToggleYearPicker: ($) => unref(T)(J, $ == null ? void 0 : $.flow, $ == null ? void 0 : $.show)
            }), createSlots({ _: 2 }, [
              renderList(unref(o), ($, se) => ({
                name: $,
                fn: withCtx((le) => [
                  renderSlot(I.$slots, $, normalizeProps(guardReactiveProps(le)))
                ])
              }))
            ]), 1040, ["items", "instance", "show-year-picker", "year", "is-disabled", "onHandleYear", "onYearSelect", "onToggleYearPicker"])
          ]),
          createBaseVNode("div", Er, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(w)(J), ($, se) => (openBlock(), createElementBlock("div", { key: se }, [
              createBaseVNode("button", {
                type: "button",
                class: normalizeClass(["dp--qr-btn", {
                  "dp--qr-btn-active": $.active,
                  "dp--qr-btn-between": $.isBetween,
                  "dp--qr-btn-disabled": $.disabled,
                  "dp--highlighted": $.highlighted
                }]),
                disabled: $.disabled,
                onClick: (le) => unref(F)($.value, J, $.disabled),
                onMouseover: (le) => unref(M)($.value)
              }, [
                I.$slots.quarter ? renderSlot(I.$slots, "quarter", {
                  key: 0,
                  value: $.value,
                  text: $.text
                }) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                  createTextVNode(toDisplayString($.text), 1)
                ], 64))
              ], 42, Fr)
            ]))), 128))
          ])
        ], 4)
      ]),
      _: 3
    }, 8, ["multi-calendars", "collapse"]));
  }
});
var Vr = ["id", "aria-label"];
var Wr = {
  key: 0,
  class: "dp--menu-load-container"
};
var Hr = createBaseVNode("span", { class: "dp--menu-loader" }, null, -1);
var zr = [
  Hr
];
var Ur = {
  key: 0,
  class: "dp__sidebar_left"
};
var Kr = ["onClick", "onKeydown"];
var jr = {
  key: 2,
  class: "dp__sidebar_right"
};
var Gr = {
  key: 3,
  class: "dp__action_extra"
};
var nn = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "DatepickerMenu",
  props: {
    ...oa,
    shadow: { type: Boolean, default: false },
    openOnTop: { type: Boolean, default: false },
    internalModelValue: { type: [Date, Array], default: null },
    noOverlayFocus: { type: Boolean, default: false },
    collapse: { type: Boolean, default: false }
  },
  emits: [
    "close-picker",
    "select-date",
    "auto-apply",
    "time-update",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "update:internal-model-value",
    "recalculate-position",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open",
    "time-picker-close",
    "am-pm-change",
    "range-start",
    "range-end",
    "auto-apply-invalid",
    "date-update",
    "invalid-date"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, f = ref(null), o = computed(() => {
      const { openOnTop: k, ...U } = a;
      return {
        ...U,
        flowStep: $.value,
        collapse: a.collapse,
        noOverlayFocus: a.noOverlayFocus,
        menuWrapRef: f.value
      };
    }), { setMenuFocused: s, setShiftKey: C, control: A } = $n(), y = useSlots(), { defaultedTextInput: R, defaultedInline: w, defaultedConfig: Y } = Re(a), E = ref(null), M = ref(0), F = ref(null), T = ref(false), H = ref(null);
    onMounted(() => {
      if (!a.shadow) {
        T.value = true, B(), window.addEventListener("resize", B);
        const k = Ie(f);
        if (k && !R.value.enabled && !w.value.enabled && (s(true), z()), k) {
          const U = (ve) => {
            Y.value.allowPreventDefault && ve.preventDefault(), vt(ve, Y.value, true);
          };
          k.addEventListener("pointerdown", U), k.addEventListener("mousedown", U);
        }
      }
    }), onUnmounted(() => {
      window.removeEventListener("resize", B);
    });
    const B = () => {
      const k = Ie(F);
      k && (M.value = k.getBoundingClientRect().width);
    }, { arrowRight: P, arrowLeft: I, arrowDown: L, arrowUp: J } = gt(), { flowStep: $, updateFlowStep: se, childMount: le, resetFlow: ae } = Fl(a, n, H), _ = computed(() => a.monthPicker ? er : a.yearPicker ? ar : a.timePicker ? br : a.quarterPicker ? Lr : Ir), z = () => {
      const k = Ie(f);
      k && k.focus({ preventScroll: true });
    }, ee = computed(() => {
      var k;
      return ((k = H.value) == null ? void 0 : k.getSidebarProps()) || {};
    }), V = () => {
      a.openOnTop && n("recalculate-position");
    }, c = Ke(y, "action"), h2 = computed(() => a.monthPicker || a.yearPicker ? Ke(y, "monthYear") : a.timePicker ? Ke(y, "timePicker") : Ke(y, "shared")), v = computed(() => a.openOnTop ? "dp__arrow_bottom" : "dp__arrow_top"), q = computed(() => ({
      dp__menu_disabled: a.disabled,
      dp__menu_readonly: a.readonly,
      "dp-menu-loading": a.loading
    })), N = computed(
      () => ({
        dp__menu: true,
        dp__menu_index: !w.value.enabled,
        dp__relative: w.value.enabled,
        [a.menuClassName]: !!a.menuClassName
      })
    ), m = (k) => {
      vt(k, Y.value, true);
    }, K = () => {
      a.escClose && n("close-picker");
    }, te = (k) => {
      if (a.arrowNavigation) {
        if (k === "up")
          return J();
        if (k === "down")
          return L();
        if (k === "left")
          return I();
        if (k === "right")
          return P();
      } else
        k === "left" || k === "up" ? j("handleArrow", "left", 0, k === "up") : j("handleArrow", "right", 0, k === "down");
    }, i = (k) => {
      C(k.shiftKey), !a.disableMonthYearSelect && k.code === "Tab" && k.target.classList.contains("dp__menu") && A.value.shiftKeyInMenu && (k.preventDefault(), vt(k, Y.value, true), n("close-picker"));
    }, b = () => {
      z(), n("time-picker-close");
    }, l = (k) => {
      var U, ve, ue;
      (U = H.value) == null || U.toggleTimePicker(false, false), (ve = H.value) == null || ve.toggleMonthPicker(false, false, k), (ue = H.value) == null || ue.toggleYearPicker(false, false, k);
    }, S = (k, U = 0) => {
      var ve, ue, he;
      return k === "month" ? (ve = H.value) == null ? void 0 : ve.toggleMonthPicker(false, true, U) : k === "year" ? (ue = H.value) == null ? void 0 : ue.toggleYearPicker(false, true, U) : k === "time" ? (he = H.value) == null ? void 0 : he.toggleTimePicker(true, false) : l(U);
    }, j = (k, ...U) => {
      var ve, ue;
      (ve = H.value) != null && ve[k] && ((ue = H.value) == null || ue[k](...U));
    }, d = () => {
      j("selectCurrentDate");
    }, p = (k, U) => {
      j("presetDate", k, U);
    }, de = () => {
      j("clearHoverDate");
    };
    return t({
      updateMonthYear: (k, U) => {
        j("updateMonthYear", k, U);
      },
      switchView: S
    }), (k, U) => {
      var ve, ue, he;
      return openBlock(), createElementBlock("div", {
        id: k.uid ? `dp-menu-${k.uid}` : void 0,
        ref_key: "dpMenuRef",
        ref: f,
        tabindex: "0",
        role: "dialog",
        "aria-label": (ve = k.ariaLabels) == null ? void 0 : ve.menu,
        class: normalizeClass(N.value),
        onMouseleave: de,
        onClick: m,
        onKeydown: [
          withKeys(K, ["esc"]),
          U[18] || (U[18] = withKeys(withModifiers((oe) => te("left"), ["prevent"]), ["left"])),
          U[19] || (U[19] = withKeys(withModifiers((oe) => te("up"), ["prevent"]), ["up"])),
          U[20] || (U[20] = withKeys(withModifiers((oe) => te("down"), ["prevent"]), ["down"])),
          U[21] || (U[21] = withKeys(withModifiers((oe) => te("right"), ["prevent"]), ["right"])),
          i
        ]
      }, [
        (k.disabled || k.readonly) && unref(w).enabled || k.loading ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(q.value)
        }, [
          k.loading ? (openBlock(), createElementBlock("div", Wr, zr)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true),
        !unref(w).enabled && !k.teleportCenter ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass(v.value)
        }, null, 2)) : createCommentVNode("", true),
        createBaseVNode("div", {
          ref_key: "innerMenuRef",
          ref: F,
          class: normalizeClass({
            dp__menu_content_wrapper: ((ue = k.presetDates) == null ? void 0 : ue.length) || !!k.$slots["left-sidebar"] || !!k.$slots["right-sidebar"],
            "dp--menu-content-wrapper-collapsed": e.collapse && ((he = k.presetDates) == null ? void 0 : he.length) || !!k.$slots["left-sidebar"] || !!k.$slots["right-sidebar"]
          }),
          style: normalizeStyle({ "--dp-menu-width": `${M.value}px` })
        }, [
          k.$slots["left-sidebar"] ? (openBlock(), createElementBlock("div", Ur, [
            renderSlot(k.$slots, "left-sidebar", normalizeProps(guardReactiveProps(ee.value)))
          ])) : createCommentVNode("", true),
          k.presetDates.length ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass({ "dp--preset-dates-collapsed": e.collapse, "dp--preset-dates": true })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(k.presetDates, (oe, We) => (openBlock(), createElementBlock(Fragment, { key: We }, [
              oe.slot ? renderSlot(k.$slots, oe.slot, {
                key: 0,
                presetDate: p,
                label: oe.label,
                value: oe.value
              }) : (openBlock(), createElementBlock("button", {
                key: 1,
                type: "button",
                style: normalizeStyle(oe.style || {}),
                class: normalizeClass(["dp__btn dp--preset-range", { "dp--preset-range-collapsed": e.collapse }]),
                onClick: withModifiers((Fe) => p(oe.value, oe.noTz), ["prevent"]),
                onKeydown: [
                  withKeys(withModifiers((Fe) => p(oe.value, oe.noTz), ["prevent"]), ["enter"]),
                  withKeys(withModifiers((Fe) => p(oe.value, oe.noTz), ["prevent"]), ["space"])
                ]
              }, toDisplayString(oe.label), 47, Kr))
            ], 64))), 128))
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", {
            ref_key: "calendarWrapperRef",
            ref: E,
            class: "dp__instance_calendar",
            role: "document"
          }, [
            (openBlock(), createBlock(resolveDynamicComponent(_.value), mergeProps({
              ref_key: "dynCmpRef",
              ref: H
            }, o.value, {
              "flow-step": unref($),
              onMount: unref(le),
              onUpdateFlowStep: unref(se),
              onResetFlow: unref(ae),
              onFocusMenu: z,
              onSelectDate: U[0] || (U[0] = (oe) => k.$emit("select-date")),
              onDateUpdate: U[1] || (U[1] = (oe) => k.$emit("date-update", oe)),
              onTooltipOpen: U[2] || (U[2] = (oe) => k.$emit("tooltip-open", oe)),
              onTooltipClose: U[3] || (U[3] = (oe) => k.$emit("tooltip-close", oe)),
              onAutoApply: U[4] || (U[4] = (oe) => k.$emit("auto-apply", oe)),
              onRangeStart: U[5] || (U[5] = (oe) => k.$emit("range-start", oe)),
              onRangeEnd: U[6] || (U[6] = (oe) => k.$emit("range-end", oe)),
              onInvalidFixedRange: U[7] || (U[7] = (oe) => k.$emit("invalid-fixed-range", oe)),
              onTimeUpdate: U[8] || (U[8] = (oe) => k.$emit("time-update")),
              onAmPmChange: U[9] || (U[9] = (oe) => k.$emit("am-pm-change", oe)),
              onTimePickerOpen: U[10] || (U[10] = (oe) => k.$emit("time-picker-open", oe)),
              onTimePickerClose: b,
              onRecalculatePosition: V,
              onUpdateMonthYear: U[11] || (U[11] = (oe) => k.$emit("update-month-year", oe)),
              onAutoApplyInvalid: U[12] || (U[12] = (oe) => k.$emit("auto-apply-invalid", oe)),
              onInvalidDate: U[13] || (U[13] = (oe) => k.$emit("invalid-date", oe)),
              "onUpdate:internalModelValue": U[14] || (U[14] = (oe) => k.$emit("update:internal-model-value", oe))
            }), createSlots({ _: 2 }, [
              renderList(h2.value, (oe, We) => ({
                name: oe,
                fn: withCtx((Fe) => [
                  renderSlot(k.$slots, oe, normalizeProps(guardReactiveProps({ ...Fe })))
                ])
              }))
            ]), 1040, ["flow-step", "onMount", "onUpdateFlowStep", "onResetFlow"]))
          ], 512),
          k.$slots["right-sidebar"] ? (openBlock(), createElementBlock("div", jr, [
            renderSlot(k.$slots, "right-sidebar", normalizeProps(guardReactiveProps(ee.value)))
          ])) : createCommentVNode("", true),
          k.$slots["action-extra"] ? (openBlock(), createElementBlock("div", Gr, [
            k.$slots["action-extra"] ? renderSlot(k.$slots, "action-extra", {
              key: 0,
              selectCurrentDate: d
            }) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ], 6),
        !k.autoApply || unref(Y).keepActionRow ? (openBlock(), createBlock(Kl, mergeProps({
          key: 2,
          "menu-mount": T.value
        }, o.value, {
          "calendar-width": M.value,
          onClosePicker: U[15] || (U[15] = (oe) => k.$emit("close-picker")),
          onSelectDate: U[16] || (U[16] = (oe) => k.$emit("select-date")),
          onInvalidSelect: U[17] || (U[17] = (oe) => k.$emit("invalid-select")),
          onSelectNow: d
        }), createSlots({ _: 2 }, [
          renderList(unref(c), (oe, We) => ({
            name: oe,
            fn: withCtx((Fe) => [
              renderSlot(k.$slots, oe, normalizeProps(guardReactiveProps({ ...Fe })))
            ])
          }))
        ]), 1040, ["menu-mount", "calendar-width"])) : createCommentVNode("", true)
      ], 42, Vr);
    };
  }
});
var Qr = typeof window < "u" ? window : void 0;
var Ta = () => {
};
var qr = (e) => getCurrentScope() ? (onScopeDispose(e), true) : false;
var Xr = (e, t, r, n) => {
  if (!e)
    return Ta;
  let a = Ta;
  const f = watch(
    () => unref(e),
    (s) => {
      a(), s && (s.addEventListener(t, r, n), a = () => {
        s.removeEventListener(t, r, n), a = Ta;
      });
    },
    { immediate: true, flush: "post" }
  ), o = () => {
    f(), a();
  };
  return qr(o), o;
};
var Jr = (e, t, r, n = {}) => {
  const { window: a = Qr, event: f = "pointerdown" } = n;
  return a ? Xr(a, f, (s) => {
    const C = Ie(e), A = Ie(t);
    !C || !A || C === s.target || s.composedPath().includes(C) || s.composedPath().includes(A) || r(s);
  }, { passive: true }) : void 0;
};
var Zr = defineComponent({
  compatConfig: {
    MODE: 3
  },
  __name: "VueDatePicker",
  props: {
    ...oa
  },
  emits: [
    "update:model-value",
    "update:model-timezone-value",
    "text-submit",
    "closed",
    "cleared",
    "open",
    "focus",
    "blur",
    "internal-model-change",
    "recalculate-position",
    "flow-step",
    "update-month-year",
    "invalid-select",
    "invalid-fixed-range",
    "tooltip-open",
    "tooltip-close",
    "time-picker-open",
    "time-picker-close",
    "am-pm-change",
    "range-start",
    "range-end",
    "date-update",
    "invalid-date"
  ],
  setup(e, { expose: t, emit: r }) {
    const n = r, a = e, f = useSlots(), o = ref(false), s = toRef(a, "modelValue"), C = toRef(a, "timezone"), A = ref(null), y = ref(null), R = ref(null), w = ref(false), Y = ref(null), E = ref(false), M = ref(false), F = ref(false), { setMenuFocused: T, setShiftKey: H } = $n(), { clearArrowNav: B } = gt(), { validateDate: P, isValidTime: I } = yt(a), {
      defaultedTransitions: L,
      defaultedTextInput: J,
      defaultedInline: $,
      defaultedConfig: se,
      defaultedRange: le,
      defaultedMultiDates: ae
    } = Re(a), { menuTransition: _, showTransition: z } = Ut(L);
    onMounted(() => {
      i(a.modelValue), nextTick().then(() => {
        if (!$.value.enabled) {
          const O = N(Y.value);
          O == null || O.addEventListener("scroll", k), window == null || window.addEventListener("resize", U);
        }
      }), $.value.enabled && (o.value = true), window == null || window.addEventListener("keyup", ve), window == null || window.addEventListener("keydown", ue);
    }), onUnmounted(() => {
      if (!$.value.enabled) {
        const O = N(Y.value);
        O == null || O.removeEventListener("scroll", k), window == null || window.removeEventListener("resize", U);
      }
      window == null || window.removeEventListener("keyup", ve), window == null || window.removeEventListener("keydown", ue);
    });
    const ee = Ke(f, "all", a.presetDates), V = Ke(f, "input");
    watch(
      [s, C],
      () => {
        i(s.value);
      },
      { deep: true }
    );
    const { openOnTop: c, menuStyle: h2, xCorrect: v, setMenuPosition: q, getScrollableParent: N, shadowRender: m } = Yl({
      menuRef: A,
      menuRefInner: y,
      inputRef: R,
      pickerWrapperRef: Y,
      inline: $,
      emit: n,
      props: a,
      slots: f
    }), {
      inputValue: K,
      internalModelValue: te,
      parseExternalModelValue: i,
      emitModelValue: b,
      formatInputValue: l,
      checkBeforeEmit: S
    } = Ol(n, a, w), j = computed(
      () => ({
        dp__main: true,
        dp__theme_dark: a.dark,
        dp__theme_light: !a.dark,
        dp__flex_display: $.value.enabled,
        "dp--flex-display-collapsed": F.value,
        dp__flex_display_with_input: $.value.input
      })
    ), d = computed(() => a.dark ? "dp__theme_dark" : "dp__theme_light"), p = computed(() => ({
      to: typeof a.teleport == "boolean" ? "body" : a.teleport,
      disabled: !a.teleport || $.value.enabled
    })), de = computed(() => ({ class: "dp__outer_menu_wrap" })), ne = computed(() => $.value.enabled && (a.timePicker || a.monthPicker || a.yearPicker || a.quarterPicker)), k = () => {
      o.value && (se.value.closeOnScroll ? Ge() : q());
    }, U = () => {
      var re;
      o.value && q();
      const O = (re = y.value) == null ? void 0 : re.$el.getBoundingClientRect().width;
      F.value = document.body.offsetWidth <= O;
    }, ve = (O) => {
      O.key === "Tab" && !$.value.enabled && !a.teleport && se.value.tabOutClosesMenu && (Y.value.contains(document.activeElement) || Ge()), M.value = O.shiftKey;
    }, ue = (O) => {
      M.value = O.shiftKey;
    }, he = () => {
      !a.disabled && !a.readonly && (m(nn, a), q(false), o.value = true, o.value && n("open"), o.value || Nt(), i(a.modelValue));
    }, oe = () => {
      var O;
      K.value = "", Nt(), (O = R.value) == null || O.setParsedDate(null), n("update:model-value", null), n("update:model-timezone-value", null), n("cleared"), se.value.closeOnClearValue && Ge();
    }, We = () => {
      const O = te.value;
      return !O || !Array.isArray(O) && P(O) ? true : Array.isArray(O) ? ae.value.enabled || O.length === 2 && P(O[0]) && P(O[1]) ? true : le.value.partialRange && !a.timePicker ? P(O[0]) : false : false;
    }, Fe = () => {
      S() && We() ? (b(), Ge()) : n("invalid-select", te.value);
    }, Ye = (O) => {
      ht(), b(), se.value.closeOnAutoApply && !O && Ge();
    }, ht = () => {
      R.value && J.value.enabled && R.value.setParsedDate(te.value);
    }, It = (O = false) => {
      a.autoApply && I(te.value) && We() && (le.value.enabled && Array.isArray(te.value) ? (le.value.partialRange || te.value.length === 2) && Ye(O) : Ye(O));
    }, Nt = () => {
      J.value.enabled || (te.value = null);
    }, Ge = () => {
      $.value.enabled || (o.value && (o.value = false, v.value = false, T(false), H(false), B(), n("closed"), K.value && i(s.value)), Nt(), n("blur"));
    }, ia = (O, re, fe = false) => {
      if (!O) {
        te.value = null;
        return;
      }
      const rt = Array.isArray(O) ? !O.some((bt) => !P(bt)) : P(O), et = I(O);
      rt && et && (te.value = O, re && (E.value = fe, Fe(), n("text-submit")));
    }, da = () => {
      a.autoApply && I(te.value) && b(), ht();
    }, Gt = () => o.value ? Ge() : he(), ca = (O) => {
      te.value = O;
    }, fa = () => {
      J.value.enabled && (w.value = true, l()), n("focus");
    }, va = () => {
      if (J.value.enabled && (w.value = false, i(a.modelValue), E.value)) {
        const O = ll(Y.value, M.value);
        O == null || O.focus();
      }
      n("blur");
    }, za = (O) => {
      y.value && y.value.updateMonthYear(0, {
        month: Xa(O.month),
        year: Xa(O.year)
      });
    }, g = (O) => {
      i(O ?? a.modelValue);
    }, Z = (O, re) => {
      var fe;
      (fe = y.value) == null || fe.switchView(O, re);
    }, ce = (O) => se.value.onClickOutside ? se.value.onClickOutside(O) : Ge();
    return Jr(A, R, () => ce(We)), t({
      closeMenu: Ge,
      selectDate: Fe,
      clearValue: oe,
      openMenu: he,
      onScroll: k,
      formatInputValue: l,
      // exposed for testing purposes
      updateInternalModelValue: ca,
      // modify internal modelValue
      setMonthYear: za,
      parseModel: g,
      switchView: Z,
      toggleMenu: Gt
    }), (O, re) => (openBlock(), createElementBlock("div", {
      ref_key: "pickerWrapperRef",
      ref: Y,
      class: normalizeClass(j.value),
      "data-datepicker-instance": ""
    }, [
      createVNode(Hl, mergeProps({
        ref_key: "inputRef",
        ref: R,
        "input-value": unref(K),
        "onUpdate:inputValue": re[0] || (re[0] = (fe) => isRef(K) ? K.value = fe : null),
        "is-menu-open": o.value
      }, O.$props, {
        onClear: oe,
        onOpen: he,
        onSetInputDate: ia,
        onSetEmptyDate: unref(b),
        onSelectDate: Fe,
        onToggle: Gt,
        onClose: Ge,
        onFocus: fa,
        onBlur: va,
        onRealBlur: re[1] || (re[1] = (fe) => w.value = false)
      }), createSlots({ _: 2 }, [
        renderList(unref(V), (fe, rt) => ({
          name: fe,
          fn: withCtx((et) => [
            renderSlot(O.$slots, fe, normalizeProps(guardReactiveProps(et)))
          ])
        }))
      ]), 1040, ["input-value", "is-menu-open", "onSetEmptyDate"]),
      (openBlock(), createBlock(resolveDynamicComponent(O.teleport ? Teleport : "div"), normalizeProps(guardReactiveProps(p.value)), {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(_)(unref(c)),
            css: unref(z) && !unref($).enabled
          }, {
            default: withCtx(() => [
              o.value ? (openBlock(), createElementBlock("div", mergeProps({
                key: 0,
                ref_key: "dpWrapMenuRef",
                ref: A
              }, de.value, {
                class: { "dp--menu-wrapper": !unref($).enabled },
                style: unref($).enabled ? void 0 : unref(h2)
              }), [
                createVNode(nn, mergeProps({
                  ref_key: "dpMenuRef",
                  ref: y
                }, O.$props, {
                  "internal-model-value": unref(te),
                  "onUpdate:internalModelValue": re[2] || (re[2] = (fe) => isRef(te) ? te.value = fe : null),
                  class: { [d.value]: true, "dp--menu-wrapper": O.teleport },
                  "open-on-top": unref(c),
                  "no-overlay-focus": ne.value,
                  collapse: F.value,
                  onClosePicker: Ge,
                  onSelectDate: Fe,
                  onAutoApply: It,
                  onTimeUpdate: da,
                  onFlowStep: re[3] || (re[3] = (fe) => O.$emit("flow-step", fe)),
                  onUpdateMonthYear: re[4] || (re[4] = (fe) => O.$emit("update-month-year", fe)),
                  onInvalidSelect: re[5] || (re[5] = (fe) => O.$emit("invalid-select", unref(te))),
                  onAutoApplyInvalid: re[6] || (re[6] = (fe) => O.$emit("invalid-select", fe)),
                  onInvalidFixedRange: re[7] || (re[7] = (fe) => O.$emit("invalid-fixed-range", fe)),
                  onRecalculatePosition: unref(q),
                  onTooltipOpen: re[8] || (re[8] = (fe) => O.$emit("tooltip-open", fe)),
                  onTooltipClose: re[9] || (re[9] = (fe) => O.$emit("tooltip-close", fe)),
                  onTimePickerOpen: re[10] || (re[10] = (fe) => O.$emit("time-picker-open", fe)),
                  onTimePickerClose: re[11] || (re[11] = (fe) => O.$emit("time-picker-close", fe)),
                  onAmPmChange: re[12] || (re[12] = (fe) => O.$emit("am-pm-change", fe)),
                  onRangeStart: re[13] || (re[13] = (fe) => O.$emit("range-start", fe)),
                  onRangeEnd: re[14] || (re[14] = (fe) => O.$emit("range-end", fe)),
                  onDateUpdate: re[15] || (re[15] = (fe) => O.$emit("date-update", fe)),
                  onInvalidDate: re[16] || (re[16] = (fe) => O.$emit("invalid-date", fe))
                }), createSlots({ _: 2 }, [
                  renderList(unref(ee), (fe, rt) => ({
                    name: fe,
                    fn: withCtx((et) => [
                      renderSlot(O.$slots, fe, normalizeProps(guardReactiveProps({ ...et })))
                    ])
                  }))
                ]), 1040, ["internal-model-value", "class", "open-on-top", "no-overlay-focus", "collapse", "onRecalculatePosition"])
              ], 16)) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["name", "css"])
        ]),
        _: 3
      }, 16))
    ], 2));
  }
});
var On = (() => {
  const e = Zr;
  return e.install = (t) => {
    t.component("Vue3DatePicker", e);
  }, e;
})();
var xr = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: On
}, Symbol.toStringTag, { value: "Module" }));
Object.entries(xr).forEach(([e, t]) => {
  e !== "default" && (On[e] = t);
});
export {
  On as default
};
//# sourceMappingURL=@vuepic_vue-datepicker.js.map
