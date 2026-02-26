import React from 'react';
import { getRelatedTools } from '../app/tool-relationships';

interface Tool {
  name: string;
  url: string;
  description: string;
}

export default function RelatedTools({ currentTool, className = '' }: { currentTool: string, className?: string }) {
  const relatedTools = getRelatedTools(currentTool) as Tool[];
  
  if (!relatedTools.length) return null;
  
  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Related Tools
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {relatedTools.map((tool) => (
          <a
            key={tool.url}
            href={tool.url}
            className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4 className="font-medium text-gray-900 mb-1">
              {tool.name}
            </h4>
            <p className="text-sm text-gray-600">
              {tool.description}
            </p>
          </a>
        ))}
      </div>
      <div className="mt-6 text-center">
        <a
          href="https://larrys-world.github.io/tools-directory/"
          className="text-blue-600 hover:underline text-sm"
        >
          View All Tools →
        </a>
      </div>
    </div>
  );
}