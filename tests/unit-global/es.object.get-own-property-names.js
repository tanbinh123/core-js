import { includes } from '../helpers/helpers';

QUnit.test('Object.getOwnPropertyNames', assert => {
  const { freeze, getOwnPropertyNames } = Object;
  assert.isFunction(getOwnPropertyNames);
  assert.arity(getOwnPropertyNames, 1);
  assert.name(getOwnPropertyNames, 'getOwnPropertyNames');
  assert.looksNative(getOwnPropertyNames);
  assert.nonEnumerable(Object, 'getOwnPropertyNames');
  function F1() {
    this.w = 1;
  }
  function F2() {
    this.toString = 1;
  }
  F1.prototype.q = F2.prototype.q = 1;
  const names = getOwnPropertyNames([1, 2, 3]);
  assert.same(names.length, 4);
  assert.true(includes(names, '0'));
  assert.true(includes(names, '1'));
  assert.true(includes(names, '2'));
  assert.true(includes(names, 'length'));
  assert.deepEqual(getOwnPropertyNames(new F1()), ['w']);
  assert.deepEqual(getOwnPropertyNames(new F2()), ['toString']);
  assert.true(includes(getOwnPropertyNames(Array.prototype), 'toString'));
  assert.true(includes(getOwnPropertyNames(Object.prototype), 'toString'));
  assert.true(includes(getOwnPropertyNames(Object.prototype), 'constructor'));
  assert.deepEqual(getOwnPropertyNames(freeze({})), [], 'frozen');
  const primitives = [42, 'foo', false];
  for (const value of primitives) {
    assert.notThrows(() => getOwnPropertyNames(value), `accept ${ typeof value }`);
  }
  assert.throws(() => {
    getOwnPropertyNames(null);
  }, TypeError, 'throws on null');
  assert.throws(() => {
    getOwnPropertyNames(undefined);
  }, TypeError, 'throws on undefined');
  /* Chakra bug
  if (typeof document != 'undefined' && document.createElement) {
    assert.notThrows(() => {
      const iframe = document.createElement('iframe');
      iframe.src = 'http://example.com';
      document.documentElement.appendChild(iframe);
      const window = iframe.contentWindow;
      document.documentElement.removeChild(iframe);
      return getOwnPropertyNames(window);
    }, 'IE11 bug with iframe and window');
  }
  */
});

