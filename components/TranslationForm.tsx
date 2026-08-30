"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  User, CreditCard, FileText, Globe, CheckCircle, AlertCircle,
  Upload, X, Plus, ChevronRight, ChevronLeft, Eye, FileUp
} from "lucide-react"
import { useTranslationSubmit } from "@/lib/hooks/useTranslationSubmit"

interface DocumentRow {
  id: number
  description: string
  copies: number
  reference: string
  remarks: string
  files: File[]
}

const steps = [
  { id: 1, label: "Applicant", icon: User },
  { id: 2, label: "Identification", icon: CreditCard },
  { id: 3, label: "Documents", icon: FileText },
  { id: 4, label: "Purpose", icon: Globe },
  { id: 5, label: "Review", icon: Eye },
  { id: 6, label: "Submit", icon: CheckCircle },
]

export default function TranslationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState("")
  const [documents, setDocuments] = useState<DocumentRow[]>([
    { id: 1, description: "", copies: 1, reference: "", remarks: "", files: [] }
  ])
  const [formData, setFormData] = useState({
    fullName: "",
    fullNameNepali: "",
    dob: "",
    age: "",
    phone: "",
    email: "",
    district: "",
    municipality: "",
    ward: "",
    idType: "",
    idNumber: "",
    importantSpelling: "",
    purpose: "",
    destinationCountry: "",
    sourceOfClient: "",
    remarks: "",
    declaration: false,
  })

  const addDocument = () => {
    if (documents.length < 10) {
      setDocuments([...documents, {
        id: documents.length + 1,
        description: "",
        copies: 1,
        reference: "",
        remarks: "",
        files: []
      }])
    }
  }

  const removeDocument = (id: number) => {
    setDocuments(documents.filter(d => d.id !== id))
  }

  const updateDocument = (id: number, field: keyof DocumentRow, value: any) => {
    setDocuments(documents.map(d => d.id === id ? { ...d, [field]: value } : d))
  }

  const handleFileUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter(f => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png']
      const validSize = f.size <= 20 * 1024 * 1024
      return validTypes.includes(f.type) && validSize
    })

    const doc = documents.find(d => d.id === id)
    if (doc) {
      const totalFiles = [...doc.files, ...validFiles]
      if (totalFiles.length <= 5) {
        updateDocument(id, 'files', totalFiles)
      }
    }
  }

  const removeFile = (docId: number, fileIndex: number) => {
    const doc = documents.find(d => d.id === docId)
    if (doc) {
      updateDocument(docId, 'files', doc.files.filter((_, i) => i !== fileIndex))
    }
  }

  const { submit, submitting, result } = useTranslationSubmit()

  useEffect(() => {
    if (result?.success && result.referenceNumber) {
      setReferenceNumber(result.referenceNumber)
      setSubmitted(true)
    }
  }, [result])

  const handleSubmit = async () => {
    const documentSummary = documents
      .map((d, i) => `Document ${i + 1}: ${d.description || "(no description)"} — ${d.copies} cop${d.copies === 1 ? "y" : "ies"}${d.reference ? `, ref: ${d.reference}` : ""}${d.remarks ? `, remarks: ${d.remarks}` : ""} [${d.files.length} file(s) attached — file upload not yet wired to storage]`)
      .join("\n")

    // The Kimi hook only accepts a simple field set. To avoid discarding
    // any of the real applicant/identification/document data this form
    // collects, everything beyond the hook's own fields is preserved
    // as structured text in `notes` rather than silently dropped.
    const fullNotes = [
      `Full name (Nepali): ${formData.fullNameNepali || "-"}`,
      `Date of birth: ${formData.dob || "-"} (Age: ${formData.age || "-"})`,
      `Address: ${formData.district || "-"}, ${formData.municipality || "-"}, Ward ${formData.ward || "-"}`,
      `ID: ${formData.idType || "-"} ${formData.idNumber || "-"}`,
      `Important spelling notes: ${formData.importantSpelling || "-"}`,
      `Destination country: ${formData.destinationCountry || "-"}`,
      `Source of client: ${formData.sourceOfClient || "-"}`,
      `Remarks: ${formData.remarks || "-"}`,
      "",
      "Documents:",
      documentSummary,
    ].join("\n")

    await submit({
      name: formData.fullName,
      email: formData.email || undefined,
      phone: formData.phone,
      fromLanguage: "Nepali",
      toLanguage: "English",
      documentType: documents[0]?.description || undefined,
      pages: String(documents.reduce((sum, d) => sum + d.copies, 0)),
      urgency: undefined,
      notes: `Purpose: ${formData.purpose || "-"}\n\n${fullNotes}`,
    })
  }

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-16"
      >
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="font-display text-3xl text-deep-blue mb-4">Application Received</h2>
        <p className="text-gray-600 mb-8">
          Your translation request has been submitted successfully. Please save your reference number for tracking.
        </p>

        <div className="bg-cream rounded-lg p-6 mb-8">
          <p className="text-sm text-gray-500 mb-2">Reference Number</p>
          <p className="font-mono text-2xl font-bold text-deep-blue">{referenceNumber}</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-left">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800">Important</p>
              <p className="text-sm text-amber-700 mt-1">
                Submitting this request does not mean your application is approved, identity is verified, 
                or notarial work has been completed. The office will review your application and contact you if needed.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`/track/?ref=${referenceNumber}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-deep-blue text-white font-medium rounded-md hover:bg-deep-blue-light transition-colors"
          >
            Track Request
          </a>
          <a
            href="https://wa.me/9779849530970"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:border-crimson hover:text-crimson transition-colors"
          >
            Contact via WhatsApp
          </a>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  currentStep > step.id
                    ? "bg-emerald-500 text-white"
                    : currentStep === step.id
                    ? "bg-deep-blue text-white"
                    : "bg-gray-200 text-gray-500"
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`text-[10px] mt-1.5 font-medium uppercase tracking-wider hidden sm:block ${
                  currentStep >= step.id ? "text-deep-blue" : "text-gray-400"
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-full h-px mx-2 transition-colors duration-300 ${
                  currentStep > step.id ? "bg-emerald-500" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8"
        >
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl text-deep-blue mb-1">Applicant Details</h3>
                <p className="text-sm text-gray-500">Please provide your personal information accurately.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name (English) *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                    placeholder="As per your ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name (Nepali)</label>
                  <input
                    type="text"
                    value={formData.fullNameNepali}
                    onChange={e => setFormData({...formData, fullNameNepali: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue font-nepali"
                    placeholder="नेपालीमा"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={e => setFormData({...formData, dob: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={e => setFormData({...formData, age: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                    placeholder="+977-XXXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">District *</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={e => setFormData({...formData, district: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Municipality/VDC</label>
                  <input
                    type="text"
                    value={formData.municipality}
                    onChange={e => setFormData({...formData, municipality: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Ward No.</label>
                  <input
                    type="text"
                    value={formData.ward}
                    onChange={e => setFormData({...formData, ward: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Important Spelling (Names, Address, Key Words in CAPITAL LETTERS)
                </label>
                <textarea
                  value={formData.importantSpelling}
                  onChange={e => setFormData({...formData, importantSpelling: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                  placeholder="Enter any names, addresses, or key terms that must be spelled exactly as shown..."
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  Please write in CAPITAL LETTERS to ensure accuracy in translation and certification.
                </p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl text-deep-blue mb-1">Identification</h3>
                <p className="text-sm text-gray-500">
                  The Notary must establish your identity and examine appropriate evidence. Please provide your ID details.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">ID Type *</label>
                  <select
                    value={formData.idType}
                    onChange={e => setFormData({...formData, idType: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                  >
                    <option value="">Select ID Type</option>
                    <option value="citizenship">Citizenship Certificate</option>
                    <option value="national_id">National ID</option>
                    <option value="passport">Passport</option>
                    <option value="driving">Driving Licence</option>
                    <option value="voting">Voting Card</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">ID Number *</label>
                  <input
                    type="text"
                    value={formData.idNumber}
                    onChange={e => setFormData({...formData, idNumber: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload ID Document</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-deep-blue transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload front and back of your ID</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG. Max 20MB per file.</p>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> The Notary must verify that you are the person connected with the relevant document. 
                  Original ID may be required during office visit for final certification.
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl text-deep-blue mb-1">Documents</h3>
                <p className="text-sm text-gray-500">Add documents for translation or certification. Maximum 10 documents per request.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-cream">
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">#</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">Description</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700 w-24">Copies</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">Reference</th>
                      <th className="text-left px-3 py-2 font-semibold text-gray-700">Remarks</th>
                      <th className="px-3 py-2 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id} className="border-t border-gray-100">
                        <td className="px-3 py-2 text-gray-500">{doc.id}</td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={doc.description}
                            onChange={e => updateDocument(doc.id, 'description', e.target.value)}
                            className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-deep-blue"
                            placeholder="Document description"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            min={1}
                            value={doc.copies}
                            onChange={e => updateDocument(doc.id, 'copies', parseInt(e.target.value) || 1)}
                            className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-deep-blue"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={doc.reference}
                            onChange={e => updateDocument(doc.id, 'reference', e.target.value)}
                            className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-deep-blue"
                            placeholder="Ref. no."
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="text"
                            value={doc.remarks}
                            onChange={e => updateDocument(doc.id, 'remarks', e.target.value)}
                            className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded text-sm focus:outline-none focus:border-deep-blue"
                            placeholder="Notes"
                          />
                        </td>
                        <td className="px-3 py-2">
                          {documents.length > 1 && (
                            <button
                              onClick={() => removeDocument(doc.id)}
                              className="p-1 text-gray-400 hover:text-crimson transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {documents.length < 10 && (
                <button
                  onClick={addDocument}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-deep-blue hover:text-crimson transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Document
                </button>
              )}

              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={`upload-${doc.id}`} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Document {doc.id}: {doc.description || "Untitled"} — Upload Files
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {doc.files.map((file, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs">
                          <FileUp className="w-3.5 h-3.5 text-deep-blue" />
                          <span className="max-w-[150px] truncate">{file.name}</span>
                          <button onClick={() => removeFile(doc.id, i)} className="text-gray-400 hover:text-crimson">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:border-deep-blue cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload Files
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={e => handleFileUpload(doc.id, e)}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-400 mt-2">PDF, JPG, PNG. Max 20MB per file. Up to 5 files per document.</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl text-deep-blue mb-1">Purpose & Destination</h3>
                <p className="text-sm text-gray-500">Tell us why you need these documents and where they will be used.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Purpose *</label>
                  <select
                    value={formData.purpose}
                    onChange={e => setFormData({...formData, purpose: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                  >
                    <option value="">Select Purpose</option>
                    <option value="travel">Travel / Visit</option>
                    <option value="study">Study</option>
                    <option value="migration">Migration / Residence</option>
                    <option value="employment">Employment</option>
                    <option value="business">Business</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination Country</label>
                  <input
                    type="text"
                    value={formData.destinationCountry}
                    onChange={e => setFormData({...formData, destinationCountry: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                    placeholder="e.g., United States, Australia..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">How did you hear about us?</label>
                <div className="flex flex-wrap gap-3">
                  {["Friends/Family", "Website", "Search Engine", "KIPLANScholar", "Other"].map((source) => (
                    <button
                      key={source}
                      onClick={() => setFormData({...formData, sourceOfClient: source})}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        formData.sourceOfClient === source
                          ? "bg-deep-blue text-white border-deep-blue"
                          : "bg-white text-gray-700 border-gray-200 hover:border-deep-blue"
                      }`}
                    >
                      {source}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Remarks</label>
                <textarea
                  value={formData.remarks}
                  onChange={e => setFormData({...formData, remarks: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue"
                  placeholder="Any special instructions or additional information..."
                />
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl text-deep-blue mb-1">Review Your Application</h3>
                <p className="text-sm text-gray-500">Please verify all information before submission.</p>
              </div>

              <div className="space-y-4">
                <div className="bg-cream rounded-lg p-4">
                  <h4 className="font-semibold text-sm text-gray-900 mb-3">Applicant Details</h4>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div><dt className="text-gray-500">Name:</dt><dd className="font-medium">{formData.fullName || "—"}</dd></div>
                    <div><dt className="text-gray-500">Phone:</dt><dd className="font-medium">{formData.phone || "—"}</dd></div>
                    <div><dt className="text-gray-500">Email:</dt><dd className="font-medium">{formData.email || "—"}</dd></div>
                    <div><dt className="text-gray-500">Address:</dt><dd className="font-medium">{formData.district}{formData.municipality ? `, ${formData.municipality}` : ""}</dd></div>
                  </dl>
                </div>

                <div className="bg-cream rounded-lg p-4">
                  <h4 className="font-semibold text-sm text-gray-900 mb-3">Identification</h4>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div><dt className="text-gray-500">ID Type:</dt><dd className="font-medium">{formData.idType || "—"}</dd></div>
                    <div><dt className="text-gray-500">ID Number:</dt><dd className="font-medium">{formData.idNumber || "—"}</dd></div>
                  </dl>
                </div>

                <div className="bg-cream rounded-lg p-4">
                  <h4 className="font-semibold text-sm text-gray-900 mb-3">Documents ({documents.length})</h4>
                  <ul className="space-y-2">
                    {documents.map(doc => (
                      <li key={doc.id} className="text-sm flex items-center justify-between">
                        <span>{doc.id}. {doc.description || "Untitled"} ({doc.copies} {doc.copies === 1 ? "copy" : "copies"})</span>
                        {doc.files.length > 0 && (
                          <span className="text-xs text-emerald-600">{doc.files.length} file(s) attached</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-cream rounded-lg p-4">
                  <h4 className="font-semibold text-sm text-gray-900 mb-3">Purpose</h4>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div><dt className="text-gray-500">Purpose:</dt><dd className="font-medium">{formData.purpose || "—"}</dd></div>
                    <div><dt className="text-gray-500">Destination:</dt><dd className="font-medium">{formData.destinationCountry || "—"}</dd></div>
                  </dl>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.declaration}
                    onChange={e => setFormData({...formData, declaration: e.target.checked})}
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-deep-blue focus:ring-deep-blue"
                  />
                  <div>
                    <p className="text-sm text-amber-900">
                      I confirm that the documents submitted are authentic, issued by authorized bodies, and that certified copies are true and exact reproductions of the originals. I understand that submitting this request does not constitute approval or completion of notarial work. I agree to present original documents when required and accept that professional decisions remain with the Notary.
                    </p>
                    <p className="text-xs text-amber-700 mt-2">
                      If any errors are found in translated/certified documents, they will be corrected free of charge within 7 days of delivery.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="text-center py-8">
              <h3 className="font-display text-xl text-deep-blue mb-4">Ready to Submit</h3>
              <p className="text-gray-600 mb-8">
                You are about to submit your translation request. A reference number will be generated for tracking.
              </p>
              <div className="bg-cream rounded-lg p-6 mb-8 text-left max-w-lg mx-auto">
                <h4 className="font-semibold text-sm text-gray-900 mb-3">What happens next?</h4>
                <ol className="space-y-2 text-sm text-gray-600">
                  <li>1. Your application is received and queued for review.</li>
                  <li>2. The office verifies your identity and documents.</li>
                  <li>3. You may be contacted for additional information.</li>
                  <li>4. Upon approval, processing begins.</li>
                  <li>5. You will be notified when documents are ready.</li>
                </ol>
              </div>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-deep-blue text-white font-medium rounded-lg hover:bg-deep-blue-light transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <CheckCircle className="w-5 h-5" />
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
              {result?.success === false && (
                <div className="mt-4 max-w-lg mx-auto bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                  <p className="text-sm text-red-700">
                    {result.error || "Something went wrong submitting your application. Please try again or contact KIPLAN directly."}
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {currentStep < 6 && (
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:border-deep-blue hover:text-deep-blue"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            onClick={nextStep}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-blue text-white rounded-lg text-sm font-medium hover:bg-deep-blue-light transition-colors"
          >
            {currentStep === 5 ? "Review" : "Next"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
