import '../css/style.css';
import { sketch } from 'p5js-wrapper';
import { db } from './firebase.js'
import { collection, onSnapshot, orderBy, query, limit, getDocs } from "../node_modules/firebase/firestore";
import Queue from './queue.js';

const messages = new Queue();
const width = window.innerWidth;
const height = window.innerHeight;
const margin = 0.1*height;
const lineSpace = (height - 2*margin) / 6;
const size = lineSpace/2

async function initialize(){
  const subscribe = onSnapshot(query(collection(db, "feelings"), orderBy("time", "desc"), limit(1)), (snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.data()["message"]);
        if (messages.length >= 6){
          messages.dequeue();
        }
        messages.enqueue(doc.data()["message"]);
        console.log(messages.elements);
        sketch.draw();
      });
    },
    (error) => {
      console.log(error);
  });

  const snapshot = await getDocs(query(collection(db, "feelings"), orderBy("time", "asc")));
  snapshot.forEach((doc) => {
    if (messages.length >=6){
      messages.dequeue();
    }
    console.log(doc.data()["messages"]);
    messages.enqueue(doc.data()["message"])
  })
}

sketch.setup = function(){
  initialize();
  createCanvas (width, height);
}

sketch.draw = function(){
  clear();
  background(0);
  for (let i = 0; i < messages.length; i++) {
    textSize(size);
    fill('white');
    console.log(messages.elements[i]);
    text(messages.elements[i], width / 8, margin + lineSpace*i);
    noLoop();
  }
}

sketch.mousePressed = function(){

}


