const DashboardCard = ({ icon, mainText, secondText }) => {
  return (
    <div className="bg-white h-[150px] rounded-[10px] flex flex-col items-center justify-center gap-1">
      <div className="flex items-center gap-2">
        <span className="text-brand-primary">{icon}</span>
        <span className="text-brand-dark-blue text-2xl font-semibold">
          {mainText}
        </span>
      </div>
      {secondText}
    </div>
  )
}

export default DashboardCard
