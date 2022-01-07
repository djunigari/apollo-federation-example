const accountAPI = require('../dataSources/AccountAPI')

test('find account by id', () => {
    let cliente_dao = new ClienteDAO()
    cliente = cliente_dao.find_by_id(10)
    expect(cliente.nome).toBe("Edson Arantes do Nascimento")
  })