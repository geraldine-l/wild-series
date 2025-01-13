import type React from "react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface ProgramData {
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
}

interface ProgramFormProps {
  children: ReactNode;
  defaultValue: ProgramData;
  onSubmit: (program: ProgramData) => void;
}

function ProgramForm({ children, defaultValue, onSubmit }: ProgramFormProps) {
  const initialFormData: ProgramData = defaultValue || {
    title: "",
    synopsis: "",
    poster: "",
    country: "",
    year: new Date().getFullYear(),
    category_id: 1,
  };

  const [formData, setFormData] = useState<ProgramData>(initialFormData);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" || name === "category_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.title || !formData.category_id) {
      console.error("Missing required fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Titre :</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>
          Synopsis :
          <input
            type="text"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Affiche :
          <input
            type="text"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Pays :
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Année :
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Catégorie :
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type="submit">{children}</button>
    </form>
  );
}

export default ProgramForm;
