"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resize handler
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const fontSize = 13;
        // Mix of binary, hex chars, and katakana-inspired glyphs for matrix vibe
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ01100110ABCDEF><{}[]|/\\";
        const charArray = chars.split("");

        let cols = Math.floor(canvas.width / fontSize);
        let drops: number[] = Array(cols).fill(0).map(() => Math.random() * -100);

        const draw = () => {
            cols = Math.floor(canvas.width / fontSize);
            if (drops.length !== cols) {
                drops = Array(cols).fill(0).map(() => Math.random() * -100);
            }

            // Fade trail — semi-transparent black overlay
            ctx.fillStyle = "rgba(6, 14, 16, 0.08)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < drops.length; i++) {
                const char = charArray[Math.floor(Math.random() * charArray.length)];
                const y = drops[i] * fontSize;

                // Head of the stream — bright laser
                if (drops[i] * fontSize < canvas.height && drops[i] * fontSize > 0) {
                    const headAlpha = Math.random() > 0.5 ? 1 : 0.8;
                    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
                    if (Math.random() > 0.9) {
                        // Bright white head flash
                        ctx.fillStyle = `rgba(220, 255, 250, ${headAlpha})`;
                    } else {
                        // Laser teal-green
                        ctx.fillStyle = `rgba(0, 232, 200, ${headAlpha})`;
                    }
                    ctx.fillText(char, i * fontSize, y);
                }

                // Body — dimmer teal
                if (drops[i] > 1) {
                    const bodyAlpha = 0.25 + Math.random() * 0.2;
                    ctx.fillStyle = `rgba(0, 180, 155, ${bodyAlpha})`;
                    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
                    ctx.fillText(
                        charArray[Math.floor(Math.random() * charArray.length)],
                        i * fontSize,
                        (drops[i] - 1) * fontSize
                    );
                }

                // Randomize reset for organic feel
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += 0.5;
            }
        };

        const interval = setInterval(draw, 45);
        return () => {
            clearInterval(interval);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0.45,
                zIndex: 0,
                pointerEvents: "none",
            }}
            aria-hidden="true"
        />
    );
}
