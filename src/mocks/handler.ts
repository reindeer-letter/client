import homeHandler from "./home";
import letterToMeHandler from "./myPage/letterToMe";
import uncompletedLetterHandler from "./myPage/uncompletedLetter";
import writingLetterHandler from "./writingLetter";

const handler = [
  ...uncompletedLetterHandler,
  ...letterToMeHandler,
  ...homeHandler,
  ...writingLetterHandler,
];

export default handler;
