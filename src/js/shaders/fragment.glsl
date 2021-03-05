// uniform vec2 uResolution;

// void main() {
//   vec2 st = gl_FragCoord.xy/uResolution.xy;
//   gl_FragColor=vec4(st.x,st.y,0.0,1.0);
// }


precision highp float;
void main() {
  vec2 pc = 2.0 * gl_PointCoord - 1.0;
  gl_FragColor = vec4(1., 1., 1., 1.0 - dot(pc, pc));
}