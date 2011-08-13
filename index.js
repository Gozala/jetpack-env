/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true undef: true es5: true node: true devel: true
         forin: true latedef: false supernew: true */
/*global define: true */

"use strict";

const { components: { Constructor: CC } } = require('chrome')
const { get, set, exists } = CC('@mozilla.org/process/environment;1',
                                'nsIEnvironment')()

exports.env = Object.create(Proxy.create({
  getPropertyNames: function() [],
  getOwnPropertyNames: function() [],
  getOwnPropertyDescriptor: function(name) {
    return !exists(name) ? undefined : {
      value: get(name),
      enumerable: false,
      configurable: false,
      writable: true
    }
  },
  getPropertyDescriptor: function(name) this.getOwnPropertyDescriptor(name),
  defineProperty: function(name, { value }) set(name, value),
  delete: function(name) false,
  has: function(name) exists(name),
  hasOwn: function(name) exists(name),
  enumerate: function() [],
  keys: function() [],
  fix: function() undefined,
  get: function(proxy, name) get(name),
  set: function(proxy, name, value) set(name, value)
}), { toString: { value: Object.prototype.toString } })
