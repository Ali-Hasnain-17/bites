import { Locale } from "../../i18n-config";
import QuestionFlashCard from "./QuestionFlashCard";
import Link from "next/link";

function FlashCardGrid({
  library,
  questions,
  cardNumbers,
  selectedCategory,
  selectCategory,
  t,
  locale,
}: {
  library: string;
  questions: any[];
  selectedCategory: any;
  cardNumbers: any;
  selectCategory: (category: any) => void;
  t: any;
  locale: Locale;
}) {
  console.log(questions);
  return (
    <>
      <div className="mt-5 flex gap-2">
        <div className="flex flex-col gap-3 flex-grow">
          <div>
            <h2 className="text-xl font-bold flex gap-3">
              <div
                className="px-3 py-2 text-gray-800 bg-gray-200 cursor-pointer text-sm shadow"
                onClick={() => selectCategory("Remaining")}
              >
                {t?.["remaining.text"]}
              </div>
              <div
                className="px-3 py-2 text-green-800 bg-green-200 cursor-pointer text-sm shadow"
                onClick={() => selectCategory("Mastered")}
              >
                {t?.["mastered.text"]}
              </div>
              <div
                className="px-3 py-2 text-red-800 bg-red-200 cursor-pointer text-sm shadow"
                onClick={() => selectCategory("Still Learning")}
              >
                {t?.["still-learning.text"]}
              </div>
            </h2>
          </div>
          <div className="h-full w-full overflow-hidden py-10">
            {questions.length === 0 ? (
              <div className="h-full w-full flex justify-center items-center text-xl font-bold tracking-widest -mt-10">
                {t?.["no-cards.text"]}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-col-4 gap-2 gap-y-3">
                {questions.map((question) => (
                  <QuestionFlashCard question={question} />
                ))}
              </div>
            )}
          </div>{" "}
        </div>
        <div className="bg-white p-10 w-1/4 h-max flex flex-col items-center gap-5">
          <div className="flex flex-col gap-2 items-center">
            <div className="text-5xl font-bold">{cardNumbers.totalCards}</div>
            <div className="text-xl text-gray-500">{t?.["cards.text"]}</div>
          </div>

          <div className="flex gap-5 w-full justify-center">
            <div className="flex gap-1 items-center">
              <span>{cardNumbers.masteredCards}</span>
              <span className="w-3 h-3 bg-green-500"></span>
            </div>
            <div className="flex gap-1 items-center">
              <span>{cardNumbers.stillLearningCards}</span>
              <span className="w-3 h-3 bg-red-500"></span>
            </div>
            <div className="flex gap-1 items-center">
              <span>{cardNumbers.remainingCards}</span>
              <span className="w-3 h-3 bg-gray-500"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 fixed left-1/2 -translate-x-1/2 bottom-6 p-5 bg-white rounded-2xl shadow-lg border-2 border-gray-200 flex justify-between items-center gap-3">
        <Link
          href={`/${locale}/library/flashCards/${library}/learn`}
          className="filled_btn flex-grow"
        >
          {t?.["start-learning.text"]}
        </Link>
      </div>
    </>
  );
}

export default FlashCardGrid;
