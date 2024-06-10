const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");

module.exports = {
  mode: "development", // Set the mode to 'development
  plugins: [
    new ModuleFederationPlugin({
      name: "microfrontend1",
      filename: "remoteEntry.js",
      exposes: {
        "./Component": "./src/App", // Expose the App component
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Match both .ts and .tsx files
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        use: ["file-loader"],
      },
    ],
  },
  // Optional: If you're using TypeScript, you might want to resolve to the src directory.
  // This allows you to import files relatively to the src directory.
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
};
