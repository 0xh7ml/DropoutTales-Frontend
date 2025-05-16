import { create } from "domain"

export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT || 'https://dtt.itsaikat.com/api/v1/'
export const API_ENDPOINTS = {
  createPost: `${API_ROOT}posts`,
  createComment: `${API_ROOT}posts`,
}

