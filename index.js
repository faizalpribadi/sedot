var cheerio = require('cheerio');

var types = {
    css: {
        selector: 'link[rel="stylesheets"]',
        attr: 'href'
    },

    js: {
        selector: 'script',
        attr: 'src'
    },

    imports: {
        selector: 'link[rel="import"]',
        attr: 'href'
    },

    links: {
        selector: 'a',
        attr: 'href'
    },

    images: {
        selector: 'img',
        attr: 'src'
    },

    text: {
        selector: 'p',
        attr: 'class'
    },

    div: {
        selector: 'div',
        attr: 'class'
    },

    title: {
        selector: 'title',
        attr: 'class'
    }
};

module.exports = function(src, type) {
    if (!src || !type) {
        throw new Error('`src` and `type` arguments must be required');
    }

    var chosenType = types[type];
    var $ = cheerio.load(src);

    return $(chosenType.selector).map(function(i, el) {
        return $(el).attr(chosenType.attr);
    }).toArray();
};