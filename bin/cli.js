#! /usr/bin/env node

import { program } from 'commander'
import chalk from 'chalk'
import figlet from 'figlet'
import packageData from '../package.json' assert { type: 'json' }
import create from '../lib/create.js'

// 创建新项目
program
  // 定义命令和参数
  .command('create <app-name>')
  .description('create a new project')
  .option('-f, --force', 'overwrite target directory if it exists')
  .action((name, options) => {
    create(name, options)
  })

// 配置 config 命令
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <path>', 'get value from option')
  .option('-s, --set <path> <value>')
  .option('-d, --delete <path>', 'delete option from config')
  .action((value, options) => {
    console.log(value, options)
  })

// 配置 UI 命令
program
  .command('ui')
  .description('start add open ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((option) => {
    console.log(option)
  })

program
  // 配置版本号信息
  .version(`v${packageData.version}`)
  .usage('<command> [option]')

program.on('--help', () => {
  // 使用 figlet 绘制 logo
  console.log(
    '\r\n' +
      figlet.textSync('hb', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
      })
  )
  // 新增说明信息
  console.log(
    `\r\nRun ${chalk.cyan(
      `hb <command> --help`
    )} for detailed usage of given command\r\n`
  )
})

// 解析用户执行命令传入参数
program.parse(process.argv)
