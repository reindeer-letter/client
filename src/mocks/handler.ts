import homeHandler from "./home";
import letterToMeHandler from "./myPage/letterToMe";
import uncompletedLetterHandler from "./myPage/uncompletedLetter";

const handler = [
  ...uncompletedLetterHandler,
  ...letterToMeHandler,
  ...homeHandler,
];

export default handler;
