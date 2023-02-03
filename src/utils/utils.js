import { completeMissingField, PRE_LINK } from "./constants";

const correctApiData = (data) => {
    data.forEach(item => {
      if (!item.image) {
        item.image = completeMissingField.image;
        item.thumbnail = completeMissingField.thumbnail;
      } else {
        item.image = `${PRE_LINK}${movie.image.url}`
        item.thumbnail = `${PRE_LINK}${movie.image.formats.thumbnail.url}`
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

  export default correctApiData;