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

<h3 align="center">Http Please</h3>

  <p align="center">
    An Fetch API wrapper writen in vainilla JS
    <br />
    <!-- <a href="https://github.com/@nanotime/http-please"><strong>Explore the docs »</strong></a> -->
    <br />
    <br />
    <!-- <a href="https://github.com/@nanotime/http-please">View Demo</a> -->
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
      <!-- <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul> -->
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <!-- <li><a href="#prerequisites">Prerequisites</a></li> -->
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <!-- <li><a href="#contact">Contact</a></li> -->
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

<!-- Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `@nanotime`, `http-please`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description` -->

http-please is a Fetch API wrapper library written in vanilla JS that was born as an educational project to learn how to apply design patterns and build npm packages with all the guarantees you would expect from a production-ready package.

The goal is not to create a package used by everyone that dethrones the big ones, but a contained package that is easy to extend where any programmer can contribute and understand more about how this world of libraries works.

Oh yes! And it works, you can use it for your personal projects, after all it's fetch...

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

Let's go, then...

<!-- Using this lib is easiest like:

```sh
npm i -S @nanotime/http-please
``` -->

### Installation

1. Install the library `npm i -D @nanotime/http-please`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Using this library is not different to use any other NPM library, just import it after the install
and call the compositor:

```js
// Import the lib
import CreateHttpPlease from '@nanotime/http-please';

// Create an instance
const http = CreateHttpPlease({
  url: 'http://example.com',
  options: { ... }
})

// Make a call
http.get({ path: '/foo' }).then(res => console.log(res.data));

// It can be done also with async/await

async function getFoo() {
  const response = await http.get({ path: 'foo' });
  console.log(response);
  return response;
}

getFoo(); // log response
```

_For more examples, please refer to the [Documentation](https://github.com/nanotime/http-please/wiki)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
<!-- ## Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
    - [ ] Nested Feature

See the [open issues](https://github.com/@nanotime/http-please/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->

<!-- CONTRIBUTING -->

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
