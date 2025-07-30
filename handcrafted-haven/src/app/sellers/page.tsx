

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
       <div className="flex items-center">
        <img
          src="logo.png"
          alt="Seller Icon"
          className="w-16 h-16 mr-4"
        />    
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
      </div>
      <div className="Seller Profile">
        <h2 className="text-xl font-semibold mt-6">Profile Information</h2>
        <div className="grid grid-flow-col grid-rows-3 gap-4"></div>
        <div className="row-span-3 ...">01</div>
        <div className="col-span-2 ...">02</div>
        <div className="col-span-2 row-span-2 ...">03</div>
      </div>      

    </main>
  )
}

