import LibraryDetails from "@/components/LibraryDetails";
import { Locale } from "../../../../../i18n-config";
import { getTranslations } from "@/lib/intl";

async function LibraryDetailsPage({
  params,
}: {
  params: { locale: Locale; id: string };
}) {
  const { locale, id } = params;

  const t = await getTranslations(locale);

  return <LibraryDetails locale={locale} t={t?.["library"]} libraryId={id} />;
}

export default LibraryDetailsPage;
