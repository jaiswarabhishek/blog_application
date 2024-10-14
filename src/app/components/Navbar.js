import Link from "next/link";
import styles from "@/app/styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">My Blog</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/admin/create">Create Blogs</Link>
        </li>
      </ul>
      <div className={styles.menuToggle}>
        <input type="checkbox" className={styles.checkbox} />
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <ul className={styles.mobileMenu}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/admin/create">Create Blogs</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
