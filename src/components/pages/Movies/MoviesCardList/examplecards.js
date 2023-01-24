import picture from '../../../../images/movie_card_img.png';

const card =
{
  country: "Европа, США",
  director: "Стенли Кубрик",
  duration: 222,
  year: "2022",
  description: "На всю зарплату...",
  image: 'src/images/movie_card_img.png',
  trailerLink: "https://hsfdsag.com",
  thumbnail: "https://huasdacasdfa.com",
  movieId: 555,
  nameRU: "Дискотека Века",
  nameEN: "Disсoteque"

}

let cardList = [];

for (let i = 0; i<=8; i++) {
  cardList.push(card);
}

const cards = [...cardList];

export default cards;