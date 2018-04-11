import test from 'ava'
import Vector3 from '../built/Vector3'

test('Vector3 constructor', t => {
  let a = new Vector3(1, 2, 3)
  t.is(a.x, 1)
  t.is(a.y, 2)
  t.is(a.z, 3)
})

test('Vector3 normalize', t => {
  let a = new Vector3(0, 3, 4)
  a.normalize()

  t.is(a.x, 0)
  t.is(a.y, 0.6)
  t.is(a.z, 0.8)
})

test('Vector3 isEqual', t => {
  let a = new Vector3(1, 2, 3)
  let b = new Vector3(1, 2, 3)
  let c = new Vector3(2, 3, 4)

  t.is(Vector3.isEqual(a, b), true)
  t.is(Vector3.isEqual(a, c), false)
})

test('Vector3 negate', t => {
  let a = new Vector3(1, 2, 3)
  let b = Vector3.negate(a)
  t.is(b.x, -1)
  t.is(b.y, -2)
  t.is(b.z, -3)
})

test('Vector3 plus', t => {
  let a = new Vector3(1, 2, 3)
  let b = new Vector3(0, 0, 2)
  let c = new Vector3(1, -1, 1)
  let d = Vector3.plus(a, b, c)
  t.is(d.x, 2)
  t.is(d.y, 1)
  t.is(d.z, 6)
})

test('Vector3 scalarMultiply', t => {
  let a = new Vector3(1, 2, 3)
  let b = Vector3.scalarMultiply(2, a)
  t.is(b.x, 2)
  t.is(b.y, 4)
  t.is(b.z, 6)
})

test('Vector3 getNorm', t => {
  let a = new Vector3(0, 3, 4)
  t.is(Vector3.getNorm(a), 5)
})

test('Vector3 getDistance', t => {
  let a = new Vector3(0, 0, 3)
  let b = new Vector3(0, 4, 0)
  t.is(Vector3.getDistance(a, b), 5)
})

test('Vector3 innerProduct', t => {
  let a = new Vector3(0, 0, 3)
  let b = new Vector3(0, 4, 0)
  t.is(Vector3.innerProduct(a, b), 0)
})

test('Vector3 getAngle', t => {
  let a = new Vector3(0, 0, 3)
  let b = new Vector3(0, 4, 0)
  t.is(Vector3.getAngle(a, b), Math.PI / 2)
})

test('Vector3 crossProduct', t => {
  let a = new Vector3(0, 0, 3)
  let b = new Vector3(0, 4, 0)
  let c = Vector3.crossProduct(a, b)
  t.is(c.x, -12)
  t.is(c.y, 0)
  t.is(c.z, 0)
})