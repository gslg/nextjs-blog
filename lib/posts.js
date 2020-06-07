import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')
const publicDirectory = path.join(process.cwd(), 'public')
export function getSortedPostsData() {
    // Get file names under /posts
    //const files = fs.readdirSync(postsDirectory, { withFileTypes: true })

    // const allPostsData = files.filter(f => f.isFile()).map(f => {
    //     let fileName = f.name;
    //     // Remove ".md" from file name to get id
    //     const id = fileName.replace(/\.md$/, '')

    //     // Read markdown file as string
    //     const fullPath = path.join(postsDirectory, fileName)
    //     const fileContents = fs.readFileSync(fullPath, 'utf8')

    //     // Use gray-matter to parse the post metadata section
    //     const matterResult = matter(fileContents)

    //     // Combine the data with the id
    //     return {
    //         id,
    //         ...matterResult.data
    //     }
    // })
    // Sort posts by date

    const allPostsData = readAndParseMD(postsDirectory)

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

function readAndParseMD(filepath) {
    const files = fs.readdirSync(filepath, { withFileTypes: true })
    return files.flatMap(f => {
        if (f.isDirectory()) {
            return readAndParseMD(filepath + "/" + f.name)
        } else {
            return parseMD(filepath, f.name)
        }
    })
}

function parseMD(filepath, fileName) {
    // const id = fileName.replace(/\.md$/, '')


    // Read markdown file as string
    const fullPath = path.join(filepath, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // const relativePath = path.relative(postsDirectory, filepath)

    // let routers = []
    // if (relativePath.length > 0) {
    //     routers = relativePath.split("/")
    // }
    // routers.push(id)
    // Combine the data with the id
    const routers = getFileId(filepath, fileName)
    return {
        id: routers,
        ...matterResult.data
    }
}

const all = []
function getAllMd(filepath) {
    const files = fs.readdirSync(filepath, { withFileTypes: true })
    return files.map(f => {
        if (f.isDirectory()) {
            getAllMd(filepath + "/" + f.name)
        } else {
            all.push(getFileId(filepath, f.name))
        }
    })
}

function getFileId(filepath, fileName) {
    const id = fileName.replace(/\.md$/, '')
    const relativePath = path.relative(postsDirectory, filepath)

    let routers = []
    if (relativePath.length > 0) {
        routers = relativePath.split("/")
    }
    routers.push(id)

    return routers
}

export function getAllPostIds() {
    // const fileNames = fs.readdirSync(postsDirectory)


    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]

    getAllMd(postsDirectory)
    let allIds = all
    console.log(allIds)
    return allIds.map(ids => {
        return {
            params: {
                id: ids
            }
        }
    })
}

//const imgReg = /<img.*?(?:>|\/>)/gi
//const imgReg = /<img([^>]*)\ssrc=(['"])(?:[^\2\/]*\/)*([^\2]+)\2/gi
const imgReg = /<img ([^>]*)src=(['"])([^'"]+)([^>]*>)/gi
function replaceImages(str) {

    //return str.replace(imgReg, "<img$1 src=$2newPath/$3$2");
    //let images = []
    return str.replace(imgReg, function (match, p1, p2, p3, p4) {
        console.log(match)
        console.log("p1=" + p1)
        console.log("p2=" + p2)
        console.log("p3=" + p3)
        console.log("p4=" + p4)
        let a = "/" + path.relative(publicDirectory, p3)

        return ['<img ', p1, 'src=', p2, a, p4].join('');
    })
}

export async function getPostData(id) {

    const fullPath = path.join(postsDirectory, id.join('/').concat('.md'))
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = replaceImages(processedContent.toString())
    //Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}