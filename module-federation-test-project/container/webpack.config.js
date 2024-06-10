const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        Microfrontend1: "microfrontend1@http://localhost:3001/remoteEntry.js",
        Microfrontend2: "microfrontend1@http://localhost:3002/remoteEntry.js",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true } },
    }),
  ],
};
