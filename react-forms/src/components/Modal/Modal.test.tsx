import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders when open", () => {
    render(
      <Modal isOpen title="Test Modal" onClose={() => {}}>
        Content
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Modal isOpen={false} title="Test" onClose={() => {}}>
        Content
      </Modal>
    );

    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });
});