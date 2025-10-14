import React from 'react';

// Componente genérico para formulários de CRUD
const CrudForm = ({ fields, values, onChange, onSubmit, submitLabel }) => (
  <form onSubmit={onSubmit} style={{marginBottom: 20}}>
    {fields.map(field => (
      <div key={field.name} style={{marginBottom: 10}}>
        <label>{field.label}: </label>
        <input
          type="text"
          name={field.name}
          value={values[field.name] || ''}
          onChange={onChange}
        />
      </div>
    ))}
    <button type="submit">{submitLabel || 'Salvar'}</button>
  </form>
);

export default CrudForm;
