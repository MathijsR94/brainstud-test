import { Question } from "../../components/QuestionContainer";

const BASE_URL = "https://jservice.io/api/random";

type ResponseQuestion = {
  id: number;
  answer: string;
  question: string;
  value: number;
  airdate: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  game_id: number;
  invalid_count: null;
  category: {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    clues_count: number;
  };
};

/**
 * Fetch questions from the API
 */
export async function fetchQuestions(
  amountOfQuestions: number
): Promise<Array<Question>> {
  const url = new URL(BASE_URL);
  url.searchParams.set("count", amountOfQuestions.toString());

  const response = await fetch(url.toString());
  const questions: Array<ResponseQuestion> = await response.json();

  return questions.map((question) => ({
    id: question.id,
    question: question.question,
    answer: question.answer,
  }));
}
