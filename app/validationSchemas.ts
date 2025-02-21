import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z.string().min(1).max(65535).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});

export const registerSchema = z.object({
  name: z.string().min(5, "Must contain at least 5 character(s)"),
  email: z.string().email("Invalid email").nonempty("Field is required"),
  password: z.string().min(5, "Must contain at least 5 character(s)"),
});

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(5, "Min 5 characters"),
});
