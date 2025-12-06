/* eslint-disable no-unused-vars */
const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-brand-primary text-white"

      case "ghost":
        return "bg-transparent text-brand-dark-gray"

      case "secondary":
        return "bg-brand-light-gray text-brand-dark-blue"
    }
  }
  const getSizeClasses = () => {
    if (size === "small") {
      return "py-1 text-xs"
    }
    if (size === "large") {
      return "py-2 text-md"
    }
  }
  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-md px-3 ${getSizeClasses()} font-semibold transition hover:opacity-80 ${getVariantClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
