// components/LinkPreviewClient.tsx
import React, { useEffect, useState } from "react";

interface Props {
  url: string;
}

export const LinkPreview: React.FC<Props> = ({ url }) => {
  const [host, setHost] = useState<string>("");
  useEffect(() => {
    try {
      const u = new URL(url);
      setHost(u.hostname.replace(/^www\./, ""));
    } catch {
      setHost("");
    }
  }, [url]);

  if (!host) return null;

  // Favicon via DuckDuckGo (works without CORS)
  const favicon = `https://icons.duckduckgo.com/ip3/${host}.ico`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="flex gap-3 items-start border rounded-lg p-3 hover:shadow transition"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={favicon} alt={`${host} favicon`} className="w-8 h-8 rounded-sm" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{host}</div>
        <div className="text-xs text-slate-500 truncate">{url}</div>
      </div>
    </a>
  );
};
