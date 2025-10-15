import Link from 'next/link';
import css from './SideBarNotes.module.css';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function DefaultSidebar() {
  return (
    <aside className={css.sidebar}>
      <h3 className={css.title}>Filter by Tag</h3>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={
                tag === 'All' 
                  ? '/notes/filter/All' 
                  : `/notes/filter/${tag}`
              }
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}