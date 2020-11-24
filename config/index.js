import dev from './dev.js';
import prod from './prod.js';

module.exports = process.env.NODE_ENV === 'development' ? dev : prod;
