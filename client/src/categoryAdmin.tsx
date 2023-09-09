import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface FormData {
  name: string;
  description: string;
}

const CategoryAdmin: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: ''
  });
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  // Fetch categories from server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<Category[]>('/api/categories'); // Adjust the URL as needed
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<Category>('/api/categories/create', formData);
      setCategories([...categories, res.data]);
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleUpdate = async (id: number, updatedData: Partial<Category>) => {
    try {
      const res = await axios.put<Category>(`/api/categories/update/${id}`, updatedData);
      setCategories(
        categories.map((category) => (category.id === id ? res.data : category))
      );
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/categories/delete/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      <h1>Category Admin</h1>

      {/* Create */}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </label>
        <button type="submit">Create Category</button>
      </form>

      {/* Read, Update, Delete */}
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {selectedCategory === category.id ? (
              <input
                type="text"
                value={category.name}
                onChange={(e) => handleUpdate(category.id, { name: e.target.value })}
              />
            ) : (
              <span>{category.name}</span>
            )}
            <button onClick={() => setSelectedCategory(category.id)}>Edit</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryAdmin;
