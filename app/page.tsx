'use client';

import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

interface SearchResult {
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

interface SearchResponse {
  query: string;
  results: SearchResult[];
  total_count: number;
  response_ms: number;
}

export default function Home() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [searchData, setSearchData] = useState<SearchResponse | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`);
      const data = await res.json();
      setStats(data.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, limit: 20 }),
      });

      if (!res.ok) throw new Error('Search failed');

      const data: { data: SearchResponse } = await res.json();
      setSearchData(data.data);
      setResults(data.data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Knowledge DB
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            分散した情報を検索・参照できるナレッジベース
          </p>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.total_documents}
                </div>
                <div className="text-sm text-gray-600">文書数</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.source_types}
                </div>
                <div className="text-sm text-gray-600">データソース</div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.days_covered}
                </div>
                <div className="text-sm text-gray-600">日数</div>
              </div>
            </div>
          )}
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <SearchForm onSearch={handleSearch} isLoading={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            エラー: {error}
          </div>
        )}

        {/* Results */}
        {searchData && results.length > 0 && (
          <SearchResults
            results={results}
            totalCount={searchData.total_count}
            query={searchData.query}
            responseMs={searchData.response_ms}
          />
        )}

        {searchData && results.length === 0 && !loading && (
          <SearchResults
            results={[]}
            totalCount={0}
            query={searchData.query}
            responseMs={searchData.response_ms}
          />
        )}

        {/* Empty State */}
        {!searchData && (
          <div className="text-center text-gray-500">
            <p>検索してナレッジを探索しましょう</p>
          </div>
        )}
      </div>
    </main>
  );
}
