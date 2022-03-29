// TypeScript Краткая шпаргалка

let integer: number = 1;
let float: number = 1.3;
let str: string = 'text';
let an: any = 0; // любой
let unusable: void = undefined; // undefined или null
let undef: undefined = undefined;
let nul: null = null;
let bool: boolean = true;
let union: undefined | null | string | number = 'text';

let arr1: number[] = [1, 2, 3];
let arr12: string[] = ['1', '2', '3'];
let arr5: (string | number)[] = [1, '2', '3'];
let arr2: Array<number> = [1, 2, 3];
let arr3: ReadonlyArray<number> = [1, 2, 3];
let tuple: [number, string] = [1, 'text'];
let matrix: number[][] = [[1, 2], [3, 4]];

let obj: {a?: number} =  {a: 1}; // необязательное свойство "а"

let [first, second, ...rest] = [1, 2, 3, 4];

let {one, two}: {one: string, two: number} = {
    one: 'text',
    two: 1
};

// Приведение типов переменных

let someValue: any = 'this is a string';
let strLength1: number = (someValue as string).length;
let strLength2: number = (<string>someValue).length;

// Функции

function func (a?: number, b?: string): void {
  return;
}

const func3 = (a?: number, b?: string): void => {
    return;
};

function error (message: string = 'text'): never {
  throw new Error(message);
}

function func5 (): Fish | Bird {
    // ...
}

// Перегрузка функции
// это возможность создавать несколько одноименных функций с разными реализациями

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    if (typeof x == "object") {
        return Math.floor(Math.random() * x.length);
    } else if (typeof x == "number") {
        return {suit: suits[Math.floor(x / 13)], card: x % 13 };
    }
}

// Type

type Login = string;
const login: Login = 'admin';

type ID = string | number;
const id1: ID = 1234;

// Interface

interface IRect {
  readonly id: string;
  color?: string;
  size: {
    width: number;
    height: number;
  }
}

const rect1: IRect = {
  id: '1234',
  size: {
    width: 25,
    height: 35
  }
}

interface IOne {
  str?: string;
  [index: number]: string; // number - тип имени св-ва, string - тип значения (54: 'hello')
  func (a: number): number;
}

interface ITwo extends IOne {
 readonly obj: {b: number};
 [propName: string]: any;
 new (hour: number, minute: number);
}

interface RectWithArea extends IRect {
  getArea: () => number;  // return number
  setTime(date: Date): void;
}

// ENUM

enum Color {
  Red = 1, 
  Green = 2, 
  Blue = 3
}

let enum1: Color = Color.Red;
let enum2 = Color[0];

// Объявление классов

abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earth...');
    }

}

class A extends B implements BInterface {
    readonly numberOfLegs: number = 8; // можем перезаписать только внутри конструтора
    private currentTime: Date;
    protected name: string;
    public h: number;

    public constructor (h: number, public m: number, readonly model: string) {
        super(m, h);        
    }
    public setTime (d: Date) {
        this.currentTime = d;
    }
    private count = (a: number): void => {
        super.count(a);
        console.log(a);
    }
    private static say (b: string): string {
        return b;
    }
    private _fullName: string;
    get fullName(): string {
        return this._fullName;
    }
    set fullName (newName: string) {
        this._fullName = newName;
    }
  }

let a: A = new A(10, 20);

class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};

// Объявление дженериков

function identity<T> (arg: T): T {
    return arg;
}

let output = identity<string>('myString');

let myIdentity: <T>(arg: T) => T = identity;

interface GenericIdentityFn {
    <T>(arg: T): T;
}

let myIdentity: GenericIdentityFn = identity;

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};

function create<T> (c: {new(): T;}): T {
    return new c();
}

interface NotEmpty<T> {
    data: T;
}
let x: NotEmpty<number>;
let y: NotEmpty<string>;

function extend<T, U> (first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

function pluck<T, K extends keyof T> (o: T, names: K[]): T[K][] {
    return names.map(n => o[n]);
}

// Объявление типов

type Name = string;

type NameResolver = () => string;

type NameOrResolver = Name | NameResolver;

function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}

type Easing = "ease-in" | "ease-out" | "ease-in-out";

type Shape = Square | Rectangle | Circle;

type Container<T> = {
    value: T
};

type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}

type LinkedList<T> = T & {next: LinkedList<T>};

type Proxy<T> = {
    get(): T;
    set(value: T): void;
}

type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
}

function proxify<T>(o: T): Proxify<T> {
   // ... wrap proxies ...
}

let proxyProps = proxify(props);

let personProps: keyof Person; // 'name' | 'age'

// Декларирование типов

type Alias = {num: number}

interface Interface {
    num: number;
}

declare function aliased (arg: Alias): Alias;

declare function interfaced (arg: Interface): Interface;

declare function require (moduleName: string): any;

// Пространство имен

namespace Validation {

    export class ZipCodeValidator implements StringValidator {
        isAcceptable (s: string) {
            return s.length === 5 ;
        }
    }

}

namespace Shapes {
    export namespace Polygons {
        export class Triangle { }
        export class Square { }
    }
}

declare namespace D3 {

    export interface Selectors {
        select: {
            (selector: string): Selection;
            (element: EventTarget): Selection;
        };
    }

    export interface Event {
        x: number;
        y: number;
    }

    export interface Base extends Selectors {
        event: Event;
    }

}

declare var d3: D3.Base;

// Декораторы

function f () {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g () {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}

// f(): evaluated
// g(): evaluated
// g(): called
// f(): called

function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}

console.log(new Greeter("world"));

class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}

// Импорт

import "./my-module.js";

export * from "./ZipCodeValidator";
import * as validator from "./ZipCodeValidator";

import ZipCodeValidator from "./ZipCodeValidator";
import {ZipCodeValidator} from "./ZipCodeValidator";
import {ZipCodeValidator as ZCV} from "./ZipCodeValidator";

// Экспорт

declare let $: JQuery;

export default $;

export default "123";

export default function (s: string) {
    return s.length === 5;
}

export default class ZipCodeValidator {
    isAcceptable (s: string) {
        return s.length === 5;
    }
}

export ZipCodeValidator;

export interface StringValidator {
    isAcceptable (s: string): boolean;
}

export class LettersOnlyValidator implements StringValidator {
    isAcceptable (s: string) {
        return lettersRegexp.test(s);
    }
}