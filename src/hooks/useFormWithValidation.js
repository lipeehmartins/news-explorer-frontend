import { useCallback, useState } from "react";

const getPortugueseValidationMessage = (target) => {
  const { validity, type, minLength, maxLength } = target;

  if (validity.valueMissing) {
    return "Este campo é obrigatório.";
  }

  if (validity.typeMismatch && type === "email") {
    return "Digite um e-mail válido.";
  }

  if (validity.tooShort) {
    return `Mínimo de ${minLength} caracteres.`;
  }

  if (validity.tooLong) {
    return `Máximo de ${maxLength} caracteres.`;
  }

  if (validity.patternMismatch) {
    return "Formato inválido.";
  }

  return "";
};

export default function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const form = event.target.closest("form");
    const validationMessage = getPortugueseValidationMessage(event.target);

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validationMessage }));
    setIsValid(form ? form.checkValidity() : false);
  };

  const resetForm = useCallback(
    (nextValues = initialValues, nextErrors = {}, nextIsValid = false) => {
      setValues(nextValues);
      setErrors(nextErrors);
      setIsValid(nextIsValid);
    },
    [initialValues],
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
  };
}
