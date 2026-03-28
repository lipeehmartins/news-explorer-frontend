import './Preloader.css';

function Preloader({ text }) {
  return (
    <div className="preloader" role="status" aria-live="polite">
      <span className="preloader__circle" />
      <p className="preloader__text">{text}</p>
    </div>
  );
}

export default Preloader;