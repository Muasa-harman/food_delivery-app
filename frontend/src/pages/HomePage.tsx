import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";

function HomePage() {
  return (
    <div className="flex flex-col gap-12">
        <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-14">
            <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                Tuck into a takeaway today
            </h1>
            <span className="text-xl">Food is just a click away!</span>
            <div className="tracking-tight gap-2"> 
            
                <input className="p-1 border border-gray-400 rounded-xl" type="text"placeholder="Search by City or Town" />
                <span className="bg-orange-500 p-2 !important  rounded-xl">Search</span>
            </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
            <img src={landingImage}/>
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <span className="font-bold text-3xl -tracking-tighter">
                    Order takeaway even faster
                </span>
                <span className="">Download the DonfileSEats App for faster ordering and personalised recommentations</span>
                <img src={appDownloadImage} />
            </div>
        </div>
    </div>
  )
}

export default HomePage;