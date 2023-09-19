import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import deer from '../components/assets/deer.jpg';
import fish from '../components/assets/fish.jpg';
import duck from '../components/assets/duck.jpg';
import flamingo from '../components/assets/flamingo.jpg';
import fox from '../components/assets/fox.jpg';
import frog from '../components/assets/frog.jpg';
import horse from '../components/assets/horse.jpg';
import monkey from '../components/assets/monkey.jpg';
import panda from '../components/assets/panda.jpg';
import parrot from '../components/assets/parrot.jpg';
import sheep from '../components/assets/sheep.jpg';
import whale from '../components/assets/whale.jpg';

function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [galleryData, setGalleryData] = useState([
    { "id": 1, "imageSrc": deer, "tag": "mammal" },
    { "id": 2, "imageSrc": fish, "tag": "fish" },
    { "id": 3, "imageSrc": duck, "tag": "bird" },
    { "id": 4, "imageSrc": flamingo, "tag": "bird" },
    { "id": 5, "imageSrc": fox, "tag": "mammal" },
    { "id": 6, "imageSrc": frog, "tag": "amphibian" },
    { "id": 7, "imageSrc": horse, "tag": "mammal" },
    { "id": 8, "imageSrc": monkey, "tag": "mammal" },
    { "id": 9, "imageSrc": panda, "tag": "mammal" },
    { "id": 10, "imageSrc": parrot, "tag": "bird" },
    { "id": 11, "imageSrc": sheep, "tag": "mammal" },
    { "id": 12, "imageSrc": whale, "tag": "mammal" }
  ]);

  useEffect(() => {
    if (searchQuery === '') {
      // No search query, display all images
      setSearchResults([]);
    } else {
      // Filter galleryData based on searchQuery
      setLoading(true);
      setTimeout(() => {
        const results = galleryData.filter(item =>
          item.tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
        setLoading(false);
      }, 1000); // Simulate a delay (remove this in production)
    }
  }, [searchQuery]);

  const handleSearch = () => {
    setLoading(true);
    setSearchResults([]); // Clear previous results
    // Filter galleryData based on searchQuery
    setTimeout(() => {
      const results = galleryData.filter(item =>
        item.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setLoading(false);
    }, 1000); // Simulate a delay (remove this in production)
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(galleryData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setGalleryData(items);
  };


  return (
    <div className='gallery-container'>
      <div className='search-bar'>
        <input
          type="text"
          placeholder="Search by tag"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="button" onClick={handleSearch}>Search</button>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="images">
          {(provided) => (
            <div className='gallery-grid' {...provided.droppableProps} ref={provided.innerRef}>
              {galleryData.map((item, index) => (
                <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                {(provided, snapshot) => (
                  <div className={`image-item ${snapshot.isDragging ? "dragging" : ""}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <img src={item.imageSrc} alt={`Image ${item.id}`} />
                    
                  </div>
                )}
              </Draggable>              
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </div>
  );
}

export default GalleryPage;
