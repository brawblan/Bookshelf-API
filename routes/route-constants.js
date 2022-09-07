const Route = {
  Auth: {
    main: '/api/v1/auth',
    register: '/register',
    login: '/login',
    me: '/me',
    logout: '/logout'
  },
  Books: {
    main: '/api/v1/books',
    create: '/create',
    getManyBooks: '', //use params to specifiy query
    getOneBook: '/:id',
    update: '/:id',
    delete: '/:id'
  },
  S3: {
    main: '/api/v1/s3',
    uploadPhotoToS3: '/upload',
    deleteImageFromS3: '/delete/:id'
  }
}

module.exports = {
  Route
}
