$(document).ready(function(){
    var canvas=$("#canvas")[0];
    var renderer=new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
    var ctx = renderer.getContext("");
    var can= document.getElementById('canvas');
    var context = can.getContext('2d');
    var stave = new Vex.Flow.Stave(10, 0, 400);
    var numBeats=4,
        beatValue=4,
        staff,
        voice,
        noteOffsetLeft,
        tickIndex=0,
        noteIndex=0;
    processStave(); 
    var b = String.fromCharCode(parseInt('266D', 16));
    var s = String.fromCharCode(parseInt('266F', 16));
    var notes=new Array();
    
     var notes = [
    // A quarter-note C.
    //new Vex.Flow.StaveNote({ keys: ["c/4"], duration: "q" })
  ];
        
    
    function processStave(){
        
        stave.addClef("treble");
        stave.addTimeSignature(numBeats + "/" + beatValue);
        stave.setContext(ctx).draw();
      // Create a voice in 4/4
        
    }
    
    function processNotes(){
        voice = new Vex.Flow.Voice({
            num_beats:4,
            beat_value:4,
            resolution:Vex.Flow.RESOLUTION
        });
        voice.setStrict(false);
        voice.addTickables(notes);
        var formatter=new Vex.Flow.Formatter().joinVoices([voice]).format([voice],400);
        
    }
    
    function parseNoteInput(){
        var note_acc= (selectNoteAccidental.val() != "none") ? selectNoteAccidental.val() : "";
        var noteObj = { keys: [selectNoteName.val().toLowerCase() + note_acc + "/" + selectNoteOctave.val()], duration: selectNoteDuration.val(),accidental: selectNoteAccidental}
        return noteObj;
    }
    
    function addNote(staveNoteObj){
       notes.push(new Vex.Flow.StaveNote(staveNoteObj));
       console.log(notes);
        ctx.clear();
        processNotes();
        drawStave();
        drawNotes();
    }
    
    
    function drawStave() {
		stave.setContext(ctx).draw();
	}
	
	
	function drawNotes(x, y, acc) {
        //voice.draw(ctx, stave);
    //    ctx.clear();
        ctx.fillStyle="#000000";         
        if (acc) {
            ctx.font = "20px Georgia";
            ctx.fillText(acc, x - 20, y - 5); 
        }
        ctx.fillRect(x - 10, y - 15 ,10 ,10); 

	}
    
    function queNotaEs(y) {

        return y;
    }

    function getMousePosition(e){
        return { x:e.clientX, y:e.clientY};
    }
    
   canvas.addEventListener('click', function(e) {
        let mousePos = getMousePosition( e);
        let  i;
        console.log(mousePos.x + " " + mousePos.y);
        mousePos.y = Math.round(mousePos.y / 5) * 5;
        if (mousePos.y > 125 | mousePos.y < 20) return;
        $("#nota").text("La última nota pulsada es: " + queNotaEs(mousePos.y));
        notes.push(mousePos);
        console.log(notes);
        ctx.clear();
        for (i = 0; i < notes.length; i++) {
        drawNotes(notes[i].x, notes[i].y, b);
        }
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
//        ctx.clear();
//        ctx.font = "20px Georgia";
//        ctx.fillStyle="#000000";    
/*        ctx.fillText(b, mousePos.x + 30, 95);    
        ctx.fillRect(mousePos.x + 30,90,30,1); 
        ctx.fillRect(mousePos.x + 40 ,85,10,10);                    
        ctx.fillText(s, mousePos.x - 20, mousePos.y - 5);   
        ctx.fillRect(mousePos.x - 10 ,mousePos.y - 15,10,10);       */
     //   ctx.fillRect(mousePos.x + 30 ,mousePos.y + 30,10,10);        
        //addNote(parseNoteInput());
        drawStave();
//        processNotes();
//        drawNotes();
      }, false);
});



