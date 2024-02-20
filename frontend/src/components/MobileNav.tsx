import { CircleUserRound, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import MobileNavLinks from "./MobileNavLinks"


function MobileNav() {
  const { isAuthenticated,loginWithRedirect,user} = useAuth0();
  return (
    <div>
      <Sheet>
        <SheetTrigger>
            <Menu className="text-orange-500"/>
        </SheetTrigger>
        <SheetContent className="space-y-3">
            <SheetTitle>
              {isAuthenticated ? (<span className="flex items-center font-bold gap-2">
                <CircleUserRound className="text-orange-500"/>
                {user?.email}
              </span>) :
               ( <span className="">Welcome to DonfileSEats.COM</span>)
              }
            </SheetTitle>
            <Separator/>
            <SheetDescription className="flex flex-col gap-4">
              {isAuthenticated?<MobileNavLinks/> : 
                (<Button onClick={()=> loginWithRedirect()} className="flex font-bold bg-orange-500">Log In</Button>)
              }
            </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav;