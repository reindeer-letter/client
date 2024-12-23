import { http, HttpResponse } from "msw";
import { GetLettersMyLettersResponse } from "@/types/letters";
import { makePaginatedLetters } from "../letter";

const writingLetterHandler = [
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
  http.post("/letters", async ({ request }) => {
    const newBody = await request.json();
    console.log("전송된 데이터:", newBody);
    return HttpResponse.json(null, { status: 201 });
  }),
  http.post("/letters/draft/:id/send", async ({ request, params }) => {
    const newBody = await request.json();
    const { id } = params;
    console.log("전송된 데이터:", newBody, "params:", id);
    return HttpResponse.json(null, { status: 201 });
  }),
  http.post("/letters/draft", async ({ request }) => {
    const newBody = await request.json();
    console.log("임시저장된 데이터:", newBody);
    return HttpResponse.json({ id: 1 }, { status: 201 });
  }),
  http.put("/letters/draft/:id", async ({ request, params }) => {
    const newBody = await request.json();
    const { id } = params;
    console.log("임시저장된 데이터:", newBody, "params:", id);
    return HttpResponse.json(null, { status: 200 });
  }),
];

export default writingLetterHandler;
