import { data, Link } from "react-router-dom"
import Product from "./orders/Product"
interface home {
  product :string
  price :number
  image :string
}
const Home = () => {
  return (
    <div>
      
      <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>

            <Link
              to="/product"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
           
            </div>
          </div>
    </div>
  )
}

export default Home
