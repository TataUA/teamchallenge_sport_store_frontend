import Image from "next/image";
import Link from "next/link";
import logoIcon from "../../public/icons/header/LogoXL.svg";

interface LogoProps {
  newStyle?: string;
  onClick?: () => void;
}

export const LogoXl = ({ newStyle }: LogoProps) => {
  return (
    <Link href="/" className="xl:pr-12">
      <Image
        src={logoIcon}
        width={200}
        height={20}
        alt="Logo"
        className={`${newStyle}`}
      />
    </Link>
  );
};
