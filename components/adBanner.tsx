import AdGiftCart from "@/public/giftCart.gif";
import Image from "next/image";
export type AdBannerProps = {};

export const AdBanner: React.FC<AdBannerProps> = ({}) => {
  return <Image src={AdGiftCart} width={325} height={80} alt="" />;
};
