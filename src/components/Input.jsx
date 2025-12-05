/* eslint-disable no-unused-vars */
import InputLabel from "./InputLabel"

const Input = ({ label, errorMessage, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        type="text"
        className="rounded-lg border border-solid border-[#ececec] px-4 py-3 outline-[#00adb5] placeholder:text-sm placeholder:text-[#9a9c9f]"
        {...rest}
      />
      {errorMessage && (
        <span className="text-left text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  )
}

export default Input
