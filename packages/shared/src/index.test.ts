import { describe, it, expect } from "vitest";
import { PlotSchema } from "./index";

describe("PlotSchema Unit Tests", () => {
  it("should validate a valid plot object successfully", () => {
    const validPlot = {
      id: "plot-101",
      name: "North Farm Plot",
      area: 120.5,
      status: "AVAILABLE" as const
    };

    const result = PlotSchema.safeParse(validPlot);
    expect(result.success).toBe(true);
  });

  it("should fail validation when status is invalid", () => {
    const invalidPlot = {
      id: "plot-102",
      name: "South Farm Plot",
      area: 80.0,
      status: "INVALID_STATUS"
    };

    const result = PlotSchema.safeParse(invalidPlot);
    expect(result.success).toBe(false);
  });
});
