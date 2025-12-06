const SidebarButton = ({ children, variant, icon }) => {
  const getVariantClasses = () => {
    if (variant === "unselected") {
      return "text-brand-dark-blue"
    }

    if (variant === "selected") {
      return "bg-brand-primary/25 text-brand-primary"
    }

    return ""
  }

  return (
    <a
      href="#"
      className={`flex items-center gap-2 rounded-lg px-6 py-3 ${getVariantClasses()}`}
    >
      {children}
    </a>
  )
}

export default SidebarButton
