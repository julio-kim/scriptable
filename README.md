# Prj. Scriptable Modules

**Scriptable Modules 프로젝트**는 [iOS Scriptable App](https://scriptable.app)에서 동작시킬 App들을 **Module기반**으로 작성하여 손쉽게 사용할 수 있도록 제공합니다.

재사용 가능한 다양한 공통 코드들을 작성하고, 그 기반 위에서 다양한 Scriptable App들을 소개해 볼 예정입니다.

많은 관심 부탁드립니다~:)

### 주요기능

* 반복적으로 사용되는 코드를 **module 기반**으로 작성하여 **재사용성**을 높이고 효율적인 개발이 가능하도록 지원
* Moduler를 통해 설치된 모듈들의 **버전을 관리**하여 개선 버전이 배포되었을 때 **자동 업데이트 지원**
* 미려한 디자인의 다양한 Scriptable App 배포 예정~:)

### 목차
* [I. 시작하기](#i-시작하기)
  * [I-1. Moduler 설치](#i-1-moduler-설치)
  * [I-2. Hello World](#i-2-hello-world)
  * [I-3. 설치된 Modules 삭제](#i-3-설치된-modules-삭제)
* [II. Modules 소개](#ii-modules-소개)
  * [II-1. CovidStat Widget](#ii-1-covidstat-widget)
  * [II-2. Artvee Widget](#ii-2-artvee-widget)
* [III. Feedback](#iii-feedback)
  
## I. 시작하기

### I-1. Moduler 설치

Moduler

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

> 파일 앱에서 `iCloud Drive > Scriptable` 위치로 이동해 보시면, modules 폴더가 생성되어 있고 moduler가 정상적으로 설치된 것을 확인 할 수 있습니다.


### I-2. Hello World

> 

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

### II-1. CovidStat Widget

| abc | defghi |
:-: | :-----------
bar | baz

### II-2. Artvee Widget

> 12월 중에 공개 예정입니다~:)

## III. Feedback

> Scriptable Modules 프로젝트는 개발 피드백을 받고 있습니다~:)

Module을 사용하시면서 버그로 인한 불편한 점이나, 개선사항이 필요하신 경우 아래의 이슈 링크에서 진행 부탁드립니다.

* [Scriptable modules issues](https://github.com/julio-kim/scriptable/issues)


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

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/)
