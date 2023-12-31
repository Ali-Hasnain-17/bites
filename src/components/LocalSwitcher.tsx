"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n } from "../../i18n-config";
import { useState } from "react";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const [showLocaleList, setShowLocaleList] = useState<boolean>(false);

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <>
      {showLocaleList && (
        <ul className="flex flex-col border-2 border-gray-400 rounded-md py-2 relative top-14 w-16 gap-2">
          {i18n.locales.map((locale) => {
            return (
              <li
                key={locale}
                className="text-center hover:bg-blue-500 hover:text-white"
              >
                <Link href={redirectedPathName(locale)} className="">
                  {locale}
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => setShowLocaleList(!showLocaleList)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            d="M10.5 0.5C8.52219 0.5 6.58879 1.08649 4.9443 2.1853C3.29981 3.28412 2.01809 4.84591 1.26121 6.67317C0.504333 8.50043 0.306299 10.5111 0.692152 12.4509C1.078 14.3907 2.03041 16.1725 3.42894 17.5711C4.82746 18.9696 6.60929 19.922 8.5491 20.3079C10.4889 20.6937 12.4996 20.4957 14.3268 19.7388C16.1541 18.9819 17.7159 17.7002 18.8147 16.0557C19.9135 14.4112 20.5 12.4778 20.5 10.5C20.4971 7.84872 19.4426 5.30684 17.5679 3.4321C15.6932 1.55736 13.1513 0.502868 10.5 0.5ZM13.185 6.33333H7.815C8.52231 4.93689 9.42654 3.6493 10.5 2.51C11.5739 3.64898 12.4781 4.93663 13.185 6.33333ZM13.8517 8C14.1078 8.8089 14.2415 9.65155 14.2483 10.5C14.2415 11.3485 14.1078 12.1911 13.8517 13H7.14667C6.89055 12.1911 6.75685 11.3485 6.75 10.5C6.75685 9.65155 6.89055 8.8089 7.14667 8H13.8517ZM8.33334 2.46333C7.37305 3.63815 6.58049 4.94058 5.97834 6.33333H3.29417C4.39905 4.43036 6.20972 3.0398 8.33334 2.46333ZM2.16667 10.5C2.16659 9.65196 2.29615 8.80889 2.55084 8H5.41667C5.20064 8.81595 5.08864 9.65595 5.08334 10.5C5.08864 11.3441 5.20064 12.184 5.41667 13H2.55084C2.29615 12.1911 2.16659 11.348 2.16667 10.5ZM3.29417 14.6667H5.97834C6.58049 16.0594 7.37305 17.3618 8.33334 18.5367C6.20972 17.9602 4.39905 16.5696 3.29417 14.6667ZM7.815 14.6667H13.185C12.4777 16.0631 11.5735 17.3507 10.5 18.49C9.42615 17.351 8.52187 16.0634 7.815 14.6667ZM12.6708 18.5367C13.6297 17.3616 14.4208 16.0592 15.0217 14.6667H17.7058C16.6019 16.5688 14.7929 17.9592 12.6708 18.5367ZM18.8333 10.5C18.8334 11.348 18.7039 12.1911 18.4492 13H15.5833C15.7994 12.184 15.9114 11.3441 15.9167 10.5C15.9114 9.65595 15.7994 8.81595 15.5833 8H18.4475C18.7028 8.8088 18.8329 9.65188 18.8333 10.5ZM15.0217 6.33333C14.4208 4.94082 13.6297 3.6384 12.6708 2.46333C14.7929 3.04077 16.6019 4.43123 17.7058 6.33333H15.0217Z"
            fill="#6061F0"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
        >
          <path
            d="M4.94182 5.83931C5.13165 5.83726 5.29521 5.76638 5.4399 5.61614L9.69949 1.26821C9.82152 1.1416 9.88281 0.990658 9.88281 0.808339C9.88281 0.449282 9.60079 0.160675 9.23816 0.160675C9.06143 0.160675 8.89786 0.232575 8.77081 0.357061L4.94287 4.28238L1.11286 0.357061C0.986814 0.23358 0.826852 0.160675 0.6445 0.160675C0.282891 0.160675 -0.000116348 0.449282 -0.000116348 0.808339C-0.000116348 0.988648 0.0611448 1.1416 0.187762 1.26821L4.44379 5.61614C4.59308 5.76738 4.75304 5.83931 4.94182 5.83931Z"
            fill="#6061F0"
          />
        </svg>
      </div>
    </>
  );
}
