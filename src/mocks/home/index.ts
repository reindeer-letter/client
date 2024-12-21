import { http, HttpResponse } from "msw";
import { GetLettersMyLettersResponse } from "@/types/letters";
import { makePaginatedLetters } from "../letter";

const homeHandler = [
  http.get<{ page: string; limit: string }>("/letters/my", (req) => {
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
  }),
];

export default homeHandler;
