const context = require.context("./", false, /\.json$/);
export default context.keys().reduce((acc, file) => ({ ...acc, [context(file).key]: context(file) }), {});