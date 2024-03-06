import path from 'path'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import Generator from './generator.js'

async function create(name, options) {
  // 执行创建命令

  // 当前命令行选择的目录
  const cwd = process.cwd()
  // 需要创建的目录地址
  const targetDir = path.join(cwd, name)

  // 目录是否已经存在
  if (fs.existsSync(targetDir)) {
    // 是否为强制创建
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory exists. Do you want to overwrite?',
          choices: [
            {
              name: 'Yes',
              value: 'overwrite',
            },
            {
              name: 'No',
              value: false,
            },
          ],
        },
      ])

      if (!action) return
      else if (action === 'overwrite') {
        await fs.remove(targetDir)
      }
    }
  }

  // 创建项目
  const generator = Generator(name, targetDir)

  // 开始创建项目
  generator.create()
}

export default create
