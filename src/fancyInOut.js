import BezierEasing from 'bezier-easing'

const namedCurves = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1.0],
  easeIn: [0.42, 0, 1.0, 1.0],
  easeOut: [0, 0, 0.58, 1.0],
  easeInOut: [0.42, 0, 0.58, 1.0],
  materialEasing: [0.4, 0.0, 0.2, 1]
}

/**
 * Applies fancy in and out animations to an HTML element.
 * @param {Object} options - The animation options.
 * @param {string} [options.x='150px'] - The x-coordinate of the final position.
 * @param {string} [options.y='150px'] - The y-coordinate of the final position.
 * @param {number} [options.angle=90] - The angle of rotation in degrees.
 * @param {number} [options.duration=400] - The duration of the animation in milliseconds.
 * @param {number} [options.initialScale=0.3] - The initial scale of the element.
 * @param {number} [options.initialOpacity=0.1] - The initial opacity of the element.
 * @param {string|number[]} [options.cubicBezier='easeInOut'] - The cubic bezier curve for easing.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the animation triggers.
 * @throws {Error} - If the cubicBezier value is invalid.
 */
const fancyInOut = async (options = {}) => {
  const {
    x = '150px',
    y = '150px',
    angle = 90,
    duration = 400,
    initialScale = 0.3,
    initialOpacity = 0.1,
    cubicBezier = 'easeInOut'
  } = options;
  
  let easing = cubicBezier
  if (typeof easing === 'string') {
    if (namedCurves[easing]) {
      easing = namedCurves[easing]
    } else {
      throw new Error('Invalid cubicBezier value. Must be an array of 4 numbers or a named cubic bezier curve')
    }
  } else {
    //check if all entries in cubicBezier are numbers between 0 and 1
    if (!easing.some((entry) => typeof entry !== 'number' || entry < 0 || entry > 1)) {
      throw new Error('Invalid cubicBezier value. All values must be numbers between 0 and 1')
    }
  }

  //create an html div element with 0 width and height, append it to the document body and return it
  const element = document.createElement('div');
  element.style.width = 0;
  element.style.height = 0;
  element.style.position = 'fixed';
  element.style.visibility = 'hidden';
  //add the element to the dom to ensure it's rendered
  document.body.prepend(element);

  //get the element's initial position X and Y
  const finalPos = {x: element.getBoundingClientRect().left};
  finalPos.y = element.getBoundingClientRect().top;
  // Apply CSS transformations
  element.style.transform = `translate(${x}, ${y})`;

  // Request a single animation frame to ensure element is rendered at the new position
  /**
   * Generates animation triggers for a given element.
   * @returns {Promise<{triggerEnter: Function, triggerLeave: Function}>} A promise that resolves to an object containing triggerEnter and triggerLeave functions.
   */
  const generateAnimationTriggers = () => {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const initialPos = {x: element.getBoundingClientRect().left};
        initialPos.y = element.getBoundingClientRect().top;
        
        // Calculate the x and y offsets in pixels
        const delta = [
          initialPos.x - finalPos.x,
          initialPos.y - finalPos.y
        ]
        
        const animationCurve = createAnimationCurveInterpolator(delta, angle, initialScale, initialOpacity)
        const triggerEnter = generateTriggers(duration, animationCurve, easing, true)
        const triggerLeave = generateTriggers(duration, animationCurve, easing, false)
        
        element.remove();
        
        resolve({triggerEnter, triggerLeave})
      });
    })
  }

  const {triggerEnter, triggerLeave} = await generateAnimationTriggers()
  return {triggerEnter, triggerLeave}
}

/**
 * Creates an animation curve interpolator function.
 *
 * @param {number} delta - The delta value.
 * @param {number} angle - The angle value.
 * @param {number} initialScale - The initial scale value.
 * @param {number} initialOpacity - The initial opacity value.
 * @returns {Function} The animation curve interpolator function.
 */
const createAnimationCurveInterpolator = (delta, angle, initialScale, initialOpacity) => (progressValue) => {
  let x, y;
  if (angle === 0) {
    [x, y] = interpolateLine(delta, progressValue);
  } else {
    const curveInterpolator = generateCurveInterpolator(delta, angle);
    [x, y] = curveInterpolator(progressValue)
  }
  let opacity = 1
  if (initialOpacity < 1) {
    opacity = initialOpacity + (1 - initialOpacity) * progressValue;
  }
  let scale = 1
  if (initialScale < 1) {
    scale = initialScale + (1 - initialScale) * progressValue;
  }
  
  return [
    x, y, scale, opacity
  ]
}
/**
 * Interpolates a line based on a delta and progress value.
 * @param {number[]} delta - The delta values for the line.
 * @param {number} progress - The progress value for the interpolation.
 * @returns {number[]} The interpolated line coordinates.
 */
export function interpolateLine(delta, progress) {
  const x = delta[0] * (1 - progress) * progress;
  const y = delta[1] * (1 - progress) * progress;
  return [x, y];
}

/**
 * Generates a curve interpolator function that calculates the points along a curve.
 * @param {number[]} initialCoords - The initial coordinates of the curve.
 * @param {number} angle - The angle of the curve in degrees.
 * @returns {Function} - The curve interpolator function.
 */
function generateCurveInterpolator(initialCoords, angle) {
  const midpoint = [initialCoords[0] / 2, initialCoords[1] / 2]
  const animationAnchorPoint = findAnchorPoint(midpoint, angle/2)
  const radius = Math.sqrt(animationAnchorPoint[0] ** 2 + animationAnchorPoint[1] ** 2);
  
  // Convert angle to radians
  const angleRad = (angle * Math.PI) / 180;

  // Calculate the initial and final angles
  const initialAngle = Math.atan2(initialCoords[1] - animationAnchorPoint[1], initialCoords[0] - animationAnchorPoint[0]);
  const finalAngle = initialAngle + angleRad;

  // Return a function that calculates the points along the curve
  const progress = n =>  {
      // Calculate the current angle
      const currentAngle = initialAngle + n * (finalAngle - initialAngle);

      // Calculate the current point
      const x = animationAnchorPoint[0] + radius * Math.cos(currentAngle);
      const y = animationAnchorPoint[1] + radius * Math.sin(currentAngle);

      return [x, y]
  }
  return progress
}

/**
 * Calculates the coordinates of an anchor point based on a given midpoint and anchor point angle.
 *
 * @param {number[]} midpoint - The coordinates of the midpoint.
 * @param {number} anchorPointAngle - The angle of the anchor point in degrees.
 * @returns {number[]} The coordinates of the anchor point.
 */
function findAnchorPoint(midpoint, anchorPointAngle) {
  const originRad = (90 - anchorPointAngle) * Math.PI / 180 // angle at originPoint in radians
  // Calculate midpointDistance
  const midpointDistance = Math.sqrt((midpoint[0]**2) + (midpoint[1]**2))
  // Calculate midpointAnchorDistance using the tangent of the angle at anchorPoint
  const midpointAnchorDistance = midpointDistance * Math.tan(originRad)
  const hipotenuse = Math.sqrt((midpointDistance**2) + (midpointAnchorDistance**2))
  // Calculate the unit vector from origin to midpoint
  const unitVectorOriginToMindpoint = [midpoint[0] / midpointDistance, midpoint[1] / midpointDistance]
  // Rotate this unit vector by the angle at origin to get the unit vector from origin to anchorPoint
  const unitVectorOriginToAnchor = [
    unitVectorOriginToMindpoint[0] * Math.cos(originRad) + unitVectorOriginToMindpoint[1] * Math.sin(originRad),
    -unitVectorOriginToMindpoint[0] * Math.sin(originRad) + unitVectorOriginToMindpoint[1] * Math.cos(originRad)
  ]
  // Multiply this unit vector by the length of the side from origin to anchor to get the vector from origin to anchor
  const vectorOriginToAnchor = [unitVectorOriginToAnchor[0] * hipotenuse, unitVectorOriginToAnchor[1] * hipotenuse]
  // Add this vector to the coordinates of origin to get the coordinates of anchor
  const anchorCoords = [Math.round(vectorOriginToAnchor[0]), Math.round(vectorOriginToAnchor[1])]

  return anchorCoords
}

/**
 * Generates triggers for animating an element.
 *
 * @param {number} duration - The duration of the animation in milliseconds.
 * @param {Function} animationCurve - The animation curve function.
 * @param {number[]} cubicBezier - The cubic bezier values.
 * @param {boolean} isForward - Indicates whether the animation is forward or backward.
 * @returns {Function} - The trigger function.
 */
const generateTriggers = (duration, animationCurve, cubicBezier, isForward) => (el, doneCallback) => {
    const startTime = performance.now();
    const bezierEasing = BezierEasing(...cubicBezier)
  
    function animate(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = isForward ? Math.min(elapsedTime / duration, 1) : Math.max(1 - elapsedTime / duration, 0);
      const [x, y, scale, alpha] = animationCurve(bezierEasing(progress));
  
      el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      el.style.opacity = alpha
  
      if (isForward && progress < 1 || !isForward && progress > 0) {
        requestAnimationFrame(animate);
      } else {
        doneCallback?.();
      }
    }
  
    requestAnimationFrame(animate);
}

export default fancyInOut
