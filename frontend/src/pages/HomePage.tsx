import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const handleSearcSubmit = (searchFormValues: SearchForm) =>{
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`
        })
    }
  return (
    <div className="flex flex-col gap-12">
        <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-14">
            <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                Tuck into a takeaway today
            </h1>
            <span className="text-xl">Food is just a click away!</span>
            <SearchBar placeHolder="Search by city or town" onSubmit={handleSearcSubmit}/>
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