import { useEffect, useRef } from "react";
import type { SyncStatus, User } from "../data/types";
import { Avatar } from "./Sidebar";
import { Icon } from "./Icon";

interface Props {
  user: User;
  sync: SyncStatus;
  onMenu: () => void;
  onAsk: () => void;
  onQuickAdd: () => void;
}

export function Header({ user, sync, onMenu, onAsk, onQuickAdd }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K focuses search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="header">
      <button className="icon-btn header__menu" onClick={onMenu} aria-label="Open navigation">
        <Icon name="menu" size={20} />
      </button>

      <div className="search">
        <Icon name="search" size={14} className="search__icon" />
        <input
          ref={inputRef}
          type="search"
          className="search__input"
          placeholder="Search obligations, documents, subscriptions, apps..."
          aria-label="Search"
        />
        <kbd className="search__kbd">⌘K</kbd>
      </div>

      <div className="header__actions">
        <button className="btn btn--ghost-violet" onClick={onAsk}>
          <Icon name="sparkle" size={14} />
          <span>Ask LifeSync AI</span>
        </button>
        <button className="btn btn--blue" onClick={onQuickAdd}>
          <Icon name="plus" size={12} strokeWidth={2.5} />
          <span>Quick Add</span>
        </button>
        <span className="header__divider" aria-hidden="true" />
        <span className="chip chip--sync">
          <span className="dot dot--blue" />
          {sync.appsSynced} Apps Synced ({sync.lastSyncedLabel})
        </span>
        <button className="icon-btn header__bell" aria-label="Notifications (unread)">
          <Icon name="bell" size={16} />
          <span className="header__bell-dot" />
        </button>
        <Avatar name={user.name} src={user.avatarUrl} />
      </div>
    </header>
  );
}
