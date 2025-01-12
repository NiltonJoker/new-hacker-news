import { fireEvent, render, screen } from "@testing-library/react";
import SelectFilterMemorized from "../../../components/SelectFilter";

// Opciones de ejemplo
const options = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
];

// Crear un mock para setFilter
const setFilterMock = vi.fn();

describe("SelectFilter", () => {
  let container: HTMLElement;

  beforeEach(() => {
    const { container: renderedContainer } = render(
      <SelectFilterMemorized
        name="test-select"
        setFilter={setFilterMock}
        options={options}
      />
    );

    container = renderedContainer;
  });

  it("renders the options correctly", () => {
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("calls setFilter with the correct value when an option is selected", () => {
    const select = screen.getByRole("combobox", { name: /test-select/i });

    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: "2" } });

    expect(setFilterMock).toHaveBeenCalledWith("2");
  });

  it("rendered component match withes the snapshot", () => {
    // Usamos el container ya renderizado en el beforeEach
    expect(container).toMatchSnapshot();
  });

  it("has the correct default value", () => {
    const select = screen.getByRole("combobox", {
      name: /test-select/i,
    }) as HTMLSelectElement;
    expect(select.value).toBe("1"); // O el valor predeterminado esperado
  });


});
