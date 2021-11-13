import { FieldProps } from "formik";
import React from "react";
import { ActionMeta, OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { Tag } from "../../../components/Tag/Tag.types";

interface TagOption {
  readonly value: string;
  readonly label: string;
}
interface SelectTagProps extends FieldProps {
  options: Array<Tag>;
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
}

export const SelectTag = ({
  className,
  placeholder,
  field,
  form,
  options,
  isMulti = false,
}: SelectTagProps) => {
    const TagOptions: readonly TagOption[] = React.useMemo(
      () =>
        options.map((a, index) => ({
          value: `${a}`,
          label: `#${a}`,
        })),
      [options]
    );
  // const TagOptions = options.map(
  //   (value) => { label: {`#${value.name}`} , value:`${value.name}`  }
  // );

  const handleChange = (
    // newValue: OnChangeValue<TagOption, true>,
    // actionMeta: ActionMeta<TagOption>,
    TagOptions: TagOption | TagOption[]
  ) => {
    // console.group("Value Changed");
    // console.log(newValue);
    // console.log(`action: ${actionMeta.action}`);
    // console.groupEnd();
    console.log(options, TagOptions);
    form.setFieldValue(
      field.name,
      isMulti
        ? (TagOptions as TagOption[]).map((item: TagOption) => item.value)
        : (TagOptions as TagOption).value
    );
  };
  const getValue = () => {
    if (TagOptions) {
      return isMulti
        ? TagOptions.filter(
            (TagOptions) => field.value.indexOf(TagOptions) >= 0
          )
        : TagOptions.find((TagOptions) => TagOptions === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };
  return (
    <CreatableSelect
      className={className}
      name={field.name}
      value={getValue()}
      onChange={handleChange}
      placeholder={placeholder}
      options={TagOptions}
      isMulti={isMulti}
    />
  );
};
