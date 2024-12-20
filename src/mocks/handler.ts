import { GetLettersMyLettersResponse } from "@/types/letters";
import { http, HttpResponse } from "msw";
import { makePaginatedLetters } from "./letter";

const handler = [
  http.get<{ page: string; limit: string }>(
    "/letters/drafts/paginated",
    (req) => {
      const url = new URL(req.request.url);
      const page = url.searchParams.get("page");
      const limit = url.searchParams.get("limit");
      return HttpResponse.json<GetLettersMyLettersResponse>(
        makePaginatedLetters(
          parseInt(page || "1", 10),
          parseInt(limit || "1", 10),
        ),
      );
    },
  ),
];

export default handler;
