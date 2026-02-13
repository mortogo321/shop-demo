# React guidelines

## React with TypeScript

We use TypeScript in React projects. Please always use typings as excepted in TypeScript. Avoid using type any and only use it in cases where no other type is suitable.

## Why Next.js

Normally, we do **not** use Next.js’s **backend** functionalities. The main reason why we use Next.js is it’s router and file-based routing system. In many cases we will generate a static export (https://nextjs.org/docs/pages/building-your-application/deploying/static-exports) why it’s important that you never use backend functionalities.
The only reason to use backend functionality from Next.js is if it is explicitly requested in the request or issue.

## Overview standard frameworks / libraries

| Topic         | Library / framework |
| ------------- | ------------------- |
| Styling       | TailwindCSS         |
| Data Fetching | React Query, axios  |
| Forms         | Formik, yup         |
| Translations  | next-translate      |
| Dates         | date-fns            |
| Toasts        | react-toastify      |

## Eslint / Prettier

Short rule: Never change any rules/settings and have both installed

Explanation: To have same code styles throughout the whole company, never change the eslint or prettier rules/settings. In case you want to change things there, please contact Leonhard Josef Haarmann directly via slack.

## Styling

General styling

Short rule: Always use tailwind and its default classes

Explanation: We use TailwindCSS for all styling related tasks. Always use tailwind’s default classes and sizing. For layout styling we recommend using primarily flex and grid. In case you need a special color which is not defined in tailwind’s default classes, please extend tailwind.config.js
For better understand please visit TailwindCSS docs https://tailwindcss.com/docs/utility-first

```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {

      colors: {
        'my-custom-color': {
          light: 'lightblue',
          DEFAULT: 'blue',
          dark: 'darkblue',
        }
	}
}

// you can use it in template later like this
<div className="bg-my-custom-color-dark">...</div>
```

Conditional styles

Short rule: use twCb from helper.ts

Explanation: To unify the behavior and make especially long tailwind classes more readable, please use twCb function from helper.ts

```tsx
import { twCb } from '../utils/helper';

export const ExampleComponent = () => {
  const isLoggedIn = true; // just as example here, value would be dynamic in real world scenarios
  return (
    <h1 className={twCb(isLoggedIn ? 'bg-green' : undefined)}>
      My background is green when logged in!
    </h1>
  );
};
```

Dark/light mode

Short rule: No differentiation

Explanation: We do not differ between light/dark mode during development since most of our customers are businesses (B2B) and

## Creating components

**File naming**

Short rule: kebab-case naming with .tsx file ending

Explanation: In case your component name is longer than one word use kebab case as naming convention. All component files should have file name endling .tsx to indicate that we are using JSX.

```makefile
test-component.tsx
```

**ES6 syntax**

Short rule: Use ES6 syntax everywhere

Explanation: We use ES6 syntax for creating components instead of ES6 syntax. Main reasons: We are used to it and we have to write one line less code because we do not have to write a separate line of code for default export.

```tsx
export const TestComponent = () => {};
```

**Exports**

Short rule: No default exports if not necessary

Explanation: We don’t want to use default exports. They can lead to imports with different names and we want all imports to be named equally. In case you have two imports with the same name you can rename them with the keyword **as** like here:

```tsx
import { MyCustomComponent as Renamed } from './my-custom-component';
```

In general avoid renaming.
An other exception is for files in the /pages folder: They need a default export to work properly with Next.js’s router. Please just add the line export default as here:

```tsx
const MyPageComponent = () => {};

export default MyPageComponent;
```

**Props naming convention**

Short rule: Create interface with same name as component + Postfix _Props_.

Explanation: In case you need to specify types for props, always create an interface directly above the corresponding component and follow this naming convention: same name as component + Postfix _Props_. Furthermore do not place any other code between your props interface and its corresponding component for better readability.

```tsx
interface TestComponentProps {
  // content rules for props below
}

// important: no other code between TestComponentProps and TestComponent !
export const TestComponent = (props: TestComponentProps) => {};
```

**Props types convention**

Short rule: Use JSX.Element for component type (especially children)

Explanation: Since there are many different ways to specify the types for React components, we agreed to only use JSX.Element for better readability.

```tsx
interface TestComponentProps {
  children: JSX.Element | JSX.Element[];
}
```

**Props object destructuring convention**

Short rule: Do NOT destruct props object

Explanation: During a code review, it is important to identify in the template which property is part of the component (and thereby encapsulated) and which property is passed as props. That’s why we don’t destructure props.

```tsx
return <H1Headline>{props.headline}</H1Headline>;
```

**Conditions in templates**

Short rule: Do NOT use && and instead use tenary operator (? and :) always

Explanation: Please have a look at this video first, it explains it https://www.youtube.com/watch?v=K07xXlaDI7Y . && might lead to wrong ui behavior, please aways use it like that:

```tsx
const isError = true; // the value could also be NaN, null, ...
return <div className="">{isError ? <p>Error</p> : null}</div>;
```

**General component structure**

```tsx
interface TestComponentProps {
  children: JSX.Element | JSX.Element[];
}

export const TestComponent = (props: TestComponentProps) => {
  // general imports like translation, router,
  const t = useT();
  const router = useRouter();

  // state related code
  const [isOpened, setIsOpened] = useState(false);

  // data / request state
  const { user } = useAuthQueries();
  const { performLogin } = useAuthMutations();

  // forms
  const form = useLoginForm((vals) => {
    performLogin
      .mutateAsync(vals)
      .then(() => {
        // handle success case
      })
      .catch((e) => {
        // handle error case
      });
  });

  // component specific functions
  const calculateUsersFullName = (
    firstName: string,
    lastName: string
  ): string => {
    // NOTE: never write a function with only one line of code
    // --> this is only an example where component function should be placed
    return `${firstName} ${lastName}`;
  };

  // jsx template always at the end of file
  return <H1Headline>{t('helloWorld')}</H1Headline>;
};
```

## Forms

**Packages**

To implement reactive forms we use formik and yup.

With yup we define the schema and the conditions that the schema must satisfy.

With formik we manage the handling of the whole form.

**Create custom hook**

Short rule: Always create a custom hook for form

Explanation: For better readability, please always create a custom hook which returns the formik object.

**File naming**

Short rule: use keyword + kebab-case naming + .form.ts

Explanation: In case your hook name is longer than one word use kebab case as naming convention. All component files should have file name ending .form.ts to indicate that it is a custom hook which contains a form.

```makefile
use-form-example.form.ts
```

**Form naming convention**

Short rule: use + name in camelcase + Form

Explanation: Since custom hooks should always start with use, followed by the form name in camelcase and ending with Form. Please see below the example for the form name LoginExample:

```tsx
export const useLoginExampleForm = (
  onSubmit: (values: LoginFormContents) => void
) => {};
```

**Form interface naming convention**

Proceed here in the same way as with props. The only difference is that the postfix must be Contents, see the following example for the LoginForm:

```tsx
export interface LoginFormContents {
  email: string;
  password: string;
}

export const useLoginForm = (
  onSubmit: (values: LoginFormContents) => void
) => {};
```

**Submit as callback parameter**

Short rule: Pass onSubmit function as parameter

Explanation: Always pass the onSubmit callback as a parameter. The type of the onSubmit callback can be taken from the interface described above. Here is an example of how to use the types from the interface and add the obSubmit callback as parameter for the form hook:

```tsx
export interface LoginFormContents {
  email: string;
  password: string;
}

// pass callback for onSubmit as parameter
export const useLoginForm = (
  onSubmit: (values: LoginFormContents) => void
) => {};
```

**General form hook structure**

```tsx
import * as yup from 'yup';
import { useFormik } from 'formik';
import { createFormSchema, emailRegex, useT } from '@/helper';

// can be used in react query mutation for example
export interface LoginFormContents {
  email: string;
  password: string;
}

// pass callback for onSubmit as parameter
export const useLoginForm = (onSubmit: (values: LoginFormContents) => void) => {
  const t = useT();

  // always use createformSchema from helper.ts
  const loginFormSchema = createFormSchema<LoginFormContents>({
    email: yup
      .string()
      .matches(emailRegex, t('form.invalidEmail'))
      .required(t('form.requiredField')),
    password: yup
      .string()
      .min(6, t('form.minimumInputLength', { minLength: 6 }))
      .required(t('form.requiredField')),
  });

  // return directly formik object
  return useFormik<LoginFormContents>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginFormSchema,
    validateOnBlur: true,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit,
  });
};
```

## Translations

**When use translation hook**

Short rule: Always use translation if content is visible to user

Explanation: In any cases when the user can see something you implemented (like a text for a button or overlay title) use translations. This makes it easier to add new languages later.

**Translation hook**

Short rule: Always use useT from helper.ts

Explanation: Please always use useT from helper.ts. This will make it easier later in case we need to replace the translation package or do any other changes to it.

**Translation keys / German is not your native language**

Short rule: Only add translation key to other translation jsons

Explanation: In case you have to add translations in a language which you don’t speak natively, just add the keys to the translation. This will often be the case for German translations. Please add a placeholder named “ADD_TRANSLATION” as value to the translation key. A german speaking collegue will add the right translation in code review then. Below you can find an example:

```tsx
// example scenario: German is not your native language

// common.json in en folder
{
	"home": "Home"
}

// common.json in de folder
{
	"home": "ADD_TRANSLATION"
}
```

## Dates

Short rule: Always use date-fns and its functionalities

Explanation: Please always use date-fns for all operations concerning dates (like parsing or formatting, …).

## Query data / requests

**Make requests**

Short rule: Always use react query and request object from request.ts to make request

Explanation: To simplify making axios requests, please always use the request object from request.ts

```tsx
request({
  url: `${constants.apiUrl}/users/auth`,
  method: 'GET',
}) as Promise<{ user: User } | null>;
```

**Naming convention queries**

Short rule: use + query name in camelcase + .query/queries.ts

Explanation: To find queries easier please follow the naming convention from above. In case you have a single query for user

**React query - query example**

**Display data**

Short rule: use component QuerySuspense

Explanation: To resolve queries, please always use the component QuerySuspense as helper. You can pass the query there and the on

namenskonvention mutations.hook.ts

generelle form der hook —> logische aggregation von bestimmten queries (bspw auth)

display data with QuerySuspense

in mutation onSuccess nur invalidieren von stuff, navigation IMMER in aufrufender funktion bei .then

## DTOs / responses

interfaces anlegen

Snake_case bleibt

## Other state

Localstorage, sessionstorage nicht nur mit expliziter genehmigung

## Modal / Portal

use modal component

works via url to ensure mobile navigation (swiping back on iphone)

## Toasts

immer aus helper nutzen

## Core-Elements

um späteres styling

## Further helper functions

**useDimensions**

wenn tailwind erweitern, dann immer in global.css variable anlegen und dann in tailwind config erweitern

keine default exports bei interfaces oder types da sich sonst imports nicht ändern bei namensänderung was wichtig ist für readability

nur npm als package manager

Toasts

dont use settimeout → always .then or await
