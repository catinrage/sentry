module.exports = {
  schema: 'https://localhost:4000',
  documents: './src/**/*.graphql',
  extensions: {
    endpoints: {
      default: {
        url: 'https://localhost:4000',
      },
    },
  },
};
