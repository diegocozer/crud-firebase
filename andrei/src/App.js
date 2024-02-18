import React, { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore"; 

const App = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [updateItemName, setUpdateItemName] = useState("");
  const [itemIdToUpdate, setItemIdToUpdate] = useState("");

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(collection(db, "items"));
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getItems();
  }, []);

  const AdicionaAPorraQTuQuer = async () => {
    const docRef = await addDoc(collection(db, "items"), { name: newItemName });
    const newItem = { id: docRef.id, name: newItemName };
    setItems(prevItems => [...prevItems, newItem]);
    setNewItemName("");
  };

  const AtualizaOCaralhoTodo = async () => {
    const itemDoc = doc(db, "items", itemIdToUpdate);
    await updateDoc(itemDoc, { name: updateItemName });
    const updatedItems = items.map(item => item.id === itemIdToUpdate ? { ...item, name: updateItemName } : item);
    setItems(updatedItems);
    setUpdateItemName("");
    setItemIdToUpdate("");
  };

  const DeletaOCaralhoItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="app">
      <div className="add-item">
        <input
          type="text"
          placeholder="Sla que merda tu quer"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={AdicionaAPorraQTuQuer}>Adicionar oq tu quer aqui</button>
      </div>

      <div className="update-item">
        <input
          type="text"
          placeholder="aqui pra tu atualizar essa merda"
          value={itemIdToUpdate}
          onChange={(e) => setItemIdToUpdate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Atualiza o nome aqui dessa merda"
          value={updateItemName}
          onChange={(e) => setUpdateItemName(e.target.value)}
        />
        <button onClick={AtualizaOCaralhoTodo}>Atualizar Item</button>
      </div>

      <div className="items-list">
        {items.map((item) => (
          <div key={item.id} className="item">
            <span>{item.name}</span>
            <button onClick={() => DeletaOCaralhoItem(item.id)}>Deletar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
