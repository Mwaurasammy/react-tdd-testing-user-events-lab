import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm Sammy Mwaura`", () => {
  render(<App />);
  const topLevelHeading = screen.getByRole("heading", { name: /hi, i'm sammy mwaura/i, level: 1 });
  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);
  const image = screen.getByAltText("My profile pic");
  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);
  const secondLevelHeading = screen.getByRole("heading", { name: /about me/i, level: 2 });
  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);
  const bio = screen.getByText(/lorem ipsum/i);
  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);
  const githubLink = screen.getByRole("link", { name: /github/i });
  const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
  expect(githubLink).toHaveAttribute("href", "https://github.com");
  expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com");
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);
  const checkboxes = screen.getAllByRole("checkbox");
  expect(checkboxes).toHaveLength(3);
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);
  const checkboxes = screen.getAllByRole("checkbox");
  checkboxes.forEach(checkbox => {
    expect(checkbox).not.toBeChecked();
  });
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  const testName = "Sammy Mwaura";
  const testEmail = "sammy.mwaura@example.com";

  userEvent.type(nameInput, testName);
  userEvent.type(emailInput, testEmail);
  userEvent.click(submitButton);

  expect(nameInput).toHaveValue(testName);
  expect(emailInput).toHaveValue(testEmail);
  expect(screen.getByText(new RegExp(`Thank you for subscribing, ${testName}!`, "i"))).toBeInTheDocument();
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);
  const checkboxes = screen.getAllByRole("checkbox");
  checkboxes.forEach(checkbox => {
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const checkboxes = screen.getAllByRole("checkbox");
  const submitButton = screen.getByRole("button", { name: /submit/i });

  userEvent.type(nameInput, "Sammy Mwaura");
  userEvent.type(emailInput, "sammy.mwaura@example.com");
  userEvent.click(checkboxes[0]);
  userEvent.click(submitButton);

  const successMessage = screen.getByText(/thank you for subscribing, sammy mwaura!/i);
  expect(successMessage).toBeInTheDocument();
});
