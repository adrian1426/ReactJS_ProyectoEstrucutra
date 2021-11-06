import { useState, useCallback } from 'react';

const useForm = (initialValues = {}) => {

  //state initial of form
  const [fields, setFields] = useState(initialValues);

  //internal functions
  const addField = useCallback((name, value) => {
    setFields(f => ({
      ...f,
      [name]: value
    }));
  }, []);

  const removeField = name => {
    const newFields = { ...fields };
    delete newFields[name];
    setFields(newFields);
  };

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    setFields({
      ...fields,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const onChangeAutocomplete = (name, value) => {
    setFields({
      ...fields,
      [name]: value
    });
  };
  //end internal functions

  //output functions
  const newPropsInput = name => ({
    name,
    defaultValue: fields[name],
    onChange
  });

  const newPropsInputValue = name => ({
    name,
    value: fields[name] || '',
    onChange
  });

  const newPropsCheck = (name) => ({
    name,
    checked: fields[name],
    onChange
  });

  const newPropsRadioButton = (name, value) => ({
    name,
    value,
    checked: value === fields[name],
    onChange
  });

  const newPropsAutocomplete = name => ({
    value: fields[name],
    onChange: (e, value) => onChangeAutocomplete(name, value)
  });
  //end output functions

  //props return in useForm
  return {
    fields,
    setFields,
    newPropsInput,
    newPropsInputValue,
    newPropsCheck,
    newPropsRadioButton,
    newPropsAutocomplete,
    addField,
    removeField
  };
};

export default useForm;