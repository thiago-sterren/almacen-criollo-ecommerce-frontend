import React from "react"

type CommonProps = {
  label: string,
  name: string,
  value: string,
  onChange: (name: string, value: string) => void,
  type?: string,
  disabled?: boolean,
}

export function TextField({ label, name, value, onChange, type = "text", disabled = false }: CommonProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        disabled={disabled}
        onChange={e => onChange(name, e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500 disabled:bg-gray-100"
      />
    </div>
  )
}

type SelectProps = {
  label: string,
  name: string,
  value: string,
  options: string[],
  onChange: (name: string, value: string) => void,
}

export function SelectField({ label, name, value, options, onChange }: SelectProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium">{label}</label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}