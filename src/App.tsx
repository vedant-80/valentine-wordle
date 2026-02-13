import { InformationCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect, useCallback } from "react";
import { Alert } from "./components/alerts/Alert";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { AboutModal } from "./components/modals/AboutModal";
import { InfoModal } from "./components/modals/InfoModal";
import { WinModal } from "./components/modals/WinModal";
import { HeartBackground } from "./components/background/HeartBackground";
import { CountdownTimer } from "./components/CountdownTimer";
import { isWordInWordList, isWinningWord, solution } from "./lib/words";
import "./App.css";

function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true);
    }
  }, [isGameWon]);

  const onChar = useCallback(
    (value: string) => {
      setCurrentGuess((prev) => {
        if (prev.length < 9 && guesses.length < 6) {
          return `${prev}${value}`;
        }
        return prev;
      });
    },
    [guesses.length]
  );

  const onDelete = useCallback(() => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, []);

  const onEnter = useCallback(() => {
    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true);
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false);
      }, 2000);
    }

    const winningWord = isWinningWord(currentGuess);

    if (currentGuess.length === 9 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");

      if (winningWord) {
        return setIsGameWon(true);
      }

      if (guesses.length === 5) {
        setIsGameLost(true);
        return setTimeout(() => {
          setIsGameLost(false);
        }, 2000);
      }
    }
  }, [currentGuess, guesses, isGameWon]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't handle keyboard input when modals are open
      if (isWinModalOpen || isInfoModalOpen || isAboutModalOpen) {
        return;
      }

      const key = event.key.toUpperCase();

      // Handle alphabetical characters
      if (key.length === 1 && key >= "A" && key <= "Z") {
        onChar(key);
        return;
      }

      // Handle Enter key
      if (key === "ENTER") {
        event.preventDefault();
        onEnter();
        return;
      }

      // Handle Backspace and Delete keys
      if (key === "BACKSPACE" || key === "DELETE") {
        event.preventDefault();
        onDelete();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isWinModalOpen, isInfoModalOpen, isAboutModalOpen, onChar, onDelete, onEnter]);

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8 relative z-10">
      <HeartBackground />
      <Alert message="Word not found" isOpen={isWordNotFoundAlertOpen} />
      <Alert
        message={`You lost, the word was ${solution}`}
        isOpen={isGameLost}
      />
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">Drishti, will you be my...</h1>
        <InformationCircleIcon
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsInfoModalOpen(true)}
        />
      </div>
      <CountdownTimer />
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
        guesses={guesses}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsAboutModalOpen(true)}
      >
        About this game
      </button>
    </div>
  );
}

export default App;
