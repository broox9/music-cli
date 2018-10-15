const {
  pause,
  resume,
  logInfo,
  logError,
  logWarn,
  logSystem,
  stripQuotes,
  tokenizer,
  helpText
} = require('./helpers.js')




describe('tokenizer function', () => {
  test('is a function', () => {
    expect(tokenizer.constructor).toBeDefined()
  })

  test('tokenizes lines', () => {
    const tokens = tokenizer('add all "Me" "The Money"')
    const tokens2 = tokenizer('show unplayed')

    expect(tokens.command).toBe('add')
    expect(tokens.qualifier).toBe('all')
    expect(tokens.details).toEqual(['"Me"', '"The Money"'])

    expect(tokens2.command).toBe('show')
    expect(tokens2.qualifier).toBe('unplayed')
    expect(tokens2.details).toBe(null)
  })
})

describe('stripQuotes', () => {
  test('strips quotes', () => {
    const str = '"i am here"'
    const str2 = 'i am "also" here'
    const str3 = 'i am here as well'

    expect(stripQuotes(str)).toBe('i am here')
    expect(stripQuotes(str2)).toBe('i am also here')
    expect(stripQuotes(str3)).toBe(str3)
  })
})

describe('log functions', () => {
  const logSpy = jest.spyOn(console, 'log')

  test('logSystem', () => {
    logSystem('Hello')
    expect(logSpy).toHaveBeenCalled()
  })
})