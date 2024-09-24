import { Controller } from "react-hook-form";
import InputField from "../InputField";

const FormInputController = ({name, control, placeholder,...otherProps}) =>{
    return (
        <Controller
          name={name}
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <InputField
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              {...otherProps}
            />
          )}
        />
    );
}

export default FormInputController;