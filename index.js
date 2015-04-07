
function readVector(buf, off) {
  return [
    buf.readFloatLE(off + 0),
    buf.readFloatLE(off + 4),
    buf.readFloatLE(off + 8)
  ];
}

function parse(buf) {
  var off = 80; // skip header

  var triangleCount = buf.readUInt32LE(off); 
  off += 4;

  var cells = [];
  var positions = [];
  var faceNormals = [];

  for(var i=0; i<triangleCount; i++) {
    var cell = [];
    var normal = readVector(buf, off);
    off += 12; // 3 floats

    faceNormals.push(normal);

    for(var j=0; j<3; j++) {
      var position = readVector(buf, off);
      off += 12;
      cell.push(positions.length);
      positions.push(position);
    }

    cells.push(cell);
    off += 2; // skip attribute byte count
  }

  return {
    positions: positions,
    cells: cells,
    faceNormals: faceNormals
  };
}

module.exports = parse;