"use client";

import Link from "next/link";
import Logo from "./Logo";
import { Locale } from "../../i18n-config";
import LocaleSwitcher from "./LocalSwitcher";
import { useEffect, useState } from "react";

function Navbar({ t, locale }: { t: any; locale: Locale }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  return (
    <nav className="w-full p-5 flex justify-between" suppressHydrationWarning>
      <Link href="/">
        <Logo mini={false} />
      </Link>
      <div className="flex gap-2 items-center">
        <LocaleSwitcher />
        <Link
          href={`/${locale}/authenticate`}
          className="outlined_btn text-xs flex items-center"
        >
          {t?.["start-text"]}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
