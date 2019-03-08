import * as cluster from 'cluster'
import * as os from 'os'

if (cluster.isWorker) {
  import('.')
} else {
  const env = 'production'

  const clusterCount = os.cpus().length
  console.log('Launching', clusterCount, 'workers...')

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      'Worker',
      worker.process.pid,
      'exited with code',
      code,
      'and signal',
      signal
    )
    console.log('Starting a new fork...')
    cluster.fork(env)
  })

  cluster.on('online', worker => console.log('Worker', worker.process.pid, 'is online'))

  for (let i = 0; i < clusterCount; i++) {
    cluster.fork(env)
  }
}
