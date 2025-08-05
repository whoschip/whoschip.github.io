document.addEventListener('DOMContentLoaded', () => {
    const shapes = document.querySelectorAll('.shape');
    const repelRadius = 150;
    const maxRepelDistance = 100;
    const lerpSpeed = 0.15; // 0..1, higher is snappier
    let lastMouseMove = Date.now();
    let timeoutId = null;
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let animating = false;

    // Store each shape's current offset
    const shapeStates = Array.from(shapes).map(() => ({
        tx: 0, ty: 0, targetTx: 0, targetTy: 0
    }));

    function animateShapes() {
        let needsContinue = false;
        shapes.forEach((shape, i) => {
            // Lerp towards target
            shapeStates[i].tx += (shapeStates[i].targetTx - shapeStates[i].tx) * lerpSpeed;
            shapeStates[i].ty += (shapeStates[i].targetTy - shapeStates[i].ty) * lerpSpeed;

            // If not close enough, keep animating
            if (Math.abs(shapeStates[i].tx - shapeStates[i].targetTx) > 0.5 ||
                Math.abs(shapeStates[i].ty - shapeStates[i].targetTy) > 0.5) {
                needsContinue = true;
            }

            shape.style.transform = `translate(${shapeStates[i].tx}px, ${shapeStates[i].ty}px) rotate(var(--start-rotation, 0deg))`;
        });
        if (needsContinue) {
            requestAnimationFrame(animateShapes);
        } else {
            animating = false;
        }
    }

    function updateTargets() {
        shapes.forEach((shape, i) => {
            const rect = shape.getBoundingClientRect();
            const shapeX = rect.left + rect.width / 2;
            const shapeY = rect.top + rect.height / 2;
            const dx = mouse.x - shapeX;
            const dy = mouse.y - shapeY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < repelRadius) {
                const strength = (2 - distance / repelRadius) * maxRepelDistance;
                const angle = Math.atan2(dy, dx);
                shapeStates[i].targetTx = -Math.cos(angle) * strength;
                shapeStates[i].targetTy = -Math.sin(angle) * strength;
            } else {
                shapeStates[i].targetTx = 0;
                shapeStates[i].targetTy = 0;
            }
        });
        if (!animating) {
            animating = true;
            requestAnimationFrame(animateShapes);
        }
    }

    function resetTargets() {
        shapeStates.forEach(state => {
            state.targetTx = 0;
            state.targetTy = 0;
        });
        if (!animating) {
            animating = true;
            requestAnimationFrame(animateShapes);
        }
    }

    document.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        lastMouseMove = Date.now();

        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (Date.now() - lastMouseMove >= 1000) {
                resetTargets();
            }
        }, 1000);

        updateTargets();
    });

    document.addEventListener('mouseleave', () => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(resetTargets, 1000);
    });

    // Initial reset
    resetTargets();
});