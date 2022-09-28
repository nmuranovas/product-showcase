import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("should display button", () => {
    const label = "Test Label";

    render(<Button label={label} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
