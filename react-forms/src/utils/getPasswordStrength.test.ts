import { describe, it, expect } from "vitest";
import { getPasswordStrength } from "./passwordStrength";

describe("getPasswordStrength", () => {
  it("returns all false for empty password", () => {
    expect(getPasswordStrength("")).toEqual({
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: false,
      hasSpecial: false,
    });
  });

  it("detects number correctly", () => {
    expect(getPasswordStrength("abc1")).toMatchObject({
      hasNumber: true,
    });
  });

  it("detects uppercase correctly", () => {
    expect(getPasswordStrength("abcD")).toMatchObject({
      hasUppercase: true,
    });
  });

  it("detects lowercase correctly", () => {
    expect(getPasswordStrength("ABCd")).toMatchObject({
      hasLowercase: true,
    });
  });

  it("detects special characters correctly", () => {
    expect(getPasswordStrength("abc@")).toMatchObject({
      hasSpecial: true,
    });
  });

  it("returns full strength for strong password", () => {
    expect(getPasswordStrength("Abc123!")).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecial: true,
    });
  });

  it("handles password with no special characters", () => {
    expect(getPasswordStrength("Abc123")).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecial: false,
    });
  });
});