import {checkbox, input} from '@inquirer/prompts';
import * as path from 'path'

import {default as myRegex} from './utils/regex.utils'
import * as fs from "fs";

export async function cli() {
    const components = await checkbox({
        message: 'what components?',
        choices: [
            {name: 'entity', value: 'entity'},
            {name: 'repo', value: 'repo'},
            {name: 'usecase', value: 'usecase'},
            {name: 'mock', value: 'mock'},
            {name: 'controller', value: 'controller'},
            {name: 'dto', value: 'dto'},
            {name: 'controller.spec', value: 'spec'},
        ]
    })
    const resource = await input({
        message: 'resource name:'
    })
    if (components.indexOf('repo') >= 0) {
        await createRepository(resource)
    }
    if (components.indexOf('usecase') >= 0) {
        await createUsecase(resource)
    }
    if (components.indexOf('mock') >= 0) {
        await createMock(resource)
    }
    if (components.indexOf('controller') >= 0) {
        await createController(resource)
    }
    if (components.indexOf('dto') >= 0) {
        await createDto(resource)
    }
    if (components.indexOf('spec') >= 0) {
        await createSpec(resource)
    }
    if (components.indexOf('entity') >= 0) {
        await createEntity(resource)
    }
}

async function createFile(resource, filePath, fileName, sampleFilePath, dirPath?) {
    if (dirPath) {
        if (!fs.existsSync(path.join(__dirname, filePath + dirPath))) {
            fs.mkdirSync(path.join(__dirname, filePath + dirPath));
        }
        filePath += dirPath
    }

    if (fs.existsSync(path.join(__dirname, filePath + fileName))) {
        console.log(`${filePath + fileName} exists!`)
        return;
    }
    const content = fs.readFileSync(path.join(__dirname, sampleFilePath)).toString()
    const newContent = applyResourceName(content, resource)
    fs.writeFileSync(path.join(__dirname, filePath + fileName), newContent)
    console.log('\x1b[36m%s\x1b[0m', filePath + fileName)
}

async function createSpec(resource: string) {
    const filePath = '../infrastructure/controllers/'
    const dirPath = myRegex.toKebabCase(resource) + '/'
    const fileName = myRegex.toKebabCase(resource) + '.controller.spec.ts'
    await createFile(resource, filePath, fileName, './samples/product-price.controller.spec.txt', dirPath)
}

async function createDto(resource: string) {
    const filePath = '../infrastructure/controllers/'
    const dirPath = myRegex.toKebabCase(resource) + '/'
    const fileName = myRegex.toKebabCase(resource) + '.dto.ts'
    await createFile(resource, filePath, fileName, './samples/product-price.dto.txt', dirPath)
}

async function createEntity(resource: string) {
    const filePath = '../infrastructure/entities/'
    const fileName = myRegex.toKebabCase(resource) + '.entity.ts'
    await createFile(resource, filePath, fileName, './samples/product-price.entity.txt')
}

async function createController(resource: string) {

    const filePath = '../infrastructure/controllers/'
    const dirPath = myRegex.toKebabCase(resource) + '/'
    const fileName = myRegex.toKebabCase(resource) + '.controller.ts'

    await createFile(resource, filePath, fileName, './samples/product-price.controller.txt', dirPath)

}

async function createMock(resource: string) {
    const filePath = '../infrastructure/mock/'
    const fileName = myRegex.toKebabCase(resource) + '.mock.ts'

    await createFile(resource, filePath, fileName, './samples/product-price.mock.txt')


}

async function createRepository(resource: string) {
    const filePath = '../infrastructure/repositories/providers/'
    const fileName = myRegex.toKebabCase(resource) + '.repository.ts'
    await createFile(resource, filePath, fileName, './samples/product-price.repository.txt')

}

async function createUsecase(resource: string) {
    const filePath = '../usecases/'
    const dirPath = myRegex.toKebabCase(resource) + '/'
    const fileName = myRegex.toKebabCase(resource) + '.usecase.ts'

    await createFile(resource, filePath, fileName, './samples/product-price.usecase.txt', dirPath)


}

function applyResourceName(content, name) {
    content = replaceAll(content, 'product_price', myRegex.toSnakeCase(name))
    content = replaceAll(content, 'product-price', myRegex.toKebabCase(name))
    content = replaceAll(content, 'productPrice', myRegex.toCamelCase(name))
    content = replaceAll(content, 'ProductPrice', myRegex.toPascalCase(name));
    content = replaceAll(content, 'PRODUCT_PRICE', myRegex.toSnakeCase(name).toUpperCase())
    return content
}

function replaceAll(content, find, replace) {
    return content.split(find).join(replace);
}

cli()