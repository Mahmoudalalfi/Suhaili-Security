import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TextRotate = forwardRef(
  (
    {
      texts,
      transition = { type: 'spring', damping: 25, stiffness: 300 },
      initial = { y: '100%', opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: '-120%', opacity: 0 },
      animatePresenceMode = 'wait',
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = 'first',
      loop = true,
      auto = true,
      splitBy = 'characters',
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...props
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)

    const splitIntoCharacters = (text) => {
      if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
        const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })
        return Array.from(segmenter.segment(text), ({ segment }) => segment)
      }
      return Array.from(text)
    }

    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex]
      if (splitBy === 'characters') {
        const words = currentText.split(' ')
        return words.map((word, i) => ({
          characters: splitIntoCharacters(word),
          needsSpace: i !== words.length - 1,
        }))
      }
      return splitBy === 'words'
        ? currentText.split(' ')
        : splitBy === 'lines'
        ? currentText.split('\n')
        : currentText.split(splitBy)
    }, [texts, currentTextIndex, splitBy])

    const getStaggerDelay = useCallback(
      (index, totalChars) => {
        if (staggerFrom === 'first') return index * staggerDuration
        if (staggerFrom === 'last') return (totalChars - 1 - index) * staggerDuration
        if (staggerFrom === 'center') {
          const center = Math.floor(totalChars / 2)
          return Math.abs(center - index) * staggerDuration
        }
        if (staggerFrom === 'random') {
          const randomIndex = Math.floor(Math.random() * totalChars)
          return Math.abs(randomIndex - index) * staggerDuration
        }
        return Math.abs(staggerFrom - index) * staggerDuration
      },
      [staggerFrom, staggerDuration]
    )

    const handleIndexChange = useCallback(
      (newIndex) => {
        setCurrentTextIndex(newIndex)
        onNext?.(newIndex)
      },
      [onNext]
    )

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop ? 0 : currentTextIndex
          : currentTextIndex + 1
      if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex)
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop ? texts.length - 1 : currentTextIndex
          : currentTextIndex - 1
      if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex)
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const jumpTo = useCallback(
      (index) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1))
        if (validIndex !== currentTextIndex) handleIndexChange(validIndex)
      },
      [texts.length, currentTextIndex, handleIndexChange]
    )

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) handleIndexChange(0)
    }, [currentTextIndex, handleIndexChange])

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [
      next, previous, jumpTo, reset,
    ])

    useEffect(() => {
      if (!auto) return
      const id = setInterval(next, rotationInterval)
      return () => clearInterval(id)
    }, [next, rotationInterval, auto])

    return (
      <motion.span
        style={{ display: 'inline-flex', flexWrap: 'wrap', whiteSpace: 'pre-wrap', ...props.style }}
        layout
        transition={transition}
        {...props}
      >
        <span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
          {texts[currentTextIndex]}
        </span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.div
            key={currentTextIndex}
            style={{ display: 'inline-flex', flexWrap: 'wrap' }}
            layout
            aria-hidden="true"
          >
            {(splitBy === 'characters'
              ? elements
              : elements.map((el, i) => ({
                  characters: [el],
                  needsSpace: i !== elements.length - 1,
                }))
            ).map((wordObj, wordIndex, array) => {
              const previousCharsCount = array
                .slice(0, wordIndex)
                .reduce((sum, word) => sum + word.characters.length, 0)
              return (
                <span key={wordIndex} style={{ display: 'inline-flex' }}>
                  {wordObj.characters.map((char, charIndex) => (
                    <motion.span
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      key={charIndex}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(
                          previousCharsCount + charIndex,
                          array.reduce((sum, word) => sum + word.characters.length, 0)
                        ),
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordObj.needsSpace && <span style={{ whiteSpace: 'pre' }}> </span>}
                </span>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    )
  }
)

TextRotate.displayName = 'TextRotate'
export { TextRotate }
