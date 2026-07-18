"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type Tab = "hire" | "join" | "collabs" | "users";
type Status = "new" | "reviewed" | "accepted" | "rejected";

type Submission = {
  id: number;
  type: "hire" | "join";
  submitted_at: string;
  status: Status;
  data: Record<string, unknown>;
};

type Collab = {
  id: string;
  title: string;
  image_url: string;
  details: string;
  x_handle: string;
  x_link: string;
  post_link: string;
  winners_link: string;
  created_at: string;
};

type Member = {
  id: string;
  email: string;
  created_at: string;
};

const STATUS_STYLES: Record<Status, string> = {
  new: "bg-ember/15 text-ember border-ember/30",
  reviewed: "bg-bone/10 text-bone border-bone/20",
  accepted: "bg-green-500/15 text-green-400 border-green-500/30",
  rejected: "bg-flame/15 text-flame border-flame/30",
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const inputClass =
  "w-full bg-ink/60 border border-card-line rounded-[10px] px-4 py-3 text-bone text-[0.93rem] placeholder:text-ash-dim focus:outline-none focus:border-ember transition-colors";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("hire");
  const [hireData, setHireData] = useState<Submission[]>([]);
  const [joinData, setJoinData] = useState<Submission[]>([]);
  const [collabs, setCollabs] = useState<Collab[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [h, j, c, usersData] = await Promise.all([
        fetch("/api/submissions/hire").then((r) => r.json()),
        fetch("/api/submissions/join").then((r) => r.json()),
        fetch("/api/collabs").then((r) => r.json()),
        fetch("/api/admin/users").then((r) => r.json()),
      ]);
      setHireData(h);
      setJoinData(j);
      setCollabs(c);
      setMembers(usersData.users ?? []);
      setUserCount(usersData.count ?? 0);
      setLoading(false);
    }
    load();
  }, []);

  const submissionData = tab === "hire" ? hireData : joinData;

  async function updateStatus(id: number, status: Status) {
    setUpdatingStatus(true);
    await fetch("/api/submissions/status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const update = (arr: Submission[]) =>
      arr.map((s) => (s.id === id ? { ...s, status } : s));
    setHireData((prev) => update(prev));
    setJoinData((prev) => update(prev));
    setSelected((prev) => (prev?.id === id ? { ...prev, status } : prev));
    setUpdatingStatus(false);
  }

  async function deleteCollab(id: string) {
    if (!confirm("Delete this collab?")) return;
    await fetch("/api/collabs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setCollabs((prev) => prev.filter((c) => c.id !== id));
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const counts = {
    hireNew: hireData.filter((s) => s.status === "new").length,
    joinNew: joinData.filter((s) => s.status === "new").length,
  };

  function getDisplayName(s: Submission) {
    return s.type === "hire"
      ? (s.data.projectName as string) || "Unnamed Project"
      : (s.data.name as string) || "Unnamed Applicant";
  }

  function getSubline(s: Submission) {
    return s.type === "hire"
      ? (s.data.budget as string) || ""
      : (s.data.audienceSize as string) || "";
  }

  return (
    <div className="min-h-screen bg-ink text-bone font-body">

      {/* Top bar */}
      <div className="border-b border-card-line bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-[60px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {selected && tab !== "collabs" && tab !== "users" ? (
              <button
                onClick={() => setSelected(null)}
                className="md:hidden flex items-center gap-1.5 text-ash hover:text-ember transition-colors text-[0.88rem] font-semibold"
              >
                ← Back
              </button>
            ) : (
              <div className="flex items-center gap-2 md:hidden">
                <Image
                  src="/PhoenixLogo.jpg"
                  alt="Phoenix Ecosystem"
                  width={26}
                  height={26}
                  className="rounded-full"
                />
                <span className="font-mono text-[0.72rem] text-ember">Admin</span>
              </div>
            )}
            <div className="hidden md:flex items-center gap-2.5">
              <Image
                src="/PhoenixLogo.jpg"
                alt="Phoenix Ecosystem"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="font-display text-[1rem] tracking-tight flame-text">PHOENIX</span>
              <span className="text-ash-dim text-[0.8rem]">/</span>
              <span className="font-mono text-[0.75rem] text-ember">Admin</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="font-mono text-[0.68rem] text-ash-dim text-right">
              <span className="hidden sm:inline">
                {hireData.length + joinData.length} submissions · {collabs.length} collabs · {userCount} members
              </span>
              <span className="sm:hidden">
                {hireData.length + joinData.length + collabs.length} total
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="font-mono text-[0.7rem] uppercase tracking-wider text-ash-dim hover:text-flame transition-colors border border-card-line hover:border-flame/30 rounded-full px-3 py-1 whitespace-nowrap"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="border-b border-card-line bg-ink sticky top-[60px] z-40">
        <div className="max-w-[1400px] mx-auto px-3 md:px-6 flex py-2.5 gap-1.5">
          {(["hire", "join", "collabs", "users"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setSelected(null); }}
              className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-[10px] font-semibold text-[0.72rem] md:text-[0.82rem] border transition-all ${
                tab === t
                  ? "grad-flame text-[#110603] border-transparent"
                  : "border-card-line text-ash hover:border-ember hover:text-ember"
              }`}
            >
              <span className="hidden sm:inline">
                {t === "hire"
                  ? "🚀 Campaigns"
                  : t === "join"
                  ? "✦ Applications"
                  : t === "collabs"
                  ? "🖼️ NFT Collabs"
                  : `👥 Members (${userCount})`}
              </span>
              <span className="sm:hidden">
                {t === "hire" ? "🚀" : t === "join" ? "✦" : t === "collabs" ? "🖼️" : "👥"}
              </span>
              {t === "hire" && counts.hireNew > 0 && (
                <span className="bg-flame text-white text-[0.6rem] font-bold rounded-full px-1.5 py-0.5">
                  {counts.hireNew}
                </span>
              )}
              {t === "join" && counts.joinNew > 0 && (
                <span className="bg-flame text-white text-[0.6rem] font-bold rounded-full px-1.5 py-0.5">
                  {counts.joinNew}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── COLLABS TAB ── */}
      {tab === "collabs" && (
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">
            <div>
              <h2 className="font-display text-[1.4rem] mb-6">
                NFT Collabs{" "}
                <span className="text-ash font-mono text-[0.8rem] font-normal">
                  ({collabs.length})
                </span>
              </h2>
              {loading ? (
                <p className="text-ash text-[0.9rem]">Loading...</p>
              ) : collabs.length === 0 ? (
                <p className="text-ash text-[0.9rem]">No collabs yet. Add one →</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {collabs.map((c) => (
                    <div
                      key={c.id}
                      className="bg-card border border-card-line rounded-[16px] p-5 flex gap-4 items-start"
                    >
                      <div className="relative w-20 h-20 rounded-[10px] overflow-hidden shrink-0">
                        <Image
                          src={c.image_url}
                          alt={c.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-bold text-[0.95rem] text-bone">{c.title}</h3>
                          <button
                            onClick={() => deleteCollab(c.id)}
                            className="shrink-0 font-mono text-[0.7rem] text-flame hover:text-bone transition-colors border border-flame/30 hover:border-flame rounded-full px-2.5 py-0.5"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-ash text-[0.82rem] mt-1 line-clamp-2">{c.details}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {c.x_handle && (
                            <span className="font-mono text-[0.68rem] text-ash border border-card-line rounded-full px-2 py-0.5">
                              {c.x_handle}
                            </span>
                          )}
                          
                           <a href={c.post_link}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[0.68rem] text-ember hover:text-bone transition-colors"
                          >
                            Post ↗
                          </a>
                          {c.winners_link && (
                            
                             <a href={c.winners_link}
                              target="_blank"
                              rel="noreferrer"
                              className="font-mono text-[0.68rem] text-ash-dim hover:text-ember transition-colors"
                            >
                              Winners ↗
                            </a>
                          )}
                          <span className="font-mono text-[0.66rem] text-ash-dim">
                            {timeAgo(c.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="lg:sticky lg:top-[120px]">
              <AddCollabForm
                onAdded={(newCollab) => setCollabs((prev) => [newCollab, ...prev])}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── USERS TAB ── */}
      {tab === "users" && (
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="font-display text-[1.4rem]">
              Members{" "}
              <span className="text-ash font-mono text-[0.8rem] font-normal">
                ({members.length})
              </span>
            </h2>
            <p className="font-mono text-[0.72rem] text-ash-dim">
              Signed up users with access to gated pages
            </p>
          </div>

          {loading ? (
            <p className="text-ash text-[0.9rem]">Loading...</p>
          ) : members.length === 0 ? (
            <p className="text-ash text-[0.9rem]">No members yet.</p>
          ) : (
            <div className="bg-card border border-card-line rounded-[18px] overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 px-6 py-3 border-b border-card-line bg-ink/40">
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-ash-dim">
                  Email
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-ash-dim">
                  Joined
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-wider text-ash-dim">
                  User ID
                </span>
              </div>
              {/* Rows */}
              {members.map((u, i) => (
                <div
                  key={u.id}
                  className={`grid grid-cols-3 gap-4 px-6 py-4 items-center ${
                    i !== members.length - 1 ? "border-b border-card-line" : ""
                  }`}
                >
                  <span className="text-bone text-[0.88rem] font-semibold truncate">
                    {u.email}
                  </span>
                  <span className="text-ash text-[0.82rem] font-mono">
                    {new Date(u.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-ash-dim text-[0.72rem] font-mono truncate">
                    {u.id.slice(0, 8)}...
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── SUBMISSIONS TABS (hire / join) ── */}
      {tab !== "collabs" && tab !== "users" && (
        <>
          {/* DESKTOP */}
          <div className="hidden md:flex max-w-[1400px] mx-auto px-6 py-8 gap-6 h-[calc(100vh-120px)]">
            <div className="w-[380px] shrink-0 flex flex-col gap-4 overflow-y-auto">
              <SubmissionList
                data={submissionData}
                loading={loading}
                selected={selected}
                setSelected={setSelected}
                getDisplayName={getDisplayName}
                getSubline={getSubline}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              <DetailPanel
                selected={selected}
                updatingStatus={updatingStatus}
                updateStatus={updateStatus}
                getDisplayName={getDisplayName}
              />
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden">
            <AnimatePresence mode="wait">
              {!selected ? (
                <motion.div
                  key="mobile-list"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 flex flex-col gap-4"
                >
                  <SubmissionList
                    data={submissionData}
                    loading={loading}
                    selected={selected}
                    setSelected={setSelected}
                    getDisplayName={getDisplayName}
                    getSubline={getSubline}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="mobile-detail"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.2 }}
                  className="p-4"
                >
                  <DetailPanel
                    selected={selected}
                    updatingStatus={updatingStatus}
                    updateStatus={updateStatus}
                    getDisplayName={getDisplayName}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Add Collab Form ── */

function AddCollabForm({ onAdded }: { onAdded: (c: Collab) => void }) {
  const [form, setForm] = useState({
    title: "",
    details: "",
    x_handle: "",
    x_link: "",
    post_link: "",
    winners_link: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!imageFile) return;
    setStatus("submitting");
    try {
      const fd = new FormData();
      fd.append("image", imageFile);
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      const res = await fetch("/api/collabs", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      const latest = await fetch("/api/collabs").then((r) => r.json());
      onAdded(latest[0]);
      setForm({ title: "", details: "", x_handle: "", x_link: "", post_link: "", winners_link: "" });
      setImageFile(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      setStatus("success");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-card border border-card-line rounded-[18px] p-6">
      <h3 className="font-display text-[1.1rem] mb-5">Add New Collab</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <span className="text-[0.82rem] font-semibold text-bone block mb-2">
            Collab Image <span className="text-flame">*</span>
          </span>
          <div
            onClick={() => fileRef.current?.click()}
            className={`relative w-full aspect-video rounded-[12px] border-2 border-dashed cursor-pointer transition-colors overflow-hidden ${
              preview ? "border-ember" : "border-card-line hover:border-ember/50"
            }`}
          >
            {preview ? (
              <Image src={preview} alt="Preview" fill sizes="400px" className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <span className="text-2xl">🖼️</span>
                <span className="font-mono text-[0.72rem] text-ash-dim uppercase tracking-wider">
                  Click to upload image
                </span>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
            required
          />
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-[0.82rem] font-semibold text-bone">
            Title <span className="text-flame">*</span>
          </span>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="PHOENIX 🤝 PROJECT NAME"
            required
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[0.82rem] font-semibold text-bone">
            Details <span className="text-flame">*</span>
          </span>
          <textarea
            name="details"
            value={form.details}
            onChange={handleChange}
            placeholder="NFT collab with @handle — X WL spots for the community."
            required
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.82rem] font-semibold text-bone">X Handle</span>
            <input
              name="x_handle"
              value={form.x_handle}
              onChange={handleChange}
              placeholder="@handle"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.82rem] font-semibold text-bone">X Profile Link</span>
            <input
              name="x_link"
              value={form.x_link}
              onChange={handleChange}
              placeholder="https://x.com/handle"
              className={inputClass}
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="text-[0.82rem] font-semibold text-bone">
            X Post Link <span className="text-flame">*</span>
          </span>
          <input
            name="post_link"
            value={form.post_link}
            onChange={handleChange}
            placeholder="https://x.com/phoenixxweb3/status/..."
            required
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[0.82rem] font-semibold text-bone">
            Winners Post Link{" "}
            <span className="text-ash-dim font-normal">(optional)</span>
          </span>
          <input
            name="winners_link"
            value={form.winners_link}
            onChange={handleChange}
            placeholder="https://x.com/phoenixxweb3/status/..."
            className={inputClass}
          />
        </label>

        {status === "error" && (
          <p className="text-flame text-[0.84rem] text-center">
            Something went wrong. Try again.
          </p>
        )}
        {status === "success" && (
          <p className="text-green-400 text-[0.84rem] text-center">
            ✓ Collab added successfully
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting" || !imageFile}
          className="rounded-full grad-flame text-[#110603] font-bold text-[0.9rem] py-3 px-6 hover:shadow-[0_10px_30px_-8px_rgba(255,77,28,0.55)] transition-shadow disabled:opacity-50"
        >
          {status === "submitting" ? "Uploading..." : "Add Collab"}
        </button>
      </form>
    </div>
  );
}

/* ── Shared sub-components ── */

function SubmissionList({
  data,
  loading,
  selected,
  setSelected,
  getDisplayName,
  getSubline,
}: {
  data: Submission[];
  loading: boolean;
  selected: Submission | null;
  setSelected: (s: Submission) => void;
  getDisplayName: (s: Submission) => string;
  getSubline: (s: Submission) => string;
}) {
  if (loading) {
    return <div className="text-center text-ash text-[0.9rem] mt-12">Loading...</div>;
  }
  if (data.length === 0) {
    return (
      <div className="text-center text-ash text-[0.9rem] mt-12">No submissions yet.</div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {data.map((s) => (
        <button
          key={s.id}
          onClick={() => setSelected(s)}
          className={`w-full text-left p-4 rounded-[12px] border transition-all ${
            selected?.id === s.id
              ? "border-ember bg-card"
              : "border-card-line bg-card/50 hover:border-ember/50"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <span className="font-semibold text-[0.92rem] text-bone truncate">
              {getDisplayName(s)}
            </span>
            <span
              className={`shrink-0 text-[0.65rem] font-mono font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLES[s.status]}`}
            >
              {s.status}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[0.78rem] text-ash truncate">{getSubline(s)}</span>
            <span className="text-ash-dim text-[0.72rem] shrink-0">
              · {timeAgo(s.submitted_at)}
            </span>
          </div>
          {typeof s.data.twitter === "string" && s.data.twitter && (
            <span className="text-[0.72rem] text-ash-dim mt-1 block">
              @{s.data.twitter.replace("@", "")}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function DetailPanel({
  selected,
  updatingStatus,
  updateStatus,
  getDisplayName,
}: {
  selected: Submission | null;
  updatingStatus: boolean;
  updateStatus: (id: number, status: Status) => void;
  getDisplayName: (s: Submission) => string;
}) {
  if (!selected) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center text-ash-dim">
          <div className="text-4xl mb-3">📋</div>
          <p className="text-[0.9rem]">Select a submission to review</p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selected.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="bg-card border border-card-line rounded-[18px] p-6 md:p-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ember">
              {selected.type === "hire" ? "Campaign Brief" : "Creator Application"}
            </span>
            <h2 className="font-display text-[1.4rem] md:text-[1.6rem] mt-1">
              {getDisplayName(selected)}
            </h2>
            <p className="text-ash text-[0.8rem] mt-1">
              {new Date(selected.submitted_at).toLocaleString()} ·{" "}
              {timeAgo(selected.submitted_at)}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[0.72rem] text-ash-dim font-mono uppercase tracking-wider">
              Status
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {(["new", "reviewed", "accepted", "rejected"] as Status[]).map((st) => (
                <button
                  key={st}
                  disabled={updatingStatus}
                  onClick={() => updateStatus(selected.id, st)}
                  className={`text-[0.7rem] font-mono font-bold px-2.5 py-1 rounded-full border transition-all disabled:opacity-50 ${
                    selected.status === st
                      ? STATUS_STYLES[st]
                      : "border-card-line text-ash-dim hover:border-ash"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
        {selected.type === "hire" ? (
          <HireDetail data={selected.data} />
        ) : (
          <JoinDetail data={selected.data} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value?: unknown }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ash-dim">
        {label}
      </span>
      {Array.isArray(value) ? (
        <div className="flex flex-wrap gap-1.5">
          {(value as string[]).map((v) => (
            <span
              key={v}
              className="text-[0.78rem] bg-ember/10 text-ember border border-ember/20 px-2.5 py-0.5 rounded-full"
            >
              {v}
            </span>
          ))}
        </div>
      ) : (
        <span className="text-bone text-[0.92rem] leading-relaxed whitespace-pre-wrap">
          {String(value)}
        </span>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ember mb-4 pb-2 border-b border-card-line">
        {title}
      </h3>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function HireDetail({ data }: { data: Record<string, unknown> }) {
  return (
    <>
      <Section title="Project">
        <Row label="Project Name" value={data.projectName} />
        <Row label="Website" value={data.website} />
        <Row label="Twitter / X" value={data.twitter} />
        <Row label="Telegram" value={data.telegram} />
        <Row label="Description" value={data.description} />
      </Section>
      <Section title="Campaign">
        <Row label="Goals" value={data.goals} />
        <Row label="Budget" value={data.budget} />
        <Row label="Timeline" value={data.timeline} />
        <Row label="Extra Notes" value={data.extraNotes} />
      </Section>
      <Section title="Contact">
        <Row label="Name" value={data.contactName} />
        <Row label="Email" value={data.email} />
      </Section>
    </>
  );
}

function JoinDetail({ data }: { data: Record<string, unknown> }) {
  return (
    <>
      <Section title="Identity">
        <Row label="Name" value={data.name} />
        <Row label="Email" value={data.email} />
        <Row label="Twitter / X" value={data.twitter} />
        <Row label="Telegram" value={data.telegram} />
        <Row label="Other Socials" value={data.otherSocials} />
      </Section>
      <Section title="Profile">
        <Row label="Roles" value={data.roles} />
        <Row label="Audience Size" value={data.audienceSize} />
        <Row label="Niches" value={data.niches} />
        <Row label="Experience" value={data.experience} />
      </Section>
      <Section title="Application">
        <Row label="Why Phoenix" value={data.whyPhoenix} />
        <Row label="Sample Work" value={data.sampleWork} />
      </Section>
    </>
  );
}