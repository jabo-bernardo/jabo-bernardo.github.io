const ghPages = require('gh-pages');
ghPages.publish('dist', err => console.error(err));