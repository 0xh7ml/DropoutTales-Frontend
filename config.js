import { create } from "domain"

export const API_ROOT = process.env.NEXT_PUBLIC_API_ROOT || 'http://localhost:3000/api/v1/'
export const API_ENDPOINTS = {
  createPost: `${API_ROOT}posts`,
  createComment: `${API_ROOT}posts`,
}

