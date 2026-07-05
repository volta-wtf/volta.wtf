import React from 'react';
import { Avatar } from '../ui/Avatar.jsx';

/** AvatarStack — overlapping presence avatars + overflow count. */
export function AvatarStack({ users = [], max = 4, size = 'md', presence = true, className = '', ...rest }) {
  const shown = users.slice(0, max);
  const extra = users.length - shown.length;
  return (
    <span className={`dsr-avatarstack ${className}`.trim()} {...rest}>
      {shown.map((u) => (
        <Avatar key={u.name} name={u.name} src={u.src} size={size} presence={presence} />
      ))}
      {extra > 0 ? <span className={`dsr-avatar${size !== 'md' ? ` dsr-avatar--${size}` : ''} dsr-avatarstack__more`}>+{extra}</span> : null}
    </span>
  );
}
