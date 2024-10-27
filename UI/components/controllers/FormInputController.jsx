import { Controller } from "react-hook-form";
import InputField from "../InputField";

const FormInputController = ({
  name,
  isPassword,
  control,
  placeholder,
  // ...otherProps
}) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <InputField
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          isPassword={isPassword}
          // {...otherProps}
        />
      )}
    />
  );
};

export default FormInputController;