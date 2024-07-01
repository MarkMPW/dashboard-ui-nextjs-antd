import React from "react";

import { Input } from "antd";
import { FieldProps } from "formik";

interface CustomInputType extends FieldProps {
  type?: string;
  placeholder: string;
  topic?: string;
  editWidth?: boolean;
  textArea?: boolean;
  rows?: number
  cols?: number
}

const CustomInput: React.FC<CustomInputType> = ({
  field,
  type,
  placeholder,
  form,
  meta,
  editWidth = false,
  topic,
  textArea = false,
  cols,
  rows,
}) => {
  return (
    <div className="mt-3">
      {topic ? (
        <label className="text-xl" htmlFor={`${topic}`}>
          {topic}:
        </label>
      ) : null}
      {textArea ? (
        <textarea
          {...field}
          className='w-[300px] block bg-gray-200 border py-2 px-3 text-lg my-2'
          placeholder={placeholder}
          value={meta.value}
          required
          onChange={form.handleChange}
          cols={cols}
          rows={rows}
        />
      ): (
        <Input
          {...field}
          type={type}
          className={`bg-gray-200 border py-2 px-3 rounded text-lg my-2 ${
            editWidth ? "w-[300px] block" : "w-full"
          }`}
          placeholder={placeholder}
          onBlur={form.handleBlur}
          value={meta.value}
        />
      )}

      {meta.error && meta.touched ? (
        <p className="text-red-500">{meta.error}</p>
      ) : null}
    </div>
  );
};

export default CustomInput;
