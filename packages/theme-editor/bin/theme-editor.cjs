#!/usr/bin/env node

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