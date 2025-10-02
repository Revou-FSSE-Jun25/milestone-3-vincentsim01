import Banner from "./component/banner";
import ProductsClient from "./component/fetchData/fetchData";
import FetchProduct from './component/FetchProduct/FetchProduct';


export default function Home() {
  return (
    <div>
      <Banner></Banner>
      {/* <ProductsClient></ProductsClient> */}
      <FetchProduct></FetchProduct>
    </div>
  );
}
