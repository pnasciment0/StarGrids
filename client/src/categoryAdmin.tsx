import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface FormData {
  categoryname: string;
}

const BASE_URL = "http://localhost:8001"

const CategoryAdmin: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    categoryname: ''
  });
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
  // Fetch categories from server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<Category[]>(`${BASE_URL}/api/categories`); // Adjust the URL as needed
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
      const res = await axios.post<Category>(`${BASE_URL}/api/categories/create`, formData);
      setCategories([...categories, res.data]);
      setFormData({ categoryname: '' });
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleUpdate = async (id: number, updatedData: Partial<Category>) => {
    try {
      const res = await axios.put<Category>(`${BASE_URL}/api/categories/update/${id}`, updatedData);
      setCategories(
        categories.map((category) => (category.id === id ? res.data : category))
      );
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/api/categories/delete/${id}`);
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
            value={formData.categoryname}
            onChange={(e) => setFormData({ categoryname: e.target.value })}
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
