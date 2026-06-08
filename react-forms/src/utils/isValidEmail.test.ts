import { describe, it, expect } from "vitest";
import { isValidEmail } from "./emailValidation";

describe("isValidEmail", () => {
  it("returns true for valid email", () => {
    expect(isValidEmail("john@test.com")).toBe(true);
  });

  it("returns false if email has no @", () => {
    expect(isValidEmail("johntest.com")).toBe(false);
  });

  it("returns false if email has multiple @", () => {
    expect(isValidEmail("john@@test.com")).toBe(false);
  });

  it("returns false if local part is empty", () => {
    expect(isValidEmail("@test.com")).toBe(false);
  });

  it("returns false if domain is empty", () => {
    expect(isValidEmail("john@")).toBe(false);
  });

  it("returns false if domain has no dot", () => {
    expect(isValidEmail("john@testcom")).toBe(false);
  });

  it("returns true for subdomain emails", () => {
    expect(isValidEmail("john@mail.google.com")).toBe(true);
  });

  it("returns false for whitespace-only parts", () => {
    expect(isValidEmail("   @test.com")).toBe(false);
    expect(isValidEmail("john@   ")).toBe(false);
  });
});