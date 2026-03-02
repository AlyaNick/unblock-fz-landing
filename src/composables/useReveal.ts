import { onMounted, onUnmounted, type Ref } from 'vue'

const REVEAL_SELECTOR = '.reveal, .reveal-left, .reveal-right, .reveal-scale'

export function useReveal(containerRef: Ref<HTMLElement | null>, selector = REVEAL_SELECTOR) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    )

    const el = containerRef.value
    if (!el) return
    el.querySelectorAll(selector).forEach((child) => observer!.observe(child))
  })

  onUnmounted(() => observer?.disconnect())
}
