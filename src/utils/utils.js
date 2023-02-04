import { completeMissingField, PRE_LINK } from "./constants";

export const correctApiData = (data) => {
    data.forEach(item => {
      if (!item.image) {
        item.image = completeMissingField.image;
        item.thumbnail = completeMissingField.thumbnail;
      } else {
        item.image = `${PRE_LINK}${item.image.url}`;
        item.thumbnail = `${PRE_LINK}${item?.image?.formats?.thumbnail.url}` || '';
      }
      if(!item.country) {
        item.country = 'Russia';
      }
      if(!item.nameEN) {
        item.nameEN = item.nameRU;
      }
    });
    console.log('corrected:', data);
    return data;
}

export const recountDuration = (minutes) => {
  return `${(minutes-minutes%60)/60}ч ${minutes%60}м`
}
  