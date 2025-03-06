import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  value: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  icon?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  required?: boolean;
}

const Input: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  value,
  label,
  placeholder,
  icon,
  onChange,
  isPassword = false,
  required = false,
  autoComplete = "off",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        {icon}

        <input
          id="email"
          name={name}
          type={isPassword && !showPassword ? "password" : type}
          value={value}
          onChange={onChange}
          required
          className="block w-full rounded-lg border-0 py-3 pl-12 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          placeholder={placeholder}
          autoComplete="new-password" // Helps prevent autofill
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400
                                           hover:text-gray-600 transition-colors duration-200"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
