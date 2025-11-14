const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

// Export function to properly detect webpack mode
module.exports = (env, argv) => {
  const isProduction = argv.mode === "production" || process.env.NODE_ENV === "production";
  
  return {
    entry: "./src/App.ts",
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "inline-source-map",
    module: {
      rules: [{ test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ }],
    },
    resolve: { 
      extensions: [".tsx", ".ts", ".js"],
      // Optimize module resolution
      modules: ["node_modules", path.resolve(__dirname, "src")],
    },
    output: { 
      filename: "bundle.js", 
      path: path.resolve(__dirname, "dist"),
      // Clean output directory on build
      clean: true,
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: isProduction, // Remove console.log in production
              drop_debugger: isProduction,
              pure_funcs: isProduction ? ["console.log", "console.info", "console.debug"] : [],
              passes: 2, // Multiple passes for better optimization
              dead_code: true, // Remove unreachable code
              unused: true, // Remove unused variables
            },
            mangle: {
              safari10: true, // Fix Safari 10 issues
              properties: false, // Don't mangle property names (safer)
            },
            format: {
              comments: false, // Remove all comments
            },
          },
          extractComments: false, // Don't extract comments to separate file
        }),
      ],
      // Tree shaking - remove unused exports
      usedExports: true,
      sideEffects: false,
      // Module concatenation for better performance
      concatenateModules: isProduction,
      // Code splitting for vendor code
      splitChunks: isProduction ? {
        chunks: "all",
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: "vendor",
            chunks: "all",
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            reuseExistingChunk: true,
          },
        },
      } : false,
    },
    // Performance hints
    performance: {
      hints: isProduction ? "warning" : false,
      maxEntrypointSize: 512000, // 500KB
      maxAssetSize: 512000, // 500KB
    },
  };
};
