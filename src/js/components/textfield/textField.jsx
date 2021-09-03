/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './styles.scss';

const InputField = (props) => (
  <>
    <div className={styles.inputWrapper} ref={props.ref}>
      {props.inputAdornment && (
      <div className={styles.adornment}>
        {props.inputAdornment}
      </div>
      )}
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        className={props.className}
        name={props.name}
        style={props.styles}
        maxLength={props.maxLength}
        value={props.value}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
        onClick={props.onClick}
        onChange={props.onChange}
        onFocus={props.onFocus}
        autoComplete={props.autocomplete}
      />
    </div>
  </>
);

export default InputField;
