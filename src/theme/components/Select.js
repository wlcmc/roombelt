import React from "react";
import Select from "react-select";

const Select2 = React.forwardRef((props, ref) =>
  <Select {...props} ref={ref} value={props.options.find(option => props.getOptionValue(option) === props.value)}/>
);

Select2.defaultProps = {
  getOptionValue: option => option.value
};

export default Select2;

