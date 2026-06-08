import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Provider } from "react-redux";


import { UncontrolledForm } from "./UncontrolledForm";
import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "../countries/countriesSlice";
import submissionsReducer from "../submissions/submissionsSlice";

const createTestStore = () =>
  configureStore({
    reducer: {
      countries: countriesReducer,
      submissions: submissionsReducer,
    },
  });

const renderForm = () => {
  const store = createTestStore();

  const result = render(
    <Provider store={store}>
      <UncontrolledForm onClose={() => {}} />
    </Provider>
  );

  return result;
};

describe("UncontrolledForm", () => {
  it("renders fields", () => {
    renderForm();

    const submit = screen.getAllByRole("button", { name: /submit/i })[0];

    expect(submit).toBeInTheDocument();
  });
});