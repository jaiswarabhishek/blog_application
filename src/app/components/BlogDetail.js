import styles from "@/app/styles/BlogDetail.module.css"; // Your responsive CSS module


export default function BlogDetail({blog}) {

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img src={blog.image} alt={blog.title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h1 className={styles?.title}>{blog.title}</h1>
        <p className={styles.date}>
          {new Date(blog.date).toLocaleDateString()}
        </p>
        <p className={styles.description}>{blog.description}</p>
      </div>
    </div>
  );
}
