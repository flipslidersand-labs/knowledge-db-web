import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SearchResults from "../SearchResults";

const baseProps = {
  query: "RAG",
  totalCount: 0,
  responseMs: 42,
  results: [],
};

const mockDoc = {
  id: "1",
  title: "Introduction to RAG",
  abstract: "Retrieval-augmented generation overview.",
  source_url: "https://example.com/rag",
  source_type: "arxiv",
  published_at: "2024-01-15T00:00:00Z",
  authors: "Taro Yamada",
  tags: ["rag", "llm", "retrieval"],
  relevance_score: 0.92,
};

describe("SearchResults", () => {
  it("shows empty message when results is empty", () => {
    render(<SearchResults {...baseProps} />);
    expect(
      screen.getByText(/"RAG" の検索結果がありません/),
    ).toBeInTheDocument();
  });

  it("renders document title as link", () => {
    render(<SearchResults {...baseProps} totalCount={1} results={[mockDoc]} />);

    const link = screen.getByRole("link", { name: "Introduction to RAG" });
    expect(link).toHaveAttribute("href", "https://example.com/rag");
  });

  it("shows result count and response time", () => {
    render(<SearchResults {...baseProps} totalCount={1} results={[mockDoc]} />);
    expect(screen.getByText(/1 件の結果/)).toBeInTheDocument();
    expect(screen.getByText(/42ms/)).toBeInTheDocument();
  });

  it("shows relevance score formatted as percentage", () => {
    render(<SearchResults {...baseProps} totalCount={1} results={[mockDoc]} />);
    expect(screen.getByText("92.0%")).toBeInTheDocument();
  });

  it("renders up to 3 tags", () => {
    render(<SearchResults {...baseProps} totalCount={1} results={[mockDoc]} />);
    expect(screen.getByText("rag")).toBeInTheDocument();
    expect(screen.getByText("llm")).toBeInTheDocument();
    expect(screen.getByText("retrieval")).toBeInTheDocument();
  });
});
