export function FormField({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const base =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#FF6B4A] focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/20";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={base}
        />
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required={required}
          className={base}
        />
      )}
    </div>
  );
}
