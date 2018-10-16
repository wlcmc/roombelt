import React from "react";
import Select from "react-select";

const Select2 = React.forwardRef((props, ref) => {
    const value = props.options.find(option => props.getOptionValue(option) === props.value) || null;
    return <Select {...props} ref={ref} value={value}/>;
  }
);

Select2.defaultProps = {
  getOptionValue: option => option.value
};

export default Select2;

