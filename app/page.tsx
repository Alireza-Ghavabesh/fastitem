import Banner from "@/components/banner";
import Header from "@/components/header";
import { Slider } from "@/components/slider";
import Autographed from "@/public/Dota2Products/Autographed.png";
import Harborblossom from "@/public/Dota2Products/Harborblossom.png";
import InscribedElixir from "@/public/Dota2Products/InscribedElixir.png";
import { ProductItemProps } from "../components/productItem";
import bgImage from "@/public/banner-background.jpg";

const hardCodedProductItems: ProductItemProps[] = [
  {
    productId: "1",
    heroName: "Monkey king",
    urlToMoreLikes: "https://google.com",
    imageUrl: Autographed.src,
    itemName: "Autographed",
    price: "string",
    timeToDeliver: "fori",
  },
  {
    productId: "2",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: Harborblossom.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "3",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "4",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "5",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "6",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
  {
    productId: "7",
    heroName: "string",
    urlToMoreLikes: "string",
    imageUrl: InscribedElixir.src,
    itemName: "string",
    price: "string",
    timeToDeliver: "string",
  },
];

export default function Home() {
  return (
    <>
      <div className="mb-8">
        <Banner />
        <Slider
          productItems={hardCodedProductItems}
          showGameItemsText="Dota2"
        />
        <Slider
          productItems={hardCodedProductItems}
          showGameItemsText="Dota2"
        />
        <Slider
          productItems={hardCodedProductItems}
          showGameItemsText="Dota2"
        />
      </div>
    </>
  );
}
