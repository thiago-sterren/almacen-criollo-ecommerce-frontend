const ResponsiveLogo = ({ onClick }: { onClick: () => void }) => (
  <>
    <h1 className="hidden sm:block text-2xl sm:text-3xl cursor-pointer justify-self-start" onClick={onClick}>
      Almacén<span className="font-bold">Criollo</span>
    </h1>
    <h1 className="block sm:hidden text-xl cursor-pointer justify-self-start leading-tight" onClick={onClick}>
      Almacén<br />
      <span className="font-bold">Criollo</span>
    </h1>
  </>
)

export default ResponsiveLogo