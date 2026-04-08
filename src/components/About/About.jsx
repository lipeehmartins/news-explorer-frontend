import "./About.css";

const ABOUT_AUTHOR_IMAGE_URL =
  "https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=928&q=80";

function About() {
  return (
    <section className="about" aria-label="Sobre o autor">
      <img
        className="about__image"
        src={ABOUT_AUTHOR_IMAGE_URL}
        alt="Foto da autora"
      />

      <div className="about__content">
        <h2 className="about__title">Sobre o autor</h2>
        <p className="about__text">
          Esse bloco descreve o autor do projeto. Aqui você deve indicar seu
          nome, o que você faz e quais tecnologias de desenvolvedor você
          conhece.
          <br />
          <br />
          Você também pode falar sobre sua experiência com o Practicum, o que
          aprendeu lá e como pode ajudar clientes em potencial.
        </p>
      </div>
    </section>
  );
}

export default About;
