import Link from "next/link";
import TagsMenu from "@/components/TagsMenu/TagsMenu";

export default function Header() {
  return (
    <header style={{
      padding: "1rem 2rem",
      borderBottom: "1px solid #eee",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <Link href="/" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        NoteHub
      </Link>
      <nav style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <TagsMenu />
        <Link href="/notes/create">
          Create Note
        </Link>
      </nav>
    </header>
  );
}