import Banner from "@/components/banner";
import { Slider } from "@/components/slider";
import { ProductItemProps } from "../components/productItem";

const hardCodedProductItems: ProductItemProps[] = [
  {
    productId: "1",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/Autographed.png",
    itemName: "Autographed",
    originalPrice: "264,000",
    discountPrice: "264,000",
    timeToDeliver: "فوری",
    isFory: true,
  },
  {
    productId: "2",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/Harborblossom.png",
    itemName: "Harborblossom",
    originalPrice: "320,000",
    discountPrice: "289,000",
    timeToDeliver: "فوری",
    isFory: false,
  },
  {
    productId: "3",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/InscribedElixir.png",
    itemName: "Inscribed Elixir",
    originalPrice: "149,000",
    discountPrice: "149,000",
    timeToDeliver: "فوری",
    isFory: true,
  },
  {
    productId: "4",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/Magus Apex.png",
    itemName: "Magus Apex",
    originalPrice: "499,000",
    discountPrice: "439,000",
    timeToDeliver: "فوری",
    isFory: false,
  },
  {
    productId: "5",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/PhantomConcord.png",
    itemName: "Phantom Concord",
    originalPrice: "199,000",
    discountPrice: "199,000",
    timeToDeliver: "فوری",
    isFory: true,
  },
  {
    productId: "6",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/TheOrderOfCyprin.png",
    itemName: "The Order Of Cyprin",
    originalPrice: "399,000",
    discountPrice: "349,000",
    timeToDeliver: "فوری",
    isFory: false,
  },
  {
    productId: "7",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/UmbralGlyph.png",
    itemName: "Umbral Glyph",
    originalPrice: "229,000",
    discountPrice: "229,000",
    timeToDeliver: "فوری",
    isFory: true,
  },
  {
    productId: "8",
    heroName: "Monkey king",
    urlToMoreLikes: "",
    imageUrl: "/images/UmbralGlyph.png",
    itemName: "Umbral Glyph",
    originalPrice: "500,000",
    discountPrice: "500,000",
    timeToDeliver: "3 روزه",
    isFory: false,
  },
];

export default function Home() {
  return (
    <div className="mb-[50px]">
      <Banner />
      <Slider productItems={hardCodedProductItems} showGameItemsText="Dota2" />
      <Slider productItems={hardCodedProductItems} showGameItemsText="Dota2" />
      <Slider productItems={hardCodedProductItems} showGameItemsText="Dota2" />
    </div>
  );
}
