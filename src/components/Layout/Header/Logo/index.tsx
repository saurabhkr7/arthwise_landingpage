import Image from "next/image";
import Link from "next/link";

const Logo: React.FC<{ light?: boolean }> = ({ light = false }) => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/logo.png"
        alt="logo"
        width={160}
        height={50}
        quality={100}
        className={light ? "hidden" : "dark:hidden"}
      />

      <Image
        src="/images/logo/logo1.png"
        alt="logo"
        width={140}
        height={30}
        quality={100}
        className={light ? "block" : "hidden dark:block"}
      />
    </Link>
  );
};

export default Logo;
