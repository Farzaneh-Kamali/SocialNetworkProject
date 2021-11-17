import React from "react";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue, StylesConfig } from "react-select";
import { FieldProps } from "formik";

export interface Option {
  readonly value: string;
  readonly label: string;
}

interface CreatableMultiProps extends FieldProps {
  options: readonly Option[];
  className?: string;
}

const Style: StylesConfig<Option, true> = {
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: "#e9f0f8",
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    fontSize: "12px",
  }),
};
export const CreatableMulti = ({
  className,
  field,
  form:{setFieldValue},
  options,
}: CreatableMultiProps) => {
  const handleChange = (
    newValue: OnChangeValue<Option, true>,
    actionMeta: ActionMeta<Option>
  ) => {
    setFieldValue(
      field.name,
      (newValue as Option[]).map((item: Option) => item.value)
    );
  };

  const values = React.useMemo(() =>
    field.value.map((x: string) => ({
      label: `#${x}`,
      value: x,
      key: x,
    }))
  , [field.value]);

  return (
    <CreatableSelect
      className={className}
      name={field.name}
      isMulti
      onChange={handleChange}
      options={options}
      styles={Style}
      value={values}
    />
  );
};
