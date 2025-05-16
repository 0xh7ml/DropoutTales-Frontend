"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    : any
  }
}

interface EditorProps {
  value: string
  onChange: (content: string) => void
  placeholder?: string
  height?: number
  id?: string
  className?: string
  error?: boolean
}

export default function Editor({
  value,
  onChange,
  placeholder = "Share your detailed experience working at this company...",
  height = 400,
  id = "-editor",
  className = "",
  error = false,
}: EditorProps) {
  const editorRef = useRef<any>(null)
  const hasInitialized = useRef(false)

  useEffect(() => {
    // Load  script
    const script = document.createElement("script")
    script.src = "https://cdn.tiny.cloud/1/no-api-key//6/.min.js"
    script.referrerPolicy = "origin"
    document.head.appendChild(script)

    script.onload = () => {
      if (!hasInitialized.current) {
        window..init({
          selector: `#${id}`,
          height,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
              font-size: 16px; 
              line-height: 1.6;
              padding: 20px;
            }
          `,
          placeholder,
          setup: (editor) => {
            editorRef.current = editor
            editor.on("change", () => {
              onChange(editor.getContent())
            })
            editor.on("init", () => {
              hasInitialized.current = true
              if (value) {
                editor.setContent(value)
              }
            })
          },
        })
      }
    }

    return () => {
      if (window. && hasInitialized.current) {
        window..remove(`#${id}`)
        hasInitialized.current = false
      }
      document.head.removeChild(script)
    }
  }, [])

  // Update editor content when value prop changes
  useEffect(() => {
    if (editorRef.current && hasInitialized.current) {
      const currentContent = editorRef.current.getContent()
      if (currentContent !== value) {
        editorRef.current.setContent(value)
      }
    }
  }, [value])

  return (
    <div className={`${error ? "border border-red-300 rounded-lg" : ""} ${className}`}>
      <textarea id={id} defaultValue={value} style={{ visibility: "hidden" }} />
    </div>
  )
}
