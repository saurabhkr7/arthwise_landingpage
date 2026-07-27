"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
  const [allowedAssetClasses, setAllowedAssetClasses] = useState<string[]>(["EQUITY"]);
  
  // Custom Verification Fields
  const [customFields, setCustomFields] = useState<any[]>([
    { fieldKey: "enrollmentNo", fieldLabel: "Enrollment Number", fieldType: "text", isRequired: true }
  ]);
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");

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

  // Dynamic Rule Handlers
  const addRule = () => {
    if (!newRule.trim()) return;
    setRules([...rules, newRule.trim()]);
    setNewRule("");
  };
  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  // Dynamic Custom Field Handlers
  const addCustomField = () => {
    if (!newFieldKey.trim() || !newFieldLabel.trim()) return;
    setCustomFields([
      ...customFields,
      {
        fieldKey: newFieldKey.trim(),
        fieldLabel: newFieldLabel.trim(),
        fieldType: newFieldType,
        isRequired: true,
      },
    ]);
    setNewFieldKey("");
    setNewFieldLabel("");
  };
  const removeCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  // Form Submit
  const handleCreateEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !sponsorName || !bannerImageUrl || !joinCode || !startTime || !endTime || !passcode) {
      setCreateError("Please fill in all required fields.");
      return;
    }

    setCreateLoading(true);
    setCreateError("");

    try {
      const payload = {
        title,
        sponsorName,
        bannerImageUrl,
        bannerBgColor,
        bannerTextColor,
        description,
        joinCode: joinCode.trim().toUpperCase(),
        passcode,
        initialCapital,
        maxParticipants,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        allowedAssetClasses,
        rules,
        customVerificationFields: customFields,
      };

      const res = await fetch(`${API_BASE_URL}/market-event/organizer/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to create event.");
      }

      // Redirect back to dashboard
      router.push("/organizer/dashboard");
    } catch (err: any) {
      console.error(err);
      setCreateError(err.message || "Failed to create event. Make sure join code or slug is unique.");
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 p-6 pt-24 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => router.push("/organizer/dashboard")}
                className="text-xs font-bold text-sky-400 hover:text-sky-300 transition uppercase"
              >
                ← Back to Dashboard
              </button>
            </div>
            <h1 className="text-3xl font-black text-white mt-2">Create V2 Trading Event</h1>
          </div>
        </div>

        {createError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 font-medium shadow-md">
            ⚠️ {createError}
          </div>
        )}

        <form onSubmit={handleCreateEventSubmit} className="bg-[#1E293B] border border-slate-800 rounded-2xl p-8 space-y-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Section 1: Identity */}
          <div>
            <h3 className="text-xs font-extrabold text-sky-400 uppercase tracking-widest mb-4">1. Event Branding & Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs text-slate-300 font-bold mb-2">Championship Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. BVPIM Championship 2026"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 font-bold mb-2">University / Sponsor Name *</label>
                <input
                  type="text"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  placeholder="e.g. Uka Tarsadia University"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs text-slate-300 font-bold mb-2">Championship Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short bio details visible on the mobile sign-up card..."
              rows={3}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition"
            />
          </div>

          {/* Banner Selector */}
          <div>
            <label className="block text-xs text-slate-300 font-bold mb-2">Banner Background Image URL *</label>
            <input
              type="text"
              value={bannerImageUrl}
              onChange={(e) => setBannerImageUrl(e.target.value)}
              placeholder="Paste banner image URL"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition mb-4"
              required
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PRESET_BANNERS.map((banner) => (
                <button
                  type="button"
                  key={banner.name}
                  onClick={() => setBannerImageUrl(banner.url)}
                  className={`border rounded-xl overflow-hidden h-14 relative transition ${
                    bannerImageUrl === banner.url ? "border-sky-500 ring-2 ring-sky-500/20" : "border-slate-800"
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
            <h3 className="text-xs font-extrabold text-sky-400 uppercase tracking-widest mb-4">2. Timings & Capitalization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div>
                <label className="block text-xs text-slate-300 font-bold mb-2">Start Time *</label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 font-bold mb-2">End Time *</label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 font-bold mb-2">Initial Cash Capital (₹) *</label>
                <input
                  type="number"
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 font-bold mb-2">Max Participant Limit *</label>
                <input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500 transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* Access Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-slate-300 font-bold mb-2">Student Join Code (Unique) *</label>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="e.g. BVP2026"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 font-bold mb-2">Organizer Management Passcode *</label>
              <input
                type="text"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="e.g. secretPasscode"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 transition"
                required
              />
            </div>
          </div>

          {/* Allowed asset classes */}
          <div>
            <label className="block text-xs text-slate-300 font-bold mb-3">Allowed Asset Classes</label>
            <div className="flex gap-6">
              {["EQUITY", "FNO", "CRYPTO"].map((asset) => (
                <label key={asset} className="flex items-center gap-2.5 text-sm font-semibold cursor-pointer">
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
                    className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
                  />
                  {asset}
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: Custom fields */}
          <div className="border-t border-slate-800/80 pt-6">
            <h3 className="text-xs font-extrabold text-sky-400 uppercase tracking-widest mb-2">3. Student Verification Fields</h3>
            <p className="text-slate-400 text-xs mb-4">Define inputs required from students during enrollment (e.g. Division, Roll No).</p>
            
            {/* Added Fields List */}
            <div className="space-y-2 mb-4">
              {customFields.map((field, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 text-sm">
                  <span>
                    <strong>{field.fieldLabel}</strong> <span className="text-xs text-slate-500">({field.fieldKey} - {field.fieldType})</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCustomField(idx)}
                    className="text-red-400 hover:text-red-300 text-xs font-bold transition"
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
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition flex-1"
              />
              <input
                type="text"
                placeholder="Field Label (e.g. Roll Number)"
                value={newFieldLabel}
                onChange={(e) => setNewFieldLabel(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition flex-1"
              />
              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition flex-1 h-[38px] cursor-pointer"
              >
                <option value="text">Text Input</option>
                <option value="number">Number Input</option>
              </select>
              <button
                type="button"
                onClick={addCustomField}
                className="bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-200 border border-slate-700 transition"
              >
                Add Field
              </button>
            </div>
          </div>

          {/* Section 4: Rules */}
          <div className="border-t border-slate-800/80 pt-6">
            <h3 className="text-xs font-extrabold text-sky-400 uppercase tracking-widest mb-4">4. Custom Rules & Guidelines</h3>
            
            <div className="space-y-2 mb-4">
              {rules.map((rule, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 text-sm">
                  <span>{idx + 1}. {rule}</span>
                  <button
                    type="button"
                    onClick={() => removeRule(idx)}
                    className="text-red-400 hover:text-red-300 text-xs font-bold transition"
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
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-sky-500 transition"
              />
              <button
                type="button"
                onClick={addRule}
                className="bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-200 border border-slate-700 transition whitespace-nowrap"
              >
                Add Rule
              </button>
            </div>
          </div>

          {/* Submission buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => router.push("/organizer/dashboard")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-3 rounded-xl text-sm font-semibold border border-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createLoading}
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-8 py-3 rounded-xl text-sm font-black transition active:scale-[0.98] disabled:opacity-50"
            >
              {createLoading ? "Creating..." : "Save Event Configuration"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
