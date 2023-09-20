import React, { useState, useEffect } from "react";
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSwappingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableImage } from './SortableImage';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

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
  const [loadingAll, setLoadingAll] = useState(false);
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);
  const [loadingError, setLoadingError] = useState(false);
  const [noResultsError, setNoResultsError] = useState(false);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
        navigate('/'); // Redirect user to the login page
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const [galleryData, setGalleryData] = useState([
    { "id": '1', "imageSrc": deer, "tag": "mammal" },
    { "id": '2', "imageSrc": fish, "tag": "fish" },
    { "id": '3', "imageSrc": duck, "tag": "bird" },
    { "id": '4', "imageSrc": flamingo, "tag": "bird" },
    { "id": '5', "imageSrc": fox, "tag": "mammal" },
    { "id": '6', "imageSrc": frog, "tag": "amphibian" },
    { "id": '7', "imageSrc": horse, "tag": "mammal" },
    { "id": '8', "imageSrc": monkey, "tag": "mammal" },
    { "id": '9', "imageSrc": panda, "tag": "mammal" },
    { "id": '10', "imageSrc": parrot, "tag": "bird" },
    { "id": '11', "imageSrc": sheep, "tag": "mammal" },
    { "id": '12', "imageSrc": whale, "tag": "mammal" }
  ]);

  useEffect(() => {
    if (searchQuery === '') {
      // No search query, display all images
      setSearchResults([]);
    } else {
      // Filter galleryData based on searchQuery
      setLoading(true);
      const results = galleryData.filter(item =>
        item.tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    try {
      // Load images here
    } catch (error) {
      setLoadingError("Error while loading images. Please try again.");
    }
  }, []);

  const handleSearch = () => {
    setLoading(true);
    setSearchResults([]); // Clear previous results
    // Filter galleryData based on searchQuery

    const results = galleryData.filter(item =>
      item.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
    setLoading(false);

    if (results.length === 0) {
      setNoResultsError("The search query returned no results");
    } else {
      setNoResultsError(false); // Clear the error message if there are search results
    }
 
  };


  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const onDragEnd = (event) => {
    if (!authUser) {
      navigate('/');
      return;
    }
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = galleryData.findIndex((item) => item.id === active.id.toString());
      const newIndex = galleryData.findIndex((item) => item.id === over.id.toString());
      setGalleryData(arrayMove(galleryData, oldIndex, newIndex));
    }
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
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={(searchQuery ? searchResults : galleryData).map((item) => item.id.toString())}
          strategy={rectSwappingStrategy}
        >
          <div className='gallery-grid'>
            {loading || loadingAll ? (
              <div className="loading-spinner"></div>
            ) : loadingError ? (
              <div className="error-message">{loadingError}</div>
            ) : noResultsError ? (
              <div className="error-message">{noResultsError}</div>
            ): (
              (searchQuery ? searchResults : galleryData).map((item, index) => (
                <SortableImage
                  key={item.id}
                  id={item.id.toString()}
                  imageSrc={item.imageSrc}
                  tag={item.tag}
                  index={index}
                />
              ))
            )}

          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default GalleryPage;
