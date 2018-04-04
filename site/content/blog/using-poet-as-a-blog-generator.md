---
title: "Using Poet as a Blog Generator"
date: 2016-04-18
tags: [programming, node]
---

UPDATE - I have since moved to [using Hugo for the entire site](http://tomjwatson.com/blog/deploying-a-modern-static-site/).

So I decided to finally get around to writing some blog posts.

I'm using [Poet](http://jsantell.github.io/poet/) as a blog generator, which has plugged nicely into my existing node application. I simply add markdown posts to a directory along with some metadata and Poet handily converts these into markup which can then be simply be passed to HTML views.

An example blog post looks like this:

<!--more-->

```json
{{{
    "title": "Example Post",
    "tags": ["programming"],
    "date": "4-19-2016"
}}}

I'm an example blog post.
 * I support __markdown__
```

Poet sets up various views by default, however I wanted to use some non-default routes to access the posts, and also the ability to pass in a `current_page` value for my navigation logic, so it required a little configuration:

```javascript
var poet = Poet(app, {
    posts: './blog_posts/',
    postsPerPage: 5,
    metaFormat: 'json'
});

poet.init();

poet.addRoute('/blog', function (req, res, next) {
    var posts = poet.helpers.getPosts();
    if (posts) {
        res.render('posts.html', {
            posts: posts,
            current_page: 'blog'
        });
    } else {
        res.send(404);
    }
});

poet.addRoute('/blog/:post', function (req, res, next) {
    var post = poet.helpers.getPost(req.params.post);
    if (post) {
        res.render('post.html', {
            post: post,
            current_page: 'blog'
        });
    } else {
        res.send(404);
    }
});
```

All that was left was a couple of super simple views.

A `posts.html` to render a list of all available blog posts on `/blogs`:

```html
{% extends "base.html" %}

{% block title %} - Blog{% endblock %}

{% block content %}
    {% for post in posts %}
        <div {% if loop.index % 2 != 0 %}class="row"{% else %}class="row alt"{% endif %}>
            <div class="container">
                <h2>
                    <a href={{ post.url }}>
                        {{ post.title }}
                    </a>
                </h2>
                <p class="lead">
                    {{ post.date|date('jS F Y') }}
                </p>
                <p class="lead">
                    {% for tag in post.tags %}
                        <span class="label label-default">{{ tag }}</span>
                    {% endfor %}
                </p>
                <p>
                    {{ post.preview|safe }}
                </p>
            </div>
        </div>
    {% endfor %}
{% endblock %}
```

And a `post.html` to render a specific blog post on `/blogs/example-post`:

```html
{% extends "base.html" %}

{% block title %} - Blog - {{post.title}}{% endblock %}

{% block content %}
    <div class="row">
        <div class="container">
            <h2>
                {{ post.title }}
            </h2>
            <p class="lead">
                {{ post.date|date('jS F Y') }}
            </p>
            <p class="lead">
                {% for tag in post.tags %}
                    <span class="label label-default">{{ tag }}</span>
                {% endfor %}
            </p>
            <div class="blog-post">
                {{ post.content|safe }}
            </div>
        </div>
    </div>
{% endblock %}
```

And hey presto, a fully functioning blog! To add a new post, I simply add a new markdown file to my `blog_posts` directory with the relevant metadata and content and restart the server. This website is running on heroku so, for me, that's as simple as:

```bash
vim blog_posts/new-post.md
git add .
git commit -m "add new-post"
git push heroku master
```
