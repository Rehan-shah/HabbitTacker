import React from "react";
import Card from "./card";
import axios, { Axios } from 'axios';
import { useEffect, useState} from "react";
import url from "./env.jsx";
import { Modal , Button } from 'react-bootstrap';

function Home(){
  const [habbitListDone , setHabbitListDone] = useState([]);
  const [habbitListLeft , setHabbitListLeft] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const popupShown = localStorage.getItem('popupShown');
    if (!popupShown) {
      setShowModal(true);
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
    localStorage.setItem('popupShown', 'true');
  }

  

  useEffect(  () => {
    try{
      axios.get("http://localhost:4000/data").then(function(res){
           setHabbitListLeft(res.data);
           setIsLoading(false);
       })
    } catch(err){
        console.log(err);
        setIsLoading(false);
       }
    })

    return (
        <div>
          {isLoading ? (
            <div class="text-center">
            <h1>Loading</h1>
  <div className="spinner-border" role="status">
    <span className="sr-only"></span>
  </div>
</div>
          ) : (
            <>
            <Modal show={showModal} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Disclammer</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  This is a habit tracker app that I made for organization. As a new developer with limited funding, I was not able to implement all the features such as authentication, reminders, and push notifications. These features would have made the app more expensive to run, but please enjoy the other features on the app that I have included 
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
</Button>
  </Modal.Footer>
</Modal>
              <h1>Left</h1>
              {habbitListLeft.map(function(item){
                if(item.count < item.times){
                return(<Card Name={item.Name} id={item._id} repatation={item.repatation} color={item.color} count={item.count} times={item.times}/>)}})}
              <h1>Done</h1>
              {habbitListLeft.map(function(item){ if(item.count == item.times) {
                  return(<Card Name={item.Name} id={item._id} repatation={item.repatation} color={item.color} count={item.count} times={item.times}/>)
              }})}
            </>
          )}
        </div>
    )
}

export default Home;
