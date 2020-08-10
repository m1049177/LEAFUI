import Vue from 'vue';
import { format } from 'date-fns';

export const DATE_FORMAT = 'yyyy-MM-dd';
export const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm';

export const DATE_TIME_LONG_FORMAT = "yyyy-MM-dd'T'HH:mm";
export const INSTANT_FORMAT = "yyyy-MM-dd'T'HH:mm:ssZ";
export const ZONED_DATE_TIME_FORMAT = "yyyy-MM-dd'T'HH:mm:ssXXXXX";

export function initFilters() {
  Vue.filter('formatDate', function(value: string) {
    if (value) {
      return format(value, DATE_TIME_FORMAT);
    }
    return '';
  });
}