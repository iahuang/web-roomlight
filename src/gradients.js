export function getHex(clr) {
    return Color().fromHsv(clr).toString()
}

export function hueOffset(color, offset) {
    return {
        h: (color.h+offset)%360,
        s: color.s,
        v: color.v
    }
}
function gradientPart(color, gradientSize, dec) {
    let offset = gradientSize*dec;
    return `${getHex(hueOffset(color, offset))} ${dec*100}%`
}
export function makeGradient(color, gradientSize, angle=90, segments=5) {
    let gradientSegments = [];
    // segment gradient to make the result to look more "rainbow"
    // naive interpolation will mix colors kind of ugly
    // this effect is more noticable with a higher gradient size
    // if gradient size is set to 360 and there are no segments, a gradient will not appear lol
    for (let i=0; i<segments+1; i++) {
        gradientSegments.push(gradientPart(color, gradientSize, i/segments));
    }
    let gradString = `linear-gradient(${angle}deg, ${gradientSegments.join(', ')})`;
    return gradString;
}

export function satGradient(color, angle=90) {
    let start = `${getHex({
        h: color.h,
        s: 0,
        v: color.v
    })} 0%`;
    let end = `${getHex({
        h: color.h,
        s: 100,
        v: color.v
    })} 100%`;
    let gradString = `linear-gradient(${angle}deg, ${start}, ${end})`;
    return gradString;
}