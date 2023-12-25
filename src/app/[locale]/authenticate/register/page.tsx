import RegisterForm from "@/components/RegisterForm";
import { Locale } from "../../../../../i18n-config";
import { getTranslations } from "@/lib/intl";

async function RegisterPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  const t = await getTranslations(locale);

  return (
    <div className="flex justify-center m-5">
      <div className="p-3 shadow-sm bg-white w-2/5">
        <RegisterForm t={t["auth"]} locale={locale} />
      </div>
    </div>
  );
}

export default RegisterPage;
