import { useEffect, useRef, useState } from 'react'

interface UseIntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersection({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
}: UseIntersectionOptions = {}): [
  ref: React.RefObject<HTMLDivElement>,
  isIntersecting: boolean
] {
  const [isIntersecting, setIntersecting] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const frozen = isIntersecting && freezeOnceVisible

  useEffect(() => {
    const element = ref?.current
    if (!element || frozen) return

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold, root, rootMargin }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [threshold, root, rootMargin, frozen])

  return [ref, isIntersecting]
}