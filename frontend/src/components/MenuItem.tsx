import { MenuItem } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type Props ={
  menuItem: MenuItem;
  addToCart: ()=>void;
}



const Menuitem = ({menuItem,addToCart}: Props) => {
  return (
    <Card onClick={()=>addToCart()} className="cursor-pointer">
        <CardHeader>
            <CardTitle>{menuItem.name}</CardTitle>
        </CardHeader>
        <CardContent className="font-bold">
            Kshs{(menuItem.price / 1000).toFixed(2)}
        </CardContent>
    </Card>
  )
}

export default Menuitem