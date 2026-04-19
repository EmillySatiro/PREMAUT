import { CSSProperties, ReactNode } from "react";

import { PersonCard } from "../types";
import { GoPencil } from "react-icons/go";

type ProfileIdentityCardProps = {
  className: string;
  profile: PersonCard;
  avatarLabel: string;
  tagClassName: string;
  tagBackgroundColor?: string;
  tagBorderColor?: string;
  tagTextColor?: string;
  colorActionContent?: string;
  actionAriaLabel?: string;
  actionButtonClassName?: string;
  onActionClick?: () => void;
};

export default function ProfileIdentityCard({
  className,
  profile,
  avatarLabel,
  tagClassName,
  tagBackgroundColor,
  tagBorderColor,
  tagTextColor,
  colorActionContent = "var(--blue)",
  actionAriaLabel = "Editar perfil",
  actionButtonClassName = "mini-edit",
  onActionClick
}: ProfileIdentityCardProps) {
  const tagStyle: CSSProperties = {
    ...(tagBackgroundColor ? { background: tagBackgroundColor } : {}),
    ...(tagBorderColor ? { borderColor: tagBorderColor } : {}),
    ...(tagTextColor ? { color: tagTextColor } : {})
  };

  return (
    <article className={className}>
      <button
        type="button"
        className={actionButtonClassName}
        aria-label={actionAriaLabel}
        onClick={onActionClick}
      >
        <GoPencil color={colorActionContent} />
      </button>
      <div className="avatar-large">{avatarLabel}</div>
      <h2>{profile.nome}</h2>
      <p className="profile-subtitle">cadastrado em : {profile.cadastroEm}</p>
      <p className="profile-contact">tel {profile.telefone}</p>
      <p className="profile-contact">mail {profile.email}</p>
      <span className={tagClassName} style={tagStyle}>{profile.tipo}</span>
    </article>
  );
}