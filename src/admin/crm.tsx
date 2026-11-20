import { useEffect, useState, useCallback, type ReactNode, type FormEvent } from "react";
import {
  LayoutGrid,
  BookOpen,
  FileText,
  Users,
  CreditCard,
  Mail,
  Plus,
  Pencil,
  Trash2,
  X,
  LogOut,
  Loader2,
  type LucideIcon,
} from "lucide-react";

// -----------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------

type TabId = "overview" | "courses" | "blogs" | "users" | "subscriptions" | "email";

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  level: "beginner" | "intermediate" | "advanced";
  published: boolean;
}

interface Blog {
  _id: string;
  title: string;
  intro: string;
  middle_context: string;
  conclusion: string;
  categories: string[];
  tags: string[];
  creator: string;
}

interface AppUser {
  _id: string;
  name: string;
  email: string;
  role: "student" | "admin";
}

type SubscriptionStatus = "active" | "cancelled" | "expired" | "past_due";
type SubscriptionPlan = "free" | "monthly" | "annual";

interface Subscription {
  _id: string;
  user: { name: string; email: string } | null;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  expiresAt: string | null;
}

interface BulkEmailResult {
  audience: string;
  totalRecipients: number;
  sent: number;
  failedCount: number;
  failed: { email: string; error: string }[];
}

// -----------------------------------------------------------------------
// API helper
// -----------------------------------------------------------------------

// Point this at your deployed API. Auth token is read from localStorage
// after login — wire up a real login screen before shipping this.
const API_BASE = "http://localhost:8000/api";

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("admin_token") || "";
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.headers as Record<string, string> | undefined) },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({} as { error?: string }));
    throw new Error(body.error || `Request failed (${res.status})`);
  }

  return res.status === 204 ? (null as T) : (res.json() as Promise<T>);
}

function formString(form: FormData, key: string): string {
  return (form.get(key) as string | null) ?? "";
}

// -----------------------------------------------------------------------
// Navigation
// -----------------------------------------------------------------------

interface NavItem {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "blogs", label: "Blogs", icon: FileText },
  { id: "users", label: "Users", icon: Users },
  { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
  { id: "email", label: "Bulk email", icon: Mail },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="flex h-full min-h-[720px] bg-[#FAF8FC] text-[#181526] font-sans">
      <Sidebar activeTab={activeTab} onSelect={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        {activeTab === "overview" && <Overview onNavigate={setActiveTab} />}
        {activeTab === "courses" && <CoursesPanel />}
        {activeTab === "blogs" && <BlogsPanel />}
        {activeTab === "users" && <UsersPanel />}
        {activeTab === "subscriptions" && <SubscriptionsPanel />}
        {activeTab === "email" && <BulkEmailPanel />}
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

interface SidebarProps {
  activeTab: TabId;
  onSelect: (id: TabId) => void;
}

function Sidebar({ activeTab, onSelect }: SidebarProps) {
  return (
    <aside className="w-60 shrink-0 bg-[#14101F] text-white flex flex-col">
      <div className="px-6 py-6 border-b border-white/10">
        <div className="text-[15px] font-extrabold tracking-tight">PacketPros</div>
        <div className="text-[11px] text-[#8B84A0] mt-0.5">Admin console</div>
      </div>

      <nav className="flex-1 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-2.5 text-[13px] border-l-2 transition-colors ${
                active
                  ? "text-white bg-[#7C3AED]/[0.18] border-[#7C3AED]"
                  : "text-[#A79FBA] bg-transparent border-transparent"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="px-6 py-5 border-t border-white/10">
        <button className="w-full flex items-center gap-2 text-[13px] text-[#A79FBA] hover:text-white transition-colors">
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

interface OverviewProps {
  onNavigate: (id: TabId) => void;
}

interface OverviewCard {
  id: TabId;
  label: string;
  desc: string;
  icon: LucideIcon;
}

function Overview({ onNavigate }: OverviewProps) {
  const cards: OverviewCard[] = [
    { id: "courses", label: "Manage courses", desc: "Add, edit, or remove course content.", icon: BookOpen },
    { id: "blogs", label: "Manage blogs", desc: "Publish and edit blog posts.", icon: FileText },
    { id: "users", label: "Manage users", desc: "View accounts and change roles.", icon: Users },
    { id: "subscriptions", label: "Manage subscriptions", desc: "Track plan status per user.", icon: CreditCard },
    { id: "email", label: "Send bulk email", desc: "Message students or subscribers at once.", icon: Mail },
  ];

  return (
    <div className="p-10 max-w-[900px]">
      <h1 className="text-[26px] font-extrabold tracking-tight">Admin console</h1>
      <p className="mt-1.5 text-[13.5px] text-[#6C6678]">
        Manage the content and people behind PacketPros.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mt-8">
        {cards.map(({ id, label, desc, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="text-left rounded-lg border border-[#E3DEE9] bg-white px-5 py-5 hover:border-[#C9B8F2] transition-colors"
          >
            <Icon size={18} className="text-[#7C3AED]" />
            <div className="mt-3 text-[14px] font-bold">{label}</div>
            <div className="mt-1 text-[12px] text-[#6C6678]">{desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared page chrome
// ---------------------------------------------------------------------------

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between px-10 pt-10 pb-6">
      <div>
        <h1 className="text-[22px] font-extrabold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-[13px] text-[#6C6678]">{description}</p>}
      </div>
      {action}
    </div>
  );
}

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

function PrimaryButton({ children, onClick, type = "button", disabled = false }: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#7C3AED] text-white text-[13px] font-bold hover:bg-[#6D28D9] disabled:bg-[#DCD5E6] disabled:text-[#8B84A0] disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );
}

interface IconButtonProps {
  onClick: () => void;
  variant?: "default" | "danger";
  children: ReactNode;
  title?: string;
}

function IconButton({ onClick, variant = "default", children, title }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-md hover:bg-[#F2EEF8] transition-colors ${
        variant === "danger" ? "text-[#B4442E]" : "text-[#6C6678]"
      }`}
    >
      {children}
    </button>
  );
}

interface EmptyStateProps {
  label: string;
  actionLabel?: string;
  onAction?: () => void;
}

function EmptyState({ label, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="px-10 py-16 text-center border border-dashed border-[#E3DEE9] rounded-lg mx-10">
      <p className="text-[13px] text-[#6C6678]">{label}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-3 text-[12.5px] font-bold text-[#7C3AED] hover:text-[#6D28D9]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

interface ErrorBannerProps {
  message: string | null;
}

function ErrorBanner({ message }: ErrorBannerProps) {
  if (!message) return null;
  return (
    <div className="mx-10 mb-4 px-4 py-2.5 rounded-md bg-[#FBEAE6] text-[#993C1D] text-[12.5px]">
      {message}
    </div>
  );
}

function LoadingRow() {
  return (
    <div className="flex items-center justify-center py-16 text-[#6C6678]">
      <Loader2 size={18} className="animate-spin" />
    </div>
  );
}

interface FormPanelProps {
  title: string;
  onClose: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
  children: ReactNode;
}

/** Slide-over panel used for every create/edit form. */
function FormPanel({ title, onClose, onSubmit, submitting, children }: FormPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-[440px] h-full bg-white shadow-xl flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E3DEE9]">
          <h2 className="text-[16px] font-bold">{title}</h2>
          <button type="button" onClick={onClose} className="text-[#6C6678] hover:text-[#181526]">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4">{children}</div>

        <div className="px-6 py-4 border-t border-[#E3DEE9] flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg text-[13px] font-bold text-[#6C6678] hover:bg-[#F2EEF8]"
          >
            Cancel
          </button>
          <PrimaryButton type="submit" disabled={submitting}>
            {submitting ? "Saving…" : "Save"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}

interface FieldProps {
  label: string;
  children: ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-1.5 text-[13px]">
      <span className="font-semibold text-[#3F3A4A]">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "border border-[#DCD5E6] rounded-md px-3 py-2 text-[13.5px] focus:outline-none focus:border-[#7C3AED]";

interface StatusPillProps {
  active: boolean;
  onLabel: string;
  offLabel: string;
}

function StatusPill({ active, onLabel, offLabel }: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
        active ? "bg-[#E9F5EC] text-[#1D7A3E]" : "bg-[#F2EEF8] text-[#6C6678]"
      }`}
    >
      {active ? onLabel : offLabel}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Courses
// ---------------------------------------------------------------------------

type EditingCourse = Partial<Course> | null;

function CoursesPanel() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<EditingCourse>(null); // null = closed, {} = new, {...} = edit
  const [submitting, setSubmitting] = useState<boolean>(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setCourses(await apiRequest<Course[]>("/courses"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load courses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      title: formString(form, "title"),
      description: formString(form, "description"),
      category: formString(form, "category"),
      price: Number(form.get("price")) || 0,
      level: formString(form, "level") as Course["level"],
      published: form.get("published") === "on",
    };

    try {
      if (editing?._id) {
        await apiRequest(`/courses/${editing._id}`, { method: "PATCH", body: JSON.stringify(payload) });
      } else {
        await apiRequest("/courses", { method: "POST", body: JSON.stringify(payload) });
      }
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save course");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this course? This can't be undone.")) return;
    try {
      await apiRequest(`/courses/${id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete course");
    }
  }

  return (
    <div>
      <PageHeader
        title="Courses"
        description="Add, edit, or remove courses in the academy."
        action={<PrimaryButton onClick={() => setEditing({})}><Plus size={15} /> Add course</PrimaryButton>}
      />
      <ErrorBanner message={error} />

      {loading ? (
        <LoadingRow />
      ) : courses.length === 0 ? (
        <EmptyState label="No courses yet." actionLabel="Add your first course" onAction={() => setEditing({})} />
      ) : (
        <div className="mx-10 border border-[#E3DEE9] rounded-lg overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[#6C6678] border-b border-[#E3DEE9] bg-[#FAF8FC]">
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold w-20"></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id} className="border-b border-[#EFEAF5] last:border-0">
                  <td className="px-4 py-3 font-medium">{c.title}</td>
                  <td className="px-4 py-3 text-[#6C6678]">{c.category}</td>
                  <td className="px-4 py-3 text-[#6C6678]">${c.price}</td>
                  <td className="px-4 py-3">
                    <StatusPill active={c.published} onLabel="Published" offLabel="Draft" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-end">
                      <IconButton onClick={() => setEditing(c)} title="Edit"><Pencil size={14} /></IconButton>
                      <IconButton onClick={() => handleDelete(c._id)} variant="danger" title="Delete"><Trash2 size={14} /></IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing !== null && (
        <FormPanel
          title={editing._id ? "Edit course" : "Add course"}
          onClose={() => setEditing(null)}
          onSubmit={handleSubmit}
          submitting={submitting}
        >
          <Field label="Title">
            <input name="title" defaultValue={editing.title} required className={inputClass} />
          </Field>
          <Field label="Description">
            <textarea name="description" defaultValue={editing.description} required rows={4} className={inputClass} />
          </Field>
          <Field label="Category">
            <input name="category" defaultValue={editing.category} required className={inputClass} />
          </Field>
          <Field label="Price (USD)">
            <input name="price" type="number" min={0} step={1} defaultValue={editing.price ?? 0} className={inputClass} />
          </Field>
          <Field label="Level">
            <select name="level" defaultValue={editing.level ?? "beginner"} className={inputClass}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </Field>
          <label className="flex items-center gap-2 text-[13px]">
            <input type="checkbox" name="published" defaultChecked={editing.published} />
            Published
          </label>
        </FormPanel>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Blogs
// ---------------------------------------------------------------------------

type EditingBlog = Partial<Blog> | null;

function BlogsPanel() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<EditingBlog>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setBlogs(await apiRequest<Blog[]>("/blogs"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      title: formString(form, "title"),
      intro: formString(form, "intro"),
      middle_context: formString(form, "middle_context"),
      conclusion: formString(form, "conclusion"),
      categories: formString(form, "categories").split(",").map((s) => s.trim()).filter(Boolean),
      tags: formString(form, "tags").split(",").map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editing?._id) {
        await apiRequest(`/blogs/${editing._id}`, { method: "PATCH", body: JSON.stringify(payload) });
      } else {
        await apiRequest("/blogs", { method: "POST", body: JSON.stringify(payload) });
      }
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this blog post?")) return;
    try {
      await apiRequest(`/blogs/${id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
    }
  }

  return (
    <div>
      <PageHeader
        title="Blogs"
        description="Write and manage posts on the PacketPros blog."
        action={<PrimaryButton onClick={() => setEditing({})}><Plus size={15} /> New post</PrimaryButton>}
      />
      <ErrorBanner message={error} />

      {loading ? (
        <LoadingRow />
      ) : blogs.length === 0 ? (
        <EmptyState label="No blog posts yet." actionLabel="Write your first post" onAction={() => setEditing({})} />
      ) : (
        <div className="mx-10 border border-[#E3DEE9] rounded-lg overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[#6C6678] border-b border-[#E3DEE9] bg-[#FAF8FC]">
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Categories</th>
                <th className="px-4 py-3 font-semibold">Creator</th>
                <th className="px-4 py-3 font-semibold w-20"></th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b._id} className="border-b border-[#EFEAF5] last:border-0">
                  <td className="px-4 py-3 font-medium">{b.title}</td>
                  <td className="px-4 py-3 text-[#6C6678]">{(b.categories || []).join(", ")}</td>
                  <td className="px-4 py-3 text-[#6C6678]">{b.creator}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-end">
                      <IconButton onClick={() => setEditing(b)} title="Edit"><Pencil size={14} /></IconButton>
                      <IconButton onClick={() => handleDelete(b._id)} variant="danger" title="Delete"><Trash2 size={14} /></IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing !== null && (
        <FormPanel
          title={editing._id ? "Edit post" : "New post"}
          onClose={() => setEditing(null)}
          onSubmit={handleSubmit}
          submitting={submitting}
        >
          <Field label="Title">
            <input name="title" defaultValue={editing.title} required className={inputClass} />
          </Field>
          <Field label="Intro">
            <textarea name="intro" defaultValue={editing.intro} required rows={3} className={inputClass} />
          </Field>
          <Field label="Body">
            <textarea name="middle_context" defaultValue={editing.middle_context} required rows={6} className={inputClass} />
          </Field>
          <Field label="Conclusion">
            <textarea name="conclusion" defaultValue={editing.conclusion} required rows={3} className={inputClass} />
          </Field>
          <Field label="Categories (comma-separated)">
            <input name="categories" defaultValue={(editing.categories ?? []).join(", ")} required className={inputClass} />
          </Field>
          <Field label="Tags (comma-separated)">
            <input name="tags" defaultValue={(editing.tags ?? []).join(", ")} required className={inputClass} />
          </Field>
        </FormPanel>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------------

function UsersPanel() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setUsers(await apiRequest<AppUser[]>("/admin/users"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleRoleChange(id: string, role: AppUser["role"]) {
    try {
      await apiRequest(`/admin/users/${id}/role`, { method: "PATCH", body: JSON.stringify({ role }) });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update role");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this user? This can't be undone.")) return;
    try {
      await apiRequest(`/admin/users/${id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete user");
    }
  }

  return (
    <div>
      <PageHeader title="Users" description="View accounts and manage access." />
      <ErrorBanner message={error} />

      {loading ? (
        <LoadingRow />
      ) : users.length === 0 ? (
        <EmptyState label="No users yet." />
      ) : (
        <div className="mx-10 border border-[#E3DEE9] rounded-lg overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[#6C6678] border-b border-[#E3DEE9] bg-[#FAF8FC]">
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold w-20"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-[#EFEAF5] last:border-0">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-[#6C6678]">{u.email}</td>
                  <td className="px-4 py-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value as AppUser["role"])}
                      className="border border-[#DCD5E6] rounded-md px-2 py-1 text-[12.5px]"
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <IconButton onClick={() => handleDelete(u._id)} variant="danger" title="Remove user">
                        <Trash2 size={14} />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Subscriptions
// ---------------------------------------------------------------------------

function SubscriptionsPanel() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<SubscriptionStatus | "">("");

  const load = useCallback(async (status: SubscriptionStatus | "") => {
    setLoading(true);
    setError(null);
    try {
      const query = status ? `?status=${status}` : "";
      setSubs(await apiRequest<Subscription[]>(`/admin/subscriptions${query}`));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(statusFilter);
  }, [load, statusFilter]);

  async function handleStatusChange(id: string, status: SubscriptionStatus) {
    try {
      await apiRequest(`/admin/subscriptions/${id}`, { method: "PATCH", body: JSON.stringify({ status }) });
      await load(statusFilter);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update subscription");
    }
  }

  return (
    <div>
      <PageHeader
        title="Subscriptions"
        description="Track plan status across all users."
        action={
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as SubscriptionStatus | "")}
            className="border border-[#DCD5E6] rounded-md px-3 py-2 text-[13px]"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="cancelled">Cancelled</option>
            <option value="expired">Expired</option>
            <option value="past_due">Past due</option>
          </select>
        }
      />
      <ErrorBanner message={error} />

      {loading ? (
        <LoadingRow />
      ) : subs.length === 0 ? (
        <EmptyState label="No subscriptions match this filter." />
      ) : (
        <div className="mx-10 border border-[#E3DEE9] rounded-lg overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left text-[#6C6678] border-b border-[#E3DEE9] bg-[#FAF8FC]">
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Plan</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Expires</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s._id} className="border-b border-[#EFEAF5] last:border-0">
                  <td className="px-4 py-3 font-medium">{s.user?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-[#6C6678] capitalize">{s.plan}</td>
                  <td className="px-4 py-3">
                    <select
                      value={s.status}
                      onChange={(e) => handleStatusChange(s._id, e.target.value as SubscriptionStatus)}
                      className="border border-[#DCD5E6] rounded-md px-2 py-1 text-[12.5px]"
                    >
                      <option value="active">Active</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="expired">Expired</option>
                      <option value="past_due">Past due</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-[#6C6678]">
                    {s.expiresAt ? new Date(s.expiresAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bulk email
// ---------------------------------------------------------------------------

type Audience = "all" | "students" | "admins" | "active_subscribers" | "cancelled_subscribers";

interface AudienceOption {
  value: Audience;
  label: string;
}

const AUDIENCES: AudienceOption[] = [
  { value: "all", label: "All users" },
  { value: "students", label: "Students only" },
  { value: "admins", label: "Admins only" },
  { value: "active_subscribers", label: "Active subscribers" },
  { value: "cancelled_subscribers", label: "Cancelled subscribers" },
];

function BulkEmailPanel() {
  const [audience, setAudience] = useState<Audience>("all");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [result, setResult] = useState<BulkEmailResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);
    setResult(null);

    try {
      const data = await apiRequest<BulkEmailResult>("/admin/email/bulk", {
        method: "POST",
        body: JSON.stringify({
          subject,
          html: message.replace(/\n/g, "<br/>"),
          audience,
        }),
      });
      setResult(data);
      setSubject("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="px-10 pt-10 pb-16 max-w-[560px]">
      <h1 className="text-[22px] font-extrabold tracking-tight">Bulk email</h1>
      <p className="mt-1 text-[13px] text-[#6C6678]">
        Send a message to a group of users at once.
      </p>

      <ErrorBanner message={error} />

      {result && (
        <div className="mt-5 px-4 py-3 rounded-md bg-[#E9F5EC] text-[#1D7A3E] text-[12.5px]">
          Sent to {result.sent} of {result.totalRecipients} recipients.
          {result.failedCount > 0 && ` ${result.failedCount} failed.`}
        </div>
      )}

      <form onSubmit={handleSend} className="mt-6 flex flex-col gap-4">
        <Field label="Send to">
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value as Audience)}
            className={inputClass}
          >
            {AUDIENCES.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </Field>

        <Field label="Subject">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className={inputClass}
            placeholder="What's this email about?"
          />
        </Field>

        <Field label="Message">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={8}
            className={inputClass}
            placeholder="Write your message…"
          />
        </Field>

        <div>
          <PrimaryButton type="submit" disabled={sending}>
            {sending ? "Sending…" : "Send email"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}