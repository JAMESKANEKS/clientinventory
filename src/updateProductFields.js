import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const updateDatabase = async () => {
  try {
    // Update PAINT products
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    
    productsSnapshot.forEach(async (document) => {
      const item = document.data();
      const productRef = doc(db, "products", document.id);
      
      await updateDoc(productRef, {
        totalCost: parseFloat(item.cost) || 0,
        totalProfit: parseFloat(item.profit) || 0,
      });
    });

    // Update TOOL products
    const toolsCollection = collection(db, "tools");
    const toolsSnapshot = await getDocs(toolsCollection);
    
    toolsSnapshot.forEach(async (document) => {
      const item = document.data();
      const toolRef = doc(db, "tools", document.id);
      
      await updateDoc(toolRef, {
        totalCost: parseFloat(item.cost) || 0,
        totalProfit: parseFloat(item.profit) || 0,
      });
    });

    alert("Database updated with totalCost and totalProfit!");
  } catch (error) {
    console.error("Error updating database:", error);
    alert("Error updating database. Check console for details.");
  }
};

export default updateDatabase;
