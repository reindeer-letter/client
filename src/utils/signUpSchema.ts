import { z } from "zod";

/* 회원가입 폼 유효성 스키마 */

export const signUpSchema = z.object({
  userId: z.string().min(5, "아이디는 최소 5자 이상이어야 합니다."),
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .regex(/[A-Za-z]/, "영문자를 포함해야 합니다.")
    .regex(/[0-9]/, "숫자를 포함해야 합니다."),
  nickname: z.string().min(1, "별명은 최소 1자 이상이어야 합니다."),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
