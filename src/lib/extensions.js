// eslint-disable-next-line
String.prototype.capitalize = function () {
    //return this.charAt(0).toUpperCase() + this.slice(1);
    return this.toLowerCase().replace(/./,(x)=>x.toUpperCase()).replace(/[^']\b\w/g,(y)=>y.toUpperCase());
}