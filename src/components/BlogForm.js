// BlogForm.js
import React, { useState } from "react";
import styles from "@/app/styles/BlogForm.module.css";

const BlogForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the specific field in the formData object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = await response.json();
      console.log("Blog created:", result);

      // Reset form after successful submission
      setFormData({
        title: "",
        image: "",
        description: "",
        date: "",
      });
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };

  

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Create New Blog</h2>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="title">
          Title:
        </label>
        <input
          className={styles.input}
          type="text"
          id="title"
          name="title" // Use name attribute
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="image">
          Image URL:
        </label>
        <input
          className={styles.input}
          type="url"
          id="image"
          name="image" // Use name attribute
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="description">
          Description:
        </label>
        <textarea
          className={styles.input}
          id="description"
          name="description" // Use name attribute
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="date">
          Date:
        </label>
        <input
          className={styles.input}
          type="date"
          id="date"
          name="date" // Use name attribute
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

export default BlogForm;
