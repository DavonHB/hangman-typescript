import { useCallback, useEffect, useState } from "react"
import words from './wordList.json'
import  { HangmanDrawing } from './HangmanDrawing'
import { HangmanWord } from './HangmanWord'
import { Keyboard } from './Keyboard'

function getWord() {
  return words[Math.floor(Math.random() * words.length)] 
}

function App() {
const [wordGuess, setWordGuess] = useState(getWord)

const [guessedLetters, setGuessedLetters] = useState<string[]>([])

const incorrectLetters = guessedLetters.filter(letter => !wordGuess.includes(letter))

const isLoser = incorrectLetters.length >= 6
const isWinner = wordGuess.split('').every(letter =>  guessedLetters.includes(letter))

const addGuessedLetter = useCallback((letter: string) => {
  if (guessedLetters.includes(letter) || isLoser || isWinner)  return 

  setGuessedLetters(currentLetters => [...currentLetters, letter])
}, [guessedLetters, isWinner, isLoser])

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

useEffect(() => {
  const handler = (event: KeyboardEvent) => {
    const key = event.key

    if (key !== 'Enter') return

    event.preventDefault()
    setGuessedLetters([])
    setWordGuess(getWord())
  }

  document.addEventListener('keypress', handler)

  return () => {
    document.removeEventListener('keypress', handler)
  }
}, [])

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
       <div style={{ fontSize: '2rem', textAlign: 'center' }}>
        {isWinner && 'Winner! - Refresh to try again'}
        {isLoser && "Nice Try - Refresh to try again"}
       </div>
       <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
       <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordGuess={wordGuess} />
       <div style={{ alignSelf: 'stretch' }}>
        <Keyboard 
          disabled={isWinner || isLoser}
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
