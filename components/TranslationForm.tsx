"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  CreditCard,
  FileText,
  Globe,
  CheckCircle,
  AlertCircle,
  Upload,
  X,
  Plus,
  ChevronRight,
  ChevronLeft,
  Eye,
  FileUp,
  Pencil,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"
import { useTranslationSubmit } from "@/lib/hooks/useTranslationSubmit"

interface DocumentRow {
  id: number
  description: string
  copies: number
  service: string
  remarks: string
  files: File[]
}

const steps = [
  { id: 1, label: "Applicant", icon: User },
  { id: 2, label: "Documents", icon: FileText },
  { id: 3, label: "Identification", icon: CreditCard },
  { id: 4, label: "Optional Information", icon: Globe },
  { id: 5, label: "Review", icon: Eye },
  { id: 6, label: "Submit", icon: CheckCircle },
]

const MAX_DOCUMENTS = 10
const MAX_FILES_PER_DOCUMENT = 5
const MAX_FILE_SIZE = 20 * 1024 * 1024

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
]

const ACCEPTED_FILE_EXTENSIONS = ".pdf,.jpg,.jpeg,.png"

export default function TranslationForm() {
  const { submit, submitting, result } = useTranslationSubmit()

  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState("")
  const [uploadingFiles, setUploadingFiles] = useState(false)
  const [uploadError, setUploadError] = useState("")

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    age: "",
    idType: "",
    purpose: "",
    destinationCountry: "",
    sourceOfClient: "",
    additionalRemarks: "",
    declaration: false,
  })

  const [identificationFiles, setIdentificationFiles] = useState<File[]>([])

  const [documents, setDocuments] = useState<DocumentRow[]>([
    {
      id: 1,
      description: "",
      copies: 1,
      service: "",
      remarks: "",
      files: [],
    },
  ])

  const [errors, setErrors] = useState<Record<string, string>>({})

  function updateFormData(
    field: keyof typeof formData,
    value: string | boolean
  ) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function updateDocument(
    id: number,
    field: keyof Omit<DocumentRow, "id" | "files">,
    value: string | number
  ) {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              [field]:
                field === "copies"
                  ? Math.max(1, Number(value) || 1)
                  : value,
            }
          : doc
      )
    )

    setErrors((prev) => {
      const next = { ...prev }
      delete next[`document-${id}`]
      return next
    })
  }

  function addDocument() {
    if (documents.length >= MAX_DOCUMENTS) return

    const nextId =
      documents.length > 0
        ? Math.max(...documents.map((doc) => doc.id)) + 1
        : 1

    setDocuments((prev) => [
      ...prev,
      {
        id: nextId,
        description: "",
        copies: 1,
        service: "",
        remarks: "",
        files: [],
      },
    ])
  }

  function removeDocument(id: number) {
    if (documents.length === 1) return

    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  function validateFile(file: File) {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return `${file.name}: only PDF, JPG and PNG files are allowed.`
    }

    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: file size must not exceed 20 MB.`
    }

    return ""
  }

  function addFilesToDocument(id: number, files: FileList | null) {
    if (!files) return

    const selectedFiles = Array.from(files)

    const document = documents.find((doc) => doc.id === id)
    if (!document) return

    if (
      document.files.length + selectedFiles.length >
      MAX_FILES_PER_DOCUMENT
    ) {
      setErrors((prev) => ({
        ...prev,
        [`document-${id}`]: `A document can have a maximum of ${MAX_FILES_PER_DOCUMENT} files.`,
      }))
      return
    }

    const validFiles: File[] = []

    for (const file of selectedFiles) {
      const error = validateFile(file)

      if (error) {
        setErrors((prev) => ({
          ...prev,
          [`document-${id}`]: error,
        }))
        return
      }

      validFiles.push(file)
    }

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              files: [...doc.files, ...validFiles],
            }
          : doc
      )
    )

    setErrors((prev) => {
      const next = { ...prev }
      delete next[`document-${id}`]
      return next
    })
  }

  function removeDocumentFile(documentId: number, fileIndex: number) {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? {
              ...doc,
              files: doc.files.filter((_, index) => index !== fileIndex),
            }
          : doc
      )
    )
  }

  function addIdentificationFiles(files: FileList | null) {
    if (!files) return

    const selectedFiles = Array.from(files)

    if (
      identificationFiles.length + selectedFiles.length >
      MAX_FILES_PER_DOCUMENT
    ) {
      setErrors((prev) => ({
        ...prev,
        identificationFiles: `You can upload a maximum of ${MAX_FILES_PER_DOCUMENT} identification files.`,
      }))
      return
    }

    const validFiles: File[] = []

    for (const file of selectedFiles) {
      const error = validateFile(file)

      if (error) {
        setErrors((prev) => ({
          ...prev,
          identificationFiles: error,
        }))
        return
      }

      validFiles.push(file)
    }

    setIdentificationFiles((prev) => [...prev, ...validFiles])

    setErrors((prev) => {
      const next = { ...prev }
      delete next.identificationFiles
      return next
    })
  }

  function removeIdentificationFile(index: number) {
    setIdentificationFiles((prev) =>
      prev.filter((_, fileIndex) => fileIndex !== index)
    )
  }

  function validateStep(step: number) {
    const nextErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.fullName.trim()) {
        nextErrors.fullName = "Full Name is required."
      }

      if (!formData.phone.trim()) {
        nextErrors.phone = "Phone number is required."
      }

      if (!formData.email.trim()) {
        nextErrors.email = "Email address is required."
      }

      if (!formData.address.trim()) {
        nextErrors.address = "Address is required."
      }
    }

    if (step === 2) {
      if (documents.length === 0) {
        nextErrors.documents = "At least one document is required."
      }

      documents.forEach((doc) => {
        if (!doc.description.trim()) {
          nextErrors[`document-${doc.id}`] =
            "Description is required for this document."
        } else if (!doc.service) {
          nextErrors[`document-${doc.id}`] =
            "Please select the service required."
        } else if (doc.copies < 1) {
          nextErrors[`document-${doc.id}`] =
            "Number of copies must be at least 1."
        } else if (doc.files.length === 0) {
          nextErrors[`document-${doc.id}`] =
            "Please upload at least one file for this document."
        }
      })
    }

    if (step === 3) {
      if (!formData.idType) {
        nextErrors.idType = "ID Type is required."
      }

      if (identificationFiles.length === 0) {
        nextErrors.identificationFiles =
          "Please upload the applicant's identification document."
      }
    }

    if (step === 5) {
      if (!formData.declaration) {
        nextErrors.declaration =
          "Please confirm the declaration before submitting."
      }
    }

    setErrors(nextErrors)

    return Object.keys(nextErrors).length === 0
  }

  function nextStep() {
    if (currentStep >= 6) return

    if (!validateStep(currentStep)) {
      return
    }

    setCurrentStep((prev) => Math.min(prev + 1, 6))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function previousStep() {
    if (currentStep <= 1) return

    setCurrentStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function goToStep(step: number) {
    if (step >= currentStep) return

    setCurrentStep(step)
    setErrors({})
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function uploadFile(file: File, inquiryId: string) {
    const body = new FormData()

    body.append("file", file)
    body.append("inquiry_id", inquiryId)

    const response = await fetch("/api/public-upload", {
      method: "POST",
      body,
    })

    const json = await response.json()

    if (!response.ok) {
      throw new Error(json.error || `Unable to upload ${file.name}`)
    }

    return json
  }

  async function handleSubmit() {
    if (!validateStep(5)) {
      setCurrentStep(5)
      return
    }

    setUploadError("")

    const totalPages = documents.reduce(
      (sum, document) => sum + Number(document.copies || 1),
      0
    )

    const documentSummary = documents
      .map(
        (document, index) =>
          `${index + 1}. ${document.description} | Copies: ${
            document.copies
          } | Service: ${document.service} | Remarks: ${
            document.remarks || "-"
          }`
      )
      .join("\n")

    const notes = [
      `Address: ${formData.address}`,
      `Age: ${formData.age || "-"}`,
      `ID Type: ${formData.idType}`,
      `Purpose: ${formData.purpose || "-"}`,
      `Destination Country: ${formData.destinationCountry || "-"}`,
      `How did you hear about us?: ${formData.sourceOfClient || "-"}`,
      `Additional Remarks: ${formData.additionalRemarks || "-"}`,
      "",
      "DOCUMENTS:",
      documentSummary,
    ].join("\n")

    const submitResult = await submit({
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      fromLanguage: "Nepali",
      toLanguage: "English",
      documentType: documents[0]?.description || undefined,
      pages: String(totalPages),
      urgency: undefined,
      notes,
    })

    if (!submitResult.success || !submitResult.inquiryId) {
      return
    }

    try {
      setUploadingFiles(true)

      for (const file of identificationFiles) {
        await uploadFile(file, submitResult.inquiryId)
      }

      for (const document of documents) {
        for (const file of document.files) {
          await uploadFile(file, submitResult.inquiryId)
        }
      }

      setReferenceNumber(submitResult.referenceNumber || "")
      setSubmitted(true)

      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error: any) {
      setUploadError(
        error?.message ||
          "Your application was submitted, but one or more files could not be uploaded. Please contact KIPLAN Notary."
      )
    } finally {
      setUploadingFiles(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12 text-center"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-11 w-11 text-green-600" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900">
            Application Submitted
          </h2>

          <p className="mt-3 text-gray-600">
            Thank you. Your application and documents have been received by
            KIPLAN Notary.
          </p>

          {referenceNumber && (
            <div className="mt-8 rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-blue-700">
                Tracking Number
              </p>

              <p className="mt-2 text-3xl font-bold tracking-wider text-blue-900">
                {referenceNumber}
              </p>

              <p className="mt-3 text-sm text-blue-800">
                Please keep this number safe. You can use it to check the
                progress of your application.
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {referenceNumber && (
              <a
                href={`/track/?ref=${encodeURIComponent(referenceNumber)}`}
                className="inline-flex items-center justify-center rounded-lg bg-deep-blue px-6 py-3 font-semibold text-white transition hover:opacity-90"
              >
                Track My Application
                <ChevronRight className="ml-2 h-5 w-5" />
              </a>
            )}

            <a
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Return to Home
            </a>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Translation Request
        </h1>

        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Complete the application below and upload the required documents.
          KIPLAN Notary will review your application and contact you if
          anything further is required.
        </p>
      </div>

      {/* Step indicator */}
      <div className="mb-10 overflow-x-auto">
        <div className="min-w-[760px] flex items-start justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const completed = currentStep > step.id
            const active = currentStep === step.id
            const clickable = step.id < currentStep

            return (
              <div
                key={step.id}
                className="flex flex-1 items-start last:flex-none"
              >
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => clickable && goToStep(step.id)}
                    disabled={!clickable}
                    className={[
                      "flex h-11 w-11 items-center justify-center rounded-full border-2 transition",
                      completed
                        ? "border-green-600 bg-green-600 text-white"
                        : active
                        ? "border-deep-blue bg-deep-blue text-white"
                        : "border-gray-300 bg-white text-gray-400",
                      clickable ? "cursor-pointer" : "cursor-default",
                    ].join(" ")}
                  >
                    {completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </button>

                  <span
                    className={[
                      "mt-2 max-w-[120px] text-center text-xs font-medium",
                      active || completed
                        ? "text-gray-900"
                        : "text-gray-400",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={[
                      "mt-5 mx-2 h-0.5 flex-1",
                      currentStep > step.id
                        ? "bg-green-600"
                        : "bg-gray-200",
                    ].join(" ")}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Main form */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 md:p-10"
            >
              <StepHeading
                title="Applicant Information"
                description="Please provide the applicant's contact information."
                icon={<User className="h-6 w-6" />}
              />

              <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm leading-6 text-blue-900">
                  <strong>Dear Applicant,</strong> please describe the
                  documents you are submitting, the number of copies required,
                  the service required for each document, and any special
                  instructions or remarks. If anything is unclear, KIPLAN
                  Notary may contact you for clarification. You may also be
                  required to visit our office to present original documents
                  or collect completed documents.
                </p>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Field
                  label="Full Name (English)"
                  required
                  error={errors.fullName}
                  icon={<User className="h-4 w-4" />}
                >
                  <input
                    value={formData.fullName}
                    onChange={(e) =>
                      updateFormData("fullName", e.target.value)
                    }
                    className={inputClass(errors.fullName)}
                    placeholder="Enter full name"
                  />
                </Field>

                <Field
                  label="Phone"
                  required
                  error={errors.phone}
                  icon={<Phone className="h-4 w-4" />}
                >
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      updateFormData("phone", e.target.value)
                    }
                    className={inputClass(errors.phone)}
                    placeholder="Enter phone number"
                  />
                </Field>

                <Field
                  label="Email"
                  required
                  error={errors.email}
                  icon={<Mail className="h-4 w-4" />}
                >
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      updateFormData("email", e.target.value)
                    }
                    className={inputClass(errors.email)}
                    placeholder="Enter email address"
                  />
                </Field>

                <Field label="Age">
                  <input
                    type="number"
                    min="1"
                    value={formData.age}
                    onChange={(e) => updateFormData("age", e.target.value)}
                    className={inputClass()}
                    placeholder="Optional"
                  />
                </Field>

                <div className="md:col-span-2">
                  <Field
                    label="Address"
                    required
                    error={errors.address}
                    icon={<MapPin className="h-4 w-4" />}
                  >
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        updateFormData("address", e.target.value)
                      }
                      rows={3}
                      className={inputClass(errors.address)}
                      placeholder="Enter current address"
                    />
                  </Field>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 md:p-10"
            >
              <StepHeading
                title="Documents"
                description="Add the documents you are submitting for translation or other service."
                icon={<FileText className="h-6 w-6" />}
              />

              <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
                <p>
                  You may add up to <strong>10 documents</strong>. Each
                  document can contain up to <strong>5 files</strong>. Each
                  file must be PDF, JPG or PNG and no larger than{" "}
                  <strong>20 MB</strong>.
                </p>
              </div>

              {errors.documents && (
                <ErrorMessage message={errors.documents} />
              )}

              <div className="mt-8 space-y-6">
                {documents.map((document, index) => (
                  <div
                    key={document.id}
                    className="rounded-xl border border-gray-200 p-5 md:p-6"
                  >
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <h3 className="font-semibold text-gray-900">
                        Document {index + 1}
                      </h3>

                      {documents.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDocument(document.id)}
                          className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid gap-5 md:grid-cols-12">
                      <div className="md:col-span-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description <span className="text-red-500">*</span>
                        </label>

                        <input
                          value={document.description}
                          onChange={(e) =>
                            updateDocument(
                              document.id,
                              "description",
                              e.target.value
                            )
                          }
                          className={inputClass(
                            errors[`document-${document.id}`]
                          )}
                          placeholder="e.g. Academic Certificate"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          No. of Copies{" "}
                          <span className="text-red-500">*</span>
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={document.copies}
                          onChange={(e) =>
                            updateDocument(
                              document.id,
                              "copies",
                              e.target.value
                            )
                          }
                          className={inputClass()}
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service Required{" "}
                          <span className="text-red-500">*</span>
                        </label>

                        <select
                          value={document.service}
                          onChange={(e) =>
                            updateDocument(
                              document.id,
                              "service",
                              e.target.value
                            )
                          }
                          className={inputClass()}
                        >
                          <option value="">Select service</option>
                          <option value="Certified Translation">
                            Certified Translation
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="md:col-span-12">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Remarks
                        </label>

                        <textarea
                          value={document.remarks}
                          onChange={(e) =>
                            updateDocument(
                              document.id,
                              "remarks",
                              e.target.value
                            )
                          }
                          rows={2}
                          className={inputClass()}
                          placeholder="Optional instructions or remarks"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Document{" "}
                        <span className="text-red-500">*</span>
                      </label>

                      <label className="flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center transition hover:border-blue-400 hover:bg-blue-50">
                        <Upload className="h-7 w-7 text-gray-400" />

                        <span className="mt-2 text-sm font-medium text-gray-700">
                          Click to upload files
                        </span>

                        <span className="mt-1 text-xs text-gray-500">
                          PDF, JPG or PNG · Maximum 20 MB per file · Up to 5
                          files
                        </span>

                        <input
                          type="file"
                          multiple
                          accept={ACCEPTED_FILE_EXTENSIONS}
                          className="hidden"
                          onChange={(e) => {
                            addFilesToDocument(document.id, e.target.files)
                            e.currentTarget.value = ""
                          }}
                        />
                      </label>

                      {document.files.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {document.files.map((file, fileIndex) => (
                            <div
                              key={`${file.name}-${fileIndex}`}
                              className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2"
                            >
                              <div className="flex min-w-0 items-center gap-2">
                                <FileUp className="h-4 w-4 flex-shrink-0 text-blue-600" />

                                <span className="truncate text-sm text-gray-700">
                                  {file.name}
                                </span>

                                <span className="flex-shrink-0 text-xs text-gray-400">
                                  {formatFileSize(file.size)}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  removeDocumentFile(
                                    document.id,
                                    fileIndex
                                  )
                                }
                                className="flex-shrink-0 text-gray-400 hover:text-red-600"
                                aria-label="Remove file"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {errors[`document-${document.id}`] && (
                      <ErrorMessage
                        message={errors[`document-${document.id}`]}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={addDocument}
                  disabled={documents.length >= MAX_DOCUMENTS}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                  Add Document
                </button>

                <span className="ml-3 text-sm text-gray-500">
                  {documents.length} / {MAX_DOCUMENTS}
                </span>
              </div>
            </motion.div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 md:p-10"
            >
              <StepHeading
                title="Identification"
                description="Identification is required so the Notary can verify the applicant's connection to the documents."
                icon={<CreditCard className="h-6 w-6" />}
              />

              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />

                  <div className="text-sm leading-6 text-amber-900">
                    <p className="font-semibold">
                      Identification is required
                    </p>

                    <p className="mt-1">
                      Please upload a clear copy of the applicant's
                      identification document. If the ID has front and back
                      sides, upload both sides.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 max-w-2xl">
                <Field
                  label="ID Type"
                  required
                  error={errors.idType}
                >
                  <select
                    value={formData.idType}
                    onChange={(e) =>
                      updateFormData("idType", e.target.value)
                    }
                    className={inputClass(errors.idType)}
                  >
                    <option value="">Select ID type</option>
                    <option value="Citizenship Certificate">
                      Citizenship Certificate
                    </option>
                    <option value="Passport">Passport</option>
                    <option value="National ID">
                      National ID
                    </option>
                    <option value="Driving Licence">
                      Driving Licence
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </Field>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Identification Document{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <label className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center transition hover:border-blue-400 hover:bg-blue-50">
                    <CreditCard className="h-8 w-8 text-gray-400" />

                    <span className="mt-3 text-sm font-medium text-gray-700">
                      Click to upload identification
                    </span>

                    <span className="mt-1 text-xs text-gray-500">
                      Upload front/back where applicable · PDF, JPG or PNG ·
                      Maximum 20 MB per file
                    </span>

                    <input
                      type="file"
                      multiple
                      accept={ACCEPTED_FILE_EXTENSIONS}
                      className="hidden"
                      onChange={(e) => {
                        addIdentificationFiles(e.target.files)
                        e.currentTarget.value = ""
                      }}
                    />
                  </label>

                  {identificationFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {identificationFiles.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2"
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <FileUp className="h-4 w-4 flex-shrink-0 text-blue-600" />

                            <span className="truncate text-sm text-gray-700">
                              {file.name}
                            </span>

                            <span className="flex-shrink-0 text-xs text-gray-400">
                              {formatFileSize(file.size)}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeIdentificationFile(index)
                            }
                            className="flex-shrink-0 text-gray-400 hover:text-red-600"
                            aria-label="Remove identification file"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.identificationFiles && (
                    <ErrorMessage
                      message={errors.identificationFiles}
                    />
                  )}
                </div>

                <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                  <p>
                    Your identification documents are submitted for
                    verification purposes and are not automatically treated as
                    approval or certification.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 md:p-10"
            >
              <StepHeading
                title="Optional Information"
                description="These details are optional, but they may help us understand your request."
                icon={<Globe className="h-6 w-6" />}
              />

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Field label="Purpose">
                  <input
                    value={formData.purpose}
                    onChange={(e) =>
                      updateFormData("purpose", e.target.value)
                    }
                    className={inputClass()}
                    placeholder="e.g. Study, employment, immigration"
                  />
                </Field>

                <Field label="Destination Country">
                  <input
                    value={formData.destinationCountry}
                    onChange={(e) =>
                      updateFormData(
                        "destinationCountry",
                        e.target.value
                      )
                    }
                    className={inputClass()}
                    placeholder="e.g. Australia"
                  />
                </Field>

                <Field label="How did you hear about us?">
                  <select
                    value={formData.sourceOfClient}
                    onChange={(e) =>
                      updateFormData(
                        "sourceOfClient",
                        e.target.value
                      )
                    }
                    className={inputClass()}
                  >
                    <option value="">Select an option</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="YouTube">YouTube</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Friend or Family">
                      Friend or Family
                    </option>
                    <option value="Existing Client">
                      Existing Client
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </Field>

                <div className="md:col-span-2">
                  <Field label="Additional Remarks">
                    <textarea
                      value={formData.additionalRemarks}
                      onChange={(e) =>
                        updateFormData(
                          "additionalRemarks",
                          e.target.value
                        )
                      }
                      rows={5}
                      className={inputClass()}
                      placeholder="Any additional information or special instructions"
                    />
                  </Field>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5 */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 md:p-10"
            >
              <StepHeading
                title="Review Your Application"
                description="Please check all information before submitting."
                icon={<Eye className="h-6 w-6" />}
              />

              <div className="mt-8 space-y-6">
                {/* Applicant */}
                <ReviewSection
                  title="Applicant"
                  onEdit={() => goToStep(1)}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <ReviewItem
                      label="Full Name"
                      value={formData.fullName}
                    />
                    <ReviewItem
                      label="Phone"
                      value={formData.phone}
                    />
                    <ReviewItem
                      label="Email"
                      value={formData.email}
                    />
                    <ReviewItem
                      label="Age"
                      value={formData.age || "-"}
                    />
                    <div className="md:col-span-2">
                      <ReviewItem
                        label="Address"
                        value={formData.address}
                      />
                    </div>
                  </div>
                </ReviewSection>

                {/* Documents */}
                <ReviewSection
                  title="Documents"
                  onEdit={() => goToStep(2)}
                >
                  <div className="space-y-3">
                    {documents.map((document, index) => (
                      <div
                        key={document.id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {index + 1}. {document.description}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              {document.service} ·{" "}
                              {document.copies}{" "}
                              {document.copies === 1
                                ? "copy"
                                : "copies"}
                            </p>
                          </div>

                          <span className="text-sm text-gray-500">
                            {document.files.length}{" "}
                            {document.files.length === 1
                              ? "file"
                              : "files"}
                          </span>
                        </div>

                        {document.remarks && (
                          <p className="mt-2 text-sm text-gray-600">
                            Remarks: {document.remarks}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </ReviewSection>

                {/* Identification */}
                <ReviewSection
                  title="Identification"
                  onEdit={() => goToStep(3)}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <ReviewItem
                      label="ID Type"
                      value={formData.idType}
                    />
                    <ReviewItem
                      label="Uploaded Files"
                      value={`${identificationFiles.length} ${
                        identificationFiles.length === 1
                          ? "file"
                          : "files"
                      }`}
                    />
                  </div>
                </ReviewSection>

                {/* Optional */}
                <ReviewSection
                  title="Optional Information"
                  onEdit={() => goToStep(4)}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <ReviewItem
                      label="Purpose"
                      value={formData.purpose || "-"}
                    />
                    <ReviewItem
                      label="Destination Country"
                      value={formData.destinationCountry || "-"}
                    />
                    <ReviewItem
                      label="How did you hear about us?"
                      value={formData.sourceOfClient || "-"}
                    />

                    <div className="md:col-span-2">
                      <ReviewItem
                        label="Additional Remarks"
                        value={formData.additionalRemarks || "-"}
                      />
                    </div>
                  </div>
                </ReviewSection>

                {/* Declaration */}
                <div
                  className={[
                    "rounded-xl border p-5",
                    errors.declaration
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-gray-50",
                  ].join(" ")}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.declaration}
                      onChange={(e) =>
                        updateFormData(
                          "declaration",
                          e.target.checked
                        )
                      }
                      className="mt-1 h-5 w-5 rounded border-gray-300 text-deep-blue focus:ring-deep-blue"
                    />

                    <span className="text-sm leading-6 text-gray-700">
                      I confirm that the information and documents provided
                      are true and belong to the applicant. I understand that
                      the Notary may require the original documents and
                      identification for verification, and that submission of
                      this application does not itself constitute approval or
                      certification.
                    </span>
                  </label>

                  {errors.declaration && (
                    <ErrorMessage message={errors.declaration} />
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 6 */}
          {currentStep === 6 && (
            <motion.div
              key="step-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 md:p-10"
            >
              <StepHeading
                title="Submit Application"
                description="Your application is ready to be submitted."
                icon={<CheckCircle className="h-6 w-6" />}
              />

              <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-6">
                <h3 className="font-semibold text-blue-900">
                  Before you submit
                </h3>

                <ul className="mt-3 space-y-2 text-sm leading-6 text-blue-900">
                  <li>
                    • Your application information has been reviewed.
                  </li>
                  <li>
                    • Your documents and identification will be submitted
                    securely for review.
                  </li>
                  <li>
                    • KIPLAN Notary may contact you if clarification or
                    original documents are required.
                  </li>
                  <li>
                    • After successful submission, you will receive a
                    Tracking Number.
                  </li>
                </ul>
              </div>

              {result?.error && (
                <div className="mt-6">
                  <ErrorMessage message={result.error} />
                </div>
              )}

              {uploadError && (
                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600" />

                    <p className="text-sm leading-6 text-amber-900">
                      {uploadError}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Applicant
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {formData.fullName}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => goToStep(1)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-deep-blue hover:underline"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>
                </div>

 <div className="mt-5 border-t border-gray-100 pt-5">
  <div>
    <p className="text-xs uppercase tracking-wide text-gray-400">
      Documents
    </p>

    <div className="mt-3 space-y-3">
      {documents.map((document, index) => (
        <div
          key={document.id}
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900">
                {index + 1}. {document.description}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                No. of Copies:{" "}
                <span className="font-medium text-gray-900">
                  {document.copies}
                </span>
              </p>

              <p className="mt-1 text-sm text-gray-600">
                Service:{" "}
                <span className="font-medium text-gray-900">
                  {document.service}
                </span>
              </p>

              {document.remarks && (
                <p className="mt-1 text-sm text-gray-600">
                  Remarks: {document.remarks}
                </p>
              )}
            </div>

            <span className="flex-shrink-0 text-xs text-gray-500">
              {document.files.length}{" "}
              {document.files.length === 1 ? "file" : "files"}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="mt-4 grid gap-4 md:grid-cols-2">
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-400">
        Identification
      </p>

      <p className="mt-1 font-semibold text-gray-900">
        {formData.idType}
      </p>
    </div>

    <div>
      <p className="text-xs uppercase tracking-wide text-gray-400">
        Total Copies
      </p>

      <p className="mt-1 font-semibold text-gray-900">
        {documents.reduce(
          (sum, document) =>
            sum + Number(document.copies || 1),
          0
        )}
      </p>
    </div>
  </div>
</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-5 md:px-10">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={previousStep}
              disabled={currentStep === 1 || submitting || uploadingFiles}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            {currentStep < 5 && (
              <button
                type="button"
                onClick={nextStep}
                disabled={submitting || uploadingFiles}
                className="inline-flex items-center gap-2 rounded-lg bg-deep-blue px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            )}

            {currentStep === 5 && (
              <button
                type="button"
                onClick={nextStep}
                disabled={submitting || uploadingFiles}
                className="inline-flex items-center gap-2 rounded-lg bg-deep-blue px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to Submit
                <ChevronRight className="h-4 w-4" />
              </button>
            )}

            {currentStep === 6 && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || uploadingFiles}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting || uploadingFiles ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {submitting
                      ? "Submitting..."
                      : "Uploading Documents..."}
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Submit Application
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Security note */}
      <div className="mt-6 flex items-start justify-center gap-2 px-4 text-center text-xs leading-5 text-gray-500">
        <CreditCard className="mt-0.5 h-4 w-4 flex-shrink-0" />
        <p>
          Your application documents are submitted for KIPLAN Notary review.
          Documents are not automatically approved or certified.
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Helper components                                                          */
/* -------------------------------------------------------------------------- */

function StepHeading({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-deep-blue">
        {icon}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>
    </div>
  )
}

function Field({
  label,
  required,
  error,
  icon,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-700">
        {icon}
        <span>{label}</span>

        {required && <span className="text-red-500">*</span>}
      </label>

      {children}

      {error && <ErrorMessage message={error} />}
    </div>
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="mt-2 flex items-start gap-2 text-sm text-red-600">
      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  )
}

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string
  onEdit: () => void
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-gray-200 bg-gray-50 px-5 py-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 text-sm font-medium text-deep-blue hover:underline"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </button>
      </div>

      <div className="p-5">{children}</div>
    </section>
  )
}

function ReviewItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 whitespace-pre-wrap text-sm text-gray-800">
        {value}
      </p>
    </div>
  )
}

function inputClass(error?: string) {
  return [
    "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition",
    "placeholder:text-gray-400",
    "focus:border-deep-blue focus:ring-2 focus:ring-blue-100",
    error ? "border-red-400" : "border-gray-300",
  ].join(" ")
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}