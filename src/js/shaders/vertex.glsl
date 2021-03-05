// void main() {
//   gl_Position = vec4( position, 1.0 );
// }

precision highp float;
// attribute vec3 position;
uniform vec2 uResolution;
void main() {
  gl_PointSize = max(2.0, min(10.0, position.z));
  gl_Position = vec4(
    ( position.x / uResolution.x * 2.0) - 1.0, 
    (-position.y / uResolution.y * 2.0) + 1.0, 
    0.0,
    1.0
  );
}