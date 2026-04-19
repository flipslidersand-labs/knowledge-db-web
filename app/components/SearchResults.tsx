'use client';

interface Document {
  id: string;
  title: string;
  abstract: string;
  source_url: string;
  source_type: string;
  published_at: string;
  authors: string;
  tags: string[];
  relevance_score: number;
}

interface SearchResultsProps {
  results: Document[];
  totalCount: number;
  query: string;
  responseMs: number;
}

export default function SearchResults({
  results,
  totalCount,
  query,
  responseMs,
}: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          &quot;{query}&quot; の検索結果がありません
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        {totalCount} 件の結果 ({responseMs}ms)
      </div>

      <div className="space-y-4">
        {results.map((doc) => (
          <div
            key={doc.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-600 hover:underline">
                  <a href={doc.source_url} target="_blank" rel="noopener noreferrer">
                    {doc.title}
                  </a>
                </h3>

                {doc.abstract && (
                  <p className="text-gray-700 mt-2 line-clamp-3">
                    {doc.abstract}
                  </p>
                )}

                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {doc.source_type}
                  </span>
                  {doc.tags && doc.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {doc.authors && (
                  <p className="text-sm text-gray-500 mt-2">
                    {doc.authors}
                  </p>
                )}

                <p className="text-xs text-gray-500 mt-1">
                  {new Date(doc.published_at).toLocaleDateString('ja-JP')}
                </p>
              </div>

              <div className="text-right">
                <div className="text-sm font-semibold text-green-600">
                  {(doc.relevance_score * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
