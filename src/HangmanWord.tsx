type HangmanWordProps = {
    guessedLetters: string[]
    wordGuess: string
    reveal?: boolean
}

export function HangmanWord ({ guessedLetters, wordGuess, reveal = false }: HangmanWordProps) {
    return (
    <div style={{ 
        display: 'flex', 
        gap: '.25em', 
        fontSize: '6rem', 
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontFamily: 'monospace'
    }}>
        {wordGuess.split('').map((letter, index) => (
            <span style={{ borderBottom: '.1em solid black' }} key={index} >
                <span style={{
                    visibility: guessedLetters.includes(letter) || reveal 
                    ? 'visible' 
                    : 'hidden',
                    color: !guessedLetters.includes(letter) && reveal ? 'red' : 'black'
                }} >{letter}</span>
            </span>
        ))}
    </div>
    )
}