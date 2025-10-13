import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text-4xl font-bold">Documentation Template</h1>
        <p className="text-lg text-muted-foreground mt-4">
          A beautiful, modern documentation site built with Next.js and Fumadocs
        </p>

        <div className={styles.ctas}>
          <Link
            className={styles.primary}
            href="/docs"
          >
            View Documentation
          </Link>
          <a
            href="https://fumadocs.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Learn about Fumadocs
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3 max-w-3xl">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">📝 MDX Support</h3>
            <p className="text-sm text-muted-foreground">
              Write content in MDX with JSX components
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">🎨 Beautiful UI</h3>
            <p className="text-sm text-muted-foreground">
              Modern, responsive design with dark mode
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">⚡ Fast</h3>
            <p className="text-sm text-muted-foreground">
              Optimized performance with Next.js
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
