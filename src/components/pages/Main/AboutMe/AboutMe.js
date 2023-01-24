import React from "react";
import "./AboutMe.css";
import photo from '../../../../images/ava.jpg'

const AboutMe = () => {
  return (
    <section className="about-me" id="student">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__bio-container">
          <div className="about-me__bio">
            <h3 className="about-me__name">Марианна</h3>
            <p className="about-me__age">Свободный художник, 33 года</p>
            <p className="about-me__text">
              Живу в г.Санкт-Петербург и мечтаю переехать на берег океана.
              Для этого осваиваю несколько удалённых ИТ-профессий, среди которых WEB-дизайн и разработка.
              Увлекаюсь электронной музыкой, современным искусством, люблю прекрасное и своего парня - Волшебника.
            </p>
            <ul className="about-me__socials">
              <li>
                <a
                  href="https://vk.com/d0d8d7"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  ВКонтакте
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Kirimarchy"
                  target="_blank"
                  rel="noreferrer"
                  className="about-me__social-link"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img
            className="about-me__avatar"
            src={photo}
            alt="Фото счастливого выпускника ЯП"
          />
        </div>
      </div>
    </section>
  );
}
export default AboutMe;
