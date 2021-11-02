"use strict";
exports.__esModule = true;
var react_hooks_1 = require("@testing-library/react-hooks");
var chai_1 = require("chai");
var useLocalStorage_1 = require("../../src/hooks/useLocalStorage");
describe('useLocalStorage', function () {
    beforeEach(function () {
        window.localStorage.clear();
    });
    function render() {
        var key = 'foo';
        var result = react_hooks_1.renderHook(function () { return useLocalStorage_1.useLocalStorage(key); });
        return {
            getValue: function () { return result.result.current[0]; },
            setValue: function (value) { return react_hooks_1.act(function () { return result.result.current[1](value); }); },
            setKey: function (value) {
                key = value;
                result.rerender();
            }
        };
    }
    it('returns undefined for empty storage', function () {
        var getValue = render().getValue;
        chai_1.expect(getValue()).to.equal(undefined);
    });
    it('parses existing values', function () {
        window.localStorage.setItem('foo', JSON.stringify({ a: 1 }));
        var getValue = render().getValue;
        chai_1.expect(getValue()).to.deep.equal({ a: 1 });
    });
    it('caches results', function () {
        window.localStorage.setItem('foo', JSON.stringify({ a: 1 }));
        var getValue = render().getValue;
        chai_1.expect(getValue()).to.deep.equal({ a: 1 });
        window.localStorage.setItem('foo', JSON.stringify({ a: 2 }));
        chai_1.expect(getValue()).to.deep.equal({ a: 1 });
    });
    it('returns undefined when cannot parse', function () {
        window.localStorage.setItem('foo', 'x{}y');
        var getValue = render().getValue;
        chai_1.expect(getValue()).to.equal(undefined);
    });
    it('modifies the localStorage and returns a the new value', function () {
        var _a = render(), getValue = _a.getValue, setValue = _a.setValue;
        chai_1.expect(getValue()).to.equal(undefined);
        setValue({ a: 1 });
        chai_1.expect(window.localStorage.getItem('foo')).to.equal('{"a":1}');
        chai_1.expect(getValue()).to.deep.equal({ a: 1 });
    });
    it('can remove the item by setting undefined', function () {
        window.localStorage.setItem('foo', 'true');
        var _a = render(), getValue = _a.getValue, setValue = _a.setValue;
        chai_1.expect(getValue()).to.equal(true);
        setValue(undefined);
        chai_1.expect(getValue()).to.equal(undefined);
        chai_1.expect(window.localStorage.getItem('foo')).to.equal(null);
    });
    it('can change keys', function () {
        window.localStorage.setItem('foo', 'true');
        var _a = render(), getValue = _a.getValue, setKey = _a.setKey;
        chai_1.expect(getValue()).to.equal(true);
        setKey('bar');
        chai_1.expect(getValue()).to.equal(undefined);
        chai_1.expect(window.localStorage.getItem('foo')).to.equal('true');
        chai_1.expect(window.localStorage.getItem('bar')).to.equal(null);
    });
    it('can change keys and modify the other value', function () {
        window.localStorage.setItem('foo', 'true');
        window.localStorage.setItem('bar', 'false');
        var _a = render(), getValue = _a.getValue, setValue = _a.setValue, setKey = _a.setKey;
        chai_1.expect(getValue()).to.equal(true);
        setValue(123);
        setKey('bar');
        chai_1.expect(getValue()).to.equal(false);
        setValue(456);
        chai_1.expect(window.localStorage.getItem('foo')).to.equal('123');
        chai_1.expect(window.localStorage.getItem('bar')).to.equal('456');
    });
});
//# sourceMappingURL=useLocalStorage.test.js.map