export default {

    toSnakeCase(str) {
        return str &&
            str
                .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .map(x => x.toLowerCase())
                .join('_');
    },

    toKebabCase(str) {
        return str &&
            str
                .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .map(x => x.toLowerCase())
                .join('-');
    },

    toCamelCase(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    },

    toPascalCase(str) {

        return str.replace(/(\w)(\w*)/g,
            function (g0, g1, g2) {
                return g1.toUpperCase() + g2.toLowerCase();
            });
    }
}