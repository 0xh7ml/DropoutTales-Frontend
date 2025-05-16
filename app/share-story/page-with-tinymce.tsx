"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronLeft,
  Plus,
  Minus,
  Building2,
  Star,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react"
import TinyMCEEditor from "./tinymce"
import Footer from "@/components/footer"

export default function ShareStory() {
  const [formData, setFormData] = useState({
    companyName: "",
    reviewTitle: "",
    reviewType: "positive", // Default to positive
    pros: [""],
    cons: [""],
    detailedReview: "",
    anonymous: true,
  })

  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      })
    }
  }

  const handleEditorChange = (content) => {
    setFormData({
      ...formData,
      detailedReview: content,
    })

    // Clear error if it exists
    if (formErrors.detailedReview) {
      setFormErrors({
        ...formErrors,
        detailedReview: null,
      })
    }
  }

  const handleReviewTypeChange = (type) => {
    setFormData({
      ...formData,
      reviewType: type,
    })
  }

  const handleProChange = (index, value) => {
    const updatedPros = [...formData.pros]
    updatedPros[index] = value
    setFormData({
      ...formData,
      pros: updatedPros,
    })
  }

  const handleConChange = (index, value) => {
    const updatedCons = [...formData.cons]
    updatedCons[index] = value
    setFormData({
      ...formData,
      cons: updatedCons,
    })
  }

  const addPro = () => {
    setFormData({
      ...formData,
      pros: [...formData.pros, ""],
    })
  }

  const removePro = (index) => {
    if (formData.pros.length > 1) {
      const updatedPros = [...formData.pros]
      updatedPros.splice(index, 1)
      setFormData({
        ...formData,
        pros: updatedPros,
      })
    }
  }

  const addCon = () => {
    setFormData({
      ...formData,
      cons: [...formData.cons, ""],
    })
  }

  const removeCon = (index) => {
    if (formData.cons.length > 1) {
      const updatedCons = [...formData.cons]
      updatedCons.splice(index, 1)
      setFormData({
        ...formData,
        cons: updatedCons,
      })
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.companyName.trim()) {
      errors.companyName = "Company name is required"
    }

    if (!formData.reviewTitle.trim()) {
      errors.reviewTitle = "Review title is required"
    }

    if (formData.pros.some((pro) => !pro.trim()) && formData.pros.length > 0) {
      errors.pros = "Please fill in all pros or remove empty ones"
    }

    if (formData.cons.some((con) => !con.trim()) && formData.cons.length > 0) {
      errors.cons = "Please fill in all cons or remove empty ones"
    }

    // For TinyMCE, we need to check the HTML content
    const strippedHtml = formData.detailedReview.replace(/<[^>]*>/g, "").trim()
    if (!strippedHtml) {
      errors.detailedReview = "Detailed review is required"
    } else if (strippedHtml.length < 50) {
      errors.detailedReview = "Review should be at least 50 characters"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset form after submission
        setFormData({
          companyName: "",
          reviewTitle: "",
          reviewType: "positive",
          pros: [""],
          cons: [""],
          detailedReview: "",
          anonymous: true,
        })
      }, 1500)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 animate-fade-in opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Review Submitted Successfully!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for sharing your experience. Your review will help others make informed decisions.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/"
                  className="btn-modern bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Back to Home
                </Link>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-modern bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Submit Another Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white z-10 border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative overflow-hidden rounded-full p-1 bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 group-hover:shadow-md">
              <Image src="/logo.png" alt="Dropout Tales" width={40} height={40} className="h-8 w-auto" />
            </div>
            <span className="text-lg font-semibold text-green-800 group-hover:text-green-600 transition-colors duration-300">
              Dropout Tales
            </span>
          </Link>
          <Link
            href="/contact-us"
            className="btn-modern text-gray-700 text-sm font-medium hover:text-green-600 transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center text-green-600 text-sm font-medium hover:text-green-700 transition-colors duration-300 mb-6"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Home
          </Link>

          <div
            className="bg-white rounded-xl shadow-md p-6 md:p-8 animate-fade-in opacity-0"
            style={{ animationFillMode: "forwards" }}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Share Your Workplace Experience</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div className="space-y-2">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Building2 size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    className={`w-full pl-10 pr-4 py-3 border ${formErrors.companyName ? "border-red-300 bg-red-50" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300`}
                  />
                </div>
                {formErrors.companyName && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.companyName}
                  </p>
                )}
              </div>

              {/* Review Title */}
              <div className="space-y-2">
                <label htmlFor="reviewTitle" className="block text-sm font-medium text-gray-700">
                  Review Title *
                </label>
                <input
                  type="text"
                  id="reviewTitle"
                  name="reviewTitle"
                  value={formData.reviewTitle}
                  onChange={handleInputChange}
                  placeholder="Summarize your experience in a title"
                  className={`w-full px-4 py-3 border ${formErrors.reviewTitle ? "border-red-300 bg-red-50" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300`}
                />
                {formErrors.reviewTitle && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.reviewTitle}
                  </p>
                )}
              </div>

              {/* Review Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Review Type *</label>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleReviewTypeChange("positive")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      formData.reviewType === "positive"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    <ThumbsUp size={16} />
                    Positive
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReviewTypeChange("negative")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      formData.reviewType === "negative"
                        ? "bg-red-100 text-red-800 border border-red-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    <ThumbsDown size={16} />
                    Negative
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReviewTypeChange("mixed")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      formData.reviewType === "mixed"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                    }`}
                  >
                    <Star size={16} />
                    Mixed
                  </button>
                </div>
              </div>

              {/* Pros */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Pros</label>
                <div className="space-y-3">
                  {formData.pros.map((pro, index) => (
                    <div key={`pro-${index}`} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={pro}
                        onChange={(e) => handleProChange(index, e.target.value)}
                        placeholder={`Pro ${index + 1}`}
                        className={`flex-1 px-4 py-2 border ${formErrors.pros ? "border-red-300 bg-red-50" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300`}
                      />
                      <button
                        type="button"
                        onClick={() => removePro(index)}
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-300"
                        disabled={formData.pros.length <= 1}
                      >
                        <Minus size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                {formErrors.pros && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.pros}
                  </p>
                )}
                <button
                  type="button"
                  onClick={addPro}
                  className="inline-flex items-center text-green-600 text-sm font-medium hover:text-green-700 transition-colors duration-300 mt-2"
                >
                  <Plus size={16} className="mr-1" />
                  Add Another Pro
                </button>
              </div>

              {/* Cons */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Cons</label>
                <div className="space-y-3">
                  {formData.cons.map((con, index) => (
                    <div key={`con-${index}`} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={con}
                        onChange={(e) => handleConChange(index, e.target.value)}
                        placeholder={`Con ${index + 1}`}
                        className={`flex-1 px-4 py-2 border ${formErrors.cons ? "border-red-300 bg-red-50" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300`}
                      />
                      <button
                        type="button"
                        onClick={() => removeCon(index)}
                        className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-300"
                        disabled={formData.cons.length <= 1}
                      >
                        <Minus size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                {formErrors.cons && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.cons}
                  </p>
                )}
                <button
                  type="button"
                  onClick={addCon}
                  className="inline-flex items-center text-green-600 text-sm font-medium hover:text-green-700 transition-colors duration-300 mt-2"
                >
                  <Plus size={16} className="mr-1" />
                  Add Another Con
                </button>
              </div>

              {/* Detailed Review with TinyMCE */}
              <div className="space-y-2">
                <label htmlFor="detailedReview" className="block text-sm font-medium text-gray-700">
                  Detailed Review *
                </label>
                <TinyMCEEditor
                  id="detailedReview"
                  value={formData.detailedReview}
                  onChange={handleEditorChange}
                  error={!!formErrors.detailedReview}
                />
                {formErrors.detailedReview && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle size={14} className="mr-1" />
                    {formErrors.detailedReview}
                  </p>
                )}
              </div>

              {/* Anonymous Posting */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.anonymous}
                  onChange={() => setFormData({ ...formData, anonymous: !formData.anonymous })}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                  Post anonymously (recommended)
                </label>
              </div>

              {/* Disclaimer */}
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                <p>
                  By submitting this review, you agree to our{" "}
                  <Link href="/terms" className="text-green-600 hover:underline">
                    Terms & Conditions
                  </Link>
                  . All reviews are moderated to ensure they comply with our community guidelines.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-modern bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
