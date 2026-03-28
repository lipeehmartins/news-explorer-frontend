import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2026 NewsExplorer, desenvolvido para portfólio</p>
      <a
        className="footer__link"
        href="https://newsapi.org"
        target="_blank"
        rel="noreferrer"
      >
        API utilizada: News API
      </a>
    </footer>
  );
}

export default Footer;
