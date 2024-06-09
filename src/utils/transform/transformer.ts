export class Transformer {
  /**
   * Transform number to string on DTO's when data is received.
   *
   * @param {number} data number as any.
   * @returns { string | any } string if all arguments are number. Otherwise, return its original value.
   * @example Transform(Transformer.numberToString)
   */
  static numberToString(data: any): any {
    const value = data.value;

    if (value && typeof value === 'number') {
      return value.toString();
    }

    return value;
  }

  /**
   * Transform string to number on DTO's when data is received.
   *
   * @param {any} data string as any.
   * @returns {number | any} number if all arguments are string. Otherwise, return its original value.
   * @example Transform(Transformer.toNumber)
   */
  static toNumber(data: any): any {
    const value = data.value;

    if (!value && !(typeof value === 'string')) {
      return value;
    }

    const num = Number(value);

    if (Number.isNaN(num)) {
      return value;
    }

    return num;
  }

  /**
   * Transform string to boolean on DTO's when data is received.
   *
   * @param {any} data string as any.
   * @returns {boolean | any} boolean if all arguments are string. Otherwise, return its original value.
   * @example Transform(Transformer.stringToBoolean)
   */
  static toBoolean(data: any): any {
    const value = data.value;

    if (!value && !(typeof value === 'string')) {
      return value;
    }

    if (value.toLowerCase() === 'true' || value.toString() === '1') {
      return true;
    }

    if (value.toLowerCase() === 'false' || value.toString() === '0') {
      return false;
    }

    return value;
  }

  /**
   * Transform string to date on DTO's when data is received.
   *
   * @param {any} data string or number as any.
   * @returns {Date | any} Date if all arguments are string. Otherwise, return its original value.
   * @example Transform(Transformer.toDate)
   */
  static toDate(data: any): any {
    const value = data.value;

    if (value && (typeof value === 'string' || typeof value === 'number')) {
      return new Date(value);
    }

    return value;
  }

  /**
   * Transform string to prefix Indonesian phone number on DTO's when data is received.
   *
   * @param {any} data string as any.
   * @returns {string | any} string if all arguments are string. Otherwise, return its original value.
   * @example Transform(Transformer.toPrefixIndoensianPhoneNumber)
   */
  static toPrefixIndoensianPhoneNumber(data: any) {
    const value = data.value;

    if (!value) {
      return undefined;
    }

    if (value.startsWith('+')) {
      return value;
    }

    if (value.startsWith('62')) {
      return '+' + value;
    }

    if (value.startsWith('0')) {
      return '+62' + value.substring(1);
    }
    return value;
  }
}
