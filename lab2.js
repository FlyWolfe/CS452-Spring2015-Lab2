
var gl;
var points;
var vertices = [
	vec2(-0.2, -0.2),
	vec2(-0.2,  0.2),
	vec2(0.2, 0.2),
	vec2(0.3, -0.1),
	vec2(0.5, -0.4)
];
var size = 5;

var bufferID;
var colorBuffer;
var vPosition;
var program;
var vColor;

var xPos = 0;
var yPos = 0;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	  
    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	
	//Colours
	
	var colors = [
		1.0,  1.0,  1.0,  1.0,    // white
		1.0,  0.0,  0.0,  1.0,    // red
		0.0,  1.0,  0.0,  1.0,    // green
		0.0,  0.0,  1.0,  1.0     // blue
	];
    colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	
	
    // Load the data into the GPU
    
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	
	// Vertex Colouring
	
	colorBuffer = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(colors),
	gl.STATIC_DRAW );
	vColor = gl.getAttribLocation( program, "vColor" );
	gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vColor );
	
	
	render();
	
	document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
};

  function handleKeyDown(event) {
	if (String.fromCharCode(event.keyCode) == "W") 
	{
		yPos += 0.01;
    }
	else if (String.fromCharCode(event.keyCode) == "S")
	{
		yPos += -0.01;
	}
	else if (String.fromCharCode(event.keyCode) == "D")
	{
		xPos += 0.01;
	}
	else if (String.fromCharCode(event.keyCode) == "A")
	{
		xPos += -0.01;
	}
	else if (String.fromCharCode(event.keyCode) == "1")
	{
		xPos = 0;
		yPos = 0;
	}
	
	vertices = [
		vec2(-0.2 + xPos, -0.2 + yPos),
		vec2(-0.2 + xPos,  0.2 + yPos),
		vec2(0.2 + xPos, 0.2 + yPos),
		vec2(0.3 + xPos, -0.1 + yPos),
		vec2(0.5 + xPos, -0.4 + yPos)
	];
    
    // Load the data into the GPU
    
    bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
	
    // Associate out shader variables with our data buffer
    
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
  }
  
function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, size );
}
