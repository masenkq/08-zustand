'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import css from './SidebarNotes.module.css';

const tags = ['All', 'Work', 'Personal', 'Ideas', 'Important'];

export default function SidebarNotes() {
  const pathname = usePathname();

  const getTagFromPath = (path: string) => {
    const match = path.match(/\/notes\/filter\/(.+)/);
    return match ? match[1] : 'All';
  };

  const currentTag = getTagFromPath(pathname);

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
              className={`${css.menuLink} ${
                currentTag === tag ? css.menuLinkActive : ''
              }`}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}