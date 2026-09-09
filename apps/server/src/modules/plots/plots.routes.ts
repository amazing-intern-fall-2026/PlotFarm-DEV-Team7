/**
 * @module plots/routes
 * @description Plots Routes — định nghĩa Express Router cho domain Plots.
 *
 * Trách nhiệm:
 *  - Khai báo tất cả HTTP endpoints của module Plots
 *  - Phân quyền: public routes vs protected routes (authGuard middleware)
 *  - Gắn middleware validate schema (Zod) cho request body / query params
 *  - Map endpoint → controller handler tương ứng
 *
 * Routes sẽ định nghĩa:
 *  GET    /          → plotsController.getPlots      [public]
 *  GET    /:id       → plotsController.getPlotById   [public]
 *  POST   /          → plotsController.createPlot    [authGuard + role:admin]
 *  PATCH  /:id       → plotsController.updatePlot    [authGuard + role:admin]
 *  DELETE /:id       → plotsController.deletePlot    [authGuard + role:admin]
 *
 * Mount tại: /api/plots (do modules/index.ts quy định)
 *
 * TODO: Implement sau khi controller và middleware sẵn sàng
 */
