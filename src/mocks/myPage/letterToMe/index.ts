import { makePaginatedLettersWithDifferentCategory } from "@/mocks/letter";
import { GetLettersMyLettersResponse } from "@/types/letters";
import { http, HttpResponse } from "msw";

const letterToMeHandler = [
  http.get<{ page: string; limit: string }>("/letters/my/self", (req) => {
    const url = new URL(req.request.url);
    const page = url.searchParams.get("page");
    const limit = url.searchParams.get("limit");
    return HttpResponse.json<GetLettersMyLettersResponse>(
      makePaginatedLettersWithDifferentCategory(
        parseInt(page || "1", 10),
        parseInt(limit || "1", 10),
      ),
    );
  }),
];

export default letterToMeHandler;
