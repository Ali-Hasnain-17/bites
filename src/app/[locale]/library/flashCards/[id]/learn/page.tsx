import Learn from "@/components/Learn";
import { getTranslations } from "@/lib/intl";

export type QuestionType = {
  id: string;
  question: string;
  answer: string;
  status: string;
  library: string;
};

async function LearnPage({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const { locale, id } = params;
  const t = await getTranslations(locale);
  return <Learn id={id} t={t?.["library"]} locale={locale} />;
}

export default LearnPage;
