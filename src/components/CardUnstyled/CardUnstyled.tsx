import React from "react";

interface CardUnstyledProps {
  cardStyle?: string;
  cardBodyStyle?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export default function CardUnstyled({
  cardStyle,
  cardBodyStyle,
  style,
  children,
}: CardUnstyledProps) {
  return (
    <div className={`card ${cardStyle}`}>
      <div className={`card-body ${cardBodyStyle}`} style={style}>
        {children}
      </div>
    </div>
  );
}
