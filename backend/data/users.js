import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Compte Admin',
    lastname: 'admin',
    email: 'admin@mail.com',
    role: 'user',
    password: bcrypt.hashSync('Kr123456!', 10),
    isAdmin: true,
  },
  {
    name: 'Compte revendeur',
    lastname: 'revendeur',
    email: 'user@mail.com',
    role: 'revendeur',
    password: bcrypt.hashSync('Kr123456!', 10),
  },
  {
    name: 'Compte partenaire',
    lastname: 'partenaire',
    email: 'partenaire@mail.com',
    role: 'partenaire',
    password: bcrypt.hashSync('Kr123456!', 10),
  },
]

export default users
