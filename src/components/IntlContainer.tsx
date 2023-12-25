import { IntlProvider } from "react-intl";

async function getMessages(locale: string) {
  return await import(`../lang/${locale}.json`);
}

type IntlContainerProps = {
  locale: string;
  children: React.ReactNode;
};

async function IntlContainer({ locale, children }: IntlContainerProps) {
  const messages = await getMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}

export default IntlContainer;
