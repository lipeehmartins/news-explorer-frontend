import './About.css';

function About() {
  return (
    <section className="about" aria-label="Sobre o projeto">
      <h2 className="about__title">Sobre o projeto</h2>
      <p className="about__text">
        Este projeto foi desenvolvido para praticar React, roteamento, integração com API de terceiros e
        componentes reutilizáveis com foco em experiência do usuário.
      </p>
    </section>
  );
}

export default About;