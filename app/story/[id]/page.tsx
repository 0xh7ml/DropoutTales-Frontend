"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Flag,
  Send,
  Building2,
  Calendar,
  User,
  Star,
  Facebook,
  Twitter,
  Copy,
  Linkedin,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react"
import Footer from "@/components/footer"
import { sanitize } from "@/utils/sanitizeHtml"
import Headercom from "@/components/Headercom"
import { API_ENDPOINTS } from "@/config"
import { useParams } from "next/navigation"
import { useAppContext } from "@/context/AppContext"
import { API_ROOT } from "@/config"

interface ReviewDetailParams {
  id: string
}

const getdata = async (id: string) => {
  const res = await fetch(`${API_ROOT}posts/${id}`)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

// Utility function: call upvote API
const forupvote = async (id: string) => {
  const url = `${API_ROOT}posts/${id}/upvote`
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  })
  if (!res.ok) throw new Error("Failed to update upvotes")
  return res.json()
}

// Utility function: call downvote API
const fordownvote = async (id: string) => {
  const url = `${API_ROOT}posts/${id}/downvote`
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  })
  if (!res.ok) throw new Error("Failed to update downvotes")
  return res.json()
}

function VoteButtons({ initialUpvotes = 0, initialDownvotes = 0, ids = "123asd" }) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [downvotes, setDownvotes] = useState(initialDownvotes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [animateUp, setAnimateUp] = useState(false)
  const [animateDown, setAnimateDown] = useState(false)

  const handleUpvote = async () => {
    try {
      if (userVote === "down") {
        // Switch from downvote to upvote
        setDownvotes((prev) => prev - 1)
        await fordownvote(ids)
        setUpvotes((prev) => prev + 1)
        setUserVote("up")
      } else if (userVote !== "up") {
        // First-time upvote
        setUpvotes((prev) => prev + 1)
        await forupvote(ids)
        setUserVote("up")
      } else {
        // Undo upvote
        setUpvotes((prev) => prev - 1)
        setUserVote(null)
      }
      setAnimateUp(true)
      setTimeout(() => setAnimateUp(false), 400)
    } catch (error) {
      // console.error("Upvote error:", error);
    }
  }

  const handleDownvote = async () => {
    try {
      if (userVote === "up") {
        // Switch from upvote to downvote
        setUpvotes((prev) => prev - 1)
        setDownvotes((prev) => prev + 1)
        await fordownvote(ids)
        setUserVote("down")
      } else if (userVote !== "down") {
        // First-time downvote
        setDownvotes((prev) => prev + 1)
        await fordownvote(ids)
        setUserVote("down")
      } else {
        // Undo downvote
        setDownvotes((prev) => prev - 1)
        setUserVote(null)
      }
      setAnimateDown(true)
      setTimeout(() => setAnimateDown(false), 400)
    } catch (error) {
      // console.error("Downvote error:", error);
    }
  }

  return (
    <div className="vote-wrapper flex flex-wrap items-center gap-2 sm:gap-4">
      <span className="text-sm text-gray-500">Was this review helpful?</span>
      <div className="flex gap-3">
        <button
          onClick={handleUpvote}
          className={`vote-button flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
            userVote === "up" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label="Upvote this review"
        >
          <ThumbsUp size={16} className={userVote === "up" ? "text-yellow-600" : ""} />
          <span className={`vote-count text-sm font-medium ${animateUp ? "increase" : ""}`}>{upvotes}</span>
        </button>

        <button
          onClick={handleDownvote}
          className={`vote-button flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
            userVote === "down" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label="Downvote this review"
        >
          <ThumbsDown size={16} className={userVote === "down" ? "text-red-600" : ""} />
          <span className={`vote-count text-sm font-medium ${animateDown ? "decrease" : ""}`}>{downvotes}</span>
        </button>
      </div>
    </div>
  )
}

// Social Share Component
interface Props {
  title: string
  url: string
  company: string
}

function SocialShareButtons({ title, url, company }: Props) {
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const shareMenuRef = useRef<HTMLDivElement>(null)

  const shareText = `Check out this review of ${company}: "${title}"`

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareOptions(false)
      }
    }

    if (showShareOptions) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showShareOptions])

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: shareText,
          url: url,
        })
        .then(() => console.log("Shared successfully"))
        .catch(() => setShowShareOptions(true))
    } else {
      setShowShareOptions(true)
    }
  }

  const shareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url,
    )}&quote=${encodeURIComponent(shareText)}`
    window.open(facebookUrl, "_blank", "width=600,height=400")
    setShowShareOptions(false)
  }

  const shareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText,
    )}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, "_blank", "width=600,height=400")
    setShowShareOptions(false)
  }

  const shareLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url,
    )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(shareText)}`
    window.open(linkedInUrl, "_blank", "width=600,height=500")
    setShowShareOptions(false)
  }

  const shareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`
    window.open(whatsappUrl, "_blank")
    setShowShareOptions(false)
  }

  const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopySuccess(true)
          setTimeout(() => setCopySuccess(false), 2000)
          setShowShareOptions(false)
        })
        .catch((err) => {
          console.error("Clipboard copy failed:", err)
          alert("Failed to copy link. Try manually.")
        })
    } else {
      // Fallback for unsupported browsers
      const textArea = document.createElement("textarea")
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      } catch (err) {
        console.error("Fallback copy failed", err)
        alert("Failed to copy link. Please copy manually.")
      }
      document.body.removeChild(textArea)
      setShowShareOptions(false)
    }
  }

  return (
    <div className="relative" ref={shareMenuRef}>
      <button
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
        onClick={handleShare}
        aria-label="Share this review"
      >
        <Share2 size={16} />
        <span className="text-sm font-medium">Share</span>
      </button>

      {showShareOptions && (
        <div className="fixed sm:absolute h-screen inset-0 sm:inset-auto sm:bottom-full sm:right-0 transform sm:mb-2 flex items-center justify-center sm:block bg-black/50 sm:bg-transparent z-50">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 py-3 w-[280px] max-w-[90vw] sm:relative">
            <div className="px-4 py-2 border-b border-gray-100 mb-1">
              <h3 className="font-semibold text-gray-800">Share this review</h3>
            </div>
            <button
              className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
              onClick={shareFacebook}
            >
              <Facebook size={18} className="text-[#1877F2]" />
              <span>Facebook</span>
            </button>
            <button
              className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
              onClick={shareTwitter}
            >
              <Twitter size={18} className="text-[#1DA1F2]" />
              <span>Twitter (X)</span>
            </button>
            <button
              className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
              onClick={shareLinkedIn}
            >
              <Linkedin size={18} className="text-[#0A66C2]" />
              <span>LinkedIn</span>
            </button>
            <button
              className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
              onClick={shareWhatsApp}
            >
              <MessageCircle size={18} className="text-[#25D366]" />
              <span>WhatsApp</span>
            </button>
            <div className="border-t border-gray-100 my-1"></div>
            <button
              className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
              onClick={copyToClipboard}
            >
              <Copy size={18} className="text-gray-600" />
              <span>{copySuccess ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </div>
      )}
      {copySuccess && (
        <div className="absolute top-full right-0 mt-2 bg-blue-500 text-white text-sm rounded-lg px-3 py-1 shadow-md">
          Link copied!
        </div>
      )}
    </div>
  )
}

export default function ReviewDetail({
  params,
}: {
  params: ReviewDetailParams
}) {
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [upvotes, setUpvotes] = useState(0)
  const [downvotes, setDownvotes] = useState(0)
  const [animateUp, setAnimateUp] = useState(false)
  const [animateDown, setAnimateDown] = useState(false)
  const [comment, setComment] = useState("")
  const { comments, setComments } = useAppContext()
  const [commentVotes, setCommentVotes] = useState<Record<string, { upvoted: boolean; downvoted: boolean }>>({})

  const { id } = useParams()
  const [currentUrl, setCurrentUrl] = useState("")
  const [data, setData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Set the current URL for sharing
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href)
    }
  }, [])

  const handlecommentup = async (id: string) => {
    const url = `${API_ROOT}comments/${id}/upvote`

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) throw new Error("Failed to update upvotes")

      // Update the comment in context state immutably
      setComments((prev) =>
        prev.map((comment) => (comment.id === id ? { ...comment, upvotes: comment.upvotes + 1 } : comment)),
      )

      // Update vote state for this specific comment only
      setCommentVotes((prev) => ({
        ...prev,
        [id]: { upvoted: true, downvoted: false },
      }))

      return await res.json()
    } catch (error) {
      // console.error("Error upvoting comment:", error);
    }
  }

  const handledownvote = async (id: string) => {
    const url = `${API_ROOT}comments/${id}/downvote`

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) throw new Error("Failed to update downvotes")

      // Update the comment in context state immutably
      setComments((prev) =>
        prev.map((comment) => (comment.id === id ? { ...comment, downvotes: comment.downvotes + 1 } : comment)),
      )

      // Update vote state for this specific comment only
      setCommentVotes((prev) => ({
        ...prev,
        [id]: { upvoted: false, downvoted: true },
      }))

      return await res.json()
    } catch (error) {
      // console.error("Error downvoting comment:", error);
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!comment.trim()) return

    try {
      const response = await fetch(`${API_ENDPOINTS.createComment}/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: comment }),
      })

      if (!response.ok) throw new Error("Failed to post comment")

      const newComment = await response.json()
      setComments([...comments, newComment])
      setComment("")

      // Open modal
      setShowModal(true)
    } catch (error) {
      // console.error("Error posting comment:", error);
    }
  }

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showModal])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await getdata(id)
        setData(data || [])
        setComments(data.comments || [])
      } catch (error) {
        // console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 text-sm">Loading review...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center space-y-4 max-w-md text-center px-4">
          <AlertTriangle size={48} className="text-amber-500" />
          <h2 className="text-xl font-bold text-gray-800">Review Not Found</h2>
          <p className="text-gray-600">The review you're looking for could not be found or may have been removed.</p>
          <Link href="/" className="mt-4 inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
            <ArrowLeft size={16} className="mr-2" />
            Return to all reviews
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Headercom />

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center relative animate-fade-in"
          >
            <CheckCircle size={48} className="mx-auto mb-4 text-blue-500" />
            <h2 className="text-xl font-bold mb-2">Comment Posted!</h2>
            <p className="text-gray-600 mb-6">Thanks for sharing your thoughts on this review.</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <div className="w-full max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-300 mb-6 hover:underline"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Reviews
          </Link>

          {/* Review Card */}
          <div
            className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in opacity-0 border border-gray-100"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            {/* Review Header */}
            <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{data.title}</h1>

              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full flex items-center font-bold">
                  <Building2 size={14} className="mr-1.5" />
                  {data.institute}
                </span>
                <span
                  className={`inline-flex items-center text-sm ${
                    data.tags === "Positive"
                      ? "bg-yellow-100 text-yellow-700"
                      : data.tags === "Negative"
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                  } px-3 py-1.5 rounded-full font-medium`}
                >
                  {data.tags === "Positive" && <ThumbsUp size={14} className="mr-1.5" />}
                  {data.tags === "Negative" && <ThumbsDown size={14} className="mr-1.5" />}
                  {data.tags !== "Positive" && data.tags !== "Negative" && <Star size={14} className="mr-1.5" />}
                  {data.tags === "Positive" ? "Positive" : data.tags === "Negative" ? "Negative" : "Mixed"}
                </span>
                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full flex items-center">
                  <Calendar size={14} className="mr-1.5" />
                  {new Date(data.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full flex items-center">
                  <User size={14} className="mr-1.5" />
                  Anonymous
                </span>
              </div>
            </div>

            {/* Review Content */}
            <div className="p-4 sm:p-6">
              {/* Pros and Cons */}
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-stretch">
                  {/* Left Content */}
                  <div className="md:col-span-2">
                    <div
                      className="prose max-w-full p-3 sm:p-6 border border-gray-200 rounded-xl shadow-sm h-full bg-white"
                      dangerouslySetInnerHTML={{
                        __html: sanitize(data.content),
                      }}
                    />
                  </div>

                  {/* Right Pros & Cons */}
                  <div className="flex flex-col gap-6 h-full">
                    {/* Pros */}
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-3 sm:p-5 flex-1 shadow-sm border border-yellow-200">
                      <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center">
                        <CheckCircle size={18} className="mr-2 text-yellow-600" />
                        Pros
                      </h3>
                      <ul className="space-y-3">
                        {data.pros && data.pros.length > 0 ? (
                          data.pros.map((pro, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-yellow-500 mr-2 mt-0.5">✓</span>
                              <span className="text-gray-700">{pro}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500 italic">No pros mentioned</li>
                        )}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-3 sm:p-5 flex-1 shadow-sm border border-red-200">
                      <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center">
                        <XCircle size={18} className="mr-2 text-red-600" />
                        Cons
                      </h3>
                      <ul className="space-y-3">
                        {data.cons && data.cons.length > 0 ? (
                          data.cons.map((con, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-red-500 mr-2 mt-0.5">✗</span>
                              <span className="text-gray-700">{con}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500 italic">No cons mentioned</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 sm:pt-5 border-t border-gray-100">
                <VoteButtons initialUpvotes={data.upvotes} initialDownvotes={data.downvotes} ids={data.id} />

                <div className="flex items-center gap-3">
                  <SocialShareButtons title={data.title} url={currentUrl} company={data.company} />
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200">
                    <Flag size={16} />
                    <span className="text-sm font-medium">Report</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-gray-50 p-4 sm:p-6 border-t border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <MessageSquare size={20} className="mr-2 text-blue-600" />
                Comments ({comments.length})
              </h3>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-6 sm:mb-8">
                <div className="flex flex-col gap-3">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts on this review..."
                    rows={3}
                    className="w-full resize-none px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={!comment.trim()}
                      className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium shadow-sm transition-all duration-300 ${
                        comment.trim()
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-md"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Send size={16} />
                      Post Comment
                    </button>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-white p-3 sm:p-5 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                            {comment.author ? comment.author.charAt(0).toUpperCase() : "U"}
                          </div>
                          <span className="font-medium text-gray-800">{comment.author || "User"}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3 pl-4">{comment.content}</p>
                      <div className="flex items-center gap-3">
                        <button
                          className={`text-xs flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-200 ${
                            commentVotes[comment.id]?.upvoted
                              ? "bg-yellow-100 text-yellow-700"
                              : "text-gray-500 hover:bg-gray-100"
                          }`}
                          onClick={() => handlecommentup(comment.id)}
                        >
                          <ThumbsUp size={12} />
                          <span>{comment.upvotes || 0}</span>
                        </button>
                        <button
                          className={`text-xs flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-200 ${
                            commentVotes[comment.id]?.downvoted
                              ? "bg-red-100 text-red-700"
                              : "text-gray-500 hover:bg-gray-100"
                          }`}
                          onClick={() => handledownvote(comment.id)}
                        >
                          <ThumbsDown size={12} />
                          <span>{comment.downvotes || 0}</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare size={40} className="mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes increase {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); color: #eab308; }
          100% { transform: scale(1); }
        }
        
        @keyframes decrease {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); color: #dc2626; }
          100% { transform: scale(1); }
        }
        
        .increase {
          animation: increase 0.4s ease-in-out;
        }
        
        .decrease {
          animation: decrease 0.4s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .prose {
          color: #374151;
          max-width: 65ch;
          font-size: 1rem;
          line-height: 1.75;
        }
        
        .prose p {
          margin-top: 1.25em;
          margin-bottom: 1.25em;
        }
        
        .prose strong {
          font-weight: 600;
          color: #111827;
        }
        
        .prose a {
          color: #2563eb;
          text-decoration: underline;
          font-weight: 500;
        }
        
        .prose h1, .prose h2, .prose h3, .prose h4 {
          color: #111827;
          font-weight: 600;
          line-height: 1.25;
          margin-top: 2em;
          margin-bottom: 1em;
        }
        
        .prose h1 {
          font-size: 2.25em;
        }
        
        .prose h2 {
          font-size: 1.5em;
        }
        
        .prose h3 {
          font-size: 1.25em;
        }
        
        .prose ul, .prose ol {
          padding-left: 1.625em;
          margin-top: 1.25em;
          margin-bottom: 1.25em;
        }
        
        .prose li {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }
        
        .prose blockquote {
          font-weight: 500;
          font-style: italic;
          color: #111827;
          border-left-width: 0.25rem;
          border-left-color: #e5e7eb;
          margin-top: 1.6em;
          margin-bottom: 1.6em;
          padding-left: 1em;
        }

        @media (max-width: 640px) {
          .prose {
            font-size: 0.95rem;
          }
          
          .prose h1 {
            font-size: 1.75em;
          }
          
          .prose h2 {
            font-size: 1.4em;
          }
          
          .prose h3 {
            font-size: 1.2em;
          }
        }
      `}</style>
    </div>
  )
}
