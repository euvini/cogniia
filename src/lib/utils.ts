import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ValidationResult } from "./types";
import bcrypt from 'bcryptjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateEmail(email: string) {
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(email);
};

export const validatePassword = (password: string, passwordConfirmation: string): ValidationResult => {
  if (password.length < 8) {
    return {
      isValid: false,
      message: "A senha deve ter no mínimo 8 caracteres.",
      id: 1
    };
  }

  if (password !== passwordConfirmation && passwordConfirmation.length > 0) {
    return {
      isValid: false,
      message: "As senhas não combinam! Por favor confira os campos e tente novamente.",
      id: 2
    };
  }

  return {
    isValid: true,
    message: "Senha válida.",
    id: 3
  };
};

export const encryptPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const verifyHashPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};