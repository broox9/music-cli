const { handlers, parseLine } = require('./music')

jest.mock('console', () => ({
  log: jest.fn()
}))

jest.mock('./helpers', () => ({
  logSystem: jest.fn(),
  logWarn: jest.fn(),
  logInfo: jest.fn(),
  tokenizer: jest.fn()
    .mockReturnValue({ command: 'show', qualifier: 'all', details: '"Guy"' })
}))

jest.genMockFromModule('./helpers')


describe('handler functions', () => {
  test('parseLine', () => {
    expect(parseLine.constructor).toBeDefined()
    expect(handlers.handleShow).toBeDefined()
    expect(handlers.handleAdd)
  })
})

describe('handlers', () => {
  let showSpy = jest.spyOn(handlers, 'handleShow')

  test('handleShow', () => {
    parseLine('show all "Teddy Riley"')
    expect(showSpy).toHaveBeenCalled()
  })
})