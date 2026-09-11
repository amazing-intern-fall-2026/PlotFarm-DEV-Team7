import type { Preview } from "@storybook/react";
import "../src/index.css";
import "../src/shared/config/i18n";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          "Giới thiệu",
          ["Tổng quan hệ thống"],
          "Shared",
          [
            "UI",
            [
              "Button",
              "Input",
              "Card",
              "Badge",
              "Avatar",
              "Modal",
              "StateView",
              "Skeleton",
              "Separator"
            ]
          ]
        ]
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#F8FAFC",
        },
        {
          name: "surface",
          value: "#FFFFFF",
        },
        {
          name: "dark",
          value: "#1F2937",
        },
      ],
    },
  },
};

export default preview;
