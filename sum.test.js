test('add 1 + 2', () => {
     let sum = (() => {
        return 1+2;
    })()
    expect(sum).toBe(3)
})