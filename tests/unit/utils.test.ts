import { formatName, clamp } from "@/lib/utils";

describe("formatName", () => {
  it("trims and title-cases", () => {
    expect(formatName("  john doe  ")).toBe("John Doe");
  });
  it("handles already-uppercase input", () => {
    expect(formatName("ALICE")).toBe("Alice");
  });
});

describe("clamp", () => {
  it("returns value when within range", () => expect(clamp(5, 0, 10)).toBe(5));
  it("clamps to min", () => expect(clamp(-1, 0, 10)).toBe(0));
  it("clamps to max", () => expect(clamp(15, 0, 10)).toBe(10));
});
