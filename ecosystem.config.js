module.exports = {
  apps: [
    {
      name: 'MSSPL',
      exec_mode: 'cluster',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
    }
  ]
}