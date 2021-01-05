import React from "react";
import TextField from "@material-ui/core/TextField";

export default function Input(props) {
  const { name, label, value, error = null, onChange, type } = props;
  return (
    <TextField
      variant='outlined'
      margin='normal'
      fullWidth
      id={name}
      label={label}
      type={type}
      name={name}
      autoFocus
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
}
