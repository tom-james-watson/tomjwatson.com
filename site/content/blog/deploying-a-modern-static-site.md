---
title: "Deploying a modern, secure static site, for free with Hugo and Netlify"
date: 2018-04-04
tags: [programming]
---

The previous iteration of [tomjwatson.com](https://tomjwatson.com) was put together in 2014 and was starting to really show its age any time I needed to update anything. It was a basic node server that rendered [Swig](https://github.com/paularmstrong/swig) template files and [used Poet](http://localhost:3000/blog/using-poet-as-a-blog-generator/) to power the blog. Both of these packages are no longer maintained.

<!--more-->

The toolchain was a mess of [Grunt](https://gruntjs.com/) and [Bower](https://bower.io/) which, to say the least, are not exactly cutting edge any more. The fact that a web application can become quite so outdated in only four years is testament to the relentless pace of frontend development.

The site was also previously hosted on a Hobby instance on Heroku, which was costing me $7 per month for what was effectively a static site.

The best parts of the old site were the markdown file-based blog posts and the use of lightweight template files for rendering the UI, both of which I was keen to keep. I'm a huge fan of React and use it extensively on other projects such as [RMAP](http://recommendmeaphone.com/), but a simple static site does *not* need a javascript-based UI. A static website is:

- Ultra fast - everything is served from a CDN
- More secure
- Easier to reason about and maintain
- Works offline as a progressive web app

#### Enter Hugo and Victor Hugo

In the end I decided to use [Hugo](https://gohugo.io/) - the blazing fast static site generator written in Go - given its popularity and fit with the features I was looking for. Hugo works by taking a directory of content/templates and compiling them into a full HTML website, ready for static hosting.

![hugo logo](/images/blog/hugo_logo.png)

I didn't want to rely on Hugo's built-in themes and wanted to be able customize my site with modern Javascript and CSS, so I thought I'd look to see if there were any useful boilerplates for getting started. I came across the [netlify/victor-hugo](https://github.com/netlify/victor-hugo) boilerplate which looked like it provided everything I needed - ES6/PostCSS support, hot-reloading and one-command builds. Incidentally, this repository comes from Netlify, who I had already been eyeing up for hosting the site.

Hugo lets you define the content of your site using markdown files, and store any data needed as yaml files. For example, all of my blog posts are stored as markdown and entries for each of my projects are stored as yaml files. Templates can then be defined that render your content however you like. Victor Hugo then allows me to write whatever JS/CSS is needed for the templates and bundles everything up into the output Hugo build. If you choose to use an in-built Hugo theme, you will not need to define any template files, CSS or JS. If you are a beginner or short on time, I *highly* recommend using one. You can check out the available themes [here](https://themes.gohugo.io).

Here's what the final structure of my project looks like:

```
|--site             // Everything in here will be built with Hugo
|  |--content       // Pages and collections
|  |--data          // YAML data files
|  |--layouts       // This is where all templates go
|  |  |--partials   // Partial templates such as header/footer
|  |  |--index.html // The index page
|  |--static        // Files in here ends up in the public folder
|--src              // Files that will pass through the asset pipeline
|  |--css           // CSS compiled with PostCSS and bundled into /css
|  |--js            // Will be compiled to /app.js with babel
```

Developing the site is as easy as running `npm start` and heading to http://localhost:3000. Any changes I make to the code are instantly refreshed in the browser. Production builds can be created with `npm run build` and are output to `/dist`.

#### Deploying with Netlify

Given Hugo simply outputs a static site, we have many options for hosting and most of them free. You could easily [host on GitHub Pages](https://gohugo.io/hosting-and-deployment/hosting-on-github/) or even S3, however I decided to go with [Netlify](https://www.netlify.com/) as it is both free and the easiest option. Configuartion is as simple as authorizing Netlify for access to your repo on GitHub and configuring some minimal deploy settings.

![Netlify deploy settings](/images/blog/netlify.png)

Netlify will watch for any changes to your `master` branch on GitHub and kick off a new deploy any time anything changes. This means that all that is needed to deploy the latest version of the site is a simple `git push origin master`.

All that's left to do is to update my DNS to point to my instance on Netlify et voilà - [tomjwatson.com](https://tomjwatson.com) is updated to a modern, lightweight and secure website, all for free.

You can find the full source code at https://github.com/tom-james-watson/tomjwatson.com.
