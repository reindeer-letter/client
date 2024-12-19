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
});
export const profileSchema = z.object({
  nickname: z.string().min(1, "별명을 입력해주세요."),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export type SignUpFormData = z.infer<typeof signUpSchema>;

export type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;
