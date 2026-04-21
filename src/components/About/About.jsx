import "./About.css";
import luizFelipeImage from "../../assets/photos/luiz_felipe.jpeg";

const ABOUT_AUTHOR_IMAGE_URL = luizFelipeImage;

function About() {
  return (
    <section className="about" aria-label="Sobre o autor">
      <img
        className="about__image"
        src={ABOUT_AUTHOR_IMAGE_URL}
        alt="Foto de Luiz Felipe"
      />

      <div className="about__content">
        <h2 className="about__title">Sobre o autor</h2>
        <p className="about__text">
          Sou Luiz Felipe, desenvolvedor Full Stack Junior em formacao continua,
          com foco em criar produtos web funcionais, bem estruturados e com
          otima experiencia para o usuario. Trabalho principalmente com
          JavaScript, React, Node.js, Express e MongoDB, alem de HTML, CSS, Git
          e consumo de APIs REST. Gosto de transformar requisitos de negocio em
          interfaces claras e codigo limpo, sempre pensando em performance,
          responsividade e manutencao.
          <br />
          <br />
          Na TripleTen, desenvolvi projetos de ponta a ponta, da prototipacao ao
          deploy, passando por autenticacao, rotas protegidas, integracao de
          APIs externas, modelagem de dados e ajustes visuais orientados por
          Figma. Essa experiencia fortaleceu meu senso de produto, minha
          comunicacao tecnica e meu compromisso com entregas de qualidade. Busco
          contribuir com times que valorizam colaboracao e evolucao constante,
          levando aprendizado rapido, atencao aos detalhes e responsabilidade
          com resultados.
        </p>
      </div>
    </section>
  );
}

export default About;
