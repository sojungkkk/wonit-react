import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import Clock from './Clock'

describe('Clock 컴포넌트', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('현재 시각을 표시한다', () => {
    // Given: 시스템 시각을 고정한다.
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 8, 10, 9, 5, 7))

    // When: Clock 컴포넌트를 렌더링한다.
    render(<Clock />)

    // Then: 현재 시각이 표시된다.
    expect(screen.getByText('오전 9:05:07')).toBeInTheDocument()
  })

  it('1초마다 현재 시각을 갱신한다', () => {
    // Given: 초기 시간을 설정하고 컴포넌트를 렌더링한다.
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 8, 10, 9, 5, 7))
    render(<Clock />)

    // When: 1초를 흐르게 한다.
    act(() => {
      vi.advanceTimersByTime(1000)
    })

    // Then: 시각이 1초 뒤로 갱신된다.
    expect(screen.getByText('오전 9:05:08')).toBeInTheDocument()
  })

  it('언마운트되면 interval을 정리한다', () => {
    // Given: Clock 컴포넌트를 렌더링한다.
    vi.useFakeTimers()
    const { unmount } = render(<Clock />)

    // When: 컴포넌트를 언마운트한다.
    unmount()

    // Then: 등록된 타이머가 제거된다.
    expect(vi.getTimerCount()).toBe(0)
  })
})