#!/usr/bin/env node

const { readFileSync, existsSync } = require('fs')
const { join } = require('path')

/** Fija la raíz de la app antes de arrancar el servidor (una instancia por app/puerto). */
function ensureThemeEditorProjectRoot() {
  if (process.env.THEME_EDITOR_PROJECT_ROOT) return

  let dir = process.cwd()
  for (let i = 0; i < 12; i++) {
    const pkgPath = join(dir, 'package.json')
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
        if (pkg.name === '@studio/theme-editor') {
          dir = join(dir, '..')
          continue
        }
        const deps = { ...pkg.dependencies, ...pkg.devDependencies }
        if (deps.next) {
          process.env.THEME_EDITOR_PROJECT_ROOT = dir
          return
        }
      } catch {
        // ignorar
      }
    }
    const parent = join(dir, '..')
    if (parent === dir) break
    dir = parent
  }
}

ensureThemeEditorProjectRoot()

// 1) Carga tu ESM bundle con dynamic import
; (async () => {
  try {
    await import('../dist/index.cjs')    // esto deja listo tu loader dev
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  // 2) Después, arranca el dev-server real con los mismos args
  const [, , cmd, ...args] = process.argv

  // Si no hay comando adicional, simplemente termina exitosamente
  if (!cmd) {
    console.log('✅ theme-editor completado')
    process.exit(0)
  }

  const { spawn } = require('child_process')
  const child = spawn(cmd, args, {
    stdio: 'inherit',
    shell: true      // para que resuelva "next" en Windows/macOS
  })

  child.on('exit', code => process.exit(code))
})()