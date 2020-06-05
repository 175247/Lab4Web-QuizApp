export default async function SubmitNewQuestion(inputData) {
  const QuestionString = inputData.question;
  const answer1 = { Answerstring: inputData.answer1, IsCorrectAnswer: false };
  const answer2 = { AnswerString: inputData.answer2, IsCorrectAnswer: false };
  const answer3 = { AnswerString: inputData.answer3, IsCorrectAnswer: false };
  switch (inputData.correctAnswer) {
    case "answer1":
      answer1.IsCorrectAnswer = true;
      break;

    case "answer2":
      answer2.IsCorrectAnswer = true;
      break;

    case "answer3":
      answer3.IsCorrectAnswer = true;
      break;

    default:
      console.log("no correct answer");
      return
  }
  const request = {
    QuestionString: QuestionString,
    AnswerOptions: [answer1, answer2, answer3],
  };
  return await fetch("questions", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
