let mobilenet;
let video;
let classsifier;
let class1;
let class2;
// let class3; 
let train;


function modelready(){
    console.log("Model is ready!!!");
}

function modelTrained(loss){
    if(loss == null){
        console.log("Training finished")
        classsifier.classify(video,getresults)
    }else{
    console.log(loss);
    }
}

function videoReady(){
    console.log("video is ready!!!")
}


function getresults(error , results){
    if(error){
        console.error(error);
    }
    if(results[0].confidence>results[1].confidence){
        textSize(40)
        fill(255,0,0)
        textAlign(CENTER, CENTER)

        text(results[0].label,width/2,height/2)
    }else{
        textSize(40)
        fill(255,0,0)
        textAlign(CENTER, CENTER)
        text(results[1].label,width/2,height/2)
    }
    classsifier.classify(video,getresults)

}




function setup(){
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet',modelready);
    classsifier = mobilenet.classification(video,videoReady)
    class1 = createButton('Class1')
    class1.mousePressed(function(){
        classsifier.addImage('Class1')
    })
    class2 = createButton('Class2')
    class2.mousePressed(function(){
        classsifier.addImage('Class2')
    })
    train = createButton('Train')
    train.mousePressed(function(){
        classsifier.train(modelTrained)
    })
}




function draw(){
    image(video, 0, 0, width, height);
    
}


