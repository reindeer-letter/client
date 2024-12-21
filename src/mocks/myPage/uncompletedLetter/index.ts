import { makePaginatedLetters } from "@/mocks/letter";
import { GetLettersMyLettersResponse } from "@/types/letters";
import { http, HttpResponse } from "msw";

const uncompletedLetterHandler = [
  http.get<{ page: string; limit: string }>(
    "/letters/drafts/paginated",
    (req) => {
      const url = new URL(req.request.url);
      const page = url.searchParams.get("page");
      const limit = url.searchParams.get("limit");
      const category = url.searchParams.get("category");
      return HttpResponse.json<GetLettersMyLettersResponse>(
        makePaginatedLetters(
          parseInt(page || "1", 10),
          parseInt(limit || "1", 10),
          category as "TEXT" | "VOICE",
        ),
      );
    },
  ),
  http.delete("/letters/draft", () => {
    return HttpResponse.json({ status: 200 });
  }),
];

export default uncompletedLetterHandler;
