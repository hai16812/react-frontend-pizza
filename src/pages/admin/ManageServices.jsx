import { useEffect, useState } from "react";
import { listenServices, addService, updateService, deleteService } from "../../firebase/firestoreApi";

const emptyForm = { name: "", description: "", tag: "", imageUrl: "" };

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageLabel, setImageLabel] = useState("");

  useEffect(() => {
    const unsub = listenServices(setServices);
    return unsub;
  }, []);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a PNG or JPG image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setForm((f) => ({ ...f, imageUrl: result }));
        setImageLabel(file.name);
        setError("");
      }
    };
    reader.readAsDataURL(file);
  }

  function startEdit(s) {
    setEditingId(s.id);
    setForm({ name: s.name || "", description: s.description || "", tag: s.tag || "", imageUrl: s.imageUrl || "" });
    setImageLabel(s.imageUrl ? (s.imageUrl.startsWith("data:image") ? "Uploaded image" : "Image URL") : "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setImageLabel("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) {
      setError("Give the service a name.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateService(editingId, form);
      } else {
        await addService(form);
      }
      cancelEdit();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Remove this service? This can't be undone.")) return;
    await deleteService(id);
    if (editingId === id) cancelEdit();
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl mb-1">Services</h2>
        <p className="text-sm text-(--color-smoke)">
          Manage what shows on the public Services page — dine-in, delivery, catering, and more.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="ticket p-6 pt-8 border border-(--color-ink)/5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            placeholder="Delivery"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
            Tag
          </label>
          <input
            name="tag"
            value={form.tag}
            onChange={handleChange}
            className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            placeholder="Off-site"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
            Image (upload PNG/JPG or paste URL)
          </label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            placeholder="https://..."
          />
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleImageUpload}
            className="mt-2 block w-full text-sm text-(--color-smoke) file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-(--color-ember) file:text-(--color-crust) file:font-mono file:text-xs file:uppercase file:tracking-widest"
          />
          {imageLabel && (
            <p className="mt-2 text-xs text-(--color-basil)">{imageLabel}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
          />
        </div>

        {error && (
          <p className="text-sm text-(--color-ember) sm:col-span-2" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-3 sm:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded bg-(--color-ember) hover:bg-(--color-ember-2) disabled:opacity-60 transition-colors font-mono text-xs uppercase tracking-widest text-(--color-crust)"
          >
            {saving ? "Saving..." : editingId ? "Save changes" : "Add service"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-5 py-2.5 rounded border border-(--color-ink)/15 font-mono text-xs uppercase tracking-widest text-(--color-smoke) hover:bg-(--color-crust-2) transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.length === 0 && (
          <p className="text-sm text-(--color-smoke)">No services yet — add the first one above.</p>
        )}
        {services.map((s) => (
          <div key={s.id} className="ticket p-5 pt-7 border border-(--color-ink)/5">
            <div className="flex items-start justify-between gap-3">
              <div>
                {s.tag && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-(--color-basil)">
                    {s.tag}
                  </span>
                )}
                <h3 className="font-display text-lg">{s.name}</h3>
              </div>
            </div>
            {s.description && <p className="text-sm text-(--color-smoke) mt-2">{s.description}</p>}
            <div className="mt-3 space-x-3">
              <button
                onClick={() => startEdit(s)}
                className="font-mono text-xs uppercase tracking-widest text-(--color-basil) hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="font-mono text-xs uppercase tracking-widest text-(--color-ember) hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
