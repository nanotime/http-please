<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->

<a name="readme-top"></a>

<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/@nanotime/http-please">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Http Please!</h3>

  <p align="center">
    An Fetch API wrapper writen in vainilla JS
    <br />
    <br />
    <br />
    ·
    <a href="https://github.com/nanotime/http-please/issues">Report Bug</a>
    ·
    <a href="https://github.com/nanotime/http-please/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#basic-usage">Basic Usage</a></li>
      </ul>
    </li>
    <li>
      <a href="#api">API</a>
      <ul>
        <li><a href="#configuration">Configuration</a></li>
        <li><a href="#methods">Methods</a></li>
      </ul>
    </li>
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

<!-- Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `@nanotime`, `http-please`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description` -->

HttpPlease is a simple and minimalist wrapper for fetch with certain quality of life (QOF) improvements written in TS.

It's easy to use and implement and its really lightweight since it's just a class, so if you are searching for a minimalistic tool here you are.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ### Built With -->

<!-- * [![Vite][Vite.js]][Vite-url] -->
<!-- * [![React][React.js]][React-url] -->
<!-- * [![Vue][Vue.js]][Vue-url] -->
<!-- * [![Angular][Angular.io]][Angular-url] -->
<!-- * [![Svelte][Svelte.dev]][Svelte-url] -->
<!-- * [![Laravel][Laravel.com]][Laravel-url] -->
<!-- * [![Bootstrap][Bootstrap.com]][Bootstrap-url] -->
<!-- * [![JQuery][JQuery.com]][JQuery-url] -->

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- GETTING STARTED -->

## Getting Started

<!-- Using this lib is easiest like:

```sh
npm i -S @nanotime/http-please
``` -->

### Installation

1. Install the library `npm i -D @nanotime/http-please`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Basic Usage

Using this library is not different to use any other NPM library, just import it after the install and instance the class:

```ts
// Import the lib
import HttpPlease from '@nanotime/http-please';

// Create an instance
const http = new HttpPlease({
  url: 'http://example.com',
  options: { ... } // fetch options
})

// Make a call
http.get({ path: '/foo' }).then(res => console.log(res.data));

// It can be done also with async/await
async function getFoo() {
  const response = await http.get({ path: 'foo' });
  return response;
}
```

As you can see, it's not necesary to chain the request/response to the `Response` instance methods like `json` because HttpPlease does it for you, but you can override this whenever you want, keep reading on docs to see how.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## API

### Configuration

```ts
type Resolver = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';

interface ConstructorProps {
  url: string;
  options?: RequestInit;
  resolver?: Resolver;
}
```

The constructor interface exposes just three parameters:

- the URL string
- the fetch options
- the resolver

There is no magic here, the only important thing here is how you want to parse your incoming responses, by default HttpPlease make it `json` for all your methods.

```ts
// This is a more realistic example configuring jsonplaceholder as url endpoint with headers
const http = new HttpPlease({
  url: 'https://jsonplaceholder.typicode.com',
  options: {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  },
});
```

### Methods

HttPlease expose the traditional methods for a CRUD: `GET | POST | PUT | DELETE` and give you the possibility to type the response and have total control of your requests.

Also HttpPlease have a raw `request()` method that just return a pure fetch instance, if you want to use it for any purpose.

**The interfaces**

```ts
type Query = {
  [key: string]: string;
};

type RequestParams = {
  path: string;
  query?: Query;
  opts?: Omit<RequestInit, 'method' | 'body'>;
  resolver?: Resolver;
};

type PostRequestParams = RequestParams & {
  body: unknown;
};

interface QP {
  params: Query;
  url: URL;
}

interface HttpPleaseResponse<T = unknown> extends Response {
  data?: T;
}
```

**HTTP Method definitions**

```ts
/**
 * Sends an asynchronous HTTP request to the specified URL with optional request options.
 */
request(url: string | URL, opts?: RequestInit): Promise<Response>;
/**
 * Sends a GET request to the specified path with the provided body and options.
 */
get<R>({ path, query, resolver, opts }: RequestParams): Promise<HttpPleaseResponse<R>>;
/**
 * Sends a POST request to the specified path with the provided body and options.
 */
post<R>({ path, query, resolver, opts, body }: PostRequestParams): Promise<HttpPleaseResponse<R>>;
/**
 * Sends a PUT request to the specified path with the provided body and options.
 */
put<R>({ path, query, resolver, opts, body }: PostRequestParams): Promise<HttpPleaseResponse<R>>;
/**
 * Sends a DELETE request to the specified path with the provided body and options.
 *
 */
delete<R>({ path, query, resolver, opts }: RequestParams): Promise<HttpPleaseResponse<R>>;
/**
 * Generates a query string by combining the existing search parameters of the URL
 * with the provided parameters.
 */

```

**Methods anatomy**

Let's use GET as an expample, every method has the same printing.

```ts
// ...

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

// Get all posts and define the response as a Posts array
const posts = await http.get<Post[]>({
  path: '/posts',
});

// Also you can define the query params as a plain object
const posts = await http.get<Post[]>({
  path: '/posts',
  query: { userId: '1' },
});

// Change the resolver for this specific call
// same as fetch().then(res => res.blob()).then(myBlob => ...)
const blob = await http.get({ path: '/image/person.jpg', resolver: 'blob' });

// Getting something from the server and print the response
const body = { title: 'Lorem', body: 'Ipsum' };
const newPost = http.post<Post>({ path: '/posts', body });
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
<!-- ## Roadmap

<!-- - [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/@nanotime/http-please/issues) for a full list of proposed features (and known issues). -->

<!-- <p align="right">(<a href="#readme-top">back to top</a>)</p> --> -->

<!-- CONTRIBUTING -->

## Extending

HttpPlease doesn't have any plugin system integrated because it really don't need it. But it doesn't means that you can't extend it.

Since HttpPlease is just a class, extending it is as simple as applying the concept of composition over inheritance. And since it is also written in TS, you only need to create Mixin Classes to be able to extend HttpPlease.

To be able to create these Mixin Classes, HttpPlease exports a constructor type that is already hydrated with its own instance. Therefore, you don't need to worry about anything else other than composing new instances.

So, extending the library is pretty easy, just need to import the constructor and create a mixin like:

```ts
import HttpPlease, { Constructor } from '@nanotime/http-please'

function LogUrlPlugin<B extends Constructor>(Base: B) {
  return class extends Base {
    // Now you can access to all public methods and properties of HttpPlease
    logUrl() {
      console.log(this.url);
      return this;
    }
  }
}

// Compose the instance
const HttpInstance = LogUrlPlugin(HttpPlease);
const http = new HttpInstance({
  // HttpPlease config
});

http.logUrl().get(...) // logs the URL object and make a get request in the chain.
```

**Some considerations**

This is a very open way to modify the HttpPlease class that can violates the Open Closed principle, I know that but with a great power comes a great responsability, so here are some important things you need to know about this library:

1. The URL's and everything related is being constructed by the URL class, so all URL's are objects, not strings per se.
2. This library works on top of inmutability principle so avoid to mutate the state.
3. The pattern for the functions is the RORO (Receive Object Return Object), so try to keep it for consistency.

With this very basic principles you can compose your own plugins and instances to do whatever you want with HttpPlease.

**Further Reading**

If you want to know more about the Mixin pattern, [This article is great to get in](https://mariusschulz.com/blog/mixin-classes-in-typescript)

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "feature".
Don't forget to give the project a star! Thanks again!

**Important note**: this project has some strict rules (husky, testing, etc) for commiting and tools to help on it, don't make commits using the git command, instead just run `npm run commit`, this wil guide you on the correct standard way to commiting in this project. There is also a command `npm run branch` that can help you to create branch in a proper way.

1. Fork the Project
2. Create your Feature Branch (`npm run branch`)
3. Commit your Changes (`npm run commit'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
<!-- ## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/@nanotime/http-please](https://github.com/@nanotime/http-please)

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- ACKNOWLEDGMENTS -->
<!-- ## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

<!-- [contributors-shield]: https://img.shields.io/github/contributors/@nanotime/http-please.svg?style=for-the-badge
[contributors-url]: https://github.com/@nanotime/http-please/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/@nanotime/http-please.svg?style=for-the-badge
[forks-url]: https://github.com/@nanotime/http-please/network/members
[stars-shield]: https://img.shields.io/github/stars/@nanotime/http-please.svg?style=for-the-badge
[stars-url]: https://github.com/@nanotime/http-please/stargazers
[issues-shield]: https://img.shields.io/github/issues/@nanotime/http-please.svg?style=for-the-badge
[issues-url]: https://github.com/@nanotime/http-please/issues
[license-shield]: https://img.shields.io/github/license/@nanotime/http-please.svg?style=for-the-badge
[license-url]: https://github.com/@nanotime/http-please/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com -->
<!-- [Vite-url]: https://vitejs.dev/ -->
