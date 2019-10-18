const fs = require('fs')
const ora = require('ora')
const chalk = require('chalk')
const download = require('download-git-repo')
const inquirer = require('inquirer')

const spinner = ora('正在下载资源biu~～～')

const downloadFn = async (answers,dirname) => {
  const { framework, projectName = dirname, description = dirname } = answers

  let url = 'https://github.com :bodyno/react-starter-kit#master'
  if(framework === 'vue'){
    url = 'https://github.com :Mrminfive/vue-multiple-page#master'
  }
  spinner.start()
  try{
    await download(url, dirname, { clone: false })
    spinner.stop()
    console.log(chalk.green('下载模板成功～～~'))
  
    const pkg = process.cwd() + `/${dirname}/package.json`
  
    let content = JSON.parse(fs.readFileSync(pkg,'utf8'))
    Object.assign(content, { name,description })
    const res = JSON.stringify(content)
    fs.writeFileSync(pkg,res)
  }catch(e){
    spinner.stop()
    console.log(chalk.red('下载资源失败～～～'))
    console.log(err)
  }
}

const inquirerFn = () =>inquirer.prompt([
  {
    type: 'list',
    name: 'framework',
    message: 'biu~请选择开发用的脚手架:',
    choices: ['react','vue'],
    default: 'react'
  },
  { 
    type: 'input',
    name: 'projectName',
    message: 'biu~请输入项目名称:',
    default: 'demo'
  },
  {
    type: 'input',
    name: 'name',
    message: 'biu~请输入项目简介:',
    default: ''
  }
])

module.exports = { downloadFn, inquirerFn }