import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect } from "vitest";

import { ReactHookForm } from "./RHFForm";
import countriesReducer from "../countries/countriesSlice";
import submissionsReducer from "../submissions/submissionsSlice";

const createTestStore = () =>
  configureStore({
    reducer: {
      countries: countriesReducer,
      submissions: submissionsReducer,
    },
    preloadedState: {
      countries: {
        countries: ["Germany", "France", "Uzbekistan"],
      },
      submissions: {
        submissions: [],
      },
    },
  });

const renderForm = () => {
  const store = createTestStore();

  return render(
    <Provider store={store}>
      <ReactHookForm onClose={() => {}} />
    </Provider>
  );
};

describe("ReactHookForm", () => {
  it("renders form", () => {
    renderForm();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});