// BlogCard.js
import React from "react";
import styles from "@/app/styles/BlogCard.module.css";
import Link from "next/link";

const BlogCard = ({ image, title, description, date, onEdit, onDelete,id }) => {
  console.log(id)

  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <Link href={`/post/${id}`} passHref legacyBehavior>
        <a className={styles.cardLink}>
          <h2 className={styles.title}>{title}</h2>
        </a>
      </Link>
      <p className={styles.description}>{description}</p>
      <p className={styles.date}>{new Date(date).toLocaleDateString()}</p>
      <div className={styles.buttons}>
        <button
          className={styles.editButton}
          onClick={(e) => {
            e.preventDefault();
            onEdit();
          }}
        >
          Edit
        </button>
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
