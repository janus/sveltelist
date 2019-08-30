import { cubicOut } from 'svelte/easing';

export function expand(node, params) {
    const {
        delay = 0,
        duration = 400,
        easing = cubicOut,
    } = params;
    console.dir(node)
    const w = parseFloat(getComputedStyle(node).strokeWidth);

    return {
        delay,
        duration,
        easing,
        css: t => `opacity: ${t}; stroke-width: ${t * w}`
    };
}