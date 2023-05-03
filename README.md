# Qu Beyond POST - Code Challenge

## Objective

The objective of this challenge is not necessarily just to solve the problem - but to evaluate your software development skills, code quality, creativity, and resourcefulness as a potential future colleague. Please share the necessary artifacts you would provide to your colleagues in a real-world professional setting.

We have a simple API that returns a JSON array. We would like you to use HTML, CSS and Javascript to read the API and display it in an organized way. In addition, you should add in some sort of sorting mechanic to the front-end. Use preferably Vue.js as base and feel free to add any other framework or library you would consider necessary to achieve the task.

https://swapi.dev/documentation

Feel free to use any data - but perhaps you can use the **"planet"** resource [here](https://swapi.dev/documentation#planets).
There is no right answer - just looking for an understanding of how you interpret the assignment and what decisions you make to build a simple project.

## After finishing your code answer the following questions:

1. What's a closure? Where in the code is there a closure?

2. Which are the potential side-effects in any function? Could you point out any of these cases in your code? Are they expected? Can they be avoided?

---

## Solution for Code Challenge

### Install Server

1. Open a terminal and go to **server** folder (`cd quBeyondPOS/server`) and run `npm run dev`
2. The server will be running on PORT 3001

### Install Client

1. Open a terminal and go to **client** folder (`cd quBeyondPOS/client`) and run `npm run dev`
2. The client will be running on `http://localhost:5174/`

Note: The solution was developed using **React** on the client side, and **Node Express** on the server side.

## Answers for questions

1. What's a closure? Where in the code is there a closure?

A closure is a function that keeps references to the adjacent state (lexical scope). In other words, a closure allows access to the scope of an outer function from an inner function. In JavaScript, closures are created every time a function is created.

Example:

```
function myFunction() {
    let count = 1
    function counter() {
        console.log(count)
    }
   counter()
}
myFunction()
```

The function **counter** uses the **count** variable which is declare out of it (on **myFunction**). So, there is a function (**counter**) that uses a variable (**count**) that it is declared out of it context. That is called a **closure**.

Examples of usage:

1. IIFE
2. Function Factory (Pattern Design)
3. Currying (Pattern Design and a feature of some Progamming Languages)
4. Event Listeners
5. Async Code (Closures are commonly used with async code, for example: sending a GET request using the **Fetch** API)

One example in the code:

```
export const getData = async (url: string) => {
	const response = await fetch(url)
	const json = await response.json()
	return json
}
```

When **getData** is called, it finishes executing before the fetch request is complete. The inner function **fetch** closes over the url function parameter variable. This preserves the url variable.

2. Which are the potential side-effects in any function? Could you point out any of these cases in your code? Are they expected? Can they be avoided?

A function is said to have a **side-effect** when the function changes a non-local state or when its output is not deterministic.

A few more classic cases of the side effects are,

- Mutating(changing) the input itself.
- Querying/Updating DOM
- Logging(even in the console)
- Making an XHR/fetch call.

One example in the code:

```
const getQueryParams = useCallback((): string => {
		let queryParams = '?'
		Object.entries(paginationModel.queryParams).forEach(
			([key, value], index) => {
				if (value !== '' && value !== null) {
					const param = `${key}=${value as string}`
					queryParams += index > 0 ? `&${param}` : param
				}
			}
		)
		return queryParams
	}, [paginationModel.queryParams])
```

The function **getQueryParams** output depends on an outer state called **paginationModel.queryParams**. Here there is a **side-effect**, if someone changes the value of **paginationModel.queryParams**, it will change the output.

So, a potential solution can be having **Pure functions**.

A **Pure Function** is a function that produces the same output for the same input. It means it returns the same result when you pass the same arguments. A pure function shouldn't have any side effects to change the expected output. But the application with only pure functions may not do much.

Programs with side effects become really hard to debug as our program’s behavior becomes non-deterministic. That’s why people prefer writing **pure functions** (Functions without side effects) but it’s literally impossible to write real-world applications without any side effects.
