import { z } from "zod";

export const verifyEmailSchema = z.object({
  email: z.string().email("올바른 이메일을 입력하세요."),
  code: z.string().min(6, "인증번호는 6자리입니다."),
});

export const signUpSchema = z.object({
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
    .regex(/[A-Za-z]/, "영문자를 포함해야 합니다.")
    .regex(/[0-9]/, "숫자를 포함해야 합니다."),
  nickname: z.string().min(1, "별명은 최소 1자 이상이어야 합니다."),
});
export type SignUpFormData = z.infer<typeof signUpSchema>;

export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
