// BlogList.js
import React from "react";
import BlogCard from "./BlogCard";
import styles from '@/app/styles/BlogCard.module.css'
import EditModal from "./EditModal";
import { mutate } from "swr";
import { useState } from "react";

const BlogList = ({blog}) => {
 
 

    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (blog) => {
      setSelectedBlog(blog);
      setIsModalOpen(true);
    };


  const handleDelete = async (id) => {
    console.log(`Delete blog with id: ${id}`);
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
   

      if (response.ok) {
        mutate("/api/posts"); // This will re-fetch the data
      } else {
        const errorData = await response.json();
        console.error("Failed to delete blog:", errorData.error);
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleSave = async (updatedData) => {
    try {
      const response = await fetch(`/api/posts/${selectedBlog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
          const updatedPost = await response.json();
          // Mutate to re-fetch the posts after editing
          mutate("/api/posts"); // This will re-fetch the data
          setIsModalOpen(false);
          setSelectedBlog(null);
      } else {
        const errorData = await response.json();
        console.error("Failed to update blog:", errorData.error);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };



  return (
    <div className={styles.blogContainer}>
      {blog.map((blog) => (
        <BlogCard
          key={blog.id}
          id={blog.id}
          image={blog.image}
          title={blog.title}
          description={blog.description}
          date={blog.date}
          onEdit={() => handleEdit(blog)}
          onDelete={() => handleDelete(blog.id)}
        />
      ))}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        blogData={selectedBlog}
        onSave={handleSave}
      />
    </div>
  );
};

export default BlogList;
