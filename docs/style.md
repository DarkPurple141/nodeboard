Style Guide
====
1. [Indenting](indents)
2. [Naming Convention](naming)
3. [Comments](comments)
5. [ECMA Script](ecma)

### <a name="indents">Indenting and spacing</a>

NodeBoard uses a two-space indent for code. This looks like this.

```javascript

let x = 0

if (x > 2)
{
  console.log("much")

  if (x == 3)
  {
    console.log("wow")
  }

}
```
Note the above also uses a new line for if statements. That's the standard for loops,
and any other logical evaluation that in `javascript` requires a `{` or `}`.

eg.

```javascript
for (let i = 0; i < birthdays.length; i++)
{
  birthdays[i] = i
}
```

Finally, whitespace is important for readability and allows separated logic to be set out in the same file in considerably more clear way. The most important things here are and as above, a separate new line for the `{` characters and a new line ahead of a logical operator, or control flow key word.

Avoid using `;` wherever possible.

### <a name="naming">Naming Convention</a>

Comments are important, but variable names are **more** important. Comments are useful additions to blocks of code but should not be relied on to explain.

The key here is to make your logic and your names 'tell the story' of itself. The temptation to use shorter variable names at the cost of the comprehensibility of the codebase is not worth it. Be diligent.

```javascript
// non-trivial Objects or Classes
const ClassName = (parameter) =>
{
  return {
    field : parameter, // , on same line
    UID : 42 // special constant
  }
}


// functions
const helloWorld = () =>
{
  console.log("Hello, Jeff")
}

// also valid
const greet = name => console.log("Hey " + name)

// non-trivial variable
let age = getAge()
let name = "Zain"

// arrays
let numbers = [
  "One",
  "Two",
  "Three"
]

```

### <a name="comments">Comments</a>

Comments are important to document your logic, but as above should not be used explain your code. Your code's logic should be self-evident. Instead, a comment should be a rationale, that broadens the reader's understanding of the block of code in the broader codebase.

Ask yourself these questions:

* Why did I write this block of code? (And why is it necessary)
* What is the purpose of this block of code?
* How does it interact with the broader system

If you can't answer these questions clearly, and concisely, then you may need to look at re-thinking about the code you've written.

### <a name="ecma">New JS isn't so new</a>

The future is here and old school javascript syntax really doesn't have a place in the codebase. That's not to say go crazy with the newest and latest, but certainly anything in ECMA 2015 should be incorporated.

`let` and `const` go without saying.

That said there are occasions where the use of arrow functions may cause confusion.
To clarify, arrow functions do not bind to an object they're called and thus the use of `this`, for example in the context of an object field will not behave as expected. Here, it's better to use old school function declarations.

More on that [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). (Mozilla)