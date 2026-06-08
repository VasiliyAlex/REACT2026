import { describe, it, expect } from "vitest";
import submissionsReducer, { addSubmission } from "./submissionsSlice";

describe("submissionsSlice", () => {
  it("should add submission", () => {
    const state = { submissions: [] };

    const next = submissionsReducer(
      state,
      addSubmission({
        id: "1",
        type: "uncontrolled",
        name: "John",
        age: 20,
        email: "john@test.com",
        gender: "male",
        country: "USA",
        image: "",
        createdAt: Date.now(),
      })
    );

    expect(next.submissions.length).toBe(1);
  });
});