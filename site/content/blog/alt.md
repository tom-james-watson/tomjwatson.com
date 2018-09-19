---
title: "alt - a stupidly simple but useful cli alert util"
date: 2018-09-19
tags: [programming, cli]
---

Often whilst programming I'll need to leave some slow task running in the background, such as running tests or compiling code, only to forget all about it and not realise it has finished running.

`alt` is a really simple cli util that I've been using for a while that completely fixed the issue. For example:

<!--more-->

```
alt finished compiling
```

This will:

* create a system notification with the text "finished compiling"
* use macOS's built-in text-to-speech to speak "finished compiling"

Here's what it looks like in action:

![notification showing finished compiling](/images/blog/alt.png)

I am usually using the util something like this:

```
npm t; alt finished tests
```

This way, I will receive a visual alert in the form of a notifcation _and_ an audio notification should I not even be looking at the screen at all.

Here's the code, should you want to use it yourselves:

```bash
// bash script - add to .bashrc / .zshrc
alt() {
  /usr/bin/osascript -e "display notification with title $@";
  say $@;
}

// fish script (include in ~/.config/fish/config.fish:
function alt
  /usr/bin/osascript -e "display notification with title $argv"
  say $argv
end
```

Unfortunately, this is obviously macOS-only at the moment. If I end up using linux as my main dev environment again I'll be sure to work out how to get something similar running there!
