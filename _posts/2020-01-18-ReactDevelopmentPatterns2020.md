---
title: "React Development Patterns 2020"
published: true
---

Trying to keep up with the freshest React features? Want to know how to make your code less error prone, increase
performance, and increase descriptiveness?

Here are some common patterns for you to try.

- [Coding Style](#coding-style)
  - [Abandon var and let](#abandon-var-and-let)
  - [Abandon .forEach for Describing Data](#abandon-foreach-for-describing-data)
  - [Use Function Components](#use-function-components)
    - [Destructure Your Props](#destructure-your-props)
    - [Type Your Props](#type-your-props)
  - [Destructuring Objects](#destructuring-objects)

## Coding Style

### Abandon var and let

`var` and `let` both allow mutations. They allow "access" leaks in your code. Here is a trivial example:

```js
const foo = () => {
  let a;
  // Let's assume this if-else block is the only place
  // in this function where we want a to change
  if (something) {
    a = 'ok';
  } else {
    a = 'not ok';
  }
  // Variable 'a' is still mutable after this block.
  // We were unable to effectively express that we no
  // longer want a to change!
}
```

To properly describe that our variable should no longer be modified, we should convert this to either:

```js
const isOk = something => {
  if (something)
    return 'ok';
  return 'not ok';
}

const foo = () => {
  const a = isOk(something);
}
```

or:

```js
const foo = () => {
  const a = something ? 'ok' : 'not ok';
}
```

### Abandon .forEach for Describing Data

`Array.prototype.forEach` allows users to write side-effects. However, many times it is used to describe a new
sequence of data, for example:

```js
const fruits = ['apples', 'bananas', 'pears'];
const fruitObjs = [];
fruits.forEach((fruit, i) => {
  return {
    id: i
    name: fruit,
  };
});
```

Whereas we should use map:

```js
const fruits = ['apples', 'bananas', 'pears'];
const fruitObjs = fruits.map((fruit, i) => ({
  id: i,
  name: fruit,
}));
```

> Note: This should be good enough, but to prevent more mutator methods such as `Array.prototype.push`, you can use
> `Object.freeze`:

```js
const fruits = ['apples', 'bananas', 'pears'];
const fruitObjs = Object.freeze(
  fruits.map((fruit, i) => ({
    id: i,
    name: fruit,
  }))
);
```

### Use Function Components

[Function components are the future of React thanks to hooks](https://reactjs.org/docs/hooks-intro.html). There is no longer any reason to be using Class components, apart from code that has already been written using class components.

There are many examples for comparing between class components and function components. Here are some ways to help you write good ones.

#### Destructure Your Props

This should be considered very important for those writing React in `javascript`, but not as important if you are using `typescript`.

Destructuring your function props allows you to declare your functions dependencies clearly in the function signature. Compare these:

```jsx
const MyComponent = props => {

  return (
    <>
      <h1>{props.title || 'Default Title'}</h1>
      {props.children}
    </>
  );
};
```

vs:

```jsx
const MyComponent = ({
  title = 'Default Title',
  children,
}) => {

  return (
    <>
      <h1>{title}</h1>
      {children}
    </>
  );
};
```

The first example requires you to scroll through your component to
find out which props exist. The second example does not, and also gives
you the benefit of being able to add default values as well.

Also, please continue to use `PropTypes`. These work for your function
components still.

#### Type Your Props

**Hey you, Javascript reader! You don't need to skip this section.**

Want that sweet, delectable, VS Code intellisense? Here is how you can get
it using

**Javascript:**

```jsx
/**
 * @type {React.FC<{ text: string; }>}
 */
const Title = ({ text }) => <h1>{text}</h1>;
```

> Note: if your props are too long, you can separate them like this:
{% raw %}
```jsx
/**
 * @typedef BigProps
 * @type {{
    text?: string; 
    saveStuff: (...args: any[]) => any; };
    billInfo: BillInfo;
  }}
 */

/**
 * @type {React.FC<BigProps>}
 */
const BigComponent = ({
  text = 'Bill\'s bills',
  saveStuff,
  billInfo,
}) => {
  // do big important stuff
  return (
    <></>
  );
};

```
{% endraw %}

> **Niiiice** (although I didn't define _BillInfo_ so it doesn't show up)

![](/assets/ReactCodingPatterns/TypeExample.png)

**Typescript:**

```tsx
import React, { FC } from 'react';

interface BigComponentProps {
  text: string | undefined;
  saveStuff: (...args: any[]) => any;
  billInfo: BillInfo;
}

const BigComponent: FC<BigComponentProps> = ({
  text = 'Bill\'s bills',
  saveStuff,
  billInfo
}) => {
  // do big important stuff
  return (
    <></>
  );
};
```

### Destructuring Objects

You might be wondering, why should we destructure so much? Does it even help
readability?

Destructuring objects is about more than just readability.
Apart from the fact that it forces us to declare which fields are being used, when we destructure while using  `const`, it has a different meaning.
Take a look.

If we declare foo like this:

```js
const foo = getAnObjectThatHasAPropertyCalledName();
```

We can still mutate the properties of `foo` because **only the pointer to foo is** `const`.

```js
const foo = getAnObjectThatHasAPropertyCalledName();
foo.name = 'Sith Lord'; // Oh no, scary!
```

This is not possible if we declare it such as:

```js
const { name } = getAnObjectThatHasAPropertyCalledName();
name = 'Sith Lord'; // Throws an error!
```
