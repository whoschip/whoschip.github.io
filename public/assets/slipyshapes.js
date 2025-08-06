document.addEventListener('DOMContentLoaded', () => {
    const shapes = document.querySelectorAll('.shape');
    const config = {
        repelRadius: 200,
        repelStrength: 500, // Increased for a stronger, more noticeable push
        lerpSpeed: 0.10, // Reduced for a more "slippery" feel
        friction: 0.9, // A new property to simulate friction
        idleTimeout: 10000 // 10 seconds
    };

    const shapeStates = Array.from(shapes).map(shape => {
        const rect = shape.getBoundingClientRect();
        return {
            element: shape,
            tx: 0,
            ty: 0,
            vx: 0, // New velocity variable for x-axis
            vy: 0, // New velocity variable for y-axis
            targetTx: 0,
            targetTy: 0,
            initialCenter: {
                initialX: rect.left + rect.width / 2,
                initialY: rect.top + rect.height / 2
            }
        };
    });

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let timeoutId = null;
    let isAnimating = false;

    function updateShapePositions() {
        let needsAnimation = false;

        shapeStates.forEach(state => {
            // Apply friction to velocity
            state.vx *= config.friction;
            state.vy *= config.friction;
            
            // Update position with velocity
            state.tx += state.vx;
            state.ty += state.vy;

            // Smoothly move towards the target (home) position
            state.tx += (state.targetTx - state.tx) * config.lerpSpeed;
            state.ty += (state.targetTy - state.ty) * config.lerpSpeed;

            // Check if any movement is significant enough to continue animation
            if (Math.abs(state.vx) > 0.05 || Math.abs(state.vy) > 0.05 ||
                Math.abs(state.targetTx - state.tx) > 0.05 ||
                Math.abs(state.targetTy - state.ty) > 0.05) {
                needsAnimation = true;
            }

            state.element.style.transform = `translate3d(${state.tx}px, ${state.ty}px, 0) rotate(var(--start-rotation, 0deg))`;
        });

        if (needsAnimation) {
            requestAnimationFrame(updateShapePositions);
        } else {
            isAnimating = false;
        }
    }

    function calculateRepulsion() {
        shapeStates.forEach(state => {
            const shapeX = state.initialCenter.initialX + state.tx;
            const shapeY = state.initialCenter.initialY + state.ty;

            const dx = mouse.x - shapeX;
            const dy = mouse.y - shapeY;
            const distance = Math.hypot(dx, dy);

            if (distance < config.repelRadius) {
                // The main change: Apply a constant force regardless of distance (within the repelRadius)
                const angle = Math.atan2(dy, dx);
                // Directly add to velocity, making them "slip" away
                state.vx += -Math.cos(angle) * config.repelStrength / 100;
                state.vy += -Math.sin(angle) * config.repelStrength / 100;
            }
        });

        if (!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(updateShapePositions);
        }
    }

    function resetPositionsSmooth() {
        shapeStates.forEach(state => {
            state.targetTx = 0;
            state.targetTy = 0;
            // Also reset velocity when returning home
            state.vx = 0;
            state.vy = 0;
        });

        if (!isAnimating) {
            isAnimating = true;
            requestAnimationFrame(updateShapePositions);
        }
    }

    function handleMouseMove(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(resetPositionsSmooth, config.idleTimeout);

        calculateRepulsion();
    }

    window.addEventListener('resize', () => {
        shapes.forEach((shape, index) => {
            const rect = shape.getBoundingClientRect();
            shapeStates[index].initialCenter.initialX = rect.left + rect.width / 2;
            shapeStates[index].initialCenter.initialY = rect.top + rect.height / 2;
        });
        calculateRepulsion();
    }, { passive: true });

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    window.addEventListener('mouseleave', () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(resetPositionsSmooth, config.idleTimeout);
    });

    // Initial call to ensure shapes are in their home position
    resetPositionsSmooth();
});