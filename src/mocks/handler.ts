import letterToMeHandler from "./myPage/letterToMe";
import uncompletedLetterHandler from "./myPage/uncompletedLetter";

const handler = [...uncompletedLetterHandler, ...letterToMeHandler];

export default handler;
