# Scriptable Modules

You can use the [editor on GitHub](https://github.com/julio-kim/scriptable/edit/main/README.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

## I. 시작하기

### I-1. Module Installer 설치

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

> Hello World!!

```javascript
let fm = FileManager.iCloud()
let dir = fm.documentsDirectory()
const baseDir = `${dir}/modules/moduler`

if (!fm.isDirectory(baseDir)) {
    fm.createDirectory(baseDir)
}

let request = new Request('https://julio-kim.github.io/scriptable/modules/moduler/index.js')
let moduleFile = await request.loadString()
fm.writeString(`${baseDir}/index.js`, moduleFile)
```

### I-2. Hello World

```javascript
const { hello } = importModule('/modules/moduler')

hello()
```

### I-3. 설치된 Modules 삭제

```javascript
const { list, uninstall } = importModule('/modules/moduler')

list().map(ver => ver.name).forEach(ver => uninstall(ver))
```

## II. Modules 소개

### II-1. CovidStat

| abc | defghi |
:-: | :-----------
bar | baz

### II-2. Artvee


```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).
.
