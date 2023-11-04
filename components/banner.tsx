import dota2Image from "@/public/dota2link.png";
import csgoImage from "@/public/CSGO.png";
import rustImage from "@/public/RUST.png";
import steamWallet from "@/public/steamwallet.png";
import tf2Image from "@/public/TF2.png";
import SellItem from "@/public/SellItem.png";
import dota2Leage from "@/public/dota2Leage.png";
import Image from "next/image";
import Link from "next/link";
import SellBar from "./SellBar";
//tablet images imports
// import tf2ImageTablet from "@/public/tf2-tablet.png";
// import steamWalletImageTablet from "@/public/steamwallet-tablet.png";
// import steamWalletImageTablet2 from "@/public/steamwallet-tablet2.png";
// import rustImageTablet from "@/public/rust-tablet.png";
//nextjs imports

function Banner() {
  return (
    <div className="px-2 py-4 flex flex-col gap-5 items-center">
      <SellBar />
      <div className="container flex flex-col gap-4 items-center">
        <div className="tablet:grid tablet:grid-cols-2 tablet:gap-2 flex flex-col gap-2">
          <Link href="/dota2">
            <Image src={dota2Image} alt="logo" className="object-contain" />
          </Link>
          <Link href="/csgo">
            <Image src={csgoImage} alt="logo" className="object-contain" />
          </Link>
        </div>
        <div className="tablet:grid tablet:grid-cols-3 tablet:gap-4 flex flex-col gap-2">
          <Link href="/rust">
            <Image src={rustImage} alt="logo" className="h-full" />
          </Link>
          <Link href="https://gifkart.com">
            <Image src={steamWallet} alt="logo" className="h-full" />
          </Link>
          <Link href="/tf2">
            <Image src={tf2Image} alt="logo" className="h-full" />
          </Link>
        </div>
        <div className="tablet:grid tablet:grid-cols-2 tablet:gap-4 flex flex-col gap-2">
          <Link href="/insertitem">
            <Image src={SellItem} alt="logo" className="object-contain" />
          </Link>
          <Link href="/league">
            <Image src={dota2Leage} alt="logo" className="object-contain" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
