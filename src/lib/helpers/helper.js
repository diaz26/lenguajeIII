const helper = require('handlebars');

helper.registerHelper("Condicion", function(v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == (v2 == 'undefined' ? undefined : v2)) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === (v2 == 'undefined' ? undefined : v2)) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != (v2 == 'undefined' ? undefined : v2 )) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== (v2 == 'undefined' ? undefined : v2)) ? options.fn(this) : options.inverse(this);
    }
})

helper.registerHelper("EstadoPedido", function (estado, nombre) {
    switch (estado) {
        /** entregado */
        case 5:
            return '<span class="badge badge-success" style="border-radius:0px; display: table-cell; height:30px; width:70px; vertical-align: middle;">' + nombre + '</span>'
        /** pendiente */
        case 6:
            return '<span class="badge badge-warning" style="border-radius:0px; display: table-cell; height:30px; width:70px; vertical-align: middle;">' + nombre + '</span>'
        /** anulado */
        case 7:
            return '<span class="badge badge-danger" style="border-radius:0px; display: table-cell; height:30px; width:70px; vertical-align: middle;">' + nombre + '</span>'
        /** rechazado */
        case 8:
            return '<span class="badge badge-danger" style="border-radius:0px; display: table-cell; height:30px; width:70px; vertical-align: middle;">' + nombre + '</span>'
    }
})

 