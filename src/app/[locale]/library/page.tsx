import Libraries from "@/components/Libraries";
import { Locale } from "../../../../i18n-config";
import { getTranslations } from "@/lib/intl";

export type LibraryType = {
  id: string;
  title: string;
  flashCards: number;
  isPublic: boolean;
};

async function LibraryPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = await getTranslations(locale);
  return <Libraries t={t?.["library"]} locale={locale} />;
}

export default LibraryPage;
