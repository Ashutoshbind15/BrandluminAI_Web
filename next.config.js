const path = require("path"); // Add this line to import the path module

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make Konva & react-konva work

    config.resolve.alias["jotai"] = path.resolve(
      __dirname,
      "node_modules/jotai"
    );

    return config;
  },
};

module.exports = nextConfig;
