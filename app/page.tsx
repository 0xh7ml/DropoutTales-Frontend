"use client"

import type React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Search, X, ThumbsUp, ThumbsDown, Star, Building2, Calendar, MessageCircle } from 'lucide-react'
import { useState, useEffect } from "react"
import Footer from "@/components/footer"
import "dotenv/config"
import { API_ROOT } from "@/config"
import { sanitize } from "@/utils/sanitizeHtml"
import Headercom from "@/components/Headercom"

function VoteButtons({ initialUpvotes = 0, initialDownvotes = 0 }) {
  const [upvotes, setUpvotes] = useState(initialUpvotes)
  const [downvotes, setDownvotes] = useState(initialDownvotes)
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null)
  const [animateUp, setAnimateUp] = useState(false)
  const [animateDown, setAnimateDown] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const handleUpvote = () => {
    if (userVote === "up") {
      setUpvotes(upvotes - 1)
      setUserVote(null)
    } else {
      setUpvotes(upvotes + 1)
      setAnimateUp(true)

      if (userVote === "down") {
        setDownvotes(downvotes - 1)
      }

      setUserVote("up")
    }

    setTimeout(() => setAnimateUp(false), 400)
  }

  const handleDownvote = () => {
    if (userVote === "down") {
      setDownvotes(downvotes - 1)
      setUserVote(null)
    } else {
      setDownvotes(downvotes + 1)
      setAnimateDown(true)

      if (userVote === "up") {
        setUpvotes(upvotes - 1)
      }

      setUserVote("down")
    }

    setTimeout(() => setAnimateDown(false), 400)
  }

  return (
    <div className="vote-wrapper flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
      <span className="text-xs text-gray-500">Helpful?</span>
      <div className="flex gap-2">
        <button
          onClick={handleUpvote}
          className={`vote-button flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-200 ${
            userVote === "up" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label="Upvote this review"
        >
          <ThumbsUp size={14} className={userVote === "up" ? "text-yellow-600" : ""} />
          <span className={`vote-count text-xs font-medium ${animateUp ? "increase" : ""}`}>{upvotes}</span>
        </button>

        <button
          onClick={handleDownvote}
          className={`vote-button flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-200 ${
            userVote === "down" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label="Downvote this review"
        >
          <ThumbsDown size={14} className={userVote === "down" ? "text-red-600" : ""} />
          <span className={`vote-count text-xs font-medium ${animateDown ? "decrease" : ""}`}>{downvotes}</span>
        </button>
      </div>
    </div>
  )
}

function SkeletonReviewCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-lg animate-pulse flex flex-col h-full">
      {/* Title skeleton */}
      <div className="h-7 bg-gray-200 rounded-md w-3/4 mb-4"></div>

      {/* Tags skeleton */}
      <div className="flex gap-2 mb-5 flex-wrap">
        <div className="h-8 bg-gray-200 rounded-full w-32"></div>
        <div className="h-8 bg-gray-200 rounded-full w-24"></div>
        <div className="h-8 bg-gray-200 rounded-full w-28"></div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>

      {/* Read more link skeleton */}
      <div className="h-5 bg-gray-200 rounded w-28 mb-5"></div>

      {/* Vote buttons skeleton */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="h-5 bg-gray-200 rounded w-40"></div>
        <div className="flex gap-2">
          <div className="h-8 bg-gray-200 rounded-full w-20"></div>
          <div className="h-8 bg-gray-200 rounded-full w-20"></div>
        </div>
      </div>
    </div>
  )
}

const getdata = async (page = 1) => {
  const res = await fetch(`${API_ROOT}posts/?page=${page}`)
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  return res.json()
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(true)
  const [data, setData] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)

    if (e.target.value.length === 0) {
      setIsSearchActive(true)
    }
  }

  const searchclick = () => {
    if (searchTerm.trim().length > 0) {
      fetchingsearch()
      setIsSearchActive(false)
    } else {
      setIsSearchActive(true)
    }
  }

  const fetchingsearch = async () => {
    setIsLoading(true)
    try {
      const result = await fetch(`${API_ROOT}posts/search?institute=${searchTerm}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!result.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await result.json()
      setSearchResults(data)
    } catch (error) {
      // console.error("Error searching:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const storedVisibility = localStorage.getItem("disclaimerVisibility")
    if (storedVisibility !== null) {
      setIsVisible(storedVisibility === "true")
    }

    if (isSearchActive) {
      const fetchData = async () => {
        setIsLoading(true)
        try {
          const response = await getdata(pagination.currentPage)
          setData(response.posts || [])
          if (response.pagination) {
            setPagination(response.pagination)
          }
        } catch (error) {
          // console.error("Error fetching data:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchData()
    }
  }, [isSearchActive, pagination.currentPage])

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      const currentScrollPosition = window.scrollY

      setPagination((prev) => ({ ...prev, currentPage: newPage }))

      setTimeout(() => {
        window.scrollTo({
          top: currentScrollPosition,
          behavior: "auto",
        })
      }, 0)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Headercom />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Disclaimer Section */}
        {isVisible && (
          <div
            className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 relative shadow-sm animate-fade-in opacity-0"
            style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
          >
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors duration-300 rounded-full hover:bg-amber-100 p-1"
              onClick={() => {
                setIsVisible(false)
                localStorage.setItem("disclaimerVisibility", "false")
              }}
            >
              <X size={18} />
            </button>
            <p className="text-sm mb-2">
              The information provided by Deshi Mula is for general informational purposes only. All content, including
              reviews and comments, is user-generated and reflects the personal opinions and experiences of individual
              users.
            </p>
            <p className="text-sm mb-2">
              Deshi Mula does not verify, endorse, or guarantee the accuracy, completeness, or reliability of any
              user-submitted content.
            </p>
            <p className="text-sm mb-2">
              The views and opinions expressed on this platform are solely those of the contributors and do not
              represent the views of Deshi Mula or its administrators.
            </p>
            <p className="text-sm mb-2">
              Deshi Mula is not liable for any loss, damage, or consequences resulting from reliance on information
              posted on this site.
            </p>
            <p className="text-sm">
              All posts are submitted anonymously, and we do not collect, store, or share any personally identifiable
              information about our users. Your identity remains completely confidential when you use our platform.
            </p>
          </div>
        )}

        {/* Search Bar */}
        <div
          className="flex mb-10 animate-fade-in opacity-0"
          style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
        >
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by Institute Name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full border border-gray-300 rounded-l-full pl-10 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            {searchTerm.length > 0 && (
              <button
                onClick={() => {
                  setSearchTerm("")
                  setIsSearchActive(true)
                }}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            className="btn-modern bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-r-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => searchclick()}
          >
            Search
          </button>
        </div>

        {/* Company Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Show skeleton cards when loading */}
          {isLoading && (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonReviewCard key={`skeleton-${index}`} />
              ))}
            </>
          )}

          {/* Show actual data when not loading and isSearchActive is true */}
          {!isLoading &&
            isSearchActive &&
            data &&
            data.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in opacity-0 flex flex-col h-full"
                style={{
                  animationDelay: `${0.3 + index * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex flex-col gap-2 mb-3">
                  <h2 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                    <Link href={`/story/${item.id}`}>{item.title}</Link>
                  </h2>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center">
                      <Calendar size={14} className="mr-1.5" />
                      {new Date(item.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>

                    {item.counter && (
                      <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center">
                        <MessageCircle size={14} className="mr-1.5" />
                        {item.counter}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full font-bold flex items-center">
                    <Building2 size={14} className="mr-1.5" />
                    {item.institute}
                  </span>

                  <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full font-bold flex items-center">
                    <Building2 size={14} className="mr-1.5" />
                    {item.department}
                  </span>

                  {item.tags === "Positive" && (
                    <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center">
                      <ThumbsUp size={14} className="mr-1.5" />
                      Positive
                    </span>
                  )}

                  {item.tags === "Negative" && (
                    <span className="text-sm bg-red-100 text-red-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center">
                      <ThumbsDown size={14} className="mr-1.5" />
                      Negative
                    </span>
                  )}

                  {(item.tags === "Mixed" || item.tags === "") && (
                    <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center">
                      <Star size={14} className="mr-1.5" />
                      Mixed
                    </span>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-3 border-l-4 border-blue-500 flex-grow">
                  <p
                    className="text-gray-700 w-full break-words prose text-sm line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: sanitize(item.content).slice(0, 150) + "...",
                    }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    href={`/story/${item.id}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 hover:underline"
                  >
                    Read Full Review
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Vote Buttons */}
                <VoteButtons initialUpvotes={item.upvotes} initialDownvotes={item.downvotes} />
              </div>
            ))}

          {/* Show search results when not loading and isSearchActive is false */}
          {!isLoading &&
            !isSearchActive &&
            Array.isArray(searchResults) &&
            searchResults.length > 0 &&
            searchResults.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in opacity-0 flex flex-col h-full"
                style={{
                  animationDelay: `${0.3 + index * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                <div className="flex flex-col gap-2 mb-3">
                  <h2 className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                    <Link href={`/story/${item.id}`}>{item.title}</Link>
                  </h2>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center">
                      <Calendar size={14} className="mr-1.5" />
                      {new Date(item.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>

                    {item.counter && (
                      <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center">
                        <MessageCircle size={14} className="mr-1.5" />
                        {item.counter}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-full font-bold flex items-center">
                    <Building2 size={14} className="mr-1.5" />
                    {item.company}
                  </span>

                  {item.tags === "Positive" && (
                    <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center">
                      <ThumbsUp size={14} className="mr-1.5" />
                      Positive
                    </span>
                  )}

                  {item.tags === "Negative" && (
                    <span className="text-sm bg-red-100 text-red-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center">
                      <ThumbsDown size={14} className="mr-1.5" />
                      Negative
                    </span>
                  )}

                  {(item.tags === "Mixed" || item.tags === "") && (
                    <span className="text-sm bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center">
                      <Star size={14} className="mr-1.5" />
                      Mixed
                    </span>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-3 border-l-4 border-blue-500 flex-grow">
                  <p
                    className="text-gray-700 w-full break-words prose text-sm line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: sanitize(item.content).slice(0, 150) + "...",
                    }}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <Link
                    href={`/story/${item.id}`}
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300 hover:underline"
                  >
                    Read Full Review
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>

                {/* Vote Buttons */}
                <VoteButtons initialUpvotes={item.upvotes} initialDownvotes={item.downvotes} />
              </div>
            ))}

          {/* Show no results message when search returns empty */}
          {!isLoading && !isSearchActive && Array.isArray(searchResults) && searchResults.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-md text-center col-span-1 md:col-span-2 lg:col-span-3">
              <p className="text-gray-600 mb-4">No reviews found for "{searchTerm}". Try a different search term.</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setIsSearchActive(true)
                }}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium hover:bg-blue-200 transition-colors duration-300"
              >
                Return to all reviews
              </button>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div
          className="flex justify-center items-center gap-4 my-12 bg-white py-4 px-8 rounded-full shadow-md w-fit mx-auto animate-fade-in opacity-0"
          style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
        >
          <button
            className={`p-1 rounded-full transition-colors duration-300 ${
              pagination.currentPage === 1
                ? "text-gray-300 cursor-not-allowed"
                : "hover:bg-gray-100 text-gray-500 cursor-pointer"
            }`}
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(pagination.currentPage - 1)
            }}
            disabled={pagination.currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center space-x-3 px-2">
            {/* First page is always shown */}
            <button
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(1)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                pagination.currentPage === 1 ? "bg-blue-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label="Go to page 1"
            />

            {/* Show ellipsis if current page is far from the start */}
            {pagination.currentPage > 3 && pagination.totalPages > 5 && (
              <span className="text-gray-400">
                <span className="text-xs">•••</span>
              </span>
            )}

            {/* Pages around current page */}
            {Array.from({ length: pagination.totalPages }).map((_, i) => {
              const pageNum = i + 1

              // Skip first and last pages as they're handled separately
              if (pageNum === 1 || pageNum === pagination.totalPages) {
                return null
              }

              // Only show pages near current page
              if (
                pagination.totalPages <= 5 || // Show all dots for 5 or fewer pages
                (pageNum >= pagination.currentPage - 1 && pageNum <= pagination.currentPage + 1) // Show current and adjacent
              ) {
                return (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(pageNum)
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      pagination.currentPage === pageNum ? "bg-blue-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                  />
                )
              }
              return null
            })}

            {/* Show ellipsis if current page is far from the end */}
            {pagination.currentPage < pagination.totalPages - 2 && pagination.totalPages > 5 && (
              <span className="text-gray-400">
                <span className="text-xs">•••</span>
              </span>
            )}

            {/* Last page is always shown (if more than 1 page) */}
            {pagination.totalPages > 1 && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(pagination.totalPages)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  pagination.currentPage === pagination.totalPages
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${pagination.totalPages}`}
              />
            )}
          </div>

          <button
            className={`p-1 rounded-full transition-colors duration-300 ${
              pagination.currentPage === pagination.totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "hover:bg-gray-100 text-gray-500 cursor-pointer"
            }`}
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(pagination.currentPage + 1)
            }}
            disabled={pagination.currentPage === pagination.totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
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
      `}</style>
    </div>
  )
}
