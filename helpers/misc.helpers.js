const moment = require('moment');

module.exports = (hbs) => {
    hbs.registerHelper('date_format', (date) => {
        return moment(date).format('YYYY-MM-DD');
    });
    hbs.registerHelper('nav_path_active', (fullPath, path) => {
        return fullPath.startsWith(path) ? 'active' : '';
    });
}