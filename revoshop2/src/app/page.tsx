import Banner from "./component/banner";
import ProductsClient from "./component/fetchData/fetchData";


export default function Home() {
  return (
    <div>
      <h1 className='text-4xl text-center'>REVOSHOP</h1>
      <Banner></Banner>
      <ProductsClient></ProductsClient>
    </div>
  );
}
