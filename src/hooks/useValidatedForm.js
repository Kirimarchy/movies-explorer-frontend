import { useCallback, useState } from 'react';
import isEmail from 'validator/es/lib/isEmail';

const useValidatedForm = () => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState({});

  const handleChange = (e) => {
    const input = e.target;
    const { name, value } = input;
    if (name === 'email') {
      isEmail(value) ? input.setCustomValidity('Адрес электронной почты указан неверно') : input.setCustomValidity('');
    }
    if (name === 'name' && input.validity.patternMismatch) {
      input.setCustomValidity('Имя пользователя содержит недопустимые символы.');
    } else {
      input.setCustomValidity('');
    }

    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
    setValues({ ...values, [name]: value });
  };
  
  const setFormFields = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, errors, setErrors, handleChange, isValid, setIsValid, setFormFields };
}

export default useValidatedForm;