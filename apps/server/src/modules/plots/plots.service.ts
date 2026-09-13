import { PlotSchema, type Plot } from "@repo/shared";

const mockPlots: Plot[] = [
  {
    plotCode: "PLT-A01",
    plotNumber: "Plot A-01",
    areaSquareMeters: 50,
    status: "AVAILABLE",
    pricePerMonth: 1000000,
    soilType: "Đất đỏ Bazan Lâm Đồng",
    iotSensorInstalled: true,
    cameraSupported: true,
  },
  {
    plotCode: "PLT-A02",
    plotNumber: "Plot A-02",
    areaSquareMeters: 45,
    status: "OCCUPIED",
    pricePerMonth: 950000,
    soilType: "Đất phù sa",
    iotSensorInstalled: true,
    cameraSupported: false,
  },
];

export function getMockPlots(): Plot[] {
  return mockPlots.map((plot) => {
    const result = PlotSchema.safeParse(plot);
    if (!result.success) {
      throw new Error(
        `Mock plot data does not match PlotSchema: ${result.error.message}`,
      );
    }
    return result.data;
  });
}
