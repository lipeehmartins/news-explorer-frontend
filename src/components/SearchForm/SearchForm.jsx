import { useEffect, useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, initialValue = "" }) {
  const [keyword, setKeyword] = useState(initialValue);
  const [error, setError] = useState("");

  useEffect(() => {
    setKeyword(initialValue);
  }, [initialValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanedKeyword = keyword.trim();

    if (!cleanedKeyword) {
      setError("Por favor, insira uma palavra-chave");
      return;
    }

    setError("");
    onSearch(cleanedKeyword);
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);

    if (error) {
      setError("");
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <label className="search-form__label" htmlFor="search-news-input">
        Buscar notícias
      </label>
      <div className="search-form__controls">
        <input
          id="search-news-input"
          className="search-form__input"
          type="text"
          placeholder="Insira um tema"
          value={keyword}
          onChange={handleChange}
          required
        />
        <button className="search-form__button" type="submit">
          Procurar
        </button>
      </div>
      {error && <span className="search-form__error">{error}</span>}
    </form>
  );
}

export default SearchForm;
