function readPackage(pkg, context) {
  if (pkg.dependencies['react']) {
    pkg.dependencies = {
      ...pkg.dependencies,
      react: '17.0.1'
    }
  }
  
  return pkg
}

module.exports = {
  hooks: {
    readPackage
  }
}
