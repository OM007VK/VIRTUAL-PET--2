var dog, happyDogImage, DogImage;
var database; 
var foodS, foodStock;

function preload()
{
  happyDogImage=loadImage("images/dogimg1.png") 
  DogImage=loadImage("images/dogImg.png")
}

function setup() {
	createCanvas(800, 800);
  dog=createSprite(300,400,5,5)
  dog.addImage(DogImage)
  dog.scale=0.5;
  database=firebase.database();
  foodStock=database.ref("Food")
  foodStock.on("value",readFoodStock)
  database.ref("/").update({Food:20})

  lastFed = createButton("Add Food"); 
  lastFed.position(900,95); 
  lastFed.mousePressed(feedDog);

  //create feed the dog button here 
  lastFed = createButton("Feed the dog"); 
  lastFed.position(700,95); 
  lastFed.mousePressed(feedDog);
}

function draw() {  
  background(46,139,87)
  drawSprites();
  //add styles here
  fill("white");
  textSize(25);
  text("Food Count "+foodS,width/2,100);
}

  function readFoodStock(data){
  foodS=data.val();
  console.log("sting")

}
  function feedDog(){
    dog.addImage(happyDogImage);
    foodS--;
    database.ref('/').update({
    Food:foodS,
    FeedTime : hour()
    })
  }

  function feedDog(){
    dog.addImage(happyDogImage);
    foodS++;
    database.ref('/').update({
      Food:foodS,
      FeedTime : hour()
    })
  
  }