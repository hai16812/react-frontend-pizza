import { useEffect, useState } from "react";
import {
  listenFoodItems,
  addFoodItem,
  updateFoodItem,
  deleteFoodItem,
} from "../../firebase/firestoreApi";

const emptyForm = { name: "", description: "", price: "", category: "", imageUrl: "", available: true };

export default function ManageFoodItems() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageLabel, setImageLabel] = useState("");

  useEffect(() => {
    const unsub = listenFoodItems(setItems);
    return unsub;
  }, []);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      setError("Please choose a valid image file (PNG, JPG, JPEG)." );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setForm((f) => ({ ...f, imageUrl: typeof result === "string" ? result : "" }));
      setImageLabel(file.name);
      setError("");
    };
    reader.readAsDataURL(file);
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      category: item.category || "",
      imageUrl: item.imageUrl || "",
      available: item.available !== false,
    });
    setImageLabel(item.imageUrl ? (item.imageUrl.startsWith("data:image") ? "Uploaded image" : "Image URL") : "");
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
      setError("Give the dish a name.");
      return;
    }
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price) || 0 };
      if (editingId) {
        await updateFoodItem(editingId, payload);
      } else {
        await addFoodItem(payload);
      }
      cancelEdit();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Remove this item from the menu? This can't be undone.")) return;
    await deleteFoodItem(id);
    if (editingId === id) cancelEdit();
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl mb-1">Food items</h2>
        <p className="text-sm text-(--color-smoke)">
          Add new pizzas and sides, or remove ones that are off the menu. Changes appear on the
          public Menu page immediately.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="ticket p-6 pt-8 border border-(--color-ink)/5 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            placeholder="Margherita"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
            Price (USD)
          </label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            placeholder="14.00"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-(--color-smoke) mb-1">
            Category
          </label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded border border-(--color-ink)/15 bg-white px-3 py-2 text-sm"
            placeholder="Classic / Specialty / Side"
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
            placeholder="San Marzano tomato, fior di latte, basil, olive oil."
          />
        </div>

        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
          Available on the public menu
        </label>

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
            {saving ? "Saving..." : editingId ? "Save changes" : "Add food item"}
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

      <div className="ticket border border-(--color-ink)/5 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left font-mono text-[11px] uppercase tracking-widest text-(--color-smoke) border-b border-(--color-ink)/10">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--color-ink)/10">
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-(--color-smoke) text-center">
                  No food items yet — add the first one above.
                </td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3 text-(--color-smoke)">{item.category || "—"}</td>
                <td className="px-4 py-3 font-mono">${Number(item.price || 0).toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded ${
                      item.available !== false
                        ? "bg-(--color-basil)/15 text-(--color-basil)"
                        : "bg-(--color-ink)/10 text-(--color-smoke)"
                    }`}
                  >
                    {item.available !== false ? "Available" : "Hidden"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-3">
                  <button
                    onClick={() => startEdit(item)}
                    className="font-mono text-xs uppercase tracking-widest text-(--color-basil) hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="font-mono text-xs uppercase tracking-widest text-(--color-ember) hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
