"use client";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Locale } from "../../i18n-config";

function Sidebar({ t, locale }: { t: any; locale: Locale }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  return (
    <div className="h-screen px-3 py-8 flex flex-col items-center">
      <Logo mini />
      <div className="h-full mt-10 flex flex-col gap-10">
        <Link
          href={`/${locale}/library`}
          className="flex flex-col items-center gap-3"
        >
          <Image
            src="https://bites.shaguf.com/_next/static/media/library.331991f0.svg"
            alt="library"
            width={30}
            height={30}
          />
          <span className="text-sm">{t?.["library"]?.["library.text"]}</span>
        </Link>
        <button
          onClick={async () => {
            await signOut({
              callbackUrl: `/${locale}/authenticate`,
              redirect: true,
            });
          }}
          className="flex flex-col items-center gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M11.3985 2.59671H14.3324C14.7215 2.59671 15.0946 2.75127 15.3697 3.02638C15.6449 3.30149 15.7994 3.67462 15.7994 4.06369V14.3326C15.7994 14.7216 15.6449 15.0947 15.3697 15.3699C15.0946 15.645 14.7215 15.7995 14.3324 15.7995H11.3985"
              stroke="#F86363"
              stroke-width="1.46698"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.73102 12.8656L11.3985 9.19812L7.73102 5.53067"
              stroke="#F86363"
              stroke-width="1.46698"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M11.3985 9.19812H2.59659"
              stroke="#F86363"
              stroke-width="1.46698"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className="text-sm text-red-500">
            {t?.["auth"]?.["logout.text"]}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
