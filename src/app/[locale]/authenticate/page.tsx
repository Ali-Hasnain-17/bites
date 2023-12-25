import LoginForm from "@/components/LoginForm";
import { getTranslations } from "@/lib/intl";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function AuthenticatePage({ params }: { params: { locale: string } }) {
  const session = await getServerSession();

  const { locale } = params;

  const t = await getTranslations(locale);

  if (session) {
    return redirect(`/${locale}`);
  }

  return (
    <div className="flex justify-center m-5">
      <div className="p-3 shadow-sm bg-white w-2/5">
        <LoginForm locale={locale} t={t?.["auth"]} />
      </div>
    </div>
  );
}

export default AuthenticatePage;
