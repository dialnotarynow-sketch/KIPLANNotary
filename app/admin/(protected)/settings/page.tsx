'use client'

import { useEffect, useState } from 'react'

type SettingsState = {
  businessName: string
  phone: string
  whatsapp: string
  address: string
  businessHours: string
  pricingGuidance: string
  turnaroundGuidance: string
  saturdayPolicy: string
}

const defaultSettings: SettingsState = {
  businessName: 'KIPLAN Notary',
  phone: '',
  whatsapp: '',
  address: '',
  businessHours: '',
  pricingGuidance: '',
  turnaroundGuidance: '',
  saturdayPolicy: '',
}

const settingKeys: Record<keyof SettingsState, string> = {
  businessName: 'business_name',
  phone: 'phone',
  whatsapp: 'whatsapp',
  address: 'office_address',
  businessHours: 'office_hours',
  pricingGuidance: 'pricing_guidance',
  turnaroundGuidance: 'turnaround_guidance',
  saturdayPolicy: 'saturday_policy',
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch('/api/admin/settings')

        if (!response.ok) {
          throw new Error('Failed to load settings')
        }

        const result = await response.json()
        const rows = result.data || []

        const loaded: SettingsState = {
          ...defaultSettings,
        }

        for (const row of rows) {
          switch (row.key) {
            case 'business_name':
              loaded.businessName = row.value || ''
              break
            case 'phone':
              loaded.phone = row.value || ''
              break
            case 'whatsapp':
              loaded.whatsapp = row.value || ''
              break
            case 'office_address':
              loaded.address = row.value || ''
              break
            case 'office_hours':
              loaded.businessHours = row.value || ''
              break
            case 'pricing_guidance':
              loaded.pricingGuidance = row.value || ''
              break
            case 'turnaround_guidance':
              loaded.turnaroundGuidance = row.value || ''
              break
            case 'saturday_policy':
              loaded.saturdayPolicy = row.value || ''
              break
          }
        }

        setSettings(loaded)
      } catch (err) {
        console.error(err)
        setError('Failed to load settings.')
      } finally {
        setLoading(false)
      }
    }

    loadSettings()
  }, [])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target

    setSettings((current) => ({
      ...current,
      [name]: value,
    }))

    setMessage('')
    setError('')
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()

    try {
      setSaving(true)
      setMessage('')
      setError('')

      const updates = Object.entries(settings).map(([field, value]) => {
        const key = settingKeys[field as keyof SettingsState]

        return fetch('/api/admin/settings', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key,
            value,
            value_json: null,
          }),
        }).then(async (response) => {
          if (!response.ok) {
            const result = await response.json().catch(() => null)
            throw new Error(result?.error || `Failed to save ${key}`)
          }

          return response.json()
        })
      })

      await Promise.all(updates)

      setMessage('Settings saved successfully.')
    } catch (err) {
      console.error(err)
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to save settings.'
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Business Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Loading settings...
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">
            Please wait...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Business Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage the basic business information used by the KIPLAN Notary admin system.
        </p>
      </div>

      {message && (
        <div className="rounded-md bg-green-50 border border-green-200 px-4 py-3">
          <p className="text-sm text-green-700">{message}</p>
        </div>
      )}

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="bg-white rounded-lg shadow p-6 space-y-8"
      >
        <section>
          <h2 className="text-lg font-semibold text-gray-900">
            Business Information
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Basic contact information for KIPLAN Notary.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <label
                htmlFor="businessName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Name
              </label>

              <input
                id="businessName"
                name="businessName"
                value={settings.businessName}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                placeholder="Business phone number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="whatsapp"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                WhatsApp
              </label>

              <input
                id="whatsapp"
                name="whatsapp"
                value={settings.whatsapp}
                onChange={handleChange}
                placeholder="WhatsApp number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="businessHours"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Office Hours
              </label>

              <input
                id="businessHours"
                name="businessHours"
                value={settings.businessHours}
                onChange={handleChange}
                placeholder="e.g. 10:00 AM – 4:30 PM"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Office Address
              </label>

              <textarea
                id="address"
                name="address"
                rows={3}
                value={settings.address}
                onChange={handleChange}
                placeholder="Office address"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Customer Guidance
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Information that can be used when responding to customers.
          </p>

          <div className="space-y-5 mt-5">
            <div>
              <label
                htmlFor="pricingGuidance"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Pricing Guidance
              </label>

              <textarea
                id="pricingGuidance"
                name="pricingGuidance"
                rows={3}
                value={settings.pricingGuidance}
                onChange={handleChange}
                placeholder="Explain how customers are advised about pricing."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="turnaroundGuidance"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Turnaround Guidance
              </label>

              <textarea
                id="turnaroundGuidance"
                name="turnaroundGuidance"
                rows={3}
                value={settings.turnaroundGuidance}
                onChange={handleChange}
                placeholder="Explain how processing time depends on the documents."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="saturdayPolicy"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Saturday Policy
              </label>

              <textarea
                id="saturdayPolicy"
                name="saturdayPolicy"
                rows={3}
                value={settings.saturdayPolicy}
                onChange={handleChange}
                placeholder="Saturday opening/assistance policy."
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        <div className="flex items-center justify-end border-t pt-5">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
}