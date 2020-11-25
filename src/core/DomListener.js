export default class DomListener {
    constructor($root) {
        if (!$root) {
            throw new Error(``);
        } else {
            this.$root = $root;
        }
    }
}