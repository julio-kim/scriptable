## Welcome to GitHub Pages

You can use the [editor on GitHub](https://github.com/julio-kim/scriptable/edit/main/README.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

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

importModule('/modules/moduler').hello()

//const { list, uninstall } = importModule('/modules/moduler')
//list().map(ver => ver.name).forEach(ver => uninstall(ver))
```

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

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/julio-kim/scriptable/settings). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://docs.github.com/categories/github-pages-basics/) or [contact support](https://github.com/contact) and we’ll help you sort it out.
