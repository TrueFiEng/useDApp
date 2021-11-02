"use strict";
exports.__esModule = true;
var chai_1 = require("chai");
var src_1 = require("../../src");
var CurrencyValue_1 = require("../../src/model/CurrencyValue");
var dollar = new src_1.FiatCurrency('Dollar', 'USD', 2, { prefix: '$' });
var euro = new src_1.FiatCurrency('Euro', 'EUR');
describe('CurrencyValue', function () {
    it('can be constructed', function () {
        var value = CurrencyValue_1.CurrencyValue.fromString(dollar, '2137');
        chai_1.expect(value.toString()).to.equal('2137');
    });
    it('zero', function () {
        var value = CurrencyValue_1.CurrencyValue.zero(dollar);
        chai_1.expect(value.toString()).to.equal('0');
    });
    it('format', function () {
        var value = CurrencyValue_1.CurrencyValue.fromString(dollar, '420691337');
        chai_1.expect(value.format()).to.equal('$4,206,913.37');
    });
    it('map', function () {
        var value = CurrencyValue_1.CurrencyValue.fromString(dollar, '123');
        var mapped = value.map(function (x) { return x.add(1); });
        chai_1.expect(mapped.toString()).to.equal('124');
    });
    it('add', function () {
        var a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        var b = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        var e = CurrencyValue_1.CurrencyValue.zero(euro);
        chai_1.expect(function () { return a.add(e); }).to["throw"](TypeError);
        var c = a.add(b);
        chai_1.expect(c.toString()).to.equal('489');
    });
    it('sub', function () {
        var a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        var b = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        var e = CurrencyValue_1.CurrencyValue.zero(euro);
        chai_1.expect(function () { return a.sub(e); }).to["throw"](TypeError);
        var c = a.sub(b);
        chai_1.expect(c.toString()).to.equal('351');
    });
    it('mul', function () {
        var a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        chai_1.expect(a.mul(69).toString()).to.equal('28980');
    });
    it('div', function () {
        var a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        chai_1.expect(a.div(69).toString()).to.equal('6');
    });
    it('mod', function () {
        var a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        chai_1.expect(a.mod(69).toString()).to.equal('6');
    });
    it('equals', function () {
        var a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        var b = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        var c = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        var d = CurrencyValue_1.CurrencyValue.fromString(euro, '69');
        chai_1.expect(a.equals(b)).to.be["true"];
        chai_1.expect(b.equals(a)).to.be["true"];
        chai_1.expect(a.equals(c)).to.be["false"];
        chai_1.expect(a.equals(d)).to.be["false"];
    });
    it('lt', function () {
        var a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        var b = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        var c = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        var e = CurrencyValue_1.CurrencyValue.zero(euro);
        chai_1.expect(function () { return a.lt(e); }).to["throw"](TypeError);
        chai_1.expect(a.lt(b)).to.be["false"];
        chai_1.expect(b.lt(a)).to.be["false"];
        chai_1.expect(a.lt(c)).to.be["false"];
        chai_1.expect(c.lt(a)).to.be["true"];
    });
    it('lte', function () {
        var a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        var b = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        var c = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        var e = CurrencyValue_1.CurrencyValue.zero(euro);
        chai_1.expect(function () { return a.lte(e); }).to["throw"](TypeError);
        chai_1.expect(a.lte(b)).to.be["true"];
        chai_1.expect(b.lte(a)).to.be["true"];
        chai_1.expect(a.lte(c)).to.be["false"];
        chai_1.expect(c.lte(a)).to.be["true"];
    });
    it('gt', function () {
        var a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        var b = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        var c = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        var e = CurrencyValue_1.CurrencyValue.zero(euro);
        chai_1.expect(function () { return a.gt(e); }).to["throw"](TypeError);
        chai_1.expect(a.gt(b)).to.be["false"];
        chai_1.expect(b.gt(a)).to.be["false"];
        chai_1.expect(a.gt(c)).to.be["true"];
        chai_1.expect(c.gt(a)).to.be["false"];
    });
    it('gte', function () {
        var a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        var b = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        var c = CurrencyValue_1.CurrencyValue.fromString(dollar, '69');
        var e = CurrencyValue_1.CurrencyValue.zero(euro);
        chai_1.expect(function () { return a.gte(e); }).to["throw"](TypeError);
        chai_1.expect(a.gte(b)).to.be["true"];
        chai_1.expect(b.gte(a)).to.be["true"];
        chai_1.expect(a.gte(c)).to.be["true"];
        chai_1.expect(c.gte(a)).to.be["false"];
    });
    it('isZero', function () {
        var a = CurrencyValue_1.CurrencyValue.fromString(dollar, '420');
        var b = CurrencyValue_1.CurrencyValue.fromString(dollar, '0');
        chai_1.expect(a.isZero()).to.be["false"];
        chai_1.expect(b.isZero()).to.be["true"];
    });
});
//# sourceMappingURL=CurrencyValue.test.js.map