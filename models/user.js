const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { UNAUTHORIZED_ERROR } = require('../errors/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: [true, 'Email должен быть уникальным'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля - 2, получено - {VALUE}'],
    maxlength: [30, 'Максимальная длина поля - 30, получено - {VALUE}'],
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UNAUTHORIZED_ERROR('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UNAUTHORIZED_ERROR('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
