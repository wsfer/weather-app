import SVGIcons from '../assets/SVGIcons';

const footer = new Range().createContextualFragment(
  `<footer class="footer">
      <h2 class="footer__title">Created by Wesley Ferreira</h2>
      <ul class="footer__links">
        <li class="footer__links__item">
          <a 
            class="footer__links__item__link"
            href="https://github.com/wsfer"
            target="_blank"
            aria-label="Github (opens in a new tab)">
            ${SVGIcons.github}
          </a>
        </li>
        <li class="footer__links__item">
          <a
            class="footer__links__item__link"
            href="https://www.linkedin.com/in/wesley-ferreira-87153a285/"
            target="_blank"
            aria-label="Linkedin (opens in a new tab)">
            ${SVGIcons.linkedin}
          </a>
        </li>
      </ul>
    </footer>`
);

export default footer;
