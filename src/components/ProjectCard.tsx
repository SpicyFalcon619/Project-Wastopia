'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  tags: string[];
  extraInfo: string;
  link: string;
  linkText: string;
}

export default function ProjectCard({ title, description, tags, extraInfo, link, linkText }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isExternal = link.startsWith('http');

  return (
    <div
      className={`proj magnetic ${isExpanded ? 'expanded' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
      tabIndex={0}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="tags">
        {tags.map(tag => (
          <div key={tag} className="tag">{tag}</div>
        ))}
      </div>

      <div className="proj-extra">
        <p>{extraInfo}</p>

        {isExternal ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-link"
            onClick={e => e.stopPropagation()}
          >
            {linkText}
          </a>
        ) : (
          <Link
            href={link}
            className="proj-link"
            onClick={e => e.stopPropagation()}
          >
            {linkText}
          </Link>
        )}
      </div>
    </div>
  );
}
