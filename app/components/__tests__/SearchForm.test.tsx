import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import SearchForm from "../SearchForm";

describe("SearchForm", () => {
  it("renders input and button", () => {
    render(<SearchForm onSearch={vi.fn()} isLoading={false} />);
    expect(screen.getByPlaceholderText(/検索クエリを入力/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "検索" })).toBeInTheDocument();
  });

  it("calls onSearch with trimmed query on submit", async () => {
    const onSearch = vi.fn();
    render(<SearchForm onSearch={onSearch} isLoading={false} />);

    await userEvent.type(
      screen.getByPlaceholderText(/検索クエリを入力/),
      "machine learning",
    );
    await userEvent.click(screen.getByRole("button", { name: "検索" }));

    expect(onSearch).toHaveBeenCalledOnce();
    expect(onSearch).toHaveBeenCalledWith("machine learning");
  });

  it("does not submit when query is empty", async () => {
    const onSearch = vi.fn();
    render(<SearchForm onSearch={onSearch} isLoading={false} />);

    await userEvent.click(screen.getByRole("button", { name: "検索" }));

    expect(onSearch).not.toHaveBeenCalled();
  });

  it("disables input and button while loading", () => {
    render(<SearchForm onSearch={vi.fn()} isLoading={true} />);

    expect(screen.getByPlaceholderText(/検索クエリを入力/)).toBeDisabled();
    expect(screen.getByRole("button", { name: "検索中..." })).toBeDisabled();
  });
});
