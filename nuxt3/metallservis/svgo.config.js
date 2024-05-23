module.exports = {
  js2svg: {
    eol: "lf",
    indent: 2,
    pretty: true,
  },
  multipass: true,
  plugins: [
    {
      name: "preset-default",
    },
    "reusePaths",
  ],
};
