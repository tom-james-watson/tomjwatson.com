---
title: "Some lesser-known vim tips from 8 years of use"
date: 2018-07-05
tags: [programming, vim]
---

I've been using vim pretty much exclusively as my editor for about 8 years now and I like to think I've amassed a few tricks along the way. Instead of the standard entry-level advice, here are some, as far as I can tell, lesser-known vim tips.

<!--more-->

## Editing

#### Navigate back/forward like a browser

```
:help jumplist
```

Vim's jump lists allow you to jump backwards/forwards through previously visited locations. Jumps are recorded for edits, searches, marks etc. Scrolling through a file does not record a jump.

Move to an older location with `Ctrl-O` and to a newer location with `Ctrl-I`.

#### Visual Blocks and "multiple cursors"

This one seems to surprise people - you can (kinda) get multiple cursors in vim without any plugins! Select a visual block with `Ctrl-v`, then either `I` to insert on all lines or `c` to replace the whole visual block with whatever you then type. Press `Esc` to stop and your text will appear on all lines.

![Multiple cursors in action](/images/blog/vim-tips/multiple-cursors.gif)

#### Relative line numbers

```
:help relativenumber
```

You may have noticed the weird line numbers on the previous gif. I use relative line numbers which makes all line numbers relative to the current line. This is particularly useful when wanting to move to a particular line. Instead of typing, for example, `:1056` to go the line 10 lines above you, you can simply `10j` instead.

#### Using vim's undo tree

Type something, undo, type something else. With other editors, the first thing you typed is now lost to the sands of time. Not with vim!

The easiest way to navigate the tree is to use the `g-` and `g+` commands to step backwards and forwards through the tree in chronological order. You'll always get back to a previous state if you `g-` enough times.

You can even time travel with vim. Yes, seriously.

Return to the saved state from 10 minutes ago:

```
:earlier 10m
```

Overshot your destination? Move forwards in time:

```
:later 40s
```

If you find this useful, maybe check out the https://github.com/mbbill/undotree plugin.

#### The `normal` command

```
:help normal
:norm[al][!] {commands}
```

This command makes it possible to run a bunch of regular normal mode commands together, but its real use is when combined with a range.

For example, to uppercase the second word of every line in this file:

```
Tom Jones
Frank Chester
Alice Ronald
```

We can run

```
:% norm wvwU
```

Which will, on every line (%), move forward a word (w), select the next word (vw) and then uppercase it (U)

Or, to add a comma to the end of all lines in the following list:

```
[
  foo
  bar
  baz
]
```

Just:

```
vi]              select everything within the brackets
:norm $a,        move to end of line and append a comma
```


#### The `global` command

```
:help global
:[range]g[lobal]/{pattern}/[cmd]
```

I only learnt about this super powerful command recently. It lets you repeat a command against all lines matching a pattern

Delete all blank lines:

```
:g/^\s*$/d
```

Move all lines containing foo to the end of the file:

```
:g/foo/m$
```

However, `:g` is most powerful when paired with `:norm`. For example, to add a missing colon to all if statements:

```
if test1
   thing1()

if test2
   thing2()
```

We can run:

```
:g/if/norm $a:
```

Which will, for all lines containing 'if', execute the normal command to append a ':' to the end of a line.

#### Making tabs useful

I use a tab-heavy workflow with vim and I think tabs are generally easier for newbies to get their heads round than buffers. This is just a simple change, but adding shortcuts to switch between tabs with `Ctrl-left` and `Ctrl-right` makes them far easier to work with.

```
" switch tabs with Ctrl left and right
nnoremap <C-right> :tabnext<CR>
nnoremap <C-left> :tabprevious<CR>
" and whilst in insert mode
inoremap <C-right> <Esc>:tabnext<CR>
inoremap <C-left> <Esc>:tabprevious<CR>
```

#### Centralised swapfiles

Make swapfiles be kept in a central location to avoid polluting file system:

```
set directory^=$HOME/.vim/swapfiles//
```

#### Persistent undo

It's possible to make your edit history persistent across file closure. This lets you make a bunch of edits to a file, `:wq` it, realise you made a mistake, reopen the file and then undo your edits from your last session with the regular `u` command.

Simply create an undo directory, e.g. `~/.vim/undodir` and the following to your `.vimrc`:

```
set undodir=~/.vim/undodir
set undofile
```

#### Use system clipboard as default clipboard

Pasting into and copying out of vim needn't be difficult.

```
:set clipboard=unnamed
```

This also means that you can now `cmd+c` in one application and `p` it in vim, or `dd` in one vim instance and `p` the line in another.

## My favourite plugins

I use a [whole bunch of plugins](https://github.com/tom-james-watson/dotfiles/blob/master/.vimrc#L6-L28), but here are the ones I find most indispensable.

#### ctrlp.vim

https://github.com/kien/ctrlp.vim

This simple plugin lets you fuzzy find files for opening. Press `Ctrl-p` and type parts of the file path and name to shorten the list of files down. Press `Enter` to open the selected file, or `Ctrl-t` to open the file in a new tab.

![ctrlp in action](/images/blog/vim-tips/ctrl-p.png)

#### ALE

https://github.com/w0rp/ale

Ale is THE best linter available for vim. Not much to explain here - if you're not using it, go check it out.

![ale linting](/images/blog/vim-tips/ale.png)

#### git-gutter

This is the only git-related plugin that I need. Lots seem to use vim-fugitive but I never found it useful. It show the ongoing git diff in the left hand side gutter.

![git-gutter hunk usage](/images/blog/vim-tips/git-gutter.png)

You can also use git-gutter to jump between hunks with `c[` and `c]`. You can then stage hunks with `\hs` or revert them with `\hr`.

#### vim-airline

This plugin simply renders a nice status line at the bottom of each window. Vim looks wrong without it.

![showing off airline](/images/blog/vim-tips/airline.gif)

## Conclusion

Vim never ceases to amaze me - I feel like I'm still learning as much after nearly a decade of use as I was in the first year. I'm sure there are some mistakes in the examples I've posted, or even better ways of doing some of them. If so - leave a comment and let me know!

If you're interested in my setup or looking for a few more useful snippets, you can find my full .vimrc in my dotfiles - https://github.com/tom-james-watson/dotfiles/blob/master/.vimrc

Join the conversation on Reddit - https://old.reddit.com/r/vim/comments/8wir4r/some_lesserknown_vim_tips_from_8_years_of_use/
