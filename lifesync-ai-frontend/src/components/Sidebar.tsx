import { navSections } from "../data/mock";
import type { NavBadge, User } from "../data/types";
import { Icon } from "./Icon";

interface Props {
  user: User;
  activeId: string;
  open: boolean;
  onNavigate: (id: string) => void;
  onClose: () => void;
}

const badgeClass = (b: NavBadge) => `nav-badge nav-badge--${b.tone}`;

export function Sidebar({ user, activeId, open, onNavigate, onClose }: Props) {
  return (
    <>
      <div className={`scrim ${open ? "scrim--on" : ""}`} onClick={onClose} aria-hidden="true" />
      <aside className={`sidebar ${open ? "sidebar--open" : ""}`} aria-label="Primary">
        <div className="sidebar__brand">
          <div className="brand">
            <span className="brand__logo" aria-hidden="true">
              <Icon name="neural" size={18} />
            </span>
            <span className="brand__name">LifeSync AI</span>
          </div>
          <span className="chip chip--blue-text">OS v2.4</span>
        </div>

        <nav className="sidebar__nav">
          {navSections.map((section) => (
            <div className="nav-section" key={section.id}>
              <p className="nav-section__label">{section.label}</p>
              {section.items.map((item) => {
                const active = item.id === activeId;
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    className={`nav-link ${active ? "nav-link--active" : ""}`}
                    aria-current={active ? "page" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                  >
                    <span className="nav-link__main">
                      <Icon name={item.icon} size={16} />
                      <span>{item.label}</span>
                    </span>
                    {item.badge && <span className={badgeClass(item.badge)}>{item.badge.label}</span>}
                  </a>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div className="status-card">
            <span className="dot dot--violet" />
            <div className="status-card__text">
              <p className="status-card__title">Personal Intelligence Active</p>
              <p className="status-card__sub">High Confidence Sync</p>
            </div>
          </div>
          <a href="/settings" className="nav-link" onClick={(e) => e.preventDefault()}>
            <span className="nav-link__main">
              <Icon name="settings" size={16} />
              <span>Settings &amp; Preferences</span>
            </span>
          </a>
          <div className="profile">
            <div className="profile__who">
              <Avatar name={user.name} src={user.avatarUrl} />
              <div>
                <p className="profile__name">{user.name}</p>
                <p className="profile__email">{user.email}</p>
              </div>
            </div>
            <button className="icon-btn icon-btn--sm" aria-label="Sign out">
              <Icon name="logout" size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export function Avatar({ name, src, size = 32 }: { name: string; src?: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <span className="avatar" style={{ width: size, height: size }}>
      {src ? <img src={src} alt="" /> : <span>{initials}</span>}
    </span>
  );
}
