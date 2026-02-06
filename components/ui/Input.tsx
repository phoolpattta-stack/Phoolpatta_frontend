"use client";

type InputProps = {
  name?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export default function Input({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}: InputProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
  );
}
