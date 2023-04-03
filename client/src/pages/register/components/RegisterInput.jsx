export const RegisterInput = ({
  label,
  type,
  placeholder,
  id,
  onChange,
  errors,

}) => {
  return (
    <div className="w-full gap-2 relative">
      <div className="absolute -top-4 -right-64 w-80 h-full flex items-cente gap-2 pr-2">
        {errors.length ? (
          <div className="bg-gray-300  h-fit p-2 text-xs justify-end   flex flex-col">
            {errors.map((error) => (
              <span key={error} className="text-red-500">
                {error}
              </span>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <label htmlFor={id}>{label}</label>
      <input
        onChange={onChange}
        type={type}
        id={id}

        placeholder={placeholder}
        className={`w-full text-gray-300 focus:outline-none h-10 py-2  placeholder:text-gray-600 border-b border-primary-200 bg-transparent ${
          errors.length ? "border-red-500" : ""
        }`}
      />
    </div>
  );
};
