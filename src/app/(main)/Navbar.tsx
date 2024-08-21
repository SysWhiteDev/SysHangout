import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";
import navbarIcon from "@/assets/navbar-icon.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-b-accent bg-card dark:border-b">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-5 py-1.5">
        <Link href={"/"} className="text-2xl font-bold text-primary">
          <Image src={navbarIcon} alt="Icon" width={135} height={65} />
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </div>
    </nav>
  );
}
