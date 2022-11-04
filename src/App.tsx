import { useCallback, useEffect, useState } from "react"
import words from './wordList.json'
import  { HangmanDrawing } from './HangmanDrawing'
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'

function App() {
const [wordGuess, setWordGuess] = useState(() => {
  // return random word
  return words[Math.floor(Math.random() * words.length)] 
})

const [guessedLetters, setGuessedLetters] = useState<string[]>([])

const incorrectLetters = guessedLetters.filter(letter => !wordGuess.includes(letter))

const addGuessedLetter = useCallback((letter: string) => {
  if (guessedLetters.includes(letter)) return 

  setGuessedLetters(currentLetters => [...currentLetters, letter])
}, [guessedLetters])

useEffect(() => {
  const handler = (event: KeyboardEvent) => {
    const key = event.key

    if (!key.match(/^[a-z]$/)) return

    event.preventDefault()
    addGuessedLetter(key)
  }

  document.addEventListener('keypress', handler)

  return () => {
    document.removeEventListener('keypress', handler)
  }
}, [guessedLetters])

  return (
    <>
    <div style={{
      maxWidth: '880px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem',
      margin: ' 0 auto',
      alignItems: 'center'
    }}>
       <div style={{ fontSize: '2rem', textAlign: 'center' }}>Lose Win</div>
       <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
       <HangmanWord guessedLetters={guessedLetters} wordGuess={wordGuess} />
       <div style={{ alignSelf: 'stretch' }}>
        <Keyboard 
          activeLetters={guessedLetters.filter(letter => wordGuess.includes(letter))} 
          inactiveLetters={incorrectLetters} 
          addGuessedLetter={addGuessedLetter}
        />
       </div>
    </div>
    </>
  )
}

export default App
