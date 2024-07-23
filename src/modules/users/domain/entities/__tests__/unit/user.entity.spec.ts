import { faker } from '@faker-js/faker'
import { UserEntity, UserProps } from '../../user.entity'

describe('Testes Unitários de UserEntity', () => {
  let props: UserProps
  let sut: UserEntity

  beforeEach(() => {
    props = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }

    sut = new UserEntity(props)
  })

  it('deve definir createdAt como a data atual se não estiver definido', () => {
    expect(sut.props.name).toEqual(props.name)
    expect(sut.props.email).toEqual(props.email)
    expect(sut.props.password).toEqual(props.password)
    expect(sut.props.createdAt).toBeInstanceOf(Date)
  })

  // it('não deve alterar createdAt se já estiver definido', () => {
  //   const existingDate = new Date('2022-01-01')
  //   const props = {
  //     name: 'Bob',
  //     email: 'bob@example.com',
  //     password: 'senha456',
  //     createdAt: existingDate,
  //   }
  //   sut = new UserEntity(props)

  //   expect(sut.props.createdAt).toBe(existingDate)
  // })
})
