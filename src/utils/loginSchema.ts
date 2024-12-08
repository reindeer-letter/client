import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("이메일을 입력해주세요")
    .email("유효한 이메일 주소를 입력하세요"),
  password: z.string().nonempty("비밀번호를 입력해주세요"),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;
