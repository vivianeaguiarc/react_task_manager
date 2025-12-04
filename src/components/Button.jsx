const Button = ({ children, variant = "primary" }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#00ADB5] text-white"

      case "ghost":
        return "bg-transparent text-[#818181]"
    }
  }

  return (
    <button
      className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold transition hover:opacity-80 ${getVariantClasses()}`}
    >
      {children}
    </button>
  )
}

export default Button
