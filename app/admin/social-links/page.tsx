"use client";

import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/content/site-config";
import {
  CheckCircle2,
  Save,
  Share2,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MessageSquare,
  Globe,
  Github,
  Video,
  Loader2,
} from "lucide-react";

export default function AdminSocialLinksCMSPage() {
  const [formData, setFormData] = useState({
    facebook: siteConfig.facebook,
    instagram: siteConfig.instagram,
    linkedin: siteConfig.linkedin,
    youtube: siteConfig.youtube,
    twitter: siteConfig.twitter,
    dribbble: siteConfig.dribbble,
    tiktok: siteConfig.tiktok,
    github: siteConfig.github,
    email: siteConfig.email,
    phone: siteConfig.phone,
    whatsappUrl: siteConfig.whatsappUrl,
    location: "Multan, Pakistan (Serving UAE, USA & UK Clients)",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadLinks() {
      try {
        const res = await fetch("/api/admin/social-links");
        const json = await res.json();
        if (json?.data) {
          setFormData((prev) => ({
            ...prev,
            ...json.data,
          }));
        }
      } catch (err) {
        console.error("Failed to load social links", err);
      } finally {
        setLoading(false);
      }
    }
    loadLinks();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/social-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
      } else {
        alert(data.error || "Failed to save");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving social links.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Social & Direct Contact Links CMS"
        subtitle="Manage public social media handles (Facebook, Instagram, LinkedIn, YouTube, Twitter, TikTok, Dribbble), WhatsApp direct link, email, and phone contact channels."
      />

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2 text-sm font-bold animate-fade-in shadow-xs">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>Social links and contact channels updated successfully in Supabase!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-bold text-slate-900 font-serif">Social & Contact Channels</h2>
            </div>
            {loading && (
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" /> Syncing...
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Facebook */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook Profile / Page URL
              </label>
              <input
                type="text"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                placeholder="https://facebook.com/yourprofile"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>

            {/* Instagram */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Instagram className="h-4 w-4 text-pink-600" />
                Instagram Profile URL
              </label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="https://instagram.com/yourprofile"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>

            {/* LinkedIn */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Linkedin className="h-4 w-4 text-blue-700" />
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>

            {/* YouTube */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Youtube className="h-4 w-4 text-red-600" />
                YouTube Channel URL
              </label>
              <input
                type="text"
                value={formData.youtube}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                placeholder="https://youtube.com/@yourchannel"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>

            {/* Twitter / X */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Twitter className="h-4 w-4 text-sky-500" />
                Twitter / X Profile URL
              </label>
              <input
                type="text"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                placeholder="https://twitter.com/yourhandle"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>

            {/* Dribbble / Portfolio */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-pink-500" />
                Dribbble / Portfolio URL
              </label>
              <input
                type="text"
                value={formData.dribbble}
                onChange={(e) => setFormData({ ...formData, dribbble: e.target.value })}
                placeholder="https://dribbble.com/yourhandle"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>

            {/* TikTok */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Video className="h-4 w-4 text-purple-600" />
                TikTok Profile URL
              </label>
              <input
                type="text"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                placeholder="https://tiktok.com/@yourhandle"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>

            {/* GitHub */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Github className="h-4 w-4 text-slate-800" />
                GitHub Profile URL
              </label>
              <input
                type="text"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/yourhandle"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>

            {/* WhatsApp Direct Link */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4 text-emerald-600" />
                WhatsApp Direct Link
              </label>
              <input
                type="text"
                value={formData.whatsappUrl}
                onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none font-mono"
              />
            </div>

            {/* Public Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-teal-600" />
                Public Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-teal-600" />
                Phone / Call Line
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-teal-600" />
                Location Text
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-[#00897b] hover:bg-[#00796b] text-white font-bold text-sm rounded-lg flex items-center gap-2 shadow-sm transition-all"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Supabase...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Social Links</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
