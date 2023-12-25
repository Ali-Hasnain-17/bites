"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Locale } from "../../i18n-config";

type Country = {
  name: string;
  callingCode: string;
  countryCode: string;
};

function RegisterForm({ t, locale }: { t: any; locale: Locale }) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    name: "Saudi Arabia",
    callingCode: "+966",
    countryCode: "SA",
  });
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const phoneNumberRef = useRef<HTMLInputElement>(null);
  const callingCodeRef = useRef<HTMLSpanElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (event: any) => {
    const val = event.target.value;
    const selectedCountry = countries.find(
      (country: any) => country.countryCode === val
    );
    setSelectedCountry(selectedCountry!);
  };

  const registerUser = async (e: FormEvent) => {
    e.preventDefault();
    const user = {
      name: nameRef?.current?.value,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      phoneNumber: `${callingCodeRef?.current?.innerText} ${phoneNumberRef?.current?.value}`,
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
    });

    if (res.status === 201) {
      router.push(`/${locale}/authenticate`);
    }
  };

  useEffect(() => {
    setLoading(true);
    const res = fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((countries) => {
        const simplifiedCountries = countries
          .map((country: any) => {
            return {
              name: country.name.common,
              countryCode: country.cca2,
              callingCode: `${country.idd.root}${country.idd.suffixes?.[0]}`,
            };
          })
          .filter(
            (country: any) => country.callingCode !== "undefinedundefined"
          );
        setCountries(simplifiedCountries);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading Please Wait</div>;
  }

  if (!isClient) return;

  return (
    <div className="flex justify-between items-center flex-col">
      <div className="font-bold text-lg">{t?.["register.text"]}</div>
      <form className="m-10 w-full space-y-5" onSubmit={registerUser}>
        <div className="form_field">
          <label htmlFor="name" className="text-sm">
            {t?.["name.label"]}
          </label>
          <input id="name" className="w-full form_input" ref={nameRef} />
        </div>
        <div className="form_field">
          <label htmlFor="phoneNumber" className="text-sm">
            {t?.["phone-number.label"]}
          </label>
          <div className="flex items-center form_input relative">
            <div className="text-xs absolute left-4 top-1/2 -translate-y-1/2 flex gap-1 items-center">
              <span>{selectedCountry.countryCode}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  d="M4.94182 5.83931C5.13165 5.83726 5.29521 5.76638 5.4399 5.61614L9.69949 1.26821C9.82152 1.1416 9.88281 0.990658 9.88281 0.808339C9.88281 0.449282 9.60079 0.160675 9.23816 0.160675C9.06143 0.160675 8.89786 0.232575 8.77081 0.357061L4.94287 4.28238L1.11286 0.357061C0.986814 0.23358 0.826852 0.160675 0.6445 0.160675C0.282891 0.160675 -0.000116348 0.449282 -0.000116348 0.808339C-0.000116348 0.988648 0.0611448 1.1416 0.187762 1.26821L4.44379 5.61614C4.59308 5.76738 4.75304 5.83931 4.94182 5.83931Z"
                  fill="gray"
                />
              </svg>
            </div>
            <select
              name="calling-code"
              id="calling-code"
              className="text-xs outline-none opacity-0 z-10 w-10"
              onChange={handleChange}
            >
              {countries?.length > 0 &&
                countries?.map((country) => {
                  return (
                    <option
                      value={country.countryCode}
                      key={country.countryCode}
                      selected={
                        country.countryCode === selectedCountry.countryCode
                      }
                    >
                      {country.name}
                    </option>
                  );
                })}
            </select>
            <span className="text-sm" ref={callingCodeRef}>
              {selectedCountry.callingCode}{" "}
            </span>
            <input
              id="password"
              type="text"
              className="w-full outline-none text-sm ml-1"
              ref={phoneNumberRef}
            />
          </div>
        </div>
        <div className="form_field">
          <label htmlFor="email" className="text-sm">
            {t?.["email.label"]}
          </label>
          <input id="email" className="w-full form_input" ref={emailRef} />
        </div>
        <div className="form_field">
          <label htmlFor="password" className="text-sm">
            {t?.["password.label"]}
          </label>
          <div className="flex items-center form_input">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="w-full outline-none"
              ref={passwordRef}
            />
            {!showPassword && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="12"
                viewBox="0 0 17 12"
                fill="none"
                onClick={toggleShowPassword}
              >
                <path
                  d="M8.39404 9.15151C9.29537 9.15151 10.0603 8.84467 10.6887 8.23098C11.3171 7.61729 11.6313 6.87033 11.6313 5.9901C11.6313 5.10986 11.3171 4.3629 10.6887 3.74922C10.0603 3.13553 9.29537 2.82868 8.39404 2.82868C7.49268 2.82868 6.72779 3.13553 6.09937 3.74922C5.47095 4.3629 5.15674 5.10986 5.15674 5.9901C5.15674 6.87033 5.47095 7.61729 6.09937 8.23098C6.72779 8.84467 7.49268 9.15151 8.39404 9.15151ZM8.39404 8.07291C7.79736 8.07291 7.29272 7.87145 6.88012 7.46852C6.46753 7.0656 6.26123 6.57279 6.26123 5.9901C6.26123 5.4074 6.46753 4.9146 6.88012 4.51167C7.29272 4.10875 7.79736 3.90728 8.39404 3.90728C8.99075 3.90728 9.49535 4.10875 9.90796 4.51167C10.3206 4.9146 10.5269 5.4074 10.5269 5.9901C10.5269 6.57279 10.3206 7.0656 9.90796 7.46852C9.49535 7.87145 8.99075 8.07291 8.39404 8.07291ZM8.39404 11.569C6.54053 11.569 4.86475 11.0546 3.3667 10.0255C1.86865 8.99653 0.751467 7.65138 0.0151367 5.9901C0.751467 4.3288 1.86865 2.98365 3.3667 1.95465C4.86475 0.925637 6.54053 0.411133 8.39404 0.411133C10.2476 0.411133 11.9234 0.925637 13.4214 1.95465C14.9194 2.98365 16.0367 4.3288 16.773 5.9901C16.0367 7.65138 14.9194 8.99653 13.4214 10.0255C11.9234 11.0546 10.2476 11.569 8.39404 11.569ZM8.39404 10.4532C9.93021 10.4532 11.3425 10.0472 12.6311 9.23519C13.9197 8.42315 14.9004 7.34145 15.5732 5.9901C14.9004 4.63875 13.9197 3.55705 12.6311 2.745C11.3425 1.93295 9.93021 1.52692 8.39404 1.52692C6.85791 1.52692 5.44555 1.93295 4.15698 2.745C2.86841 3.55705 1.88134 4.63875 1.1958 5.9901C1.88134 7.34145 2.86841 8.42315 4.15698 9.23519C5.44555 10.0472 6.85791 10.4532 8.39404 10.4532Z"
                  fill="#5E5EF0"
                />
              </svg>
            )}
            {showPassword && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                onClick={toggleShowPassword}
              >
                <path
                  d="M10.5418 7.79526L9.75426 7.02622C10.0645 6.19892 9.90341 5.51144 9.27102 4.9638C8.63864 4.41615 7.95256 4.27632 7.21278 4.54432L6.42528 3.77528C6.62813 3.64711 6.85483 3.55389 7.1054 3.49563C7.35597 3.43737 7.6125 3.40824 7.875 3.40824C8.72216 3.40824 9.44105 3.69663 10.0317 4.27341C10.6223 4.85019 10.9176 5.55223 10.9176 6.37953C10.9176 6.63587 10.8848 6.88931 10.8192 7.13983C10.7536 7.39035 10.6611 7.60882 10.5418 7.79526V7.79526ZM12.8506 10.0499L12.1347 9.35081C12.7193 8.93134 13.2294 8.46234 13.6649 7.94382C14.1004 7.4253 14.4196 6.90387 14.6224 6.37953C14.0259 5.08614 13.131 4.06367 11.9378 3.31211C10.7446 2.56055 9.45 2.18477 8.05398 2.18477C7.55284 2.18477 7.03977 2.23138 6.51477 2.32459C5.98977 2.41781 5.57812 2.52851 5.27983 2.65668L4.45653 1.83521C4.87415 1.64877 5.4081 1.48564 6.05838 1.34582C6.70866 1.20599 7.34403 1.13608 7.96449 1.13608C9.67074 1.13608 11.2308 1.6109 12.6447 2.56055C14.0587 3.5102 15.0937 4.78319 15.75 6.37953C15.4398 7.12526 15.0401 7.80691 14.5509 8.42447C14.0616 9.04203 13.4949 9.58385 12.8506 10.0499ZM13.8886 14L10.8818 11.1161C10.4642 11.2792 9.9929 11.4045 9.4679 11.4919C8.9429 11.5793 8.41193 11.623 7.875 11.623C6.13295 11.623 4.55199 11.1481 3.1321 10.1985C1.71222 9.24886 0.668182 7.97586 0 6.37953C0.238636 5.77362 0.569744 5.18227 0.993324 4.60549C1.4169 4.02871 1.93295 3.47815 2.54148 2.95381L0.286364 0.751561L1.03807 0L14.5866 13.231L13.8886 14ZM3.27528 3.68789C2.83381 4.0025 2.40724 4.41615 1.9956 4.92884C1.58395 5.44153 1.28864 5.92509 1.10966 6.37953C1.71818 7.67291 2.63395 8.69538 3.85696 9.44694C5.07997 10.1985 6.46705 10.5743 8.01818 10.5743C8.41193 10.5743 8.79972 10.551 9.18153 10.5044C9.56335 10.4578 9.84972 10.3878 10.0406 10.2946L8.89517 9.17603C8.76392 9.23429 8.60284 9.27799 8.41193 9.30712C8.22102 9.33625 8.04205 9.35081 7.875 9.35081C7.03977 9.35081 6.32386 9.06534 5.72727 8.49438C5.13068 7.92343 4.83239 7.21848 4.83239 6.37953C4.83239 6.20474 4.8473 6.02996 4.87713 5.85518C4.90696 5.6804 4.9517 5.5231 5.01136 5.38327L3.27528 3.68789Z"
                  fill="#6061F0"
                />
              </svg>
            )}
          </div>
        </div>
        <button className="filled_btn w-full" type="submit">
          {t?.["register.text"]}
        </button>
        <div className="text-center text-sm mt-3">
          {t?.["already-account.text"]}
          <Link
            className="text-sm text-blue-500 ml-1 mr-1"
            href={`/${locale}/authenticate`}
          >
            {t?.["signin.text"]}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
