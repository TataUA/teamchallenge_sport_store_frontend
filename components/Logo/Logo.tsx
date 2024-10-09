import Image from "next/image";
import Link from "next/link";
import logoIcon from "../../public/icons/header/Logo.svg";

interface LogoProps {
  newStyle?: string;
  className?: string;
  onClick?: () => void;
}

export const Logo = ({ newStyle, className }: LogoProps) => {
  return (
    <Link className={className} href="/">
      <Image
        src={logoIcon}
        alt="Logo"
        className={`w-[140px] h-[14px] lg:w-[200px] lg:h-[20px] ${newStyle}`}
      />
    </Link>
  );
};
