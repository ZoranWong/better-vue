const toString = Function.prototype.toString
function fnBody (fn) {
    return toString.call(fn).replace(/^[^{]*{\s*/, '').replace(/\s*}[^}]*$/, '')
}
export function isClass (fn) {
    if (typeof fn !== 'function') {
        return false
    }
    if (/^class[\s{]/.test(toString.call(fn))) {
        return true
    }
    // babel.js classCallCheck() & inlined
    const body = fnBody(fn)
    return (/classCallCheck\(/.test(body) || /TypeError\("Cannot call a class as a function"\)/.test(body))
}
