import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";
import i18next from "i18next";

i18next
  .use({
    type: "postProcessor",
    name: "interpolator",
    process: (value, key, options = {}) => [value, ...Object.values(options).filter(x => x)].join(" | ")
  })
  .init({ postProcess: ["interpolator"] });