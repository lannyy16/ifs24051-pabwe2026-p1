
import { useState } from "react";
import { validateSearch } from "../../utils/validation";

export default function HerbSearch({ onSearch }) {
  const [query, setQuery] = useState("");
  const [validationError, setValidationError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const error = validateSearch(query);

    setValidationError(error);

    if (error) {
      return;
    }

    onSearch(query.trim());
  }

  return (
    <form
      className="search-form"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        value={query}
        maxLength={100}
        onChange={(event) => {
          setQuery(event.target.value);
          setValidationError("");
        }}
        placeholder="Cari nama herbal..."
        aria-label="Cari herbal"
      />

      <button type="submit">
        Cari
      </button>

      {validationError && (
        <p className="validation-error" role="alert">
          {validationError}
        </p>
      )}
    </form>
  );
}
