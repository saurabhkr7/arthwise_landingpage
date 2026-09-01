"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.arthhwise.com/api";

const PRESET_BANNERS = [
  { name: "Neon Trading", url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000" },
  { name: "Crypto Tech", url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000" },
  { name: "Bull Market", url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1000" },
  { name: "Abstract Slate", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000" },
];

export default function CreateEventPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  
  // Create Event Form States
  const [title, setTitle] = useState("");
  const [sponsorName, setSponsorName] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState(PRESET_BANNERS[0].url);
  const [bannerBgColor, setBannerBgColor] = useState("#0F172A");
  const [bannerTextColor, setBannerTextColor] = useState("#38BDF8");
  const [description, setDescription] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [passcode, setPasscode] = useState("");
  const [initialCapital, setInitialCapital] = useState(1000000);
  const [maxParticipants, setMaxParticipants] = useState(150);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [allowedAssetClasses, setAllowedAssetClasses] = useState<string[]>(["EQUITY", "FNO", "CRYPTO", "COMMODITY"]);
  
  // Custom Verification Fields
  const [customFields, setCustomFields] = useState<any[]>([
    { fieldKey: "enrollmentNo", fieldLabel: "Enrollment Number", fieldType: "text", isRequired: true }
  ]);
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const [newFieldOptions, setNewFieldOptions] = useState("");

  // Rules list
  const [rules, setRules] = useState<string[]>([
    "Paper trading uses virtual credits only.",
    "Order match happens at close execution prices."
  ]);
  const [newRule, setNewRule] = useState("");

  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");

  // Authentication check
  useEffect(() => {
    const storedToken = sessionStorage.getItem("organizer_token");
    if (!storedToken) {
      router.push("/organizer/login");
      return;
    }
    setToken(storedToken);
  }, [router]);

  // Add custom verification field
  const addCustomField = () => {
    if (!newFieldKey.trim() || !newFieldLabel.trim()) return;
    setCustomFields([
      ...customFields,
      {
        fieldKey: newFieldKey.trim(),
        fieldLabel: newFieldLabel.trim(),
        fieldType: newFieldType,
        isRequired: true,
        ...(newFieldType === "select" ? {
          options: newFieldOptions.split(/\r?\n/).map((value) => value.trim()).filter(Boolean).map((value) => ({ value, label: value }))
        } : {})
      }
    ]);
    setNewFieldKey("");
    setNewFieldLabel("");
    setNewFieldOptions("");
  };

  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  // Add custom rule
  const addRule = () => {
    if (!newRule.trim()) return;
    setRules([...rules, newRule.trim()]);
    setNewRule("");
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  // Submit Event Creation Form
  const handleCreateEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError("");

    if (!title || !sponsorName || !joinCode || !passcode || !startTime || !endTime) {
      setCreateError("Please fill out all required fields marked with *.");
      return;
    }

    setCreateLoading(true);

    try {
      const payload = {
        title,
        sponsorName,
        bannerImageUrl,
        bannerBgColor,
        bannerTextColor,
        description,
        joinCode: joinCode.trim().toUpperCase(),
        passcode: passcode.trim(),
        initialCapital: Number(initialCapital),
        maxParticipants: Number(maxParticipants),
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        allowedAssetClasses,
        customVerificationFields: customFields,
        rules
      };

      const res = await fetch(`${API_BASE_URL}/market-event/organizer/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const json = await res.json();
      if (res.status === 401 || (json && json.message && (json.message.includes("expired") || json.message.includes("login again") || json.message.includes("Invalid token")))) {
        sessionStorage.clear();
        router.push("/organizer/login");
        return;
      }
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to create trading event.");
      }

      router.push("/organizer/dashboard");
    } catch (err: any) {
      console.error(err);
      setCreateError(err.message || "Failed to save event. Try again.");
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-heroBg dark:bg-darkmode text-midnight_text dark:text-white p-6 pt-28 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-grey/10 dark:border-white/10">
          <div>
            <button 
              onClick={() => router.push("/organizer/dashboard")}
              className="text-xs font-bold text-primary hover:underline transition uppercase flex items-center gap-1"
            >
              <Icon icon="solar:alt-arrow-left-linear" width="14" height="14" />
              <span>Back to Dashboard</span>
            </button>
            <h1 className="text-3xl font-extrabold text-midnight_text dark:text-white mt-2">Create Paper Trading Event</h1>
          </div>
        </div>

        {createError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-500 font-medium text-sm flex items-center gap-2">
            <Icon icon="solar:danger-triangle-bold" width="20" height="20" />
            <span>{createError}</span>
          </div>
        )}

        <form onSubmit={handleCreateEventSubmit} className="bg-white dark:bg-darkHeroBg border border-grey/10 dark:border-white/10 rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden">
          
          {/* Section 1: Identity */}
          <div>
            <h3 className="text-xs font-extrabold text-primary uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Icon icon="solar:flag-bold" width="16" height="16" />
              <span>1. Event Branding & Identity</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-midnight_text dark:text-white mb-2">Championship Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. National Trading Championship 2026"
                  className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-midnight_text dark:text-white focus:outline-none focus:border-primary transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-midnight_text dark:text-white mb-2">University / Sponsor Name *</label>
                <input
                  type="text"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  placeholder="e.g. Department of Management Studies"
                  className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-midnight_text dark:text-white focus:outline-none focus:border-primary transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-midnight_text dark:text-white mb-2">Championship Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short details visible on the mobile join modal card..."
              rows={3}
              className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-midnight_text dark:text-white focus:outline-none focus:border-primary transition"
            />
          </div>

          {/* Banner Selector */}
          <div>
            <label className="block text-xs font-bold text-midnight_text dark:text-white mb-2">Banner Background Image URL *</label>
            <input
              type="text"
              value={bannerImageUrl}
              onChange={(e) => setBannerImageUrl(e.target.value)}
              placeholder="Paste banner image URL"
              className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-midnight_text dark:text-white focus:outline-none focus:border-primary transition mb-4"
              required
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PRESET_BANNERS.map((banner) => (
                <button
                  type="button"
                  key={banner.name}
                  onClick={() => setBannerImageUrl(banner.url)}
                  className={`border rounded-xl overflow-hidden h-14 relative transition ${
                    bannerImageUrl === banner.url ? "border-primary ring-2 ring-primary/20" : "border-grey/20 dark:border-white/10"
                  }`}
                >
                  <img src={banner.url} alt={banner.name} className="w-full h-full object-cover opacity-60" />
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white bg-black/40">
                    {banner.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Timing & Capital */}
          <div>
            <h3 className="text-xs font-extrabold text-primary uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Icon icon="solar:clock-circle-bold" width="16" height="16" />
              <span>2. Timings & Capitalization</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-xs font-bold text-midnight_text dark:text-white mb-2">Start Time *</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-midnight_text dark:text-white focus:outline-none focus:border-primary transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-midnight_text dark:text-white mb-2">End Time *</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-3 py-2.5 text-xs text-midnight_text dark:text-white focus:outline-none focus:border-primary transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-midnight_text dark:text-white mb-2">Initial Cash Capital (₹) *</label>
                <input
                  type="number"
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Number(e.target.value))}
                  className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-midnight_text dark:text-white focus:outline-none focus:border-primary transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-midnight_text dark:text-white mb-2">Max Participant Limit *</label>
                <input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(Number(e.target.value))}
                  className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-midnight_text dark:text-white focus:outline-none focus:border-primary transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Access Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-midnight_text dark:text-white mb-2">Student Join Code (Unique) *</label>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="e.g. CAMPUS2026"
                className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-primary font-bold focus:outline-none focus:border-primary transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-midnight_text dark:text-white mb-2">Organizer Management Passcode *</label>
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="e.g. secretPasscode"
                className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-midnight_text dark:text-white focus:outline-none focus:border-primary transition"
                required
              />
            </div>
          </div>

          {/* Allowed asset classes */}
          <div>
            <label className="block text-xs font-bold text-midnight_text dark:text-white mb-3">Allowed Asset Classes</label>
            <div className="flex gap-6">
              {["EQUITY", "FNO", "CRYPTO", "COMMODITY"].map((asset) => (
                <label key={asset} className="flex items-center gap-2 text-xs font-bold text-midnight_text dark:text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowedAssetClasses.includes(asset)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAllowedAssetClasses([...allowedAssetClasses, asset]);
                      } else {
                        setAllowedAssetClasses(allowedAssetClasses.filter((a) => a !== asset));
                      }
                    }}
                    className="w-4 h-4 accent-primary rounded cursor-pointer"
                  />
                  {asset}
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: Custom fields */}
          <div className="border-t border-grey/10 dark:border-white/10 pt-6">
            <h3 className="text-xs font-extrabold text-primary uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Icon icon="solar:user-id-bold" width="16" height="16" />
              <span>3. Student Verification Fields</span>
            </h3>
            <p className="text-muted dark:text-white/70 text-xs mb-4">Define inputs required from students during enrollment (e.g. Division, Roll No).</p>
            
            {/* Added Fields List */}
            <div className="space-y-2 mb-4">
              {customFields.map((field, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-slate-900/60 border border-grey/20 dark:border-white/10 rounded-xl p-3.5 text-sm">
                  <span className="text-midnight_text dark:text-white">
                    <strong>{field.fieldLabel}</strong> <span className="text-xs text-muted dark:text-white/50">({field.fieldKey} - {field.fieldType})</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCustomField(idx)}
                    className="text-red-500 hover:text-red-600 text-xs font-bold transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Add Field Inputs */}
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="Field Key (e.g. rollNo)"
                value={newFieldKey}
                onChange={(e) => setNewFieldKey(e.target.value)}
                className="bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-midnight_text dark:text-white focus:outline-none focus:border-primary transition flex-1"
              />
              <input
                type="text"
                placeholder="Field Label (e.g. Roll Number)"
                value={newFieldLabel}
                onChange={(e) => setNewFieldLabel(e.target.value)}
                className="bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-midnight_text dark:text-white focus:outline-none focus:border-primary transition flex-1"
              />
              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
                className="bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-midnight_text dark:text-white focus:outline-none focus:border-primary transition flex-1 h-[38px] cursor-pointer"
              >
                <option value="text">Text Input</option>
                <option value="number">Number Input</option>
                <option value="select">Dropdown Select</option>
              </select>
              {newFieldType === "select" && (
                <textarea
                  placeholder="Dropdown options, one per line"
                  value={newFieldOptions}
                  onChange={(e) => setNewFieldOptions(e.target.value)}
                  className="bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-midnight_text dark:text-white focus:outline-none focus:border-primary transition flex-1 min-h-[38px]"
                />
              )}
              <button
                type="button"
                onClick={addCustomField}
                className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 px-5 py-2.5 rounded-xl text-xs font-bold text-midnight_text dark:text-white transition"
              >
                Add Field
              </button>
            </div>
          </div>

          {/* Section 4: Rules */}
          <div className="border-t border-grey/10 dark:border-white/10 pt-6">
            <h3 className="text-xs font-extrabold text-primary uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Icon icon="solar:document-text-bold" width="16" height="16" />
              <span>4. Custom Rules & Guidelines</span>
            </h3>
            
            <div className="space-y-2 mb-4">
              {rules.map((rule, idx) => (
                <div key={idx} className="flex justify-between items-center bg-gray-50 dark:bg-slate-900/60 border border-grey/20 dark:border-white/10 rounded-xl p-3.5 text-sm">
                  <span className="text-midnight_text dark:text-white">{idx + 1}. {rule}</span>
                  <button
                    type="button"
                    onClick={() => removeRule(idx)}
                    className="text-red-500 hover:text-red-600 text-xs font-bold transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter competition rule text"
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                className="w-full bg-gray-50 dark:bg-slate-900 border border-grey/20 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-midnight_text dark:text-white focus:outline-none focus:border-primary transition"
              />
              <button
                type="button"
                onClick={addRule}
                className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 px-5 py-2.5 rounded-xl text-xs font-bold text-midnight_text dark:text-white transition whitespace-nowrap"
              >
                Add Rule
              </button>
            </div>
          </div>

          {/* Submission buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-grey/10 dark:border-white/10">
            <button
              type="button"
              onClick={() => router.push("/organizer/dashboard")}
              className="bg-gray-100 dark:bg-white/10 text-midnight_text dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 px-6 py-3 rounded-xl text-sm font-semibold border border-grey/10 dark:border-white/10 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createLoading}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl text-sm font-extrabold transition shadow-lg shadow-primary/25 active:scale-[0.98] disabled:opacity-50"
            >
              {createLoading ? "Creating..." : "Save Event Configuration"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
