const helper = require('handlebars');

helper.registerHelper("Condicion", function(v1, operator, v2, options) {
    switch (operator) {
        case '==':
            console.log(v1, v2);
            return (v1 == (v2 == 'undefined' ? undefined : v2)) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === (v2 == 'undefined' ? undefined : v2)) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != (v2 == 'undefined' ? undefined : v2 )) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== (v2 == 'undefined' ? undefined : v2)) ? options.fn(this) : options.inverse(this);
    }
})

 