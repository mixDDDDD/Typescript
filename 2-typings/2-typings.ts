// Внешние функции — типизация не требуется
const makeOrdinal = (w: string) => w;
const isFinite = (n: unknown) => true;
const isSafeNumber = (n: unknown) => true;


const TEN = 10;
const ONE_HUNDRED = 100;
const ONE_THOUSAND = 1000;
const ONE_MILLION = 1_000_000;
const ONE_BILLION = 1_000_000_000;
const ONE_TRILLION = 1_000_000_000_000;
const ONE_QUADRILLION = 1_000_000_000_000_000;
const MAX = 9_007_199_254_740_992;

const LESS_THAN_TWENTY: string[] = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
  'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
  'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

const TENTHS_LESS_THAN_HUNDRED: string[] = [
  'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty',
  'sixty', 'seventy', 'eighty', 'ninety'
];

/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param number - число или строка
 * @param asOrdinal - Deprecated, use toWordsOrdinal() instead!
 * @returns строковое представление числа
 */
function toWords(number: number | string, asOrdinal?: boolean): string {
  const num: number = typeof number === 'number' ? number : parseInt(number, 10);

  if (!isFinite(num)) {
    throw new TypeError(
      `Not a finite number: ${number} (${typeof number})`
    );
  }
  if (!isSafeNumber(num)) {
    throw new RangeError(
      'Input is not a safe number, it’s either too large or too small.'
    );
  }

  const words = generateWords(num);
  return asOrdinal ? makeOrdinal(words) : words;
}

function generateWords(number: number, words?: string[]): string {
  let remainder: number = 0;
  let word: string = '';

  // We’re done
  if (number === 0) {
    return !words ? 'zero' : words.join(' ').replace(/,$/, '');
  }

  // First run
  if (!words) {
    words = [];
  }

  // If negative, prepend “minus”
  if (number < 0) {
    words.push('minus');
    number = Math.abs(number);
  }

  if (number < 20) {
    remainder = 0;
    word = LESS_THAN_TWENTY[number];

  } else if (number < ONE_HUNDRED) {
    remainder = number % TEN;
    word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
    if (remainder) {
      word += '-' + LESS_THAN_TWENTY[remainder];
      remainder = 0;
    }

  } else if (number < ONE_THOUSAND) {
    remainder = number % ONE_HUNDRED;
    word = generateWords(Math.floor(number / ONE_HUNDRED)) + ' hundred';

  } else if (number < ONE_MILLION) {
    remainder = number % ONE_THOUSAND;
    word = generateWords(Math.floor(number / ONE_THOUSAND)) + ' thousand,';

  } else if (number < ONE_BILLION) {
    remainder = number % ONE_MILLION;
    word = generateWords(Math.floor(number / ONE_MILLION)) + ' million,';

  } else if (number < ONE_TRILLION) {
    remainder = number % ONE_BILLION;
    word = generateWords(Math.floor(number / ONE_BILLION)) + ' billion,';

  } else if (number < ONE_QUADRILLION) {
    remainder = number % ONE_TRILLION;
    word = generateWords(Math.floor(number / ONE_TRILLION)) + ' trillion,';

  } else if (number <= MAX) {
    remainder = number % ONE_QUADRILLION;
    word = generateWords(Math.floor(number / ONE_QUADRILLION)) + ' quadrillion,';
  }

  words.push(word);
  return generateWords(remainder, words);
}

export default toWords;